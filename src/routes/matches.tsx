import { createFileRoute, Link } from "@tanstack/react-router";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { matches } from "@/lib/mock-data";
import { ScoreRing } from "./index";
import { useState } from "react";

export const Route = createFileRoute("/matches")({
  component: MatchesPage,
  head: () => ({ meta: [{ title: "Matches — LaunchHive" }] }),
});

function MatchesPage() {
  const [filter, setFilter] = useState<string>("all");
  const filters = ["all", "Executive", "Fractional", "Operator", "Student", "Mentor", "SME", "Investor"];
  const filtered = filter === "all" ? matches : matches.filter((m) => m.talent.archetype === filter);

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Navbar />
      <main className="flex-1 container-x py-12">
        <div className="max-w-[1000px] mx-auto space-y-12">
          <header className="flex flex-col md:flex-row md:items-end justify-between gap-8">
            <div className="space-y-4 max-w-2xl">
              <span className="chip bg-electric/10 text-electric border-electric/20 uppercase tracking-widest text-[10px]">Active Queue</span>
              <h1 className="text-5xl font-display leading-tight">Six matches need your review.</h1>
              <p className="text-xl text-muted-foreground leading-relaxed">
                We've identified these high-confidence pairings based on current U of U spinout needs and your commercialization profile.
              </p>
            </div>
            
            <div className="flex gap-2 bg-surface-elevated/50 p-1 rounded-xl border border-border shrink-0">
              {filters.map((f) => (
                <button 
                  key={f} 
                  onClick={() => setFilter(f)} 
                  className={`px-4 py-2 rounded-lg text-xs font-medium transition-all ${
                    filter === f 
                      ? "bg-electric text-electric-foreground shadow-glow" 
                      : "text-muted-foreground hover:text-foreground"
                  }`}
                >
                  {f}
                </button>
              ))}
            </div>
          </header>

          <div className="space-y-4 animate-in fade-in slide-in-from-bottom-8 duration-700">
            {filtered.map((m) => (
              <div key={m.id} className="card-surface group hover:card-surface-hover overflow-hidden relative">
                <div className="absolute top-0 right-0 p-6 opacity-0 group-hover:opacity-100 transition-opacity">
                  <span className="text-electric font-mono text-[10px] uppercase tracking-widest">New Match</span>
                </div>

                <div className="p-8 grid md:grid-cols-[auto_1fr_auto] gap-10 items-start">
                  <div className="flex flex-col items-center gap-3">
                    <ScoreRing score={m.score} />
                    <span className="chip text-[9px] border-signal/20 text-signal bg-signal/5">{m.confidence}</span>
                  </div>

                  <div className="space-y-6">
                    <div className="space-y-2">
                      <div className="flex items-center gap-3 text-xs font-mono uppercase tracking-widest text-muted-foreground">
                        <span>{m.talent.archetype}</span>
                        <span>→</span>
                        <span className="text-bond">{m.startup.sector}</span>
                      </div>
                      <h2 className="text-3xl font-display group-hover:text-electric transition-colors">
                        {m.talent.name} <span className="text-muted-foreground font-normal">↔</span> {m.startup.name}
                      </h2>
                      <p className="text-base text-muted-foreground leading-relaxed line-clamp-1">{m.talent.headline}</p>
                    </div>

                    <div className="grid sm:grid-cols-2 gap-4">
                      {m.reasons.slice(0, 2).map((r, i) => (
                        <div key={i} className="flex gap-3 text-sm text-foreground/80 leading-relaxed italic">
                          <span className="text-electric font-mono">“</span>
                          <p>{r}</p>
                        </div>
                      ))}
                    </div>

                    <div className="pt-4 flex items-center gap-6">
                      <Link 
                        to="/matches/$matchId" 
                        params={{ matchId: m.id }} 
                        className="text-xs font-mono uppercase tracking-[0.2em] text-electric hover:underline"
                      >
                        Read Reasoning Report →
                      </Link>
                      <div className="flex -space-x-2">
                        <div className="size-6 rounded-full bg-surface-elevated border border-background flex items-center justify-center text-[8px] font-mono">U</div>
                        <div className="size-6 rounded-full bg-surface-elevated border border-background flex items-center justify-center text-[8px] font-mono">B</div>
                      </div>
                    </div>
                  </div>

                  <div className="flex flex-col gap-2 shrink-0 md:pt-4">
                    <button className="btn-primary py-2.5 px-6 text-xs hover:btn-primary-hover active:btn-primary-active">Request Intro</button>
                    <button className="btn-ghost py-2.5 px-6 text-xs hover:btn-ghost-hover">Save Match</button>
                    <button className="text-[10px] uppercase font-mono text-muted-foreground hover:text-destructive text-center mt-2 transition-colors">Not Interested</button>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <footer className="glass p-8 rounded-2xl flex flex-col md:flex-row items-center justify-between gap-6 border-dashed">
            <div className="space-y-1">
              <div className="text-[10px] font-mono uppercase tracking-widest text-muted-foreground">Ecosystem Trust Layer</div>
              <div className="text-lg font-display">14 non-verified profiles were filtered this week.</div>
            </div>
            <button className="btn-ghost px-6 py-2 text-xs">View Security Log</button>
          </footer>
        </div>
      </main>
      <Footer />
    </div>
  );
}
