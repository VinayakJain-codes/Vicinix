"use client";

import dynamic from "next/dynamic";

const DNACanvas = dynamic(() => import("./DNACanvas"), {
  ssr: false,
  loading: () => (
    <div className="w-full h-full flex items-center justify-center">
      <div className="w-8 h-8 rounded-full border-2 border-accent-orange border-t-transparent animate-spin" />
    </div>
  )
});

export default function DNACanvasWrapper() {
  return <DNACanvas />;
}
