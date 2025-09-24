"use client";

import React from "react";
import { useSearchParams } from "next/navigation";
import { WebSocketProvider } from "../components/WebSocketProvider";
import LobbyScreen from "../components/LobbyScreen";

interface PageProps {
  stake: number;
}

export default function StakePageClient({ stake }: PageProps) {
  const searchParams = useSearchParams();
  const telegramId = searchParams.get("user") || "guest";

  return (
    <WebSocketProvider stake={stake} telegramId={telegramId}>
      <LobbyScreen />
    </WebSocketProvider>
  );
}
