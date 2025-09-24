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
    <div className="space-y-4 px-2 pb-8">
      <CalledNumber numbers={numbers} />
      <CalledNumbersList numbers={numbers} />

      {/* Flex container for board + player card */}
      <div className="flex flex-col lg:flex-row gap-6 justify-center items-start">
        <BingoBoard drawnNumbers={numbers} />
        <PlayerCard card={card} />
      </div>

      {winnerCard && (
        <div className="fixed inset-0 bg-black bg-opacity-70 flex items-center justify-center z-50 p-2 overflow-auto backdrop-blur-sm">
          <div className="bg-black/70 p-4 sm:p-6 rounded-2xl shadow-2xl text-center max-w-xs w-full border border-green-400">
            <h2 className="text-xl sm:text-2xl font-bold text-green-400 mb-2 animate-bounce">🎉 Bingo Winner! 🎉</h2>
            <p className="mb-2 text-sm sm:text-base">Player ID: <span className="font-semibold text-white">{bingoWinner?.telegramId}</span></p>
            <WinnerCard card={winnerCard} numbersDrawn={winnerNumbers} />
          </div>
        </div>
      )}
    </div>
  );
}
