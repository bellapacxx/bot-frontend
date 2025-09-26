"use client";

import {
  createContext,
  useContext,
  useEffect,
  useState,
  ReactNode,
  useRef,
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
  potentialWinnings?: number; // <-- add this
  bingoWinnerName: string | null;
}

interface LobbyContextProps extends LobbyState {
  stake: number;
  telegramId: string;
  sendCardSelection: (card_id: number) => void;
  sendBingo: (card_id: number) => void; // <-- add this
  bingoWinner?: { telegramId: string; card_id: number } | undefined;
  balances: Record<string, number>;
}

type WSMessage = { action: "select_card"; card_id: number };

// --------------------
// Context
// --------------------
const LobbyContext = createContext<LobbyContextProps | undefined>(undefined);

interface Props {
  stake: number;
  telegramId: string;
  children: ReactNode;
}
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
// Provider
// --------------------
export const WebSocketProvider = ({ stake, telegramId, children }: Props) => {
  const [status, setStatus] = useState<"waiting" | "countdown" | "running">(
    "waiting"
  );
  const [countdown, setCountdown] = useState(30);
  const [availableCards, setAvailableCards] = useState<AvailableCard[]>([]);
  const [selectedCards, setSelectedCards] = useState<CardNumbers[]>([]);
  const [numbersDrawn, setNumbersDrawn] = useState<number[]>([]);
  const wsRef = useRef<WebSocket | null>(null);
  const reconnectTimeout = useRef<ReturnType<typeof setTimeout> | null>(null);
  const messageQueue = useRef<WSMessage[]>([]);
  const [bingoWinner, setBingoWinner] = useState<
    { telegramId: string; card_id: number } | undefined
  >(undefined);
  const [balances, setBalances] = useState<Record<string, number>>({});
  const [potentialWinnings, setPotentialWinnings] = useState<
    number | undefined
  >(undefined);
  const [bingoWinnerName, setBingoWinnerName] = useState<string | null>(null);
  // --------------------
  // Normalize cards
  // --------------------
  const normalizeCard = (card: any): CardNumbers => ({
    B: Array.isArray(card.B)
      ? card.B.map((n: null) => (n != null ? Number(n) : null))
      : [],
    I: Array.isArray(card.I)
      ? card.I.map((n: null) => (n != null ? Number(n) : null))
      : [],
    N: Array.isArray(card.N)
      ? card.N.map((n: null) => (n != null ? Number(n) : null))
      : [],
    G: Array.isArray(card.G)
      ? card.G.map((n: null) => (n != null ? Number(n) : null))
      : [],
    O: Array.isArray(card.O)
      ? card.O.map((n: null) => (n != null ? Number(n) : null))
      : [],
    card_id: Number(card.card_id ?? 0),
  });

  const normalizeAvailableCard = (card: any): AvailableCard => ({
    ...normalizeCard(card),
    taken: Boolean(card.Taken || card.taken),
  });

  // --------------------
  // Connect WebSocket
  // --------------------
  const connectWebSocket = () => {
    if (wsRef.current) return;

    const ws = new WebSocket(
      `wss://bingo-backend-production-32e1.up.railway.app/api/lobby/${stake}?telegram_id=${telegramId}`
    );
    wsRef.current = ws;

    ws.onopen = () => {
      console.log("✅ Connected to lobby", stake);
      // Flush queued messages
      messageQueue.current.forEach((msg) => ws.send(JSON.stringify(msg)));
      messageQueue.current = [];
    };

    ws.onmessage = (event) => {
      try {
        const data = JSON.parse(event.data);

        setStatus(data.status ?? "waiting");
        setCountdown(data.countdown ?? 0);

        // Numbers drawn
        const numbers = data.numbersDrawn || data.numbers_drawn || [];
        setNumbersDrawn(Array.isArray(numbers) ? numbers.map(Number) : []);

        // Available cards
        const cards = data.availableCards || data.available_cards || [];
        const normalizedAvailable: AvailableCard[] = Array.isArray(cards)
          ? cards.map(normalizeAvailableCard)
          : [];
        setAvailableCards(normalizedAvailable);

        // Selected cards
        // Selected cards
        const selectedMap = data.selected || data.selected_cards || {};
        const selectedList: CardNumbers[] = Object.values(
          selectedMap as Record<string, AvailableCard>
        )
          .map((card) => normalizeCard(card))
          .filter(Boolean);

        setSelectedCards(selectedList);
        // Bingo winner broadcast

        // Bingo winner
        if (data.BingoWinner != null && data.bingoWinnerCardId != null) {
          setBingoWinner({
            telegramId: String(data.BingoWinner),
            card_id: Number(data.bingoWinnerCardId),
          });
        } else {
          setBingoWinner(undefined);
        }
        if (data.potentialWinnings != null) {
          setPotentialWinnings(Number(data.potentialWinnings)); // <-- set potential winnings
        } else {
          setPotentialWinnings(undefined);
        }
        console.log(bingoWinnerName);
        if (data.bingoWinnerName) {
          setBingoWinnerName(data.bingoWinnerName);
        } else {
          setBingoWinnerName(null);
        }
        if (data.type === "notification" && data.message) {
          showToast(data.message); // <-- your toast or alert function
        }

        if (data.balances) {
          setBalances(data.balances); // data.balances should be { telegramId: balance }
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
  };

  // --------------------
  // Effect
  // --------------------
  useEffect(() => {
    connectWebSocket();

    return () => {
      if (reconnectTimeout.current) clearTimeout(reconnectTimeout.current);
      wsRef.current?.close();
      wsRef.current = null;
    };
  }, [stake, telegramId]);

  // --------------------
  // Send card selection
  // --------------------
  const sendCardSelection = (card_id: number) => {
    const msg: WSMessage = { action: "select_card", card_id };
    console.log(card_id);
    if (wsRef.current?.readyState === WebSocket.OPEN) {
      wsRef.current.send(JSON.stringify(msg));
    } else {
      messageQueue.current.push(msg);
    }
  };

  // --------------------
  // Send bingo
  // --------------------
  const sendBingo = (card_id: number) => {
    const msg = {
      action: "bingo",
      card_id,
    };
    if (wsRef.current?.readyState === WebSocket.OPEN) {
      wsRef.current.send(JSON.stringify(msg));
    } else {
      console.log("⚠️ WebSocket not open. Bingo message queued.");
      // Optionally queue it if you want, like with card selection
    }
  };

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
        bingoWinner, // <-- include winner info
        balances, // <-- include balances
        potentialWinnings,
        bingoWinnerName,
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
  if (!context) {
    throw new Error("useLobby must be used within a WebSocketProvider");
  }
  return context;
};

function setPotentialWinnings(arg0: number) {
  throw new Error("Function not implemented.");
}
