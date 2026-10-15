import type { Metadata } from "next";
import { profile, education, experiences, skills } from "@/lib/data";
import ExperienceTimeline from "@/components/ExperienceTimeline";

export const metadata: Metadata = {
  title: "About",
  description: `Background, education, and technical skills of ${profile.name}.`,
};

const Section = ({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) => (
  <section className="flex flex-col gap-6">
    <h2 className="text-xs uppercase tracking-widest text-muted">
      {title}
    </h2>
    {children}
  </section>
);

export default function About() {
  return (
    <div className="flex flex-col gap-16">
      <header className="flex flex-col gap-3">
        <h1 className="text-lg sm:text-2xl">About</h1>
        <p className="max-w-prose leading-relaxed text-muted">
          I&apos;m {profile.name}, an Artificial Intelligence student at Carnegie
          Mellon University focused on machine learning and backend systems. I
          build agentic AI pipelines and full-stack products in Go and Python,
          and I have a soft spot for low-level C. Currently based in{" "}
          {profile.location}.
        </p>
      </header>

      <Section title="Education">
        <div className="border-l-4 border-border pl-5">
          <div className="flex flex-col gap-0.5 sm:flex-row sm:items-baseline sm:justify-between sm:gap-4">
            <h3 className="font-medium text-foreground">{education.school}</h3>
            <span className="shrink-0 font-mono text-xs text-muted">
              {education.period}
            </span>
          </div>
          <p className="mt-0.5 text-sm text-muted">{education.degree}</p>
          <p className="mt-0.5 text-sm text-muted">{education.location}</p>
        </div>
      </Section>

      <Section title="Experience">
        <ExperienceTimeline items={experiences} />
      </Section>

      <Section title="Technical Skills">
        <dl className="flex flex-col gap-4">
          {skills.map((group) => (
            <div
              key={group.category}
              className="flex flex-col gap-2 sm:flex-row sm:gap-6"
            >
              <dt className="shrink-0 font-mono text-xs uppercase tracking-wider text-accent-strong sm:w-40">
                {group.category}
              </dt>
              <dd className="flex flex-wrap gap-1.5">
                {group.items.map((item) => (
                  <span
                    key={item}
                    className="border-2 border-border/50 bg-surface px-2 py-0.5 font-mono text-xs text-muted"
                  >
                    {item}
                  </span>
                ))}
              </dd>
            </div>
          ))}
        </dl>
      </Section>
    </div>
  );
}
