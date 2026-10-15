import type { Metadata } from "next";
import { Github } from "@/components/icons";
import { getRepos } from "@/lib/github";
import { profile } from "@/lib/data";
import ProjectCard from "@/components/ProjectCard";

export const metadata: Metadata = {
  title: "Projects",
  description: `Open-source repositories and projects by ${profile.name}.`,
};

export default async function Projects() {
  const repos = await getRepos();

  return (
    <div className="flex flex-col gap-10">
      <header className="flex flex-col gap-3">
        <h1 className="text-lg sm:text-2xl">Projects</h1>
        <p className="max-w-prose leading-relaxed text-muted">
          Public repositories pulled live from GitHub, newest push first.
          Forks, archived and undescribed repos are hidden.
        </p>
      </header>

      {repos.length === 0 ? (
        <div className="pixel-frame p-8 text-center text-sm text-muted">
          <p>Couldn&apos;t load repositories right now.</p>
          <a
            href={profile.github}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-3 inline-flex items-center gap-2 text-accent-strong hover:text-foreground hover:underline"
          >
            <Github size={15} /> View on GitHub
          </a>
        </div>
      ) : (
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
          {repos.map((repo) => (
            <ProjectCard key={repo.id} repo={repo} />
          ))}
        </div>
      )}
    </div>
  );
}
