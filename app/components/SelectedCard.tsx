"use client";

import React from "react";
import BingoCardView, { Card } from "./BingoCardView";

const SelectedCard = ({ card }: { card: Card | null }) => {
  const columns = ["B", "I", "N", "G", "O"];

  return (
    <section className="mb-3 px-1">
      {card ? (
        <div className="space-y-1 max-w-xs mx-auto">
          {/* Header: B I N G O */}
          <div className="grid grid-cols-5 gap-1 text-center font-bold text-[0.65rem] text-white">
            {columns.map((col) => (
              <div
                key={col}
                className="bg-green-600 rounded-sm p-[1px] shadow-sm"
              >
                {col}
              </div>
            ))}
          </div>

          {/* Card numbers */}
          <BingoCardView card={card} small />
        </div>
      ) : (
        <p className="text-gray-400 text-center italic text-[0.65rem]">
          No card selected yet
        </p>
      )}
    </section>
  );
};

export default SelectedCard;
