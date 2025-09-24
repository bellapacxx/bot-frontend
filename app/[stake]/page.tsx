import React, { Suspense } from "react";
import StakePageClient from "./StakePageClient";

interface PageProps {
  params: Promise<{ stake: string }>; // mark as Promise
}

export default async function StakePage({ params }: PageProps) {
  const resolvedParams = await params; // ✅ await params
  const stake = Number(resolvedParams.stake);

  return (
    <Suspense fallback={<div>Loading lobby…</div>}>
      <StakePageClient stake={stake} />
    </Suspense>
  );
}
