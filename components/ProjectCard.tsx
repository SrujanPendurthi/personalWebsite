import { Star, GitFork } from "lucide-react";
import type { Repo } from "@/lib/github";
import ElementBadge from "./ElementBadge";
import PixelCover from "./PixelCover";

const ProjectCard = ({ repo }: { repo: Repo }) => (
  <article className="flex gap-5">
    <PixelCover seed={repo.name} language={repo.language} className="w-24 shrink-0 self-start sm:w-32" />
    <div className="flex min-w-0 flex-col gap-1.5">
      <h3 className="break-words text-lg">
        <a href={repo.html_url} target="_blank" rel="noopener noreferrer" className="hover:underline">
          {repo.name}
        </a>
        {repo.homepage && (
          <a href={repo.homepage} target="_blank" rel="noopener noreferrer" className="ml-3 text-sm text-muted underline">
            live
          </a>
        )}
      </h3>
      {repo.description && <p className="leading-relaxed text-muted">{repo.description}</p>}
      <div className="flex flex-wrap items-center gap-x-4 gap-y-1 text-sm text-muted">
        <ElementBadge language={repo.language} />
        <span className="inline-flex items-center gap-1">
          <Star size={13} /> {repo.stargazers_count}
        </span>
        <span className="inline-flex items-center gap-1">
          <GitFork size={13} /> {repo.forks_count}
        </span>
        <span>pushed {repo.pushed_at.slice(0, 10)}</span>
      </div>
    </div>
  </article>
);

export default ProjectCard;
