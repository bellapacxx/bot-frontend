"use client";
import React from "react";
import { useLobby } from "./WebSocketProvider";
import CalledNumber from "./CalledNumber";
import CalledNumbersList from "./CalledNumbersList";
import BingoBoard from "./BingoBoard";
import PlayerCard from "./PlayerCard";
import WinnerCard from "./WinnerCard";
import WinningsDisplay from "./WinningsDisplay";

type Card = {
  card_id: number;
  B: (number | null)[];
  I: (number | null)[];
  N: (number | null)[];
  G: (number | null)[];
  O: (number | null)[];
};

interface BingoUIProps {
  numbers: number[];
  card: Card | null;
}

export default function BingoUI({ numbers, card }: BingoUIProps) {
  const { bingoWinner, numbersDrawn, bingoWinnerName } = useLobby();
  const cardsJSON = require("../data/cards.json");
  const winnerCard = cardsJSON.find(
    (c: Card) => c.card_id === bingoWinner?.card_id
  );
  const winnerNumbers = [...numbersDrawn];

  return (
    <div className="w-full sm:max-w-lg mx-auto px-2 py-2 space-y-4">
      {/* Current Called Number */}
      <CalledNumber numbers={numbers} />

      {/* List of Called Numbers */}
      <CalledNumbersList numbers={numbers} />

      {/* Horizontal container for board + player card */}
      <div className="flex gap-2 pb-3 w-full">
        {/* Bingo Board */}
        <div className="flex-1 min-w-0">
          <BingoBoard drawnNumbers={numbers} />
        </div>

        {/* Player Card + Winnings Display */}
        <div className="flex-1 min-w-0 relative">
          <WinningsDisplay />
          <PlayerCard card={card} />
        </div>
      </div>

      {/* Winner Popup */}
      {winnerCard && (
        <div className="fixed inset-0 bg-black bg-opacity-70 flex items-center justify-center z-50 p-4 overflow-auto backdrop-blur-sm">
          <div className="bg-black/80 p-4 rounded-2xl shadow-2xl text-center max-w-xs w-full border border-green-400">
            <h2 className="text-xl sm:text-2xl font-bold text-green-400 mb-3 animate-bounce">
              🎉 Bingo Winner! 🎉
            </h2>
            <p className="mb-3 text-sm sm:text-base">
              Player:{bingoWinnerName}
              <span className="font-semibold text-white">
                {bingoWinner?.telegramId}
              </span>
            </p>
            <WinnerCard
              card={winnerCard}
              numbersDrawn={winnerNumbers}
              bingoWinnerName={bingoWinnerName}
            />
          </div>
        </div>
      )}
    </div>
  );
}
