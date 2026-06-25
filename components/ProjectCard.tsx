import { Star, GitFork, ExternalLink } from "lucide-react";
import { Github } from "./icons";
import type { Repo } from "@/lib/github";

const ProjectCard = ({ repo }: { repo: Repo }) => (
  <article className="flex flex-col gap-3 rounded-lg border border-border bg-surface p-5">
    <div className="flex items-start justify-between gap-4">
      <h3 className="font-mono font-medium text-foreground">{repo.name}</h3>
      <div className="flex items-center gap-2">
        {repo.homepage && (
          <a
            href={repo.homepage}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={`${repo.name} live site`}
            className="text-muted transition-colors hover:text-foreground"
          >
            <ExternalLink size={16} />
          </a>
        )}
        <a
          href={repo.html_url}
          target="_blank"
          rel="noopener noreferrer"
          aria-label={`${repo.name} on GitHub`}
          className="text-muted transition-colors hover:text-foreground"
        >
          <Github size={16} />
        </a>
      </div>
    </div>

    <p className="min-h-[2.5rem] text-sm leading-relaxed text-muted">
      {repo.description ?? "No description provided."}
    </p>

    <div className="mt-auto flex items-center gap-4 font-mono text-xs text-muted">
      {repo.language && (
        <span className="inline-flex items-center gap-1.5">
          <span aria-hidden className="h-2.5 w-2.5 rounded-full bg-accent" />
          {repo.language}
        </span>
      )}
      <span className="inline-flex items-center gap-1">
        <Star size={13} /> {repo.stargazers_count}
      </span>
      <span className="inline-flex items-center gap-1">
        <GitFork size={13} /> {repo.forks_count}
      </span>
    </div>
  </article>
);

export default ProjectCard;
