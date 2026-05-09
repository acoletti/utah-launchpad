import { createFileRoute, Link } from "@tanstack/react-router";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { ScoreRing } from "@/routes/index";

export const Route = createFileRoute("/opportunities")({
  component: OpportunitiesPage,
  head: () => ({ meta: [{ title: "Open Missions — LaunchHive" }] }),
});

function OpportunitiesPage() {
  const opportunities = [
    { 
      name: "Helix Therapeutics", 
      sector: "Life Sciences", 
      stage: "The Seed Stage", 
      need: "A Founding CEO", 
      origin: "University of Utah Lab",
      desc: "We've spent years in the lab developing a gene therapy that could restore sight. We have the science and the funding—now we need the partner who can lead us to the world.",
      matchScore: 92
    },
    { 
      name: "AltaGrid", 
      sector: "Energy / SaaS", 
      stage: "Pre-seed Build", 
      need: "Fractional GTM Guide", 
      origin: "USU Research",
      desc: "We're building software that makes rural energy grids smarter and more resilient. We need someone who understands the energy landscape and can help us find our first customers.",
      matchScore: 84
    },
    { 
      name: "Sentry Mesh", 
      sector: "Cybersecurity", 
      stage: "Series A Growth", 
      need: "VP Engineering", 
      origin: "BYU Innovation",
      desc: "Our mesh network technology is ready to protect critical infrastructure. We're looking for a leader who can scale our engineering team while keeping our mission at the center.",
      matchScore: 78
    },
    { 
      name: "Wasatch Orbital", 
      sector: "Aerospace", 
      stage: "Seed Discovery", 
      need: "Regulatory Lead", 
      origin: "USU Aerospace Lab",
      desc: "We're building propulsion systems for the next generation of satellites. It's a complex path ahead, and we need someone who can help us navigate the regulatory stars.",
      matchScore: 65
    }
  ];

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Navbar />
      <main className="container-x py-24 flex-1 animate-in fade-in slide-in-from-bottom-8 duration-1000">
        <header className="flex flex-col md:flex-row md:items-end justify-between gap-12 mb-20">
          <div className="max-w-3xl space-y-6">
            <span className="chip bg-bond/10 text-bond border-bond/20 uppercase tracking-[0.25em] text-[10px] py-1 px-3">Active Missions</span>
            <h1 className="text-6xl font-display leading-[1.1]">Where the build begins.</h1>
            <p className="text-xl text-muted-foreground leading-relaxed">
              These are Utah's deepest research breakthroughs, looking for the human energy that can move them forward. 
              Each one is a mission waiting for its leader.
            </p>
          </div>
          <div className="flex gap-3">
            <button className="chip bg-surface-elevated/50 px-6 py-3 text-foreground font-display text-sm hover:border-electric transition-all cursor-pointer">By Field</button>
            <button className="chip bg-surface-elevated/50 px-6 py-3 text-foreground font-display text-sm hover:border-electric transition-all cursor-pointer">By Stage</button>
          </div>
        </header>

        <div className="grid md:grid-cols-2 gap-8">
          {opportunities.map((o) => (
            <div key={o.name} className="card-surface p-10 group hover:card-surface-hover relative overflow-hidden transition-all duration-700">
              <div className="absolute inset-0 radial-spot opacity-5 group-hover:opacity-10 transition-opacity" />
              
              <div className="flex items-center justify-between mb-10 relative">
                <div className="flex flex-wrap gap-2">
                  <span className="chip text-[10px] uppercase tracking-widest">{o.sector}</span>
                  <span className="chip text-[10px] text-electric border-electric/20 bg-electric/5 uppercase tracking-widest">{o.stage}</span>
                  <span className="chip text-[10px] italic border-border/40 font-mono">{o.origin}</span>
                </div>
                <div className="scale-110">
                  <ScoreRing score={o.matchScore} />
                </div>
              </div>
              
              <div className="space-y-4 relative">
                <h2 className="text-4xl font-display group-hover:text-electric transition-colors leading-tight">{o.name}</h2>
                <div className="text-[11px] font-mono text-electric uppercase tracking-[0.3em]">Looking for {o.need}</div>
                
                <p className="text-lg text-muted-foreground leading-relaxed italic line-clamp-3 pt-4">
                  "{o.desc}"
                </p>
              </div>

              <div className="mt-12 pt-10 border-t border-border/60 flex items-center justify-between relative">
                <div className="flex items-center gap-4">
                  <div className="flex -space-x-3">
                    <div className="size-10 rounded-2xl bg-surface-elevated border border-background flex items-center justify-center text-xs shadow-soft">👤</div>
                    <div className="size-10 rounded-2xl bg-surface-elevated border border-background flex items-center justify-center text-xs shadow-soft">👤</div>
                  </div>
                  <div className="text-[10px] font-mono text-muted-foreground uppercase tracking-widest">2 people are interested</div>
                </div>
                <Link 
                  to="/matches/$matchId" 
                  params={{ matchId: "1" }} 
                  className="btn-primary py-3 px-8 text-sm shadow-none hover:btn-primary-hover active:scale-95 transition-all"
                >
                  View the Story
                </Link>
              </div>
            </div>
          ))}
        </div>
      </main>
      <Footer />
    </div>
  );
}
