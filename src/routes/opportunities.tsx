import { createFileRoute, Link } from "@tanstack/react-router";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { ScoreRing } from "@/routes/index";

export const Route = createFileRoute("/opportunities")({
  component: OpportunitiesPage,
  head: () => ({ meta: [{ title: "Opportunities — LaunchHive" }] }),
});

function OpportunitiesPage() {
  const opportunities = [
    { 
      name: "Helix Therapeutics", 
      sector: "Life Sciences", 
      stage: "Seed", 
      need: "Founding CEO", 
      origin: "University of Utah",
      desc: "Spinning out a novel gene therapy for rare ocular diseases. SBIR Phase I funded.",
      matchScore: 92
    },
    { 
      name: "AltaGrid", 
      sector: "Energy / SaaS", 
      stage: "Pre-seed", 
      need: "Fractional GTM", 
      origin: "USU",
      desc: "Smart grid optimization software for rural cooperatives.",
      matchScore: 84
    },
    { 
      name: "Sentry Mesh", 
      sector: "Cybersecurity", 
      stage: "Series A", 
      need: "VP Engineering", 
      origin: "BYU",
      desc: "Mesh network security for decentralized infrastructure.",
      matchScore: 78
    },
    { 
      name: "Wasatch Orbital", 
      sector: "Aerospace", 
      stage: "Seed", 
      need: "Regulatory Lead", 
      origin: "USU",
      desc: "Low-earth orbit satellite propulsion systems.",
      matchScore: 65
    }
  ];

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="container-x py-12 flex-1">
        <header className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
          <div className="max-w-2xl">
            <h1 className="font-display text-5xl">Startup Opportunities</h1>
            <p className="text-muted-foreground mt-4 text-lg">Utah's deepest research, looking for its first commercial engines.</p>
          </div>
          <div className="flex gap-2">
            <button className="chip bg-surface-elevated px-4 py-2 text-foreground lowercase">Filter by Sector</button>
            <button className="chip bg-surface-elevated px-4 py-2 text-foreground lowercase">Stage</button>
          </div>
        </header>

        <div className="grid md:grid-cols-2 gap-6">
          {opportunities.map((o) => (
            <div key={o.name} className="card-surface p-8 group hover:border-electric/50 transition-all">
              <div className="flex items-center justify-between mb-6">
                <div className="flex flex-wrap gap-2">
                  <span className="chip">{o.sector}</span>
                  <span className="chip text-electric border-electric/20">{o.stage}</span>
                  <span className="chip lowercase">{o.origin}</span>
                </div>
                <ScoreRing score={o.matchScore} />
              </div>
              
              <h2 className="font-display text-3xl group-hover:text-electric transition-colors">{o.name}</h2>
              <div className="mt-2 text-sm font-medium text-electric uppercase tracking-widest font-mono">Needs: {o.need}</div>
              
              <p className="mt-4 text-muted-foreground leading-relaxed">
                {o.desc}
              </p>

              <div className="mt-8 pt-8 border-t border-border flex items-center justify-between">
                <div className="flex -space-x-2">
                  <div className="size-8 rounded-full bg-surface-elevated border border-background flex items-center justify-center text-[10px]">👤</div>
                  <div className="size-8 rounded-full bg-surface-elevated border border-background flex items-center justify-center text-[10px]">👤</div>
                  <div className="px-3 py-1 bg-surface-elevated rounded-full text-[10px] border border-border flex items-center ml-2">2 interested</div>
                </div>
                <button className="btn-primary text-xs py-2 px-6">View Detail</button>
              </div>
            </div>
          ))}
        </div>
      </main>
      <Footer />
    </div>
  );
}
