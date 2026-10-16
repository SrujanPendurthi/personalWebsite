import PixelArrow from "./PixelArrow";

const SectionTitle = ({ children }: { children: React.ReactNode }) => (
  <h2 className="flex items-center gap-2 text-sm uppercase tracking-wide text-muted">
    {children} <PixelArrow />
  </h2>
);

export default SectionTitle;
