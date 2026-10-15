import { FileText, ExternalLink } from "lucide-react";
import type { Paper } from "@/lib/data";

const PaperCard = ({ paper }: { paper: Paper }) => (
  <article className="pixel-frame flex flex-col gap-3 bg-surface p-5">
    <h3 className="text-xs text-foreground">{paper.title}</h3>
    <p className="font-mono text-xs text-muted">
      {paper.authors.join(", ")} · {paper.venue} · {paper.year}
    </p>
    <p className="text-sm leading-relaxed text-muted">{paper.summary}</p>
    {(paper.pdf || paper.url) && (
      <div className="flex gap-4 text-sm">
        {paper.pdf && (
          <a href={paper.pdf} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1.5 hover:underline">
            <FileText size={14} /> PDF
          </a>
        )}
        {paper.url && (
          <a href={paper.url} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1.5 hover:underline">
            <ExternalLink size={14} /> Link
          </a>
        )}
      </div>
    )}
  </article>
);

export default PaperCard;
