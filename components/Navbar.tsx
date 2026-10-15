import Link from "next/link";
import { Github, Linkedin } from "./icons";
import { profile } from "@/lib/data";

const links = [
  { href: "/", label: "Home" },
  { href: "/about", label: "About" },
  { href: "/projects", label: "Projects" },
  { href: "/papers", label: "Papers" },
];

const Navbar = () => (
  <header className="sticky top-0 z-10 border-b-4 border-border bg-background">
    <nav className="mx-auto flex max-w-3xl flex-wrap items-center justify-between gap-y-2 px-6 py-3">
      <Link href="/" className="font-pixel text-xs">
        srujan<span className="text-accent-strong">.</span>
      </Link>
      <div className="flex items-center gap-5 text-sm">
        {links.map((link) => (
          <Link
            key={link.href}
            href={link.href}
            className="text-muted hover:text-foreground hover:underline"
          >
            {link.label}
          </Link>
        ))}
        <span className="h-4 w-px bg-border" aria-hidden />
        <a
          href={profile.github}
          target="_blank"
          rel="noopener noreferrer"
          aria-label="GitHub"
          className="text-muted hover:text-foreground hover:underline"
        >
          <Github size={18} />
        </a>
        <a
          href={profile.linkedin}
          target="_blank"
          rel="noopener noreferrer"
          aria-label="LinkedIn"
          className="text-muted hover:text-foreground hover:underline"
        >
          <Linkedin size={18} />
        </a>
      </div>
    </nav>
  </header>
);

export default Navbar;
