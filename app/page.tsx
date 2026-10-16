import Image from "next/image";
import Link from "next/link";
import { profile, featuredProjects } from "@/lib/data";
import PixelCover from "@/components/PixelCover";
import PixelArrow from "@/components/PixelArrow";
import SectionTitle from "@/components/SectionTitle";

export default function Home() {
  return (
    <div className="flex flex-col gap-20">
      <section className="flex flex-col gap-6">
        <div className="flex items-center gap-4">
          <Image
            src="/srujan.png"
            alt={profile.name}
            width={64}
            height={64}
            priority
            unoptimized
            className="bg-surface [image-rendering:pixelated]"
          />
          <div>
            <h1 className="text-3xl uppercase sm:text-4xl">{profile.name}</h1>
            <p className="text-muted">{profile.tagline}</p>
            <p className="text-sm text-muted">{profile.location}</p>
          </div>
        </div>
        <div className="flex flex-wrap gap-x-6 gap-y-2">
          <Link href="/resume" className="underline hover:text-muted">Resume</Link>
          <a href={`mailto:${profile.email}`} className="underline hover:text-muted">Email</a>
          <a href={profile.github} target="_blank" rel="noopener noreferrer" className="underline hover:text-muted">GitHub</a>
          <a href={profile.linkedin} target="_blank" rel="noopener noreferrer" className="underline hover:text-muted">LinkedIn</a>
        </div>
      </section>

      <section className="flex flex-col gap-10">
        <SectionTitle>Selected Works</SectionTitle>
        {featuredProjects.map((project) => (
          <article key={project.name} className="flex flex-col gap-3">
            <PixelCover seed={project.name} language={project.stack[0] ?? null} />
            <div className="flex flex-wrap items-baseline justify-between gap-x-4">
              <h3 className="text-xl">
                {project.name}
                {project.private && <span className="ml-2 text-sm text-muted">(private)</span>}
              </h3>
              <span className="text-sm text-muted">{project.period}</span>
            </div>
            <p className="leading-relaxed text-muted">{project.highlights[0]}</p>
            <p className="text-sm text-muted">{project.stack.join(" · ")}</p>
          </article>
        ))}
        <Link href="/projects" className="inline-flex items-center gap-2 underline hover:text-muted">
          All projects <PixelArrow />
        </Link>
      </section>

      <section className="flex flex-col gap-4">
        <p className="text-lg leading-relaxed">
          AI student at Carnegie Mellon focused on machine learning and backend systems. I build agentic AI
          pipelines and full-stack products in Go and Python, with a soft spot for low-level C.
        </p>
        <Link href="/about" className="inline-flex items-center gap-2 underline hover:text-muted">
          More about me <PixelArrow />
        </Link>
      </section>
    </div>
  );
}
