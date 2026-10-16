"use client";

import { useRef, useState } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Html, OrbitControls } from "@react-three/drei";
import type { Group, MeshStandardMaterial } from "three";
import { elementColor, getElement, type Element } from "@/lib/elements";
import VoxelFigure from "./VoxelFigure";
import type { HeroRepo } from "./Hero3D";

type SceneProps = {
  element: Element;
  onCycle: () => void;
  repos: HeroRepo[];
  reduced: boolean;
};

const setCursor = (pointer: boolean) => {
  document.body.style.cursor = pointer ? "pointer" : "auto";
};

const Portal = ({ color, onCycle, reduced }: { color: string; onCycle: () => void; reduced: boolean }) => {
  const ring = useRef<MeshStandardMaterial>(null);

  useFrame(({ clock }) => {
    if (reduced || !ring.current) return;
    ring.current.emissiveIntensity = 1.2 + Math.sin(clock.elapsedTime * 2) * 0.6;
  });

  return (
    <group
      onClick={(e) => {
        e.stopPropagation();
        onCycle();
      }}
      onPointerOver={() => setCursor(true)}
      onPointerOut={() => setCursor(false)}
    >
      <mesh position={[0, 0, 0]}>
        <cylinderGeometry args={[1.6, 1.8, 0.3, 8]} />
        <meshStandardMaterial color="#2a2d3e" flatShading />
      </mesh>
      <mesh position={[0, 0.16, 0]} rotation={[-Math.PI / 2, 0, 0]}>
        <torusGeometry args={[1.25, 0.08, 8, 8]} />
        <meshStandardMaterial ref={ring} color={color} emissive={color} emissiveIntensity={1.2} />
      </mesh>
      <mesh position={[0, 0.16, 0]} rotation={[-Math.PI / 2, 0, 0]}>
        <circleGeometry args={[1.15, 8]} />
        <meshBasicMaterial color={color} transparent opacity={0.25} />
      </mesh>
    </group>
  );
};

const Crystal = ({ repo, angle }: { repo: HeroRepo; angle: number }) => {
  const [hovered, setHovered] = useState(false);
  const { color } = getElement(repo.language);

  return (
    <mesh
      position={[Math.cos(angle) * 2.4, 1.6, Math.sin(angle) * 2.4]}
      scale={hovered ? 1.25 : 1}
      onClick={(e) => {
        e.stopPropagation();
        window.open(repo.url, "_blank", "noopener");
      }}
      onPointerOver={(e) => {
        e.stopPropagation();
        setHovered(true);
        setCursor(true);
      }}
      onPointerOut={() => {
        setHovered(false);
        setCursor(false);
      }}
    >
      <octahedronGeometry args={[0.28, 0]} />
      <meshStandardMaterial color={color} emissive={color} emissiveIntensity={hovered ? 0.9 : 0.4} flatShading />
      {hovered && (
        <Html center position={[0, 0.55, 0]} className="pointer-events-none">
          <span className="whitespace-nowrap bg-background px-2 py-1 font-mono text-xs text-foreground pixel-frame">
            {repo.name}
          </span>
        </Html>
      )}
    </mesh>
  );
};

const RepoCrystals = ({ repos, reduced }: { repos: HeroRepo[]; reduced: boolean }) => {
  const group = useRef<Group>(null);

  useFrame((_, delta) => {
    if (reduced || !group.current) return;
    group.current.rotation.y += delta * 0.15;
  });

  return (
    <group ref={group}>
      {repos.map((repo, i) => (
        <Crystal key={repo.url} repo={repo} angle={(i / repos.length) * Math.PI * 2} />
      ))}
    </group>
  );
};

const HeroScene = ({ element, onCycle, repos, reduced }: SceneProps) => {
  const color = elementColor(element);

  return (
    <Canvas dpr={[1, 1.5]} frameloop={reduced ? "demand" : "always"} camera={{ position: [0, 2.4, 6], fov: 45 }}>
      <ambientLight intensity={0.6} />
      <directionalLight position={[3, 5, 4]} intensity={1.4} />
      <pointLight position={[0, 0.6, 0]} color={color} intensity={6} distance={4} />
      <Portal color={color} onCycle={onCycle} reduced={reduced} />
      <VoxelFigure aura={color} reduced={reduced} />
      <RepoCrystals repos={repos} reduced={reduced} />
      <OrbitControls
        enableZoom={false}
        enablePan={false}
        target={[0, 1.2, 0]}
        minPolarAngle={Math.PI / 4}
        maxPolarAngle={Math.PI / 2}
      />
    </Canvas>
  );
};

export default HeroScene;
