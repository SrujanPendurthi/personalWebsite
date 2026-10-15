export type Element = "Fire" | "Water" | "Life" | "Earth" | "Air" | "Magic" | "Tech" | "Undead";

const COLORS: Record<Element, string> = {
  Fire: "#ff6a3d",
  Water: "#3db8ff",
  Life: "#5fd35f",
  Earth: "#b07a3a",
  Air: "#8fe3ff",
  Magic: "#a56bff",
  Tech: "#f2c230",
  Undead: "#b0a3c9",
};

const BY_LANGUAGE: Record<string, Element> = {
  C: "Earth",
  "C++": "Earth",
  Python: "Magic",
  Rust: "Fire",
  Go: "Water",
  TypeScript: "Tech",
  JavaScript: "Air",
  HTML: "Life",
  Shell: "Undead",
};

export const getElement = (language: string | null): { name: Element; color: string } => {
  const name = (language && BY_LANGUAGE[language]) || "Undead";
  return { name, color: COLORS[name] };
};
