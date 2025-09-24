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
    <div className="p-2 rounded-lg shadow-md bg-black/25 border border-green-400 max-w-xs w-full mx-auto text-center">
      {/* Lobby Title */}
      <h2 className="text-[0.65rem] font-bold mb-1 text-green-300 tracking-wide">
        Lobby Status - <span className="text-white">{stake} ETB</span>
      </h2>

      {/* Status Indicator */}
      <div className="flex items-center justify-center mb-1 gap-1">
        <span className={`w-2 h-2 rounded-full ${statusColor}`}></span>
        <span className="capitalize text-[0.6rem] font-semibold text-white">
          {status.replace("_", " ")}
        </span>
      </div>

      {/* Countdown */}
      <p className="text-[0.6rem] text-gray-200">
        Countdown: <span className="font-bold">{countdown}s</span>
      </p>
    </div>
  );
};

export default LobbyStatus;
