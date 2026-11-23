"use client";

import { useEffect, useMemo, useRef, useState, type ReactNode } from "react";
import { Canvas, useFrame, useThree, type ThreeEvent } from "@react-three/fiber";
import { Html, Line, RoundedBox } from "@react-three/drei";
import { Mesh, Plane, QuadraticBezierCurve3, Raycaster, Vector2, Vector3 } from "three";
import { constrainPosition, details, modules, venues, type Module, type Position, type Setup } from "./model";

interface SceneProps {
  setup: Setup;
  selected: Module;
  orderActive: boolean;
  stamps: number;
  paid: boolean;
  campaign: string;
  drop: { id: Module; x: number; y: number; sequence: number } | null;
  onDrop: (id: Module, position: Position) => void;
  onMove: (id: Module, position: Position) => void;
  onInspect: (id: Module) => void;
  onUnavailable: () => void;
  fallback: ReactNode;
}

const ground = new Plane(new Vector3(0, 1, 0), 0);

function Block({ position, size, color, rotation = [0, 0, 0] }: {
  position: [number, number, number]; size: [number, number, number]; color: string; rotation?: [number, number, number];
}) {
  return <RoundedBox position={position} args={size} radius={0.035} smoothness={2} rotation={rotation} castShadow receiveShadow>
    <meshStandardMaterial color={color} roughness={0.7} />
  </RoundedBox>;
}

function Plant({ position }: { position: [number, number, number] }) {
  return <group position={position}>
    <mesh position={[0, 0.2, 0]} castShadow><cylinderGeometry args={[0.17, 0.12, 0.4, 12]} /><meshStandardMaterial color="#c4a58c" /></mesh>
    <mesh position={[0, 0.65, 0]} castShadow><sphereGeometry args={[0.3, 10, 8]} /><meshStandardMaterial color="#628568" /></mesh>
    <mesh position={[0.13, 0.9, 0.03]} castShadow><sphereGeometry args={[0.2, 10, 8]} /><meshStandardMaterial color="#7d9b75" /></mesh>
  </group>;
}

function Shop({ setup }: { setup: Setup }) {
  const business = venues[setup.venue];
  if (setup.venue === "event") return <group>
    <Block position={[0, 0.18, -0.2]} size={[3.8, 0.35, 3.4]} color="#dfc5b4" />
    <Block position={[0, 1.2, -1.65]} size={[3.8, 2.1, 0.14]} color={business.color} />
    <Block position={[0, 1.3, -1.54]} size={[2.2, 1.2, 0.05]} color="#eacda8" />
    <Html center position={[0, 1.55, -1.42]} distanceFactor={13} style={{ pointerEvents: "none" }}><div className="pg-shop-sign">GATHER</div></Html>
    {[-1.5, 1.5].map(x => <group key={x}><Block position={[x, 0.9, -0.6]} size={[0.4, 1.2, 0.4]} color="#34403d" /><mesh position={[x, 0.95, -0.37]} rotation={[Math.PI / 2, 0, 0]}><cylinderGeometry args={[0.13, 0.13, 0.03, 16]} /><meshStandardMaterial color="#899486" /></mesh></group>)}
    {[-1, 0, 1].map(x => <group key={x}><mesh position={[x, 0.4, 1.9]}><cylinderGeometry args={[0.06, 0.1, 0.8, 12]} /><meshStandardMaterial color="#b99b77" /></mesh><mesh position={[x, 0.85, 1.9]}><sphereGeometry args={[0.12, 12, 8]} /><meshStandardMaterial color={business.color} /></mesh></group>)}
  </group>;
  if (["campus", "security", "business"].includes(setup.venue)) return <group position={[0, 0, -0.35]}>
    <Block position={[0, 0.1, 0]} size={[3.6, 0.2, 3.6]} color="#ddd6c8" />
    <Block position={[0, 1.1, -1.7]} size={[3.6, 2, 0.15]} color="#f5eedf" />
    <Block position={[-1.7, 0.65, 0]} size={[0.12, 1.2, 3.4]} color="#e7ddcd" />
    <Html center position={[0, 1.95, -1.6]} distanceFactor={13} style={{ pointerEvents: "none" }}><div className="pg-shop-sign" style={{ color: business.color }}>{business.shop}</div></Html>
    {[-0.8, 0.8].map(x => <group key={x} position={[x, 0, 0]}>
      <Block position={[0, 0.75, 0]} size={[1.25, 0.12, 1]} color="#cfb08a" />
      <Block position={[0, 0.38, 0]} size={[0.1, 0.7, 0.1]} color="#5f6659" />
      <Block position={[0, 1.1, -0.2]} size={[0.7, 0.5, 0.08]} color={business.color} />
      <Block position={[0, 1.1, -0.14]} size={[0.57, 0.37, 0.03]} color="#c0d1bf" />
      <Block position={[0, 0.4, 0.8]} size={[0.45, 0.1, 0.4]} color={business.color} />
    </group>)}
    <Plant position={[1.45, 0.15, -1.35]} />
  </group>;
  return <group position={[0, 0, -0.5]}>
    <Block position={[0, 0.08, 0]} size={[3.65, 0.16, 3.8]} color="#e0d5bf" />
    <Block position={[0, 1.05, -1.75]} size={[3.65, 2, 0.13]} color="#f8f3e8" />
    <Block position={[-1.75, 0.65, 0]} size={[0.12, 1.2, 3.5]} color="#f2e9d8" />
    <Block position={[0, 0.7, -0.95]} size={[2.75, 1.1, 0.7]} color={business.color} />
    <Block position={[0, 1.28, -0.95]} size={[2.9, 0.1, 0.85]} color="#e4c7a0" />
    <Block position={[-0.6, 1.52, -0.95]} size={[0.65, 0.4, 0.4]} color="#b5bdaf" />
    <Block position={[-0.6, 1.58, -0.7]} size={[0.5, 0.13, 0.05]} color="#343f39" />
    <Block position={[0.75, 1.41, -0.9]} size={[0.32, 0.18, 0.3]} color="#fbf9ef" />
    <Html center position={[0, 1.94, -1.65]} distanceFactor={13} style={{ pointerEvents: "none" }}>
      <div className="pg-shop-sign" style={{ color: business.color }}>{business.shop}</div>
    </Html>
    {[-0.8, 0.8].map(x => <group key={x} position={[x, 0, 0.7]}>
      <mesh position={[0, 0.65, 0]} castShadow receiveShadow><cylinderGeometry args={[0.44, 0.44, 0.09, 28]} /><meshStandardMaterial color="#e8c99e" /></mesh>
      <mesh position={[0, 0.33, 0]}><cylinderGeometry args={[0.05, 0.09, 0.62, 12]} /><meshStandardMaterial color="#585b4c" /></mesh>
      <mesh position={[0.1, 0.76, 0]} castShadow><cylinderGeometry args={[0.07, 0.05, 0.13, 12]} /><meshStandardMaterial color="#fbfbef" /></mesh>
      {[-0.6, 0.6].map(z => <group key={z} position={[0, 0, z]}>
        <Block position={[0, 0.38, 0]} size={[0.36, 0.08, 0.35]} color={business.color} />
        <Block position={[0, 0.58, z > 0 ? 0.15 : -0.15]} size={[0.36, 0.35, 0.06]} color={business.color} />
        <Block position={[0, 0.18, 0]} size={[0.09, 0.35, 0.09]} color="#bb9d7d" />
      </group>)}
    </group>)}
    <Plant position={[1.48, 0.14, -1.45]} />
    <Plant position={[-1.47, 0.14, 1.4]} />
    {setup.venue === "bakery" && [0.4, 0.7, 1].map(x => <mesh key={x} position={[x, 1.4, -1.1]} rotation={[0, 0, Math.PI / 2]}><capsuleGeometry args={[0.08, 0.12, 4, 8]} /><meshStandardMaterial color="#c88740" /></mesh>)}
    {setup.venue === "store" && <group><Block position={[0.6, 1.6, -1.6]} size={[1.3, 0.08, 0.3]} color="#bc9770" />{[0.3, 0.65, 1].map(x => <Block key={x} position={[x, 1.85, -1.6]} size={[0.22, 0.4, 0.2]} color={business.color} />)}</group>}
  </group>;
}

function ToolModel({ id, stamps, paid }: { id: Module; stamps: number; paid: boolean }) {
  const color = details[id].color;
  return <group>
    <Block position={[0, 0.14, 0]} size={[1.2, 0.24, 1.05]} color="#fcfaf4" />
    {id === "ordering" && <group rotation={[-0.2, 0, 0]}>
      <Block position={[0, 0.7, 0]} size={[0.67, 0.95, 0.1]} color={color} />
      <Block position={[0, 0.7, 0.06]} size={[0.52, 0.75, 0.035]} color="#fcfaf4" />
      {[-0.12, 0.12].flatMap(x => [-0.1, 0.15].map(y => <Block key={`${x}-${y}`} position={[x, 0.7 + y, 0.09]} size={[0.14, 0.14, 0.025]} color={color} />))}
    </group>}
    {id === "payments" && <group>
      <Block position={[0, 0.5, 0]} size={[0.7, 0.5, 0.5]} color={color} />
      <Block position={[0, 0.8, -0.08]} size={[0.68, 0.43, 0.09]} color="#3b433d" rotation={[-0.25, 0, 0]} />
      <Block position={[0, 0.82, -0.01]} size={[0.52, 0.27, 0.03]} color={paid ? "#72bd91" : "#d5cca8"} rotation={[-0.25, 0, 0]} />
      <Block position={[0.22, 0.6, 0.35]} size={[0.32, 0.06, 0.4]} color="#f6efdc" />
    </group>}
    {id === "loyalty" && <group>
      <Block position={[0, 0.65, 0]} size={[0.92, 0.65, 0.1]} color={color} rotation={[-0.18, 0, 0]} />
      {[-0.32, -0.16, 0, 0.16, 0.32].map((x, index) => <mesh key={x} position={[x, 0.65, 0.11]} rotation={[Math.PI / 2, 0, 0]}><cylinderGeometry args={[0.055, 0.055, 0.025, 16]} /><meshStandardMaterial color={index < stamps ? "#fff0cc" : "#a59ab9"} /></mesh>)}
    </group>}
    {id === "marketing" && <group>
      <Block position={[0, 0.75, 0]} size={[0.85, 1.1, 0.1]} color={color} />
      <Block position={[0, 0.85, 0.07]} size={[0.63, 0.54, 0.025]} color="#eed8bf" />
      <mesh position={[0, 0.85, 0.12]}><sphereGeometry args={[0.19, 16, 12]} /><meshStandardMaterial color={color} /></mesh>
      <Block position={[0, 0.4, 0.08]} size={[0.55, 0.05, 0.025]} color="#f8edda" />
    </group>}
    {["guard", "events", "tax", "erp", "college"].includes(id) && <group>
      <Block position={[0, 0.7, 0]} size={[0.92, 0.85, 0.16]} color={color} />
      <Block position={[0, 0.72, 0.1]} size={[0.74, 0.62, 0.04]} color="#fcf4df" />
      {id === "erp" ? <group><Block position={[-0.17, 0.7, 0.16]} size={[0.25, 0.24, 0.16]} color={color} /><Block position={[0.17, 0.7, 0.16]} size={[0.25, 0.24, 0.16]} color={color} /></group> : <group>
        <Block position={[-0.16, 0.78, 0.14]} size={[0.18, 0.25, 0.03]} color={color} />
        <Block position={[0.15, 0.83, 0.14]} size={[0.22, 0.05, 0.03]} color={color} />
        <Block position={[0.15, 0.69, 0.14]} size={[0.22, 0.05, 0.03]} color={color} />
      </group>}
      <Block position={[0, 0.33, 0]} size={[0.16, 0.2, 0.14]} color={color} />
    </group>}
  </group>;
}

function Tool({ id, position, selected, stamps, paid, campaign, onPreviewMove, onMove, onInspect }: {
  id: Module; position: Position; selected: boolean;
  stamps: number; paid: boolean; campaign: string;
  onPreviewMove: (id: Module, position: Position) => void;
  onMove: SceneProps["onMove"]; onInspect: SceneProps["onInspect"];
}) {
  const drag = useRef<{ start: Position; current: Position; screenX: number; screenY: number; moved: boolean } | null>(null);
  function release(event: ThreeEvent<PointerEvent>, cancelled = false) {
    if (!drag.current) return;
    event.stopPropagation();
    const current = drag.current;
    drag.current = null;
    (event.target as Element).releasePointerCapture(event.pointerId);
    onMove(id, cancelled ? current.start : current.current);
    if (!cancelled && !current.moved) onInspect(id);
  }
  return <group position={[position[0], 0.05, position[1]]}
    onPointerDown={event => {
      if (event.button !== 0) return;
      event.stopPropagation();
      drag.current = { start: position, current: position, screenX: event.clientX, screenY: event.clientY, moved: false };
      (event.target as Element).setPointerCapture(event.pointerId);
    }}
    onPointerMove={event => {
      if (!drag.current) return;
      event.stopPropagation();
      const point = event.ray.intersectPlane(ground, new Vector3());
      if (!point) return;
      if (Math.hypot(event.clientX - drag.current.screenX, event.clientY - drag.current.screenY) > 5) drag.current.moved = true;
      if (drag.current.moved) {
        const next = constrainPosition([point.x, point.z]);
        drag.current.current = next;
        onPreviewMove(id, next);
      }
    }}
    onPointerUp={event => release(event)} onPointerCancel={event => release(event, true)}
    onLostPointerCapture={() => { if (drag.current) { onMove(id, drag.current.start); drag.current = null; } }}>
    <ToolModel id={id} stamps={stamps} paid={paid} />
    <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, 0.02, 0]}><ringGeometry args={[0.72, selected ? 0.79 : 0.74, 40]} /><meshBasicMaterial color={details[id].color} transparent opacity={selected ? 0.9 : 0.3} /></mesh>
    <Html center position={[0, 1.5, 0]} zIndexRange={[10, 0]}>
      <button className={`pg-scene-label ${selected ? "selected" : ""}`} onClick={() => onInspect(id)}>{details[id].name}</button>
    </Html>
    {id === "marketing" && selected && <Html center position={[0, 2.2, 0]} zIndexRange={[8, 0]} style={{ pointerEvents: "none" }}><div className="pg-scene-campaign">{campaign}</div></Html>}
  </group>;
}

function Connection({ from, to, color }: { from: Position; to: Position; color: string }) {
  const packet = useRef<Mesh>(null);
  const curve = useMemo(() => new QuadraticBezierCurve3(
    new Vector3(from[0], 0.12, from[1]),
    new Vector3((from[0] + to[0]) / 2, 0.55, (from[1] + to[1]) / 2),
    new Vector3(to[0], 0.12, to[1]),
  ), [from, to]);
  useFrame(({ clock }) => {
    if (packet.current) packet.current.position.copy(curve.getPoint((clock.elapsedTime * 0.2) % 1));
  });
  return <group><Line points={curve.getPoints(24)} color={color} lineWidth={1.8} transparent opacity={0.6} /><mesh ref={packet}><sphereGeometry args={[0.065, 10, 8]} /><meshBasicMaterial color={color} /></mesh></group>;
}

function World(props: SceneProps) {
  const { camera, gl, size, invalidate } = useThree();
  const processedDrop = useRef<number | null>(null);
  const [preview, setPreview] = useState<{ id: Module; position: Position } | null>(null);
  useEffect(() => {
    const unavailable = () => props.onUnavailable();
    gl.domElement.addEventListener("webglcontextlost", unavailable);
    return () => gl.domElement.removeEventListener("webglcontextlost", unavailable);
  }, [gl, props.onUnavailable]);
  useEffect(() => {
    camera.zoom = Math.min(size.width / 11.8, size.height / 9.5, 58);
    camera.updateProjectionMatrix();
    invalidate();
  }, [camera, size.width, size.height, invalidate]);
  useEffect(() => {
    if (!props.drop || props.drop.sequence === processedDrop.current) return;
    processedDrop.current = props.drop.sequence;
    const rect = gl.domElement.getBoundingClientRect();
    const pointer = new Vector2((props.drop.x - rect.left) / rect.width * 2 - 1, -(props.drop.y - rect.top) / rect.height * 2 + 1);
    const raycaster = new Raycaster();
    raycaster.setFromCamera(pointer, camera);
    const point = raycaster.ray.intersectPlane(ground, new Vector3());
    if (point) props.onDrop(props.drop.id, constrainPosition([point.x, point.z]));
  }, [props.drop, camera, gl, props.onDrop]);
  const positions = preview ? { ...props.setup.positions, [preview.id]: preview.position } : props.setup.positions;
  const connected = modules.filter(id => props.setup.enabled.includes(id));
  return <>
    <ambientLight intensity={1.6} />
    <directionalLight position={[-4, 8, 4]} intensity={3} castShadow shadow-mapSize={[1024, 1024]} shadow-camera-left={-7} shadow-camera-right={7} shadow-camera-top={7} shadow-camera-bottom={-7} shadow-bias={-0.001} />
    <directionalLight position={[5, 3, -5]} intensity={1} color="#dae5f5" />
    <Block position={[0, -0.17, 0]} size={[10, 0.3, 7.8]} color="#e1e5dd" />
    <Block position={[0, -0.02, -0.25]} size={[9, 0.06, 6.9]} color="#eff0e7" />
    <Shop setup={props.setup} />
    {connected.map(id => {
      let source: Position = [0, 1.7];
      if (id === "payments" && connected.includes("ordering")) source = positions.ordering;
      if ((id === "loyalty" || id === "tax") && connected.includes("payments")) source = positions.payments;
      return <Connection key={id} from={source} to={positions[id]} color={details[id].color} />;
    })}
    {props.orderActive && <Html center position={[0, 0.4, 2.8]} zIndexRange={[8, 0]}><span className="pg-order-token">Sample order in your workflow</span></Html>}
    {connected.map(id => <Tool key={id} id={id} position={positions[id]} selected={props.selected === id} stamps={props.stamps} paid={props.paid} campaign={props.campaign}
      onPreviewMove={(tool, position) => setPreview({ id: tool, position })}
      onMove={(tool, position) => { setPreview(null); props.onMove(tool, position); }} onInspect={props.onInspect} />)}
  </>;
}

export default function Scene(props: SceneProps) {
  return <div className="pg-canvas" onContextMenu={event => event.preventDefault()}>
    <Canvas orthographic camera={{ position: [9, 9, 12], zoom: 49, near: 0.1, far: 100 }} dpr={[1, 1.5]} shadows
      gl={{ antialias: true, alpha: true, powerPreference: "low-power" }} fallback={props.fallback}>
      <World {...props} />
    </Canvas>
  </div>;
}
