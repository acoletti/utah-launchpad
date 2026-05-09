import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { matches } from "@/lib/mock-data";
import { ScoreRing } from "./index";

export const Route = createFileRoute("/matches/$matchId")({
  component: MatchDetail,
  loader: ({ params }) => {
    const m = matches.find((x) => x.id === params.matchId);
    if (!m) throw notFound();
    return { match: m };
  },
  notFoundComponent: () => (
    <div className="min-h-screen flex items-center justify-center bg-background">
      <div className="text-center space-y-4">
        <div className="text-4xl">☹</div>
        <h1 className="text-xl font-display">Match not found.</h1>
        <Link to="/matches" className="btn-ghost">Back to Queue</Link>
      </div>
    </div>
  ),
  errorComponent: ({ error }) => (
    <div className="p-10 text-center">
      <h1 className="text-xl font-display">Error loading match</h1>
      <p className="text-muted-foreground">{error.message}</p>
    </div>
  ),
  head: ({ loaderData }) => ({ meta: [{ title: `${loaderData?.match.talent.name} ↔ ${loaderData?.match.startup.name} — LaunchHive` }] }),
});

function MatchDetail() {
  const { match: m } = Route.useLoaderData() as { match: typeof matches[number] };
  
  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Navbar />
      <main className="flex-1 container-x py-12">
        <div className="max-w-[1000px] mx-auto space-y-12">
          {/* Header Area */}
          <header className="space-y-6">
            <Link to="/matches" className="sidebar-item w-fit px-0 hover:bg-transparent group">
              <span className="group-hover:-translate-x-1 transition-transform">←</span> 
              <span>Back to Match Queue</span>
            </Link>
            
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-8">
              <div className="space-y-4 max-w-2xl">
                <div className="flex items-center gap-3">
                  <span className="chip bg-signal/10 text-signal border-signal/20 uppercase tracking-widest text-[10px]">Verified Match</span>
                  <span className="text-xs font-mono text-muted-foreground">{m.confidence} Confidence Level</span>
                </div>
                <h1 className="text-5xl font-display leading-[1.1]">
                  {m.talent.name} <span className="text-muted-foreground font-normal">↔</span> {m.startup.name}
                </h1>
                <p className="text-xl text-muted-foreground leading-relaxed">{m.talent.headline}</p>
              </div>
              <div className="shrink-0 pb-2">
                <div className="flex flex-col items-center gap-2">
                  <ScoreRing score={m.score} />
                  <span className="text-[10px] font-mono uppercase tracking-widest text-muted-foreground">Match Score</span>
                </div>
              </div>
            </div>
          </header>

          {/* Action Bar */}
          <div className="glass p-4 rounded-2xl flex flex-wrap items-center justify-between gap-4 sticky top-20 z-10">
            <div className="flex gap-2">
              <button className="btn-primary hover:btn-primary-hover active:btn-primary-active px-8 py-3">Request Introduction</button>
              <button className="btn-ghost hover:btn-ghost-hover px-6 py-3">Save</button>
            </div>
            <div className="flex items-center gap-4">
              <button className="text-xs text-muted-foreground hover:text-destructive transition-colors">Not Interested</button>
              <div className="w-px h-6 bg-border" />
              <button className="text-xs text-muted-foreground hover:text-foreground">Suggest Correction</button>
            </div>
          </div>

          <div className="grid md:grid-cols-[1fr_320px] gap-12 items-start">
            {/* Main Content - Notion Style */}
            <article className="space-y-16">
              <section className="space-y-6">
                <h2 className="text-[10px] font-mono uppercase tracking-[0.2em] text-electric">Reasoning Report</h2>
                <div className="space-y-4">
                  {m.reasons.map((r, i) => (
                    <div key={i} className="flex gap-4 group">
                      <div className="size-6 rounded-md bg-surface-elevated border border-border flex items-center justify-center text-[10px] font-mono text-electric shrink-0 mt-1">
                        {i + 1}
                      </div>
                      <p className="text-lg leading-relaxed text-foreground/90">{r}</p>
                    </div>
                  ))}
                </div>
              </section>

              <section className="space-y-6">
                <h2 className="text-[10px] font-mono uppercase tracking-[0.2em] text-bond">Gap Analysis</h2>
                <div className="grid gap-4">
                  {m.gaps.map((g, i) => (
                    <div key={i} className="flex gap-4 p-5 rounded-2xl bg-bond/5 border border-bond/20 group hover:bg-bond/10 transition-colors">
                      <span className="text-bond text-xl shrink-0 mt-0.5">⚠</span>
                      <p className="text-base text-bond leading-relaxed">{g}</p>
                    </div>
                  ))}
                </div>
              </section>

              <section className="space-y-6">
                <h2 className="text-[10px] font-mono uppercase tracking-[0.2em] text-signal">Recommended Next Steps</h2>
                <div className="grid gap-3">
                  {m.nextSteps.map((s, i) => (
                    <div key={i} className="flex items-center justify-between p-5 rounded-2xl bg-surface-elevated/40 border border-border hover:border-foreground transition-all group">
                      <div className="flex gap-4 items-center">
                        <span className="size-8 rounded-full bg-electric/10 text-electric flex items-center justify-center text-xs font-mono">{i + 1}</span>
                        <span className="text-base font-medium">{s}</span>
                      </div>
                      <div className="opacity-0 group-hover:opacity-100 transition-opacity">
                        <span className="text-electric">→</span>
                      </div>
                    </div>
                  ))}
                </div>
              </section>

              <section className="space-y-6">
                <h2 className="text-[10px] font-mono uppercase tracking-[0.2em] text-muted-foreground">Scoring Matrix</h2>
                <div className="grid sm:grid-cols-2 gap-x-12 gap-y-6">
                  {[
                    { k: "Skill Overlap", v: 92 },
                    { k: "Stage Alignment", v: 95 },
                    { k: "Risk Tolerance", v: 88 },
                    { k: "Mission Alignment", v: 96 },
                    { k: "Ecosystem Proximity", v: 84 },
                    { k: "Commercialization Fit", v: 90 },
                  ].map((s) => (
                    <div key={s.k} className="space-y-2">
                      <div className="flex justify-between text-[11px] font-mono uppercase text-muted-foreground">
                        <span>{s.k}</span>
                        <span>{s.v}%</span>
                      </div>
                      <div className="h-1 bg-muted rounded-full overflow-hidden">
                        <div className="h-full bg-electric rounded-full" style={{ width: `${s.v}%` }} />
                      </div>
                    </div>
                  ))}
                </div>
              </section>
            </article>

            {/* Sidebar Details */}
            <aside className="space-y-8 sticky top-40">
              <div className="card-surface p-6 space-y-6">
                <div>
                  <h3 className="text-[10px] font-mono uppercase tracking-widest text-muted-foreground mb-4">Startup Context</h3>
                  <div className="space-y-4">
                    <div>
                      <div className="text-xl font-display">{m.startup.name}</div>
                      <div className="text-xs text-muted-foreground mt-1">{m.startup.sector} · {m.startup.fundingStage}</div>
                    </div>
                    <p className="text-xs leading-relaxed text-muted-foreground line-clamp-4">
                      {m.startup.description}
                    </p>
                    <div className="pt-4 space-y-2">
                      <DetailRow k="Origin" v={m.startup.origin} />
                      <DetailRow k="TRL" v={`${m.startup.trl}/9`} />
                      <DetailRow k="Team" v={`${m.startup.team} People`} />
                    </div>
                  </div>
                </div>
                
                <div className="pt-6 border-t border-border">
                  <h3 className="text-[10px] font-mono uppercase tracking-widest text-muted-foreground mb-3">Utah Programs</h3>
                  <div className="flex flex-wrap gap-2">
                    {m.startup.utahPrograms.map(p => (
                      <span key={p} className="chip text-[9px] border-bond/30 text-bond bg-bond/5">{p}</span>
                    ))}
                  </div>
                </div>
              </div>

              <div className="glass p-6 rounded-2xl flex items-center gap-4">
                <div className="size-10 rounded-full bg-signal/10 text-signal flex items-center justify-center border border-signal/20">✓</div>
                <div>
                  <div className="text-xs font-bold">Trust Indicator</div>
                  <p className="text-[10px] text-muted-foreground leading-relaxed">Both parties verified via R1 network.</p>
                </div>
              </div>
            </aside>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}

function Section({ title, subtitle, children }: { title: string; subtitle?: string; children: React.ReactNode }) {
  return (
    <div className="card-surface p-8">
      <div className="flex items-baseline justify-between gap-4 flex-wrap">
        <h2 className="font-display text-2xl">{title}</h2>
        {subtitle && <p className="text-xs text-muted-foreground font-mono uppercase tracking-wider">{subtitle}</p>}
      </div>
      <div className="mt-5">{children}</div>
    </div>
  );
}

function DetailRow({ k, v }: { k: string; v: string }) {
  return (
    <div className="flex justify-between items-center text-[11px]">
      <span className="font-mono text-muted-foreground uppercase">{k}</span>
      <span className="font-medium">{v}</span>
    </div>
  );
}
