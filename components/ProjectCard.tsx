import { Star, GitFork, ExternalLink } from "lucide-react";
import { Github } from "./icons";
import ElementBadge from "./ElementBadge";
import type { Repo } from "@/lib/github";

const ProjectCard = ({ repo }: { repo: Repo }) => (
  <article className="pixel-frame flex flex-col gap-3 bg-surface p-5">
    <div className="flex items-start justify-between gap-4">
      <h3 className="font-mono text-sm text-foreground">{repo.name}</h3>
      <div className="flex items-center gap-2">
        {repo.homepage && (
          <a
            href={repo.homepage}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={`${repo.name} live site`}
            className="text-muted hover:text-foreground"
          >
            <ExternalLink size={16} />
          </a>
        )}
        <a
          href={repo.html_url}
          target="_blank"
          rel="noopener noreferrer"
          aria-label={`${repo.name} on GitHub`}
          className="text-muted hover:text-foreground"
        >
          <Github size={16} />
        </a>
      </div>
    </div>

    <p className="min-h-[2.5rem] text-sm leading-relaxed text-muted">
      {repo.description ?? "No description provided."}
    </p>

    <div className="mt-auto flex flex-wrap items-center gap-x-4 gap-y-1 font-mono text-xs text-muted">
      <ElementBadge language={repo.language} />
      <span className="inline-flex items-center gap-1">
        <Star size={13} /> {repo.stargazers_count}
      </span>
      <span className="inline-flex items-center gap-1">
        <GitFork size={13} /> {repo.forks_count}
      </span>
      <span>pushed {repo.pushed_at.slice(0, 10)}</span>
    </div>
  </article>
);

export default ProjectCard;
