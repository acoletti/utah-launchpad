import { createFileRoute, Link } from "@tanstack/react-router";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { matches } from "@/lib/mock-data";
import { useState } from "react";
import { 
  ImmersiveLayout, 
  Reveal, 
  TextScramble, 
  Magnetic, 
  ScoreRing 
} from "@/components/ui/Immersive";

export const Route = createFileRoute("/matches")({
  component: MatchesPage,
  head: () => ({ meta: [{ title: "Matches — LaunchHive" }] }),
});

function MatchesPage() {
  const [filter, setFilter] = useState<string>("all");
  const filters = ["all", "Executive", "Fractional", "Operator", "Student", "Mentor", "SME", "Investor"];
  const filtered = filter === "all" ? matches : matches.filter((m) => m.talent.archetype === filter);

  return (
    <ImmersiveLayout>
      <Navbar />
      <main className="flex-1 container-x py-12 relative z-10">
        <div className="max-w-[1000px] mx-auto space-y-12">
          <header className="flex flex-col md:flex-row md:items-end justify-between gap-8">
            <Reveal>
              <div className="space-y-4 max-w-2xl">
                <span className="chip bg-electric/10 text-electric border-electric/20 uppercase tracking-widest text-[10px] py-1 px-3">
                  <TextScramble text="Active Queue" delay={300} />
                </span>
                <h1 className="text-5xl font-display leading-tight">Six matches need your review.</h1>
                <p className="text-xl text-muted-foreground leading-relaxed">
                  We've identified these high-confidence pairings based on current U of U spinout needs and your commercialization profile.
                </p>
              </div>
            </Reveal>
            
            <Reveal delay={200}>
              <div className="flex gap-2 bg-surface-elevated/50 p-1.5 rounded-2xl border border-border shrink-0 backdrop-blur-md">
                {filters.map((f) => (
                  <button 
                    key={f} 
                    onClick={() => setFilter(f)} 
                    className={`px-4 py-2 rounded-xl text-[10px] font-mono uppercase tracking-wider transition-all ${
                      filter === f 
                        ? "bg-electric text-electric-foreground shadow-glow" 
                        : "text-muted-foreground hover:text-foreground"
                    }`}
                  >
                    {f}
                  </button>
                ))}
              </div>
            </Reveal>
          </header>

          <div className="space-y-6">
            {filtered.map((m, i) => (
              <Reveal key={m.id} delay={i * 100}>
                <div className="card-surface group hover:card-surface-hover overflow-hidden relative transition-all duration-700">
                  <div className="absolute top-0 right-0 p-8 opacity-0 group-hover:opacity-100 transition-all translate-y-2 group-hover:translate-y-0 duration-500">
                    <span className="text-electric font-mono text-[10px] uppercase tracking-[0.3em] animate-pulse">New Match</span>
                  </div>

                  <div className="p-10 grid md:grid-cols-[auto_1fr_auto] gap-12 items-start">
                    <div className="flex flex-col items-center gap-4">
                      <ScoreRing score={m.score} />
                      <span className="chip text-[9px] border-signal/20 text-signal bg-signal/5 uppercase tracking-widest font-mono">{m.confidence}</span>
                    </div>

                    <div className="space-y-8">
                      <div className="space-y-3">
                        <div className="flex items-center gap-4 text-[10px] font-mono uppercase tracking-[0.3em] text-muted-foreground">
                          <span className="px-2 py-0.5 rounded-sm bg-surface-elevated border border-border">{m.talent.archetype}</span>
                          <span className="text-electric">→</span>
                          <span className="text-bond px-2 py-0.5 rounded-sm bg-bond/5 border border-bond/20">{m.startup.sector}</span>
                        </div>
                        <h2 className="text-4xl font-display group-hover:text-electric transition-colors leading-tight">
                          {m.talent.name} <span className="text-muted-foreground/30 font-thin mx-2">/</span> {m.startup.name}
                        </h2>
                        <p className="text-lg text-muted-foreground leading-relaxed italic">"{m.talent.headline}"</p>
                      </div>

                      <div className="grid sm:grid-cols-2 gap-8">
                        {m.reasons.slice(0, 2).map((r, idx) => (
                          <div key={idx} className="flex gap-4 text-sm text-foreground/80 leading-relaxed group/reason">
                            <span className="text-electric font-mono text-xl opacity-20 group-hover/reason:opacity-100 transition-opacity">“</span>
                            <p>{r}</p>
                          </div>
                        ))}
                      </div>

                      <div className="pt-6 flex items-center gap-8">
                        <Link 
                          to="/matches/$matchId" 
                          params={{ matchId: m.id }} 
                          className="text-[10px] font-mono uppercase tracking-[0.3em] text-electric hover:text-foreground transition-colors flex items-center gap-2 group/link"
                        >
                          Read Reasoning Report <span className="group-hover/link:translate-x-1 transition-transform">→</span>
                        </Link>
                        <div className="flex -space-x-3">
                          {[1, 2, 3].map(j => (
                            <div key={j} className="size-8 rounded-full bg-surface-elevated border-2 border-background flex items-center justify-center text-[10px] font-mono shadow-soft">
                              {j === 1 ? "U" : j === 2 ? "B" : "S"}
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>

                    <div className="flex flex-col gap-3 shrink-0 md:pt-4">
                      <Magnetic strength={10}>
                        <button className="btn-primary py-4 px-10 text-xs shadow-glow hover:scale-105 active:scale-95 transition-all">Request Intro</button>
                      </Magnetic>
                      <Magnetic strength={5}>
                        <button className="btn-ghost py-4 px-10 text-xs hover:bg-surface-elevated/80 transition-all border-border/40">Save Match</button>
                      </Magnetic>
                      <button className="text-[9px] uppercase font-mono text-muted-foreground/40 hover:text-destructive text-center mt-4 transition-colors tracking-widest hover:tracking-[0.2em]">Not Interested</button>
                    </div>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>

          <Reveal variant="scale" delay={500}>
            <footer className="glass p-12 rounded-[2.5rem] flex flex-col md:flex-row items-center justify-between gap-8 border-dashed border-border/40 bg-surface/5">
              <div className="space-y-2 text-center md:text-left">
                <div className="text-[10px] font-mono uppercase tracking-[0.4em] text-muted-foreground/60">Ecosystem Trust Layer</div>
                <div className="text-2xl font-display">14 non-verified profiles were filtered this week.</div>
                <p className="text-xs text-muted-foreground">Maintaining a high-signal environment for Utah deep tech.</p>
              </div>
              <Magnetic strength={10}>
                <button className="btn-ghost px-10 py-4 text-[10px] font-mono uppercase tracking-widest hover:bg-surface-elevated transition-all">View Security Log</button>
              </Magnetic>
            </footer>
          </Reveal>
        </div>
      </main>
      <Footer />
    </ImmersiveLayout>
  );
}
