"use client";
import React, { useState } from "react";
import { useLobby } from "./WebSocketProvider";

type Card = { 
  card_id: number; 
  B: (number | null)[]; 
  I: (number | null)[]; 
  N: (number | null)[]; 
  G: (number | null)[]; 
  O: (number | null)[] 
};

interface PlayerCardProps { 
  card: Card | null; 
}

const PlayerCard: React.FC<PlayerCardProps> = ({ card }) => {
  const [marked, setMarked] = useState<number[]>([]);
  const { sendBingo } = useLobby();
  if (!card) return <p className="text-gray-400 text-center mt-4">No card selected</p>;

  const columns = ["B", "I", "N", "G", "O"];
  const toggleMark = (num: number | null) => { 
    if (num !== null) setMarked(prev => prev.includes(num) ? prev.filter(n => n !== num) : [...prev, num]); 
  };
  const handleBingoClick = () => sendBingo(card.card_id);

  // Transpose the grid numbers
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

  return (
    <div className="mt-4">
      <h2 className="text-lg font-bold mb-2 text-center text-green-400 tracking-wider">Your Card</h2>
      <div className="grid grid-cols-5 gap-1 max-w-xs mx-auto backdrop-blur-md bg-black/20 rounded-2xl p-2 border border-green-400 shadow-[0_0_20px_rgba(0,255,128,0.4)]">
        {columns.map((col) => (
          <div key={col} className="text-center font-bold py-1 text-sm text-green-300">{col}</div>
        ))}
        {gridNumbers.map((num, idx) => {
          const isFree = num === "FREE";
          const isMarked = typeof num === "number" && marked.includes(num);
          return (
            <button
              key={idx}
              onClick={() => toggleMark(typeof num === "number" ? num : null)}
              className={`h-12 flex items-center justify-center rounded-lg text-sm font-semibold transition-all duration-300
                ${isFree
                  ? "bg-gradient-to-br from-purple-600 to-pink-500 text-white shadow-lg shadow-pink-400/50"
                  : isMarked
                  ? "bg-blue-500 text-white shadow-md shadow-blue-400/50"
                  : "bg-gray-900 text-gray-300 hover:scale-105 hover:bg-gray-800"}`}
            >
              {num}
            </button>
          );
        })}
      </div>
      <div className="mt-3 text-center">
        <button 
          onClick={handleBingoClick} 
          className="px-6 py-2 bg-gradient-to-r from-red-500 to-pink-500 text-white font-bold rounded-lg shadow-lg hover:scale-105 hover:shadow-pink-400/50 transition-transform"
        >
          Bingo
        </button>
      </div>
    </div>
  );
};

export default PlayerCard;
