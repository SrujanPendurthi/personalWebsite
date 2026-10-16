import Link from "next/link";

const links = [
  { href: "/about", label: "About" },
  { href: "/projects", label: "Projects" },
  { href: "/resume", label: "Resume" },
];

const Navbar = () => (
  <header>
    <nav className="mx-auto flex max-w-[66ch] items-center justify-between px-6 py-6">
      <Link href="/" className="font-pixel text-xs">
        srujan<span className="text-accent">.</span>
      </Link>
      <div className="flex items-center gap-6">
        {links.map((link) => (
          <Link key={link.href} href={link.href} className="hover:underline">
            {link.label}
          </Link>
        ))}
      </div>
    </nav>
  </header>
);

export default Navbar;
