"use client";

import { useRef, useState } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";
import { useScrollStore } from "@/lib/store";

export default function DNAHelix() {
  const groupRef = useRef<THREE.Group>(null);
  
  // Helix parameters
  const count = 40;
  const radius = 2.5;
  const height = 15;
  const turns = 3;

  // Pre-calculate positions and explosion vectors
  const [particles] = useState(() => {
    const temp = [];
    for (let i = 0; i < count; i++) {
      const t = i / count;
      const y = (t - 0.5) * height;
      const angle = t * Math.PI * 2 * turns;
      
      const x1 = Math.cos(angle) * radius;
      const z1 = Math.sin(angle) * radius;
      
      const x2 = Math.cos(angle + Math.PI) * radius;
      const z2 = Math.sin(angle + Math.PI) * radius;

      // Generate random outward trajectory for the explosion
      const explosionVec1 = new THREE.Vector3(
        (Math.random() - 0.5) * 40,
        (Math.random() - 0.5) * 40,
        (Math.random() - 0.5) * 40 + 10 // bias towards camera
      );
      
      const explosionVec2 = new THREE.Vector3(
        (Math.random() - 0.5) * 40,
        (Math.random() - 0.5) * 40,
        (Math.random() - 0.5) * 40 + 10
      );

      temp.push({ 
        x1, y, z1, 
        x2, z2, 
        angle,
        vec1: explosionVec1,
        vec2: explosionVec2
      });
    }
    return temp;
  });

  // Refs for the instanced meshes or groups of particles
  const leftStrandRef = useRef<THREE.Group>(null);
  const rightStrandRef = useRef<THREE.Group>(null);
  const rodsRef = useRef<THREE.Group>(null);

  // Target rotation for mouse parallax
  const targetRotation = useRef({ x: 0, y: 0 });

  useFrame((state) => {
    if (!groupRef.current || !leftStrandRef.current || !rightStrandRef.current || !rodsRef.current) return;

    // Get exact scroll progress mapped from GSAP
    const progress = useScrollStore.getState().heroScrollProgress;

    // --- WebGL Panning (Replaces HTML width animation) ---
    // The canvas is now 100% width. We want the DNA to start centered in the right 50% of the screen.
    // The center of the right 50% is exactly at x = viewport.width / 4.
    const startX = state.viewport.width / 4;
    
    // We want to pan it to the center (x = 0) as scroll progress goes from 0 to 0.5.
    const panProgress = Math.max(0, Math.min(1, progress * 2));
    const easedPan = 1 - Math.pow(1 - panProgress, 2); // easeOutQuad
    
    groupRef.current.position.x = startX * (1 - easedPan);
    // -----------------------------------------------------

    // Continuous slow rotation on Y axis
    const baseRotation = state.clock.elapsedTime * 0.15;

    // Mouse parallax
    targetRotation.current.x = (state.pointer.y * Math.PI) / 36;
    targetRotation.current.y = (state.pointer.x * Math.PI) / 36;

    groupRef.current.rotation.x = THREE.MathUtils.lerp(groupRef.current.rotation.x, targetRotation.current.x, 0.1);
    groupRef.current.rotation.y = baseRotation + THREE.MathUtils.lerp(
      groupRef.current.rotation.y - baseRotation, 
      targetRotation.current.y, 
      0.1
    );

    // SCROLL ANIMATIONS
    
    // 1. Scale Up (0 -> 0.5)
    // Scale goes from 1x to 2.5x
    const scaleProgress = Math.max(0, Math.min(1, progress * 2));
    const targetScale = 1 + (scaleProgress * 1.5);
    groupRef.current.scale.setScalar(targetScale);

    // 2. Explosion (0.5 -> 1.0)
    const explosionProgress = Math.max(0, Math.min(1, (progress - 0.5) * 2));
    // Easing the explosion
    const easedExplosion = 1 - Math.pow(1 - explosionProgress, 3); // easeOutCubic

    // Hide rods during explosion
    rodsRef.current.visible = explosionProgress === 0;

    // Move particles based on explosion progress
    leftStrandRef.current.children.forEach((mesh, i) => {
      const p = particles[i];
      mesh.position.set(
        p.x1 + (p.vec1.x * easedExplosion),
        p.y + (p.vec1.y * easedExplosion),
        p.z1 + (p.vec1.z * easedExplosion)
      );
    });

    rightStrandRef.current.children.forEach((mesh, i) => {
      const p = particles[i];
      mesh.position.set(
        p.x2 + (p.vec2.x * easedExplosion),
        p.y + (p.vec2.y * easedExplosion),
        p.z2 + (p.vec2.z * easedExplosion)
      );
    });
  });

  return (
    <group ref={groupRef}>
      {/* Left Strand */}
      <group ref={leftStrandRef}>
        {particles.map((p, i) => (
          <mesh key={`left-${i}`} position={[p.x1, p.y, p.z1]}>
            <sphereGeometry args={[0.15, 16, 16]} />
            <meshStandardMaterial 
              color="#f97316" 
              emissive="#f97316"
              emissiveIntensity={0.5}
              roughness={0.2}
              metalness={0.8}
            />
          </mesh>
        ))}
      </group>

      {/* Right Strand */}
      <group ref={rightStrandRef}>
        {particles.map((p, i) => (
          <mesh key={`right-${i}`} position={[p.x2, p.y, p.z2]}>
            <sphereGeometry args={[0.15, 16, 16]} />
            <meshStandardMaterial 
              color="#22c55e" 
              emissive="#22c55e"
              emissiveIntensity={0.5}
              roughness={0.2}
              metalness={0.8}
            />
          </mesh>
        ))}
      </group>

      {/* Connecting Rods */}
      <group ref={rodsRef}>
        {particles.map((p, i) => (
          <mesh key={`rod-${i}`} position={[0, p.y, 0]} rotation={[0, -p.angle, Math.PI / 2]}>
            <cylinderGeometry args={[0.03, 0.03, radius * 2, 8]} />
            <meshStandardMaterial 
              color="#6b7280" 
              transparent 
              opacity={0.3}
              roughness={0.5}
              metalness={0.5}
            />
          </mesh>
        ))}
      </group>
    </group>
  );
}
