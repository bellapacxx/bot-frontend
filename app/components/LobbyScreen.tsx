"use client";

import React, { useState } from "react";
import { useLobby } from "./WebSocketProvider";
import LobbyStatus from "./LobbyStatus";
import CardSelector from "./CardSelector";
import SelectedCard from "./SelectedCard";
import { Card } from "./BingoCardView";
import BingoUI from "./BingoUI";

const LobbyScreen = () => {
  const { availableCards, numbersDrawn, sendCardSelection, status } = useLobby();
  const [selectedCardId, setSelectedCardId] = useState<number | null>(null);

  const selectedCard: Card | null =
    selectedCardId != null
      ? availableCards.find((c) => c.card_id === selectedCardId) || null
      : null;

  const handleSelectCard = (id: number) => {
    setSelectedCardId(id);
    sendCardSelection(id);
  };

  return (
    <div className="w-full max-w-lg mx-auto p-2 space-y-4">
      {/* Lobby Status */}
      {status !== "in_progress" && (
        <div className="bg-black/60 backdrop-blur-sm rounded-xl p-3 shadow-md border border-green-400">
          <LobbyStatus />
        </div>
      )}

      {/* Bingo Game View */}
      {status === "in_progress" && (
        <div className="transition-all duration-500 w-full">
          <BingoUI numbers={numbersDrawn} card={selectedCard} />
        </div>
      )}

      {/* Card Selection */}
      {status !== "in_progress" && (
        <div className="bg-black/60 backdrop-blur-sm rounded-xl p-3 shadow-md border border-purple-400 w-full">
          <CardSelector availableCards={availableCards} onSelect={handleSelectCard} />
        </div>
      )}

      {/* Selected Card Preview */}
      {status !== "in_progress" && (
        <div className="bg-black/50 backdrop-blur-sm rounded-xl p-3 shadow-md border border-pink-400 w-full">
          <SelectedCard card={selectedCard} />
        </div>
      )}
    </div>
  );
};

export default LobbyScreen;
