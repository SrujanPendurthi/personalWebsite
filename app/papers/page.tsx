import type { Metadata } from "next";
import { papers, profile } from "@/lib/data";
import PaperCard from "@/components/PaperCard";

export const metadata: Metadata = {
  title: "Papers",
  description: `Research papers authored by ${profile.name}.`,
};

export default function Papers() {
  return (
    <div className="flex flex-col gap-10">
      <header className="flex flex-col gap-3">
        <h1 className="text-lg sm:text-2xl">Papers</h1>
        <p className="max-w-prose leading-relaxed text-muted">Research I&apos;ve authored.</p>
      </header>
      <div className="flex flex-col gap-6">
        {papers.map((paper) => (
          <PaperCard key={paper.title} paper={paper} />
        ))}
      </div>
    </div>
  );
}
