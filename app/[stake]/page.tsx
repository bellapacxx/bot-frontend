"use client";

import React from "react";
import { useSearchParams } from "next/navigation";
import { WebSocketProvider } from "../components/WebSocketProvider";
import LobbyScreen from "../components/LobbyScreen";

interface PageProps {
  params: { stake: string };
}

export default function StakePage({ params }: PageProps) {
  const searchParams = useSearchParams(); // client-side hook
  const stake = Number(params.stake);
  const telegramId = searchParams.get("user") || "guest";

  return (
    <WebSocketProvider stake={stake} telegramId={telegramId}>
      <LobbyScreen />
    </WebSocketProvider>
  );
}
