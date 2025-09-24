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
    <div className="px-3 py-2 rounded-lg shadow-md bg-black/20 border border-green-400 mb-3 max-w-xs mx-auto text-center">
      <h2 className="text-base sm:text-sm font-bold mb-1 text-green-300 tracking-wide">
        Lobby Status - <span className="text-white">{stake} ETB</span>
      </h2>

      <div className="flex items-center justify-center mb-1 gap-2">
        <span className={`w-2 h-2 rounded-full ${statusColor}`}></span>
        <span className="capitalize text-xs sm:text-sm font-semibold text-white">
          {status.replace("_", " ")}
        </span>
      </div>

      <p className="text-xs sm:text-sm text-gray-200">
        Countdown: <span className="font-bold">{countdown}s</span>
      </p>
    </div>
  );
};

export default LobbyStatus;
