"use client";

import React from "react";

export interface Card {
  card_id: number;
  B: (number | null)[];
  I: (number | null)[];
  N: (number | null)[];
  G: (number | null)[];
  O: (number | null)[];
  taken: boolean;
}

interface BingoCardViewProps {
  card: Card;
  small?: boolean;
}

const BingoCardView = ({ card, small = false }: BingoCardViewProps) => {
  // Transpose numbers column-wise (B, I, N, G, O) for proper Bingo layout
  const gridNumbers: (number | string)[] = [];
  for (let row = 0; row < 5; row++) {
    gridNumbers.push(
      card.B[row] ?? "",
      card.I[row] ?? "",
      row === 2 ? "FREE" : card.N[row] ?? "",
      card.G[row] ?? "",
      card.O[row] ?? ""
    );
  }

  // Sizes based on small prop
  const padding = small ? "p-[2px]" : "p-2 sm:p-3";
  const fontSize = small ? "text-[0.55rem]" : "text-sm sm:text-base";
  const borderRadius = small ? "rounded-sm" : "rounded-md";

  return (
    <div
      className={`grid grid-cols-5 gap-[2px] ${padding} ${borderRadius} bg-gradient-to-br from-purple-700 to-pink-500 shadow-md text-center font-bold text-white max-w-xs mx-auto`}
    >
      {gridNumbers.map((num, idx) => (
        <div
          key={`${card.card_id}-${idx}`}
          className={`${padding} ${borderRadius} ${fontSize} border border-white flex items-center justify-center
            ${
              num === "FREE"
                ? "bg-yellow-400 text-black font-extrabold shadow-inner shadow-yellow-200/50"
                : "bg-white/10 backdrop-blur-sm"
            }`}
        >
          {num}
        </div>
      ))}
    </div>
  );
};

export default BingoCardView;
