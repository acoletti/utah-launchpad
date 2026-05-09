import { Link } from "@tanstack/react-router";

export function Footer() {
  const currentYear = new Date().getFullYear();

  const sections = [
    {
      title: "The Platform",
      links: [
        { label: "Your Space", to: "/dashboard" },
        { label: "The Discovery Queue", to: "/matches" },
        { label: "Community Talent", to: "/talent" },
        { label: "Open Missions", to: "/opportunities" },
      ],
    },
    {
      title: "Our Ecosystem",
      links: [
        { label: "The Community Map", to: "/ecosystem" },
        { label: "University Partners", to: "/resources" },
        { label: "Founder Library", to: "/resources" },
        { label: "Innovation Fund", to: "/ecosystem" },
      ],
    },
    {
      title: "LaunchHive",
      links: [
        { label: "Our Story", to: "/" },
        { label: "Handshake Success", to: "/" },
        { label: "Trust & Safety", to: "/admin" },
        { label: "Say Hello", to: "/" },
      ],
    },
  ];

  return (
    <footer className="bg-surface/20 border-t border-border/30 pt-32 pb-12">
      <div className="container-x">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-16 mb-24">
          {/* Brand Column */}
          <div className="lg:col-span-2 space-y-8">
            <Link to="/" className="flex items-center gap-4 group w-fit">
              <div className="size-10 rounded-xl bg-electric flex items-center justify-center text-electric-foreground font-display text-2xl shadow-glow">
                ⏣
              </div>
              <span className="font-display text-3xl tracking-tighter">LaunchHive</span>
            </Link>
            <p className="text-muted-foreground text-base leading-relaxed max-w-sm italic">
              "We're here to make sure Utah's best ideas never have to walk alone. Built for the founders, the researchers, and the dreamers."
            </p>
            <div className="flex gap-6">
              <SocialIcon icon="𝕏" />
              <SocialIcon icon="in" />
              <SocialIcon icon="✉" />
            </div>
          </div>

          {/* Nav Sections */}
          {sections.map((s) => (
            <div key={s.title} className="space-y-8">
              <h3 className="text-[11px] font-mono uppercase tracking-[0.3em] text-electric">
                {s.title}
              </h3>
              <ul className="space-y-4">
                {s.links.map((l) => (
                  <li key={l.label}>
                    <Link 
                      to={l.to as any} 
                      className="text-sm text-muted-foreground hover:text-foreground transition-all duration-300"
                    >
                      {l.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Bottom Bar */}
        <div className="pt-12 border-t border-border/20 flex flex-col md:flex-row justify-between items-center gap-8">
          <div className="flex flex-wrap items-center justify-center gap-8 text-[11px] font-mono uppercase tracking-[0.2em] text-muted-foreground/60">
            <span>© {currentYear} With love from Nucleus</span>
            <span className="hidden md:block text-border/40">•</span>
            <Link to="/" className="hover:text-foreground transition-colors">Our Privacy Promise</Link>
            <span className="hidden md:block text-border/40">•</span>
            <Link to="/" className="hover:text-foreground transition-colors">Our Terms</Link>
          </div>
          
          <div className="flex items-center gap-8 grayscale opacity-30 hover:grayscale-0 hover:opacity-100 transition-all duration-700">
            <span className="text-[10px] font-mono text-muted-foreground uppercase tracking-widest">Ecosystem Partners</span>
            <span className="font-display text-sm">The U</span>
            <span className="font-display text-sm">BYU</span>
            <span className="font-display text-sm">USU</span>
          </div>
        </div>
      </div>
    </footer>
  );
}

function SocialIcon({ icon }: { icon: string }) {
  return (
    <button className="size-10 rounded-xl bg-surface-elevated/50 border border-border flex items-center justify-center text-sm text-muted-foreground hover:text-foreground hover:border-electric transition-all duration-500 cursor-pointer shadow-soft">
      {icon}
    </button>
  );
}
