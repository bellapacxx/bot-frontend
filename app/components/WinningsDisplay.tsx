"use client";
import React from "react";
import { useLobby } from "./WebSocketProvider";

const WinningsDisplay: React.FC = () => {
  const { potentialWinnings} = useLobby();

  

  return (
    <div className="bg-green-600 text-white px-4 py-1 rounded-lg shadow-lg z-50">
    ደራሽ: {potentialWinnings?.toFixed(2)}
    </div>
  );
};

export default WinningsDisplay;
