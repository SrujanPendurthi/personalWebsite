import { getElement } from "@/lib/elements";

const ElementBadge = ({ language }: { language: string | null }) => {
  const { name, color } = getElement(language);
  return (
    <span className="inline-flex items-center gap-1.5">
      <span aria-hidden className="h-2.5 w-2.5" style={{ backgroundColor: color }} />
      {language ?? "Unknown"} · {name}
    </span>
  );
};

export default ElementBadge;
