import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Mail } from "lucide-react";
import { Github, Linkedin } from "@/components/icons";
import { profile, experiences, featuredProjects } from "@/lib/data";
import ExperienceTimeline from "@/components/ExperienceTimeline";

export default function Home() {
  return (
    <div className="flex flex-col gap-16">
      {/* Hero */}
      <section className="flex flex-col items-start gap-5 sm:flex-row sm:items-center sm:gap-6">
        <Image
          src="/srujan.png"
          alt={profile.name}
          width={96}
          height={96}
          priority
          className="pixel-frame m-1 bg-surface [image-rendering:pixelated]"
        />
        <div>
          <h1 className="text-lg sm:text-2xl">
            {profile.name}
          </h1>
          <p className="mt-1 font-mono text-sm text-accent-strong">
            {profile.tagline}
          </p>
          <p className="mt-1 text-sm text-muted">{profile.location}</p>
        </div>
      </section>

      {/* Quick links */}
      <div className="flex flex-wrap gap-4 text-sm">
        <a
          href={profile.github}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 pixel-btn px-3 py-1.5"
        >
          <Github size={15} /> GitHub
        </a>
        <a
          href={profile.linkedin}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 pixel-btn px-3 py-1.5"
        >
          <Linkedin size={15} /> LinkedIn
        </a>
        <a
          href={`mailto:${profile.email}`}
          className="inline-flex items-center gap-2 pixel-btn px-3 py-1.5"
        >
          <Mail size={15} /> Email
        </a>
      </div>

      {/* Experience */}
      <section className="flex flex-col gap-6">
        <div className="flex items-baseline justify-between">
          <h2 className="text-xs uppercase tracking-widest text-muted">
            Experience
          </h2>
          <Link
            href="/about"
            className="inline-flex items-center gap-1 text-sm text-accent-strong hover:text-foreground hover:underline"
          >
            Full background <ArrowRight size={14} />
          </Link>
        </div>
        <ExperienceTimeline items={experiences} />
      </section>

      {/* Featured projects */}
      <section className="flex flex-col gap-6">
        <div className="flex items-baseline justify-between">
          <h2 className="text-xs uppercase tracking-widest text-muted">
            Featured Projects
          </h2>
          <Link
            href="/projects"
            className="inline-flex items-center gap-1 text-sm text-accent-strong hover:text-foreground hover:underline"
          >
            All repositories <ArrowRight size={14} />
          </Link>
        </div>
        <div className="flex flex-col gap-4">
          {featuredProjects.map((project) => (
            <article
              key={project.name}
              className="pixel-frame bg-surface p-5"
            >
              <div className="flex flex-col gap-0.5 sm:flex-row sm:items-baseline sm:justify-between sm:gap-4">
                <h3 className="text-xs text-foreground">
                  {project.name}
                  {project.private && (
                    <span className="ml-3 font-mono text-xs text-muted">[private repo]</span>
                  )}
                </h3>
                <span className="shrink-0 font-mono text-xs text-muted">
                  {project.period}
                </span>
              </div>
              <p className="mt-2 text-sm leading-relaxed text-muted">
                {project.highlights[0]}
              </p>
              <div className="mt-3 flex flex-wrap gap-1.5">
                {project.stack.map((tech) => (
                  <span
                    key={tech}
                    className="border-2 border-border/50 px-2 py-0.5 font-mono text-xs text-muted"
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </article>
          ))}
        </div>
      </section>
    </div>
  );
}
