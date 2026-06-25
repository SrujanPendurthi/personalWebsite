import type { Experience } from "@/lib/data";

const ExperienceTimeline = ({
  items,
  compact = false,
}: {
  items: Experience[];
  compact?: boolean;
}) => (
  <ol className="flex flex-col gap-8">
    {items.map((exp) => (
      <li
        key={`${exp.company}-${exp.role}`}
        className="border-l-2 border-border pl-5"
      >
        <div className="flex flex-col gap-0.5 sm:flex-row sm:items-baseline sm:justify-between sm:gap-4">
          <h3 className="font-medium text-foreground">
            {exp.role}{" "}
            <span className="text-accent-strong">@ {exp.company}</span>
          </h3>
          <span className="shrink-0 font-mono text-xs text-muted">
            {exp.period}
          </span>
        </div>
        {exp.location && (
          <p className="mt-0.5 text-sm text-muted">{exp.location}</p>
        )}
        <ul className="mt-3 flex flex-col gap-1.5 text-sm leading-relaxed text-muted">
          {(compact ? exp.highlights.slice(0, 2) : exp.highlights).map(
            (point, i) => (
              <li key={i} className="flex gap-2">
                <span aria-hidden className="mt-2 h-1 w-1 shrink-0 rounded-full bg-accent-strong" />
                <span>{point}</span>
              </li>
            ),
          )}
        </ul>
      </li>
    ))}
  </ol>
);

export default ExperienceTimeline;
