"use client";

import React, { useState } from "react";
import { Card } from "./BingoCardView";

interface CardSelectorProps {
  availableCards: Card[];
  onSelect: (id: number) => void;
}

const CardSelector = ({ availableCards, onSelect }: CardSelectorProps) => {
  const [selectedCardId, setSelectedCardId] = useState<number | null>(null);

  const handleSelect = (id: number) => {
    setSelectedCardId(id);
    onSelect(id);
  };

  return (
    <section className="mb-4 px-2">
      <h2 className="text-lg font-bold mb-2 text-center text-green-400 tracking-wide">
        Select a Bingo Card
      </h2>

      {/* Scrollable horizontal grid */}
      <div className="flex gap-2 overflow-x-auto px-1 py-2">
        {availableCards.map((card) => {
          const isSelected = card.card_id === selectedCardId;

          return (
            <button
              key={card.card_id}
              onClick={() => handleSelect(card.card_id)}
              disabled={card.taken || (selectedCardId !== null && !isSelected)}
              className={`relative flex-shrink-0 w-10 h-10 rounded-lg font-bold text-white text-sm flex items-center justify-center transition-transform transform
                ${
                  card.taken
                    ? "bg-gray-700 opacity-40 cursor-not-allowed shadow-none"
                    : isSelected
                    ? "bg-green-500 shadow-[0_0_10px_rgba(0,255,0,0.7)] scale-105"
                    : "bg-purple-600 shadow-sm hover:scale-105 opacity-80"
                }
              `}
            >
              {card.card_id}
              {!card.taken && !isSelected && (
                <span className="absolute inset-0 rounded-lg border border-white opacity-20 animate-pulse"></span>
              )}
            </button>
          );
        })}
      </div>

      {/* Available cards info */}
      <p className="text-xs mt-1 text-center text-gray-400">
        {availableCards.filter(c => !c.taken).length} cards available
      </p>
    </section>
  );
};

export default CardSelector;
