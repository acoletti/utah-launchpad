import { Link } from "@tanstack/react-router";
import { useMagnetic } from "@/hooks/useHighFidelity";

export function Navbar() {
  return (
    <nav className="sticky top-0 z-50 w-full glass border-b border-border/40 px-4 h-20 flex items-center justify-center">
      <div className="container-x flex items-center justify-between">
        <Link to="/" className="flex items-center gap-4 group">
          <div className="size-10 rounded-xl bg-electric flex items-center justify-center text-electric-foreground font-display text-2xl group-hover:scale-110 transition-all duration-700 shadow-glow">
            ⏣
          </div>
          <div className="flex flex-col -space-y-1">
            <span className="font-display text-2xl tracking-tighter">LaunchHive</span>
            <span className="text-[9px] font-mono uppercase tracking-[0.3em] text-electric opacity-70">Utah Deep Tech</span>
          </div>
        </Link>
        
        <div className="hidden md:flex items-center gap-6">
          <NavLink to="/dashboard">Your Space</NavLink>
          <NavLink to="/matches">Discover</NavLink>
          <NavLink to="/ecosystem">The Map</NavLink>
          <NavLink to="/resources">Library</NavLink>
        </div>

        <div className="flex items-center gap-6">
          <Link 
            to="/onboarding" 
            className="text-sm font-display font-medium text-electric hover:text-foreground transition-colors"
          >
            Join the community
          </Link>
          <div className="size-10 rounded-2xl bg-surface-elevated border border-border flex items-center justify-center text-sm font-display cursor-pointer hover:border-electric transition-all duration-500 shadow-soft">
            MC
          </div>
        </div>
      </div>
    </nav>
  );
}

function NavLink({ to, children }: { to: string; children: React.ReactNode }) {
  const { ref, position, handleMouseMove, handleMouseLeave, handleMouseEnter } = useMagnetic(8);
  
  return (
    <div 
      ref={ref}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      onMouseEnter={handleMouseEnter}
      style={{ transform: `translate(${position.x}px, ${position.y}px)` }}
      className="transition-transform duration-300 ease-out"
    >
      <Link 
        to={to} 
        className="text-sm font-display font-medium text-muted-foreground hover:text-foreground transition-all relative group py-2 px-3"
      >
        {children}
        <span className="absolute -bottom-1 left-3 w-0 h-px bg-electric transition-all duration-500 group-hover:w-[calc(100%-24px)]" />
      </Link>
    </div>
  );
}
