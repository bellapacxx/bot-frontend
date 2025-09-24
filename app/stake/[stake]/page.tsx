// app/stake/[stake]/page.tsx (Server Component)
import React from "react";
import { WebSocketProvider } from "../../components/WebSocketProvider";
import LobbyScreen from "../../components/LobbyScreen";
import Header from "@/app/components/Header";

interface PageProps {
  params: { stake: string };
  searchParams?: { user?: string }; // optional query
}

export default function StakePage({ params, searchParams }: PageProps) {
  const stake = Number(params.stake);
  const telegramId = searchParams?.user || "guest";

  return (
   
    <WebSocketProvider stake={stake} telegramId={telegramId}>
       <Header telegramId={telegramId} />
      <LobbyScreen />
    </WebSocketProvider>
  );
}
