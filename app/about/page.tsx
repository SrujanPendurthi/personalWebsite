import type { Metadata } from "next";
import { profile, education, experiences, skills } from "@/lib/data";
import ExperienceTimeline from "@/components/ExperienceTimeline";
import SectionTitle from "@/components/SectionTitle";

export const metadata: Metadata = {
  title: "About",
  description: `Background, education, and technical skills of ${profile.name}.`,
};

const Section = ({ title, children }: { title: string; children: React.ReactNode }) => (
  <section className="flex flex-col gap-8">
    <SectionTitle>{title}</SectionTitle>
    {children}
  </section>
);

export default function About() {
  return (
    <div className="flex flex-col gap-20">
      <header className="flex flex-col gap-3">
        <h1 className="text-3xl uppercase sm:text-4xl">About</h1>
        <p className="text-lg leading-relaxed">
          I&apos;m {profile.name}, an Artificial Intelligence student at Carnegie
          Mellon University focused on machine learning and backend systems. I
          build agentic AI pipelines and full-stack products in Go and Python,
          and I have a soft spot for low-level C. Currently based in{" "}
          {profile.location}.
        </p>
      </header>

      <Section title="Education">
        <div>
          <div className="flex flex-col gap-0.5 sm:flex-row sm:items-baseline sm:justify-between sm:gap-4">
            <h3 className="text-lg">{education.school}</h3>
            <span className="shrink-0 text-sm text-muted">
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
              <dt className="shrink-0 text-sm uppercase tracking-wide text-muted sm:w-40">
                {group.category}
              </dt>
              <dd className="flex flex-wrap gap-1.5">
                {group.items.map((item) => (
                  <span
                    key={item}
                    className="bg-surface px-2 py-0.5 text-sm"
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
