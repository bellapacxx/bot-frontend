"use client";

import { useLobby } from "./WebSocketProvider";

const LobbyStatus = () => {
  const { status, countdown, stake } = useLobby();

  const statusColor = {
    waiting: "bg-gray-500",
    countdown: "bg-yellow-500",
    in_progress: "bg-green-500",
  }[status] || "bg-gray-500";

  return (
    <div className="flex items-center justify-between px-2 py-1 rounded-lg shadow-md bg-black/25 border border-green-400 max-w-xs w-full mx-auto text-white text-[0.65rem]">
      {/* Lobby Title & Stake */}
      <div className="flex items-center gap-1">
        <span className="font-bold text-green-300">Lobby:</span>
        <span className="font-semibold">{stake} ETB</span>
      </div>

      {/* Status Indicator */}
      <div className="flex items-center gap-1">
        <span className={`w-2 h-2 rounded-full ${statusColor}`}></span>
        <span className="capitalize font-semibold">{status.replace("_", " ")}</span>
      </div>

      {/* Countdown */}
      <div className="flex items-center gap-1">
        <span>⏱</span>
        <span className="font-bold">{countdown}s</span>
      </div>
    </div>
  );
};

export default LobbyStatus;
