import React, { Suspense } from "react";
import StakePageClient from "./StakePageClient";

interface PageProps {
  params: { stake: string }; // /10 → params.stake = "10"
}

export default function StakePage({ params }: PageProps) {
  const stake = Number(params.stake); // convert "10" → 10

  return (
    <Suspense fallback={<div>Loading lobby…</div>}>
      <StakePageClient stake={stake} />
    </Suspense>
  );
}
