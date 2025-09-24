"use client";

import React, { Suspense } from "react";
import { useSearchParams } from "next/navigation";
import { WebSocketProvider } from "../components/WebSocketProvider";
import LobbyScreen from "../components/LobbyScreen";

interface PageProps {
  stake: number;
}

// ✅ Suspense wrapper for useSearchParams
function SearchParamsSuspense({ children }: { children: (user: string) => React.ReactNode }) {
  return (
    <Suspense fallback={<div>Loading…</div>}>
      <Inner />
    </Suspense>
  );

  function Inner() {
    const searchParams = useSearchParams();
    const telegramId = searchParams.get("user") || "guest";
    return <>{children(telegramId)}</>;
  }
}

// ✅ Main page component
export default function StakePageClient({ stake }: PageProps) {
  return (
    <SearchParamsSuspense>
      {(telegramId) => (
        <WebSocketProvider stake={stake} telegramId={telegramId}>
          <LobbyScreen />
        </WebSocketProvider>
      )}
    </SearchParamsSuspense>
  );
}
