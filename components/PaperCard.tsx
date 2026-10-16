import { FileText, ExternalLink } from "lucide-react";
import type { Paper } from "@/lib/data";

const PaperCard = ({ paper }: { paper: Paper }) => (
  <article className="flex flex-col gap-2">
    <h3 className="text-lg">{paper.title}</h3>
    <p className="text-sm text-muted">
      {paper.authors.join(", ")} · {paper.venue} · {paper.year}
    </p>
    <p className="leading-relaxed text-muted">{paper.summary}</p>
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
