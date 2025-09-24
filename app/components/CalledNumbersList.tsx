"use client";
import React from "react";

interface CalledNumbersListProps {
  numbers: number[];
}

const CalledNumbersList: React.FC<CalledNumbersListProps> = ({ numbers }) => {
  if (!numbers || numbers.length === 0) return null;
  const lastFive = numbers.slice(-5);

  const formatNumber = (num: number) =>
    num <= 15 ? `B${num}` : num <= 30 ? `I${num}` : num <= 45 ? `N${num}` : num <= 60 ? `G${num}` : `O${num}`;

  return (
    <div className="flex gap-1 mt-2 overflow-x-auto px-1 py-0.5">
      {lastFive.map((num, idx) => (
        <span
          key={idx}
          className="px-2 py-0.5 bg-gradient-to-r from-green-500 to-green-400 text-black font-bold rounded shadow-sm text-xs sm:text-sm hover:scale-105 transition-transform"
        >
          {formatNumber(num)}
        </span>
      ))}
    </div>
  );
};

export default CalledNumbersList;
