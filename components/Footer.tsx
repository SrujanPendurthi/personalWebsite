import { profile } from "@/lib/data";

const Footer = () => (
  <footer className="mx-auto w-full max-w-[66ch] px-6 pb-10">
    <div className="pixel-divider mb-6" aria-hidden />
    <div className="flex flex-wrap items-center justify-between gap-3 text-sm text-muted">
      <p>© {new Date().getFullYear()} {profile.name}</p>
      <div className="flex gap-4">
        <a href={profile.github} target="_blank" rel="noopener noreferrer" className="hover:underline">GitHub</a>
        <a href={profile.linkedin} target="_blank" rel="noopener noreferrer" className="hover:underline">LinkedIn</a>
        <a href={`mailto:${profile.email}`} className="hover:underline">Email</a>
      </div>
    </div>
  </footer>
);

export default Footer;
