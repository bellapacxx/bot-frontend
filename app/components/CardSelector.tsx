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
    <section className="mb-6 px-2 sm:px-4">
      <h2 className="text-xl sm:text-2xl font-bold mb-4 text-center text-green-400 tracking-wide">
        Select a Bingo Card
      </h2>

      {/* Scrollable grid for mobile */}
      <div className="grid grid-cols-3 sm:grid-cols-5 gap-3 justify-center overflow-x-auto">
        {availableCards.map((card) => {
          const isSelected = card.card_id === selectedCardId;

          return (
            <button
              key={card.card_id}
              onClick={() => handleSelect(card.card_id)}
              disabled={card.taken || (selectedCardId !== null && !isSelected)}
              className={`relative p-2 rounded-xl font-bold transition-transform transform text-white 
                text-lg sm:text-xl flex items-center justify-center min-w-[10px] h-10
                ${
                  card.taken
                    ? "bg-gray-800 opacity-40 cursor-not-allowed shadow-none"
                    : isSelected
                    ? "bg-gradient-to-br from-green-500 to-green-300 shadow-[0_0_25px_rgba(0,255,0,0.7)] scale-105"
                    : "bg-gradient-to-br from-purple-600 to-pink-500 shadow-lg hover:scale-105 hover:shadow-[0_0_20px_rgba(255,0,255,0.5)] opacity-70"
                }
              `}
            >
              <span className="z-10">{card.card_id}</span>
              {!card.taken && !isSelected && (
                <span className="absolute inset-0 rounded-xl border-2 border-white opacity-20 animate-pulse"></span>
              )}
            </button>
          );
        })}
      </div>

      {/* Available cards info */}
      <p className="text-sm mt-3 text-center text-gray-400">
        {availableCards.filter(c => !c.taken).length} cards available
      </p>
    </section>
  );
};

export default CardSelector;
