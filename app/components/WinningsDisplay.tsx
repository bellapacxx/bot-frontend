"use client";
import React from "react";
import { useLobby } from "./WebSocketProvider";

const WinningsDisplay: React.FC = () => {
  const { potentialWinnings } = useLobby();

  return (
    <div className="bg-gradient-to-r from-green-500 to-green-400 text-center  mt-1 text-black px-4 py-1 font-bold rounded shadow-sm z-50">
      ደራሽ: {potentialWinnings?.toFixed(2)}
    </div>
  );
};

export default WinningsDisplay;
