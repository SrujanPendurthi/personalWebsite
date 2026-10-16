import { Mail } from "lucide-react";
import { Github, Linkedin } from "./icons";
import { profile } from "@/lib/data";

const Footer = () => (
  <footer className="border-t-4 border-border">
    <div className="mx-auto flex max-w-3xl flex-col items-center justify-between gap-3 px-6 py-8 text-sm text-muted sm:flex-row">
      <p>© {new Date().getFullYear()} {profile.name}</p>
      <div className="flex items-center gap-4">
        <a href={profile.github} target="_blank" rel="noopener noreferrer" aria-label="GitHub" className="hover:text-foreground">
          <Github size={16} />
        </a>
        <a href={profile.linkedin} target="_blank" rel="noopener noreferrer" aria-label="LinkedIn" className="hover:text-foreground">
          <Linkedin size={16} />
        </a>
        <a href={`mailto:${profile.email}`} aria-label="Email" className="hover:text-foreground">
          <Mail size={16} />
        </a>
      </div>
    </div>
  </footer>
);

export default Footer;
