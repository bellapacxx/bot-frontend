"use client";

import {
  createContext,
  useContext,
  useEffect,
  useState,
  ReactNode,
  useRef,
  useCallback,
} from "react";

// --------------------
// Types
// --------------------
export interface CardNumbers {
  B: (number | null)[];
  I: (number | null)[];
  N: (number | null)[];
  G: (number | null)[];
  O: (number | null)[];
  card_id: number;
}

export interface AvailableCard extends CardNumbers {
  taken: boolean;
}

interface LobbyState {
  status: string;
  countdown: number;
  availableCards: AvailableCard[];
  selectedCards: CardNumbers[];
  numbersDrawn: number[];
}

interface LobbyContextProps extends LobbyState {
  stake: number;
  telegramId: string;
  sendCardSelection: (card_id: number) => void;
  sendBingo: (card_id: number) => void;
  bingoWinner?: { telegramId: string; card_id: number } | undefined;
}

type WSMessage = { action: "select_card"; card_id: number };

// --------------------
// Normalize functions (stable, outside component)
// --------------------
const normalizeCard = (card: unknown): CardNumbers => {
  const c = card as Record<string, any>;
  return {
    B: Array.isArray(c.B) ? c.B.map((n: any) => (n != null ? Number(n) : null)) : [],
    I: Array.isArray(c.I) ? c.I.map((n: any) => (n != null ? Number(n) : null)) : [],
    N: Array.isArray(c.N) ? c.N.map((n: any) => (n != null ? Number(n) : null)) : [],
    G: Array.isArray(c.G) ? c.G.map((n: any) => (n != null ? Number(n) : null)) : [],
    O: Array.isArray(c.O) ? c.O.map((n: any) => (n != null ? Number(n) : null)) : [],
    card_id: Number(c.card_id ?? 0),
  };
};

const normalizeAvailableCard = (card: unknown): AvailableCard => ({
  ...normalizeCard(card),
  taken: Boolean((card as Record<string, any>).Taken || (card as Record<string, any>).taken),
});

// --------------------
// Toast helper
// --------------------
const showToast = (message: string) => {
  const el = document.createElement("div");
  el.textContent = message;
  el.style.position = "fixed";
  el.style.bottom = "20px";
  el.style.left = "50%";
  el.style.transform = "translateX(-50%)";
  el.style.background = "#0B2240";
  el.style.color = "#fff";
  el.style.padding = "10px 20px";
  el.style.borderRadius = "8px";
  el.style.boxShadow = "0 2px 10px rgba(0,0,0,0.2)";
  el.style.zIndex = "9999";
  document.body.appendChild(el);
  setTimeout(() => el.remove(), 5000);
};

// --------------------
// Context
// --------------------
const LobbyContext = createContext<LobbyContextProps | undefined>(undefined);

interface Props {
  stake: number;
  telegramId: string;
  children: ReactNode;
}

// --------------------
// Provider
// --------------------
export const WebSocketProvider = ({ stake, telegramId, children }: Props) => {
  const [status, setStatus] = useState<"waiting" | "countdown" | "running">("waiting");
  const [countdown, setCountdown] = useState(30);
  const [availableCards, setAvailableCards] = useState<AvailableCard[]>([]);
  const [selectedCards, setSelectedCards] = useState<CardNumbers[]>([]);
  const [numbersDrawn, setNumbersDrawn] = useState<number[]>([]);
  const [bingoWinner, setBingoWinner] = useState<{ telegramId: string; card_id: number } | undefined>(undefined);

  const wsRef = useRef<WebSocket | null>(null);
  const reconnectTimeout = useRef<ReturnType<typeof setTimeout> | null>(null);
  const messageQueue = useRef<WSMessage[]>([]);

  // --------------------
  // Connect WebSocket (stable via useCallback)
  // --------------------
  const connectWebSocket = useCallback(() => {
    if (wsRef.current) return;

    const ws = new WebSocket(
      `wss://bingo-backend-production-32e1.up.railway.app/api/lobby/${stake}?telegram_id=${telegramId}`
    );
    wsRef.current = ws;

    ws.onopen = () => {
      console.log("✅ Connected to lobby", stake);
      messageQueue.current.forEach((msg) => ws.send(JSON.stringify(msg)));
      messageQueue.current = [];
    };

    ws.onmessage = (event) => {
      try {
        const data = JSON.parse(event.data);

        setStatus(data.status ?? "waiting");
        setCountdown(data.countdown ?? 0);

        const numbers = data.numbersDrawn || data.numbers_drawn || [];
        setNumbersDrawn(Array.isArray(numbers) ? numbers.map(Number) : []);

        const cards = data.availableCards || data.available_cards || [];
        setAvailableCards(Array.isArray(cards) ? cards.map(normalizeAvailableCard) : []);

        const selectedMap = data.selected || data.selected_cards || {};
        setSelectedCards(
          Object.values(selectedMap as Record<string, AvailableCard>)
            .map(normalizeCard)
            .filter(Boolean)
        );

        if (data.BingoWinner != null && data.bingoWinnerCardId != null) {
          setBingoWinner({
            telegramId: String(data.BingoWinner),
            card_id: Number(data.bingoWinnerCardId),
          });
        } else {
          setBingoWinner(undefined);
        }

        if (data.type === "notification" && data.message) {
          showToast(data.message);
        }
      } catch (err) {
        console.error("❌ WS parse error", err);
      }
    };

    ws.onclose = (event) => {
      console.log(`⚠️ Disconnected from lobby (code ${event.code})`);
      wsRef.current = null;
      if (!reconnectTimeout.current) {
        reconnectTimeout.current = setTimeout(() => {
          reconnectTimeout.current = null;
          connectWebSocket();
        }, 2000);
      }
    };

    ws.onerror = (err) => console.error("❌ WebSocket error:", err);
  }, [stake, telegramId]);

  // --------------------
  // Auto connect on mount
  // --------------------
  useEffect(() => {
    connectWebSocket();
    return () => {
      if (reconnectTimeout.current) clearTimeout(reconnectTimeout.current);
      wsRef.current?.close();
      wsRef.current = null;
    };
  }, [connectWebSocket]);

  // --------------------
  // Send card selection
  // --------------------
  const sendCardSelection = useCallback((card_id: number) => {
    const msg: WSMessage = { action: "select_card", card_id };
    if (wsRef.current?.readyState === WebSocket.OPEN) {
      wsRef.current.send(JSON.stringify(msg));
    } else {
      messageQueue.current.push(msg);
    }
  }, []);

  // --------------------
  // Send bingo
  // --------------------
  const sendBingo = useCallback((card_id: number) => {
    const msg = { action: "bingo", card_id };
    if (wsRef.current?.readyState === WebSocket.OPEN) {
      wsRef.current.send(JSON.stringify(msg));
    } else {
      console.log("⚠️ WebSocket not open. Bingo message queued.");
    }
  }, []);

  // --------------------
  // Provide context
  // --------------------
  return (
    <LobbyContext.Provider
      value={{
        status,
        countdown,
        availableCards,
        selectedCards,
        numbersDrawn,
        stake,
        telegramId,
        sendCardSelection,
        sendBingo,
        bingoWinner,
      }}
    >
      {children}
    </LobbyContext.Provider>
  );
};

// --------------------
// Hook
// --------------------
export const useLobby = () => {
  const context = useContext(LobbyContext);
  if (!context) throw new Error("useLobby must be used within a WebSocketProvider");
  return context;
};
