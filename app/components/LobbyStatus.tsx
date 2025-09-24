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
    <div className="p-3 rounded-xl shadow-lg bg-black/25 border border-green-400 max-w-xs w-full mx-auto text-center">
      {/* Lobby Title */}
      <h2 className="text-sm font-bold mb-2 text-green-300 tracking-wide">
        Lobby Status - <span className="text-white">{stake} ETB</span>
      </h2>

      {/* Status Indicator */}
      <div className="flex items-center justify-center mb-1 gap-2">
        <span className={`w-3 h-3 rounded-full ${statusColor}`}></span>
        <span className="capitalize text-xs font-semibold text-white">
          {status.replace("_", " ")}
        </span>
      </div>

      {/* Countdown */}
      <p className="text-xs text-gray-200">
        Countdown: <span className="font-bold">{countdown}s</span>
      </p>
    </div>
  );
};

export default LobbyStatus;
