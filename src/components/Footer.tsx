import { Link } from "@tanstack/react-router";

export function Footer() {
  const currentYear = new Date().getFullYear();

  const sections = [
    {
      title: "Platform",
      links: [
        { label: "Dashboard", to: "/dashboard" },
        { label: "Match Queue", to: "/matches" },
        { label: "Startup Talent", to: "/talent" },
        { label: "Opportunities", to: "/opportunities" },
      ],
    },
    {
      title: "Ecosystem",
      links: [
        { label: "Ecosystem Graph", to: "/ecosystem" },
        { label: "University Partners", to: "/resources" },
        { label: "Commercialization Docs", to: "/resources" },
        { label: "Utah Innovation Fund", to: "/ecosystem" },
      ],
    },
    {
      title: "Company",
      links: [
        { label: "About Nucleus", to: "/" },
        { label: "Success Stories", to: "/" },
        { label: "Security & Trust", to: "/admin" },
        { label: "Contact Us", to: "/" },
      ],
    },
  ];

  return (
    <footer className="bg-surface/30 border-t border-border/40 pt-20 pb-10">
      <div className="container-x">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-12 mb-16">
          {/* Brand Column */}
          <div className="lg:col-span-2 space-y-6">
            <Link to="/" className="flex items-center gap-3 group w-fit">
              <div className="size-8 rounded-lg bg-electric flex items-center justify-center text-electric-foreground font-display text-xl shadow-glow">
                ⏣
              </div>
              <span className="font-display text-2xl tracking-tight">LaunchHive</span>
            </Link>
            <p className="text-muted-foreground text-sm leading-relaxed max-w-sm">
              AI-native commercialization infrastructure for Utah's deep-tech ecosystem. 
              Bridging the gap between world-class research and market-scale execution.
            </p>
            <div className="flex gap-4">
              <SocialIcon icon="𝕏" />
              <SocialIcon icon="in" />
              <SocialIcon icon="✉" />
            </div>
          </div>

          {/* Nav Sections */}
          {sections.map((s) => (
            <div key={s.title} className="space-y-6">
              <h3 className="text-[10px] font-mono uppercase tracking-[0.2em] text-electric">
                {s.title}
              </h3>
              <ul className="space-y-3">
                {s.links.map((l) => (
                  <li key={l.label}>
                    <Link 
                      to={l.to as any} 
                      className="text-sm text-muted-foreground hover:text-foreground transition-colors"
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
        <div className="pt-10 border-t border-border/40 flex flex-col md:flex-row justify-between items-center gap-6">
          <div className="flex flex-wrap items-center justify-center gap-6 text-[10px] font-mono uppercase tracking-widest text-muted-foreground">
            <span>© {currentYear} Nucleus LaunchHive</span>
            <span className="hidden md:block text-border">•</span>
            <Link to="/" className="hover:text-foreground transition-colors">Privacy Policy</Link>
            <span className="hidden md:block text-border">•</span>
            <Link to="/" className="hover:text-foreground transition-colors">Terms of Service</Link>
          </div>
          
          <div className="flex items-center gap-6 grayscale opacity-40 hover:grayscale-0 hover:opacity-100 transition-all">
            <span className="text-[10px] font-mono text-muted-foreground uppercase">Partners</span>
            <span className="font-display text-xs">U of U</span>
            <span className="font-display text-xs">BYU</span>
            <span className="font-display text-xs">USU</span>
          </div>
        </div>
      </div>
    </footer>
  );
}

function SocialIcon({ icon }: { icon: string }) {
  return (
    <button className="size-8 rounded-lg bg-surface-elevated border border-border flex items-center justify-center text-xs text-muted-foreground hover:text-foreground hover:border-electric transition-all cursor-pointer">
      {icon}
    </button>
  );
}
