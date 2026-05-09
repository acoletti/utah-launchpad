import { Link } from "@tanstack/react-router";

export function Navbar() {
  return (
    <nav className="sticky top-0 z-50 w-full glass border-b border-border/40 px-4 h-16 flex items-center justify-center">
      <div className="container-x flex items-center justify-between">
        <Link to="/" className="flex items-center gap-3 group">
          <div className="size-8 rounded-lg bg-electric flex items-center justify-center text-electric-foreground font-display text-xl group-hover:scale-110 transition-transform shadow-glow">
            ⏣
          </div>
          <span className="font-display text-xl tracking-tight">LaunchHive</span>
        </Link>
        
        <div className="hidden md:flex items-center gap-8">
          <NavLink to="/dashboard">Dashboard</NavLink>
          <NavLink to="/matches">Matches</NavLink>
          <NavLink to="/ecosystem">Ecosystem</NavLink>
          <NavLink to="/resources">Resources</NavLink>
        </div>

        <div className="flex items-center gap-4">
          <Link 
            to="/onboarding" 
            className="btn-primary py-1.5 px-4 text-xs font-medium hover:btn-primary-hover active:btn-primary-active shadow-none"
          >
            Create Profile
          </Link>
          <div className="size-8 rounded-full bg-surface-elevated border border-border flex items-center justify-center text-xs font-mono cursor-pointer hover:border-electric transition-colors">
            MC
          </div>
        </div>
      </div>
    </nav>
  );
}

function NavLink({ to, children }: { to: string; children: React.ReactNode }) {
  return (
    <Link 
      to={to} 
      className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors relative group"
    >
      {children}
      <span className="absolute -bottom-1 left-0 w-0 h-px bg-electric transition-all group-hover:w-full" />
    </Link>
  );
}
