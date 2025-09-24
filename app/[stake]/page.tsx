// app/stake/[stake]/page.tsx (server component)
import React, { Suspense } from "react";
import StakePageClient from "./StakePageClient";

interface PageProps {
  params: { stake: string };
}

export default function StakePage({ params }: PageProps) {
  const stake = Number(params.stake);

  return (
    <Suspense fallback={<div>Loading lobby...</div>}>
      <StakePageClient stake={stake} />
    </Suspense>
  );
}
