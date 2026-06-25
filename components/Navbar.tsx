import Link from "next/link";
import { Github, Linkedin } from "./icons";
import { profile } from "@/lib/data";

const links = [
  { href: "/", label: "Home" },
  { href: "/about", label: "About" },
  { href: "/projects", label: "Projects" },
];

const Navbar = () => (
  <header className="sticky top-0 z-10 border-b border-border bg-background/80 backdrop-blur">
    <nav className="mx-auto flex h-14 max-w-3xl items-center justify-between px-6">
      <Link href="/" className="font-mono text-sm font-semibold tracking-tight">
        srujan<span className="text-accent-strong">.</span>
      </Link>
      <div className="flex items-center gap-5 text-sm">
        {links.map((link) => (
          <Link
            key={link.href}
            href={link.href}
            className="text-muted transition-colors hover:text-foreground"
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
          className="text-muted transition-colors hover:text-foreground"
        >
          <Github size={18} />
        </a>
        <a
          href={profile.linkedin}
          target="_blank"
          rel="noopener noreferrer"
          aria-label="LinkedIn"
          className="text-muted transition-colors hover:text-foreground"
        >
          <Linkedin size={18} />
        </a>
      </div>
    </nav>
  </header>
);

export default Navbar;
