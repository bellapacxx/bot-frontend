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
    <div className="p-2 sm:p-4 space-y-4 relative max-w-md mx-auto">
      {/* Lobby Status */}
      {status !== "in_progress" && (
        <div className="bg-gray-900/70 backdrop-blur-md rounded-xl p-3 shadow-lg shadow-green-400/50">
          <LobbyStatus />
        </div>
      )}

      {/* Bingo Game View */}
      {status === "in_progress" && (
        <div className="transition-all duration-500 overflow-x-auto">
          <BingoUI numbers={numbersDrawn} card={selectedCard} />
        </div>
      )}

      {/* Card Selection */}
      {status !== "in_progress" && (
        <div className="bg-gray-900/70 backdrop-blur-md rounded-xl p-2 sm:p-3 shadow-lg shadow-purple-400/50 overflow-x-auto">
          <CardSelector availableCards={availableCards} onSelect={handleSelectCard} />
        </div>
      )}

      {/* Selected Card Preview */}
      {status !== "in_progress" && (
        <div className="bg-gray-900/60 backdrop-blur-sm rounded-xl p-2 sm:p-3 shadow-lg shadow-pink-400/40">
          <SelectedCard card={selectedCard} />
        </div>
      )}
    </div>
  );
};

export default LobbyScreen;
