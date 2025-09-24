"use client";
import React from "react";
import { useLobby } from "./WebSocketProvider";
import CalledNumber from "./CalledNumber";
import CalledNumbersList from "./CalledNumbersList";
import BingoBoard from "./BingoBoard";
import PlayerCard from "./PlayerCard";
import WinnerCard from "./WinnerCard";

type Card = { 
  card_id: number; 
  B: (number | null)[]; 
  I: (number | null)[]; 
  N: (number | null)[]; 
  G: (number | null)[]; 
  O: (number | null)[] 
};

interface BingoUIProps { 
  numbers: number[]; 
  card: Card | null; 
}

export default function BingoUI({ numbers, card }: BingoUIProps) {
  const { bingoWinner, numbersDrawn } = useLobby();
  const cardsJSON = require("../data/cards.json");
  const winnerCard = cardsJSON.find((c: Card) => c.card_id === bingoWinner?.card_id);
  const winnerNumbers = [...numbersDrawn];

  return (
    <div className="space-y-3 px-2 pb-6 max-w-md mx-auto">
      {/* Current Called Number */}
      <CalledNumber numbers={numbers} />

      {/* List of Called Numbers */}
      <CalledNumbersList numbers={numbers} />

      {/* Horizontal scroll container for board + player card */}
      <div className="flex gap-2 overflow-x-auto pb-2">
        <div className="flex-shrink-0">
          <BingoBoard drawnNumbers={numbers} />
        </div>
        <div className="flex-shrink-0">
          <PlayerCard card={card} />
        </div>
      </div>

      {/* Winner Popup */}
      {winnerCard && (
        <div className="fixed inset-0 bg-black bg-opacity-70 flex items-center justify-center z-50 p-2 overflow-auto backdrop-blur-sm">
          <div className="bg-black/70 p-3 rounded-2xl shadow-2xl text-center max-w-xs w-full border border-green-400">
            <h2 className="text-lg font-bold text-green-400 mb-2 animate-bounce">🎉 Bingo Winner! 🎉</h2>
            <p className="mb-2 text-xs sm:text-sm">Player ID: <span className="font-semibold text-white">{bingoWinner?.telegramId}</span></p>
            <WinnerCard card={winnerCard} numbersDrawn={winnerNumbers} />
          </div>
        </div>
      )}
    </div>
  );
}
