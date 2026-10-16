import type { Metadata } from "next";
import { profile } from "@/lib/data";

export const metadata: Metadata = {
  title: "Resume",
  description: `Resume of ${profile.name}.`,
};

const RESUME = "/resume.pdf";

export default function Resume() {
  return (
    <div className="flex flex-col gap-8">
      <header className="flex flex-col gap-4">
        <h1 className="text-3xl uppercase sm:text-4xl">Resume</h1>
        <div className="flex flex-wrap gap-x-6 gap-y-2">
          <a href={RESUME} target="_blank" rel="noopener noreferrer" className="underline hover:text-muted">
            Open PDF
          </a>
          <a href={RESUME} download="Srujan-Pendurthi-Resume.pdf" className="underline hover:text-muted">
            Download
          </a>
        </div>
      </header>
      <object data={RESUME} type="application/pdf" aria-label={`${profile.name} resume`} className="h-[85svh] w-full bg-surface">
        <p className="p-6 text-muted">
          Your browser can&apos;t show PDFs inline.{" "}
          <a href={RESUME} className="underline">
            Open the resume
          </a>
          .
        </p>
      </object>
    </div>
  );
}
