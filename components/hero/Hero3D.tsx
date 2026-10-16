"use client";

import dynamic from "next/dynamic";
import Image from "next/image";
import { useState, useSyncExternalStore } from "react";
import { ELEMENTS, type Element } from "@/lib/elements";

export type HeroRepo = { name: string; url: string; language: string | null };

const Fallback = () => (
  <div className="flex h-full items-center justify-center">
    <Image
      src="/srujan.png"
      alt="Srujan Pendurthi pixel avatar"
      width={128}
      height={128}
      priority
      className="pixel-frame bg-surface [image-rendering:pixelated]"
    />
  </div>
);

const HeroScene = dynamic(() => import("./HeroScene"), { ssr: false, loading: Fallback });

const noopSubscribe = () => () => {};

let webglCache: boolean | undefined;
const hasWebGL = () => {
  if (webglCache === undefined) {
    const canvas = document.createElement("canvas");
    webglCache = Boolean(canvas.getContext("webgl2") ?? canvas.getContext("webgl"));
  }
  return webglCache;
};

const REDUCED_QUERY = "(prefers-reduced-motion: reduce)";
const subscribeReduced = (cb: () => void) => {
  const mq = window.matchMedia(REDUCED_QUERY);
  mq.addEventListener("change", cb);
  return () => mq.removeEventListener("change", cb);
};

const Hero3D = ({ repos }: { repos: HeroRepo[] }) => {
  const [element, setElement] = useState<Element>("Magic");
  const webgl = useSyncExternalStore(noopSubscribe, hasWebGL, () => false);
  const reduced = useSyncExternalStore(subscribeReduced, () => window.matchMedia(REDUCED_QUERY).matches, () => true);

  const cycle = () => setElement((e) => ELEMENTS[(ELEMENTS.indexOf(e) + 1) % ELEMENTS.length]);

  return (
    <div className="flex flex-col items-center gap-4">
      <div
        role="img"
        aria-label={`Portal of Power: voxel Srujan on a ${element} element portal, surrounded by crystals for top repositories`}
        className="pixel-frame h-80 w-full bg-surface"
      >
        {webgl ? <HeroScene element={element} onCycle={cycle} repos={repos} reduced={reduced} /> : <Fallback />}
      </div>
      {webgl && (
        <button type="button" onClick={cycle} className="pixel-btn px-3 py-1.5 font-mono text-xs">
          Element: {element} ▸
        </button>
      )}
      <ul className="sr-only">
        {repos.map((repo) => (
          <li key={repo.url}>
            <a href={repo.url} target="_blank" rel="noopener noreferrer">
              {repo.name}
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Hero3D;
