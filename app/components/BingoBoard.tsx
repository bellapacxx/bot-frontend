"use client";
import React from "react";

interface BingoBoardProps {
  drawnNumbers: number[];
}

const BingoBoard: React.FC<BingoBoardProps> = ({ drawnNumbers }) => {
  const columns = {
    B: Array.from({ length: 15 }, (_, i) => i + 1),
    I: Array.from({ length: 15 }, (_, i) => i + 16),
    N: Array.from({ length: 15 }, (_, i) => i + 31),
    G: Array.from({ length: 15 }, (_, i) => i + 46),
    O: Array.from({ length: 15 }, (_, i) => i + 61),
  };

  const renderCell = (num: number) => {
    const isDrawn = drawnNumbers.includes(num);
    return (
      <div
        key={num}
        className={`flex-shrink-0 h-4 w-4 sm:h-5 sm:w-5 flex items-center justify-center rounded text-[7px] sm:text-[8px] font-bold transition-all duration-200
          ${isDrawn
            ? "bg-green-500 text-black shadow-[0_0_3px_rgba(0,255,128,0.6)]"
            : "bg-gray-900 text-gray-300"
          }`}
      >
        {num}
      </div>
    );
  };

  return (
    <div className="mt-1 w-full overflow-x-auto px-1 py-1 backdrop-blur-sm bg-black/25 rounded-lg border border-green-400 shadow-[0_0_6px_rgba(0,255,128,0.3)]">
      <h2 className="text-xs sm:text-sm font-bold mb-1 text-center text-green-400 tracking-wide">
        BINGO Board
      </h2>
      <div className="flex gap-0.5 min-w-max">
        {Object.entries(columns).map(([col, nums]) => (
          <div key={col} className="flex flex-col gap-0.5 items-center">
            <div className="text-[8px] sm:text-[9px] font-bold text-green-300">{col}</div>
            {nums.map(renderCell)}
          </div>
        ))}
      </div>
    </div>
  );
};

export default BingoBoard;
