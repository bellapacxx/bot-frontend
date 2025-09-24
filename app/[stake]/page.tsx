"use client";

import React from "react";
import { WebSocketProvider } from "../components/WebSocketProvider";
import LobbyScreen from "../components/LobbyScreen";


interface PageProps { 
params: Promise<{ stake: string }>; 
searchParams: Promise<{ user?: string }>; 
}

export default function StakePage({ params, searchParams }: PageProps) {
const resolvedParams = React.use(params); 
const resolvedSearchParams = React.use(searchParams); 
const stake = Number(resolvedParams.stake); 
const telegramId = resolvedSearchParams.user || "guest";

  return (
    <WebSocketProvider stake={stake} telegramId={telegramId}>
      <LobbyScreen />
    </WebSocketProvider>
  );
}
