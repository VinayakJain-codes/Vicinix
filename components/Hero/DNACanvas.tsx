"use client";

import { useEffect, useState } from "react";
import { Canvas } from "@react-three/fiber";
import { EffectComposer, Bloom } from "@react-three/postprocessing";
import DNAHelix from "./DNAHelix";

export default function DNACanvas() {
  const [shouldRender, setShouldRender] = useState(false);

  useEffect(() => {
    // Respect user's motion preferences
    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (!prefersReducedMotion) {
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setShouldRender(true);
    }
  }, []);

  if (!shouldRender) {
    return (
      <div className="w-full h-full flex items-center justify-center border border-border-subtle rounded-lg bg-bg-surface/30">
        <span className="text-text-muted font-mono text-xs">
          [ Animations Disabled ]
        </span>
      </div>
    );
  }

  return (
    <div className="w-full h-full absolute inset-0 z-0 cursor-none">
      <Canvas
        camera={{ position: [0, 0, 10], fov: 45 }}
        gl={{ antialias: true, alpha: true }}
        dpr={[1, 2]} // limit to 2 for performance
      >
        {/* Lights */}
        <ambientLight intensity={0.2} />
        
        {/* Directional light to give some specularity */}
        <directionalLight position={[10, 10, 10]} intensity={1.5} />
        <directionalLight position={[-10, -10, -10]} intensity={0.5} />
        
        {/* Ambient glow bloom behind helix */}
        <pointLight position={[0, 0, -2]} intensity={2} color="#f97316" distance={15} decay={2} />
        <pointLight position={[0, 2, -2]} intensity={2} color="#22c55e" distance={15} decay={2} />

        {/* The DNA double helix */}
        <DNAHelix />

        {/* Post-processing effects */}
        <EffectComposer>
          <Bloom 
            luminanceThreshold={0.2} 
            mipmapBlur 
            intensity={1.2} 
          />
        </EffectComposer>
      </Canvas>
    </div>
  );
}
