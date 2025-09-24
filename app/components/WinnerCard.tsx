"use client";
import React from "react";

type Card = {
  card_id: number;
  B: (number | null)[];
  I: (number | null)[];
  N: (number | null)[];
  G: (number | null)[];
  O: (number | null)[];
};

interface WinnerCardProps {
  card: Card;
  numbersDrawn: number[];
}

const WinnerCard: React.FC<WinnerCardProps> = ({ card, numbersDrawn }) => {
  const columns = ["B", "I", "N", "G", "O"];
  const isNumberDrawn = (num: number | null) => num !== null && numbersDrawn.includes(num);

  return (
    <div className="inline-block w-full max-w-xs mx-auto backdrop-blur-md bg-black/30 rounded-2xl p-2 border border-green-400 shadow-[0_0_30px_rgba(0,255,128,0.5)]">
      <h3 className="text-lg font-bold text-center mb-2 text-green-400 tracking-wider">Card #{card.card_id}</h3>
      <div className="grid grid-cols-5 gap-1 overflow-hidden rounded-xl">
        {columns.map((col) => (
          <div key={col} className="text-center font-bold py-2 text-sm text-green-300">{col}</div>
        ))}
        {columns.flatMap((col) =>
          (card[col as keyof Omit<Card, "card_id">] as (number | null)[]).map((num, rowIdx) => {
            const isFree = col === "N" && rowIdx === 2;
            const highlighted = isFree || isNumberDrawn(num);
            return (
              <div
                key={`${col}-${rowIdx}`}
                className={`h-12 flex items-center justify-center border rounded-lg text-sm font-semibold transition-all duration-300
                  ${isFree ? "bg-gradient-to-br from-purple-600 to-pink-500 text-white shadow-lg shadow-pink-400/50" :
                  highlighted ? "bg-green-500 text-black shadow-md shadow-green-400/50" :
                  "bg-gray-900 text-gray-300 hover:scale-105 hover:bg-gray-800"}`}
              >
                {isFree ? "FREE" : num}
              </div>
            );
          })
        )}
      </div>
    </div>
  );
};

export default WinnerCard;
