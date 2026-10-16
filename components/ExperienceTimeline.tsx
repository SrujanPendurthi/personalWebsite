import type { Experience } from "@/lib/data";

const ExperienceTimeline = ({ items }: { items: Experience[] }) => (
  <ol className="flex flex-col gap-10">
    {items.map((exp) => (
      <li key={`${exp.company}-${exp.role}`}>
        <div className="flex flex-wrap items-baseline justify-between gap-x-4">
          <h3 className="text-lg">
            {exp.role} <span className="text-muted">@ {exp.company}</span>
          </h3>
          <span className="text-sm text-muted">{exp.period}</span>
        </div>
        {exp.location && <p className="text-sm text-muted">{exp.location}</p>}
        <ul className="mt-3 flex flex-col gap-2 leading-relaxed text-muted">
          {exp.highlights.map((point) => (
            <li key={point} className="flex gap-3">
              <span aria-hidden className="mt-2.5 h-1.5 w-1.5 shrink-0 bg-accent" />
              <span>{point}</span>
            </li>
          ))}
        </ul>
      </li>
    ))}
  </ol>
);

export default ExperienceTimeline;
