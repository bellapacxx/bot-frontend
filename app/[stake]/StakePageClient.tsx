"use client";

import React, { Suspense } from "react";
import { useSearchParams } from "next/navigation";
import { WebSocketProvider } from "../components/WebSocketProvider";
import LobbyScreen from "../components/LobbyScreen";

function SearchBarFallback() {
  return <>Loading…</>;
}

interface PageProps {
  stake: number;
}

function SearchParamsContent({ stake }: { stake: number }) {
  const searchParams = useSearchParams();
  const telegramId = searchParams.get("user") || "guest"; // from ?user=7762372471

  return (
    <WebSocketProvider stake={stake} telegramId={telegramId}>
      <LobbyScreen />
    </WebSocketProvider>
  );
}

export default function StakePageClient({ stake }: PageProps) {
  return (
    <Suspense fallback={<SearchBarFallback />}>
      <SearchParamsContent stake={stake} />
    </Suspense>
  );
}
