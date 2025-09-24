"use client";

import React from "react";
import { CardNumbers } from "./WebSocketProvider";

interface BingoCardProps {
  card: CardNumbers;
}

export default function BingoCard({ card }: BingoCardProps) {
  const { B, I, N, G, O } = card;

  const rows = Array.from({ length: 5 }, (_, i) => [
    B[i],
    I[i],
    N[i],
    G[i],
    O[i],
  ]);

  return (
    <div className="grid grid-cols-5 gap-1 bg-gray-800 p-2 rounded-md">
      {rows.map((row, rowIndex) =>
        row.map((num, colIndex) => (
          <div
            key={`${rowIndex}-${colIndex}`}
            className={`flex justify-center items-center w-12 h-12 bg-gray-700 rounded text-white font-bold ${
              rowIndex === 2 && colIndex === 2 ? "bg-green-600" : ""
            }`}
          >
            {num ?? "FREE"}
          </div>
        ))
      )}
    </div>
  );
}
