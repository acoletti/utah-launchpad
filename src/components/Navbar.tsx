import { Link } from "@tanstack/react-router";

export function Navbar() {
  return (
    <header className="sticky top-0 z-40 border-b border-border/60 bg-background/70 backdrop-blur-xl">
      <div className="container-x flex h-16 items-center justify-between">
        <Link to="/" className="flex items-center gap-2.5 group">
          <LogoMark />
          <div className="leading-none">
            <div className="font-display text-lg tracking-tight">LaunchHive</div>
            <div className="text-[10px] uppercase tracking-[0.18em] text-muted-foreground font-mono">by Nucleus</div>
          </div>
        </Link>
        <nav className="hidden md:flex items-center gap-8 text-sm text-muted-foreground">
          <Link to="/matches" className="hover:text-foreground transition-colors" activeProps={{ className: "text-foreground" }}>Matches</Link>
          <Link to="/ecosystem" className="hover:text-foreground transition-colors" activeProps={{ className: "text-foreground" }}>Ecosystem</Link>
          <Link to="/how-it-works" className="hover:text-foreground transition-colors" activeProps={{ className: "text-foreground" }}>How it works</Link>
        </nav>
        <div className="flex items-center gap-2">
          <Link to="/onboarding" className="btn-ghost text-sm hidden sm:inline-flex">Sign in</Link>
          <Link to="/onboarding" className="btn-primary text-sm hover:[filter:brightness(1.05)]">
            Join the network
          </Link>
        </div>
      </div>
    </header>
  );
}

export function LogoMark({ size = 28 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 32 32" className="text-electric">
      <defs>
        <radialGradient id="lg" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="currentColor" stopOpacity="0.95" />
          <stop offset="100%" stopColor="currentColor" stopOpacity="0.2" />
        </radialGradient>
      </defs>
      <circle cx="16" cy="16" r="3.2" fill="url(#lg)" />
      <ellipse cx="16" cy="16" rx="13" ry="5" fill="none" stroke="currentColor" strokeOpacity="0.55" />
      <ellipse cx="16" cy="16" rx="13" ry="5" fill="none" stroke="currentColor" strokeOpacity="0.4" transform="rotate(60 16 16)" />
      <ellipse cx="16" cy="16" rx="13" ry="5" fill="none" stroke="currentColor" strokeOpacity="0.3" transform="rotate(120 16 16)" />
    </svg>
  );
}
