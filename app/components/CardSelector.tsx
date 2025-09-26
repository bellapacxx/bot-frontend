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
    <section className="mb-4 px-1">
      <h2 className="text-sm font-bold mb-2 text-center text-green-400 tracking-wide">
        ካርቴላ ይምረጡ
      </h2>

      {/* Grid for all cards */}
      <div className="grid grid-cols-10 gap-1">
        {availableCards.map((card) => {
          const isSelected = card.card_id === selectedCardId;

          return (
            <button
              key={card.card_id}
              onClick={() => handleSelect(card.card_id)}
              disabled={card.taken || (selectedCardId !== null && !isSelected)}
              className={`relative w-6 h-6 rounded-sm font-bold text-white text-[0.6rem] flex items-center justify-center transition-transform transform
                ${
                  card.taken
                    ? "bg-gray-700 opacity-40 cursor-not-allowed shadow-none"
                    : isSelected
                    ? "bg-green-500 shadow-[0_0_6px_rgba(0,255,0,0.7)] scale-105"
                    : "bg-purple-600 shadow-sm hover:scale-105 opacity-80"
                }
              `}
            >
              {card.card_id}
              {!card.taken && !isSelected && (
                <span className="absolute inset-0 rounded-sm border border-white opacity-20 animate-pulse"></span>
              )}
            </button>
          );
        })}
      </div>

      {/* Available cards info */}
      <p className="text-[0.6rem] mt-1 text-center text-gray-400">
        {availableCards.filter(c => !c.taken).length} ካርቴላ ይቀራሉ
      </p>
    </section>
  );
};

export default CardSelector;
