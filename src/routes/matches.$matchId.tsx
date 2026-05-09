import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { matches } from "@/lib/mock-data";
import { ScoreRing } from "@/components/ui/Immersive";

export const Route = createFileRoute("/matches/$matchId")({
  component: MatchDetail,
  loader: ({ params }) => {
    const m = matches.find((x) => x.id === params.matchId);
    if (!m) throw notFound();
    return { match: m };
  },
  notFoundComponent: () => (
    <div className="min-h-screen flex items-center justify-center bg-background px-4">
      <div className="text-center space-y-6">
        <div className="text-6xl animate-bounce">☹</div>
        <h1 className="text-3xl font-display">We couldn't find that match.</h1>
        <Link to="/matches" className="btn-ghost px-8 py-3">Back to your queue</Link>
      </div>
    </div>
  ),
  errorComponent: ({ error }) => (
    <div className="p-20 text-center space-y-4">
      <h1 className="text-2xl font-display">Something went wrong.</h1>
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
      <main className="flex-1 container-x py-20 animate-in fade-in slide-in-from-bottom-8 duration-1000">
        <div className="max-w-[1100px] mx-auto space-y-16">
          {/* Header Area */}
          <header className="space-y-10">
            <Link to="/matches" className="sidebar-item w-fit px-0 hover:bg-transparent group">
              <span className="group-hover:-translate-x-2 transition-transform duration-500">←</span> 
              <span className="font-display text-lg">Back to your queue</span>
            </Link>
            
            <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-12">
              <div className="space-y-6 max-w-3xl">
                <div className="flex items-center gap-4">
                  <span className="chip bg-signal/10 text-signal border-signal/20 uppercase tracking-[0.25em] text-[10px] py-1 px-3">Ecosystem Pairing</span>
                  <span className="text-[11px] font-mono text-muted-foreground uppercase tracking-widest">{m.confidence} Confidence Level</span>
                </div>
                <h1 className="text-6xl md:text-7xl font-display leading-[1.05]">
                  {m.talent.name} <span className="text-muted-foreground/40 font-normal">↔</span> {m.startup.name}
                </h1>
                <p className="text-2xl text-muted-foreground leading-relaxed italic">"{m.talent.headline}"</p>
              </div>
              <div className="shrink-0 pb-4">
                <div className="flex flex-col items-center gap-4">
                  <ScoreRing score={m.score} />
                  <span className="text-[11px] font-mono uppercase tracking-[0.25em] text-muted-foreground">Match Score</span>
                </div>
              </div>
            </div>
          </header>

          {/* Action Bar */}
          <div className="glass p-5 rounded-3xl flex flex-wrap items-center justify-between gap-6 sticky top-24 z-10 shadow-premium group">
            <div className="absolute inset-0 radial-spot opacity-5 group-hover:opacity-10 transition-opacity" />
            <div className="flex gap-4 relative">
              <button className="btn-primary px-10 py-4 text-base shadow-glow transition-all active:scale-95">Request a Handshake</button>
              <button className="btn-ghost px-8 py-4 text-base hover:btn-ghost-hover">Save for later</button>
            </div>
            <div className="flex items-center gap-6 relative">
              <button className="text-xs font-medium text-muted-foreground hover:text-destructive transition-colors">Not a fit</button>
              <div className="w-px h-8 bg-border/60" />
              <button className="text-xs font-medium text-muted-foreground hover:text-foreground transition-colors">Suggest a correction</button>
            </div>
          </div>

          <div className="grid lg:grid-cols-[1fr_360px] gap-16 items-start">
            {/* Main Content - Personal Letter Style */}
            <article className="space-y-24">
              <section className="space-y-8">
                <div className="space-y-2">
                  <h2 className="text-[11px] font-mono uppercase tracking-[0.3em] text-electric">The Why</h2>
                  <h3 className="text-3xl font-display">Why we think this is a match.</h3>
                </div>
                <div className="space-y-8">
                  {m.reasons.map((r, i) => (
                    <div key={i} className="flex gap-6 group">
                      <div className="size-8 rounded-xl bg-surface-elevated border border-border flex items-center justify-center text-xs font-mono text-electric shrink-0 mt-1 shadow-soft group-hover:scale-110 transition-transform">
                        {i + 1}
                      </div>
                      <p className="text-xl leading-relaxed text-foreground/90 font-medium italic">"{r}"</p>
                    </div>
                  ))}
                </div>
              </section>

              <section className="space-y-8">
                <div className="space-y-2">
                  <h2 className="text-[11px] font-mono uppercase tracking-[0.3em] text-bond">Considerations</h2>
                  <h3 className="text-3xl font-display">A few things to keep in mind.</h3>
                </div>
                <div className="grid gap-6">
                  {m.gaps.map((g, i) => (
                    <div key={i} className="flex gap-6 p-8 rounded-3xl bg-bond/5 border border-bond/20 group hover:bg-bond/10 transition-all duration-500">
                      <span className="text-bond text-2xl shrink-0 mt-0.5 animate-pulse">⚠</span>
                      <p className="text-lg text-bond/90 leading-relaxed font-medium">{g}</p>
                    </div>
                  ))}
                </div>
              </section>

              <section className="space-y-8">
                <div className="space-y-2">
                  <h2 className="text-[11px] font-mono uppercase tracking-[0.3em] text-signal">What's Next</h2>
                  <h3 className="text-3xl font-display">How to start the conversation.</h3>
                </div>
                <div className="grid gap-4">
                  {m.nextSteps.map((s, i) => (
                    <div key={i} className="flex items-center justify-between p-6 rounded-3xl bg-surface-elevated/40 border border-border hover:border-electric transition-all duration-500 group cursor-pointer shadow-soft">
                      <div className="flex gap-6 items-center">
                        <span className="size-10 rounded-full bg-electric/10 text-electric flex items-center justify-center text-sm font-mono shadow-inner">{i + 1}</span>
                        <span className="text-lg font-display">{s}</span>
                      </div>
                      <div className="opacity-0 group-hover:opacity-100 transition-all translate-x-2 group-hover:translate-x-0">
                        <span className="text-electric text-2xl">→</span>
                      </div>
                    </div>
                  ))}
                </div>
              </section>

              <section className="space-y-10">
                <div className="space-y-2">
                  <h2 className="text-[11px] font-mono uppercase tracking-[0.3em] text-muted-foreground">The Breakdown</h2>
                  <h3 className="text-3xl font-display">Our community metrics.</h3>
                </div>
                <div className="grid sm:grid-cols-2 gap-x-16 gap-y-10">
                  {[
                    { k: "Experience overlap", v: 92 },
                    { k: "Company stage fit", v: 95 },
                    { k: "Mission alignment", v: 88 },
                    { k: "Vision for the future", v: 96 },
                    { k: "Ecosystem proximity", v: 84 },
                    { k: "Commercial logic", v: 90 },
                  ].map((s) => (
                    <div key={s.k} className="space-y-3">
                      <div className="flex justify-between text-[11px] font-mono uppercase tracking-widest text-muted-foreground">
                        <span>{s.k}</span>
                        <span className="text-foreground">{s.v}%</span>
                      </div>
                      <div className="h-2 bg-muted/30 rounded-full overflow-hidden">
                        <div className="h-full bg-electric rounded-full shadow-glow transition-all duration-1000" style={{ width: `${s.v}%` }} />
                      </div>
                    </div>
                  ))}
                </div>
              </section>
            </article>

            {/* Sidebar Details */}
            <aside className="space-y-8 sticky top-48 animate-in fade-in slide-in-from-right-4 duration-1000 delay-500">
              <div className="card-surface p-8 space-y-8 relative overflow-hidden group">
                <div className="absolute inset-0 radial-spot opacity-5 group-hover:opacity-10 transition-opacity" />
                <div className="relative space-y-6">
                  <div>
                    <h3 className="text-[11px] font-mono uppercase tracking-[0.25em] text-muted-foreground mb-6">The Lab's Mission</h3>
                    <div className="space-y-4">
                      <div>
                        <div className="text-3xl font-display leading-tight">{m.startup.name}</div>
                        <div className="text-sm text-electric font-mono mt-2 uppercase tracking-widest">{m.startup.sector} · {m.startup.fundingStage}</div>
                      </div>
                      <p className="text-base leading-relaxed text-muted-foreground italic line-clamp-6">
                        "{m.startup.description}"
                      </p>
                      <div className="pt-8 space-y-4">
                        <DetailRow k="Origin" v={m.startup.origin} />
                        <DetailRow k="Technology Readiness" v={`Level ${m.startup.trl}`} />
                        <DetailRow k="Core Team" v={`${m.startup.team} Humans`} />
                      </div>
                    </div>
                  </div>
                  
                  <div className="pt-8 border-t border-border/60">
                    <h3 className="text-[11px] font-mono uppercase tracking-[0.25em] text-muted-foreground mb-4">Utah Ecosystem Support</h3>
                    <div className="flex flex-wrap gap-2">
                      {m.startup.utahPrograms.map(p => (
                        <span key={p} className="chip text-[10px] border-bond/30 text-bond bg-bond/5 px-3 py-1 font-mono">{p}</span>
                      ))}
                    </div>
                  </div>
                </div>
              </div>

              <div className="glass p-8 rounded-3xl flex items-center gap-6 relative overflow-hidden group">
                <div className="absolute inset-0 radial-spot opacity-5 group-hover:opacity-10 transition-opacity" />
                <div className="size-14 rounded-2xl bg-signal/10 text-signal flex items-center justify-center border border-signal/20 text-2xl shadow-soft group-hover:scale-110 transition-transform">✓</div>
                <div className="relative space-y-1">
                  <div className="text-sm font-display font-bold">Community Verified</div>
                  <p className="text-xs text-muted-foreground leading-relaxed">Both parties have been personally verified by the Nucleus network.</p>
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

function DetailRow({ k, v }: { k: string; v: string }) {
  return (
    <div className="flex justify-between items-baseline gap-4 py-1">
      <span className="text-[10px] font-mono text-muted-foreground uppercase tracking-widest shrink-0">{k}</span>
      <span className="text-sm font-display font-medium text-right">{v}</span>
    </div>
  );
}
