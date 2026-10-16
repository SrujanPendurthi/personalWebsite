"use client";

import { useEffect, useLayoutEffect, useRef, useState } from "react";
import { useFrame } from "@react-three/fiber";
import { Color, Group, InstancedMesh, Object3D } from "three";
import { pixelsToVoxels, type Voxel } from "@/lib/voxels";

const SIZE = 0.08;
const BASE_Y = 0.3 + 16 * SIZE;

const loadVoxels = (src: string): Promise<Voxel[]> =>
  new Promise((resolve, reject) => {
    const img = new Image();
    img.onload = () => {
      const canvas = document.createElement("canvas");
      canvas.width = img.width;
      canvas.height = img.height;
      const ctx = canvas.getContext("2d");
      if (!ctx) return reject(new Error("2d context unavailable"));
      ctx.drawImage(img, 0, 0);
      resolve(pixelsToVoxels(ctx.getImageData(0, 0, img.width, img.height).data, img.width, img.height));
    };
    img.onerror = reject;
    img.src = src;
  });

const VoxelFigure = ({ aura, reduced }: { aura: string; reduced: boolean }) => {
  const [voxels, setVoxels] = useState<Voxel[]>([]);
  const mesh = useRef<InstancedMesh>(null);
  const group = useRef<Group>(null);

  useEffect(() => {
    loadVoxels("/srujan.png").then(setVoxels, () => setVoxels([]));
  }, []);

  useLayoutEffect(() => {
    if (!mesh.current) return;
    const dummy = new Object3D();
    const color = new Color();
    voxels.forEach((v, i) => {
      dummy.position.set(v.x * SIZE, v.y * SIZE, 0);
      dummy.updateMatrix();
      mesh.current?.setMatrixAt(i, dummy.matrix);
      mesh.current?.setColorAt(i, color.set(v.color));
    });
    mesh.current.instanceMatrix.needsUpdate = true;
    if (mesh.current.instanceColor) mesh.current.instanceColor.needsUpdate = true;
  }, [voxels]);

  useFrame(({ clock }) => {
    if (reduced || !group.current) return;
    group.current.position.y = BASE_Y + Math.sin(clock.elapsedTime * 1.5) * 0.06;
  });

  return (
    <group ref={group} position={[0, BASE_Y, 0]}>
      {voxels.length > 0 && (
        <instancedMesh key={voxels.length} ref={mesh} args={[undefined, undefined, voxels.length]}>
          <boxGeometry args={[SIZE, SIZE, SIZE]} />
          <meshStandardMaterial />
        </instancedMesh>
      )}
      <mesh position={[0, 0, -0.2]}>
        <planeGeometry args={[3, 3]} />
        <meshBasicMaterial color={aura} transparent opacity={0.12} />
      </mesh>
    </group>
  );
};

export default VoxelFigure;
