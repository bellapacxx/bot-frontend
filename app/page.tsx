// app/page.tsx
"use client";

import { useEffect, useState } from "react";

type Lobby = {
  stake: number;
  status: string;
  countdown: number;
  numbersDrawn: string[];
};

export default function HomePage() {
  const [lobbies, setLobbies] = useState<Lobby[]>([]);

  useEffect(() => {
    // TODO: Connect to WebSocket or API to fetch real-time lobby data
    setLobbies([
      { stake: 10, status: "waiting", countdown: 30, numbersDrawn: [] },
      { stake: 20, status: "countdown", countdown: 15, numbersDrawn: [] },
      { stake: 50, status: "in_progress", countdown: 0, numbersDrawn: ["B1","I20"] },
    ]);
  }, []);

  return (
    <section className="px-6 py-10">
      {/* Hero */}
      <div className="text-center mb-16">
        <h2 className="text-5xl font-bold text-mint-400">🎉 Welcome to Bingo Lobby</h2>
        <p className="text-gray-300 mt-4 text-lg">
          Join a lobby, select your stake, and play bingo in real-time!
        </p>
      </div>

      {/* Lobbies */}
      <div id="lobbies" className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
        {lobbies.map((lobby) => (
          <div key={lobby.stake} className="bg-gray-800 rounded-lg p-4 shadow-lg">
            <h3 className="text-xl font-bold mb-2">Stake: {lobby.stake} ETB</h3>
            <p>Status: {lobby.status}</p>
            {lobby.status !== "waiting" && <p>Countdown: {lobby.countdown}s</p>}
            {lobby.numbersDrawn.length > 0 && (
              <p>Numbers Drawn: {lobby.numbersDrawn.join(", ")}</p>
            )}
            <button className="mt-4 w-full bg-mint-500 hover:bg-mint-600 py-2 rounded-lg font-semibold">
              Join Lobby
            </button>
          </div>
        ))}
      </div>

      {/* How to Play */}
      <div id="how-to-play" className="mt-20">
        <h3 className="text-3xl font-bold text-mint-400 mb-4">How to Play</h3>
        <ol className="list-decimal list-inside text-gray-300 space-y-2">
          <li>Choose your stake and join a lobby.</li>
          <li>Select your bingo card/ticket.</li>
          <li>Wait for the countdown to finish.</li>
          <li>Watch numbers being drawn in real-time.</li>
          <li>Mark your card and claim your prize if you win!</li>
        </ol>
      </div>
    </section>
  );
}
