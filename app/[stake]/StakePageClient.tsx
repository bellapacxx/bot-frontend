"use client";

import React, { Suspense } from "react";
import { useSearchParams } from "next/navigation";
import { WebSocketProvider } from "../components/WebSocketProvider";
import LobbyScreen from "../components/LobbyScreen";

interface PageProps {
  stake: number;
}

// ✅ Inner client component that uses the hook
function SearchParamsWrapper({ stake }: { stake: number }) {
  const searchParams = useSearchParams();
  const telegramId = searchParams.get("user") || "guest";

  return (
    <WebSocketProvider stake={stake} telegramId={telegramId}>
      <LobbyScreen />
    </WebSocketProvider>
  );
}

// ✅ Outer client component that wraps the hook usage in Suspense
export default function StakePageClient({ stake }: PageProps) {
  return (
    <Suspense fallback={<div>Loading lobby…</div>}>
      <SearchParamsWrapper stake={stake} />
    </Suspense>
  );
}
