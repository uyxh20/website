"use client";

import { useState } from "react";

export function PortfolioFrame() {
  const [status, setStatus] = useState<"loading" | "ready">("loading");

  return (
    <div className="relative min-h-0 flex-1 bg-[#f5f2ea]">
      {status === "loading" ? (
        <div
          className="absolute inset-0 z-10 flex items-center justify-center px-6 text-sm text-muted-foreground"
          role="status"
        >
          Loading the interactive portfolio…
        </div>
      ) : null}
      <iframe
        className="block h-[calc(100dvh-3.5rem)] w-full border-0"
        title="Ulysse AI product and transformation portfolio"
        src="/portfolio.html"
        onLoad={() => setStatus("ready")}
      />
    </div>
  );
}
