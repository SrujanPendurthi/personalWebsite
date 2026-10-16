import type { Metadata } from "next";
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
    <div className="flex flex-col gap-12">
      <header className="flex flex-col gap-3">
        <h1 className="text-3xl uppercase sm:text-4xl">Projects</h1>
        <p className="text-lg leading-relaxed text-muted">
          Public repositories pulled live from GitHub, newest push first. Forks and archived repos are hidden.
        </p>
      </header>

      {repos.length === 0 ? (
        <p className="text-muted">
          Couldn&apos;t load repositories right now.{" "}
          <a href={profile.github} target="_blank" rel="noopener noreferrer" className="underline">
            View on GitHub
          </a>
        </p>
      ) : (
        <div className="flex flex-col gap-10">
          {repos.map((repo) => (
            <ProjectCard key={repo.id} repo={repo} />
          ))}
        </div>
      )}
    </div>
  );
}
