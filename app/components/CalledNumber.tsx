"use client";
import React from "react";

interface CalledNumberProps {
  numbers: number[];
}

const CalledNumber: React.FC<CalledNumberProps> = ({ numbers }) => {
  if (!numbers || numbers.length === 0) return null;

  const latest = numbers[numbers.length - 1];
  const letter =
    latest <= 15
      ? "B"
      : latest <= 30
      ? "I"
      : latest <= 45
      ? "N"
      : latest <= 60
      ? "G"
      : "O";

  return (
    <div className="text-3xl sm:text-4xl font-bold text-center px-4 py-2 rounded-lg bg-gradient-to-r from-yellow-400 to-yellow-300 text-black shadow-[0_0_15px_rgba(255,255,0,0.7)] animate-pulse mx-auto w-fit min-w-[80px]">
      {letter}{latest}
    </div>
  );
};

export default CalledNumber;
