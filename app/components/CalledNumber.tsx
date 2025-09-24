"use client";
import React from "react";

interface CalledNumberProps {
  numbers: number[];
}

const CalledNumber: React.FC<CalledNumberProps> = ({ numbers }) => {
  if (!numbers || numbers.length === 0) return null;
  const latest = numbers[numbers.length - 1];
  const letter = latest <= 15 ? "B" : latest <= 30 ? "I" : latest <= 45 ? "N" : latest <= 60 ? "G" : "O";

  return (
    <div className="text-4xl sm:text-5xl font-bold text-center p-3 rounded-lg bg-gradient-to-r from-yellow-400 to-yellow-300 text-black shadow-[0_0_20px_rgba(255,255,0,0.7)] animate-pulse mx-auto w-fit">
      {letter}{latest}
    </div>
  );
};

export default CalledNumber;
