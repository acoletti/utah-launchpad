import { createFileRoute, Link } from "@tanstack/react-router";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";

export const Route = createFileRoute("/admin")({
  component: AdminPage,
  head: () => ({ meta: [{ title: "Community Stewardship — LaunchHive" }] }),
});

function AdminPage() {
  const reviewQueue = [
    { id: "1", name: "Dr. Aris Thorne", type: "Researcher", origin: "U of U", submitted: "2h ago", status: "New Story" },
    { id: "2", name: "Venture Partners LLC", type: "Service Provider", origin: "External", submitted: "5h ago", status: "Needs Care" },
    { id: "3", name: "Sarah Miller", type: "Executive", origin: "Ex-Qualtrics", submitted: "1d ago", status: "New Story" },
  ];

  const suggestedMatches = [
    { id: "m1", talent: "Maya Chen", startup: "Helix Therapeutics", score: 92, reason: "A shared vision for biotech GTM" },
    { id: "m2", talent: "Jordan Park", startup: "AltaGrid", score: 88, reason: "Deep roots in energy sector domain" },
  ];

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Navbar />
      <main className="flex-1 container-x py-16 animate-in fade-in slide-in-from-bottom-4 duration-1000">
        <header className="mb-16 max-w-2xl space-y-4">
          <div className="flex items-center gap-3">
            <span className="size-2 rounded-full bg-electric animate-pulse shadow-glow" />
            <span className="text-[10px] font-mono text-electric uppercase tracking-[0.25em]">Ecosystem Stewardship</span>
          </div>
          <h1 className="font-display text-5xl leading-tight">Caring for the community.</h1>
          <p className="text-xl text-muted-foreground leading-relaxed">
            Welcome the newest members of the Utah deep tech graph and help them find their first handshake.
          </p>
        </header>

        <div className="grid lg:grid-cols-3 gap-12">
          <section className="lg:col-span-2 space-y-12">
            <div className="card-surface p-0 overflow-hidden group">
              <div className="absolute inset-0 radial-spot opacity-5 group-hover:opacity-10 transition-opacity" />
              <div className="p-8 border-b border-border/60 flex items-center justify-between bg-surface-elevated/20 relative">
                <div className="space-y-1">
                  <h2 className="font-display text-2xl">New Stories</h2>
                  <p className="text-xs text-muted-foreground">People waiting to join the ecosystem.</p>
                </div>
                <div className="flex gap-2">
                  <button className="px-4 py-2 bg-background border border-border rounded-xl text-[10px] font-mono uppercase tracking-widest text-muted-foreground hover:text-foreground transition-all">All</button>
                  <button className="px-4 py-2 bg-background border border-electric/40 rounded-xl text-[10px] font-mono uppercase tracking-widest text-electric shadow-glow">Waiting</button>
                </div>
              </div>
              <div className="divide-y divide-border/60 relative">
                {reviewQueue.map((item) => (
                  <div key={item.id} className="p-8 flex items-center justify-between hover:bg-surface-elevated/30 transition-all duration-500">
                    <div className="flex items-center gap-6">
                      <div className="size-14 rounded-2xl bg-surface-elevated border border-border flex items-center justify-center font-display text-xl shadow-soft">{item.name[0]}</div>
                      <div className="space-y-1">
                        <div className="text-lg font-display">{item.name}</div>
                        <div className="text-sm text-muted-foreground font-mono uppercase tracking-widest text-[10px]">{item.type} · {item.origin}</div>
                      </div>
                    </div>
                    <div className="flex items-center gap-8">
                      <span className="text-[10px] font-mono text-muted-foreground uppercase tracking-widest">{item.submitted}</span>
                      <span className={`px-3 py-1 rounded-full text-[10px] font-mono uppercase tracking-widest ${item.status === "Needs Care" ? "bg-destructive/10 text-destructive border border-destructive/20" : "bg-electric/10 text-electric border border-electric/20"}`}>{item.status}</span>
                      <div className="flex gap-3">
                        <button className="size-10 rounded-xl border border-border flex items-center justify-center text-sm hover:bg-signal/10 hover:text-signal hover:border-signal/40 transition-all shadow-soft">✓</button>
                        <button className="size-10 rounded-xl border border-border flex items-center justify-center text-sm hover:bg-destructive/10 hover:text-destructive hover:border-destructive/40 transition-all shadow-soft">✕</button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
              <div className="p-6 bg-surface-elevated/10 text-center border-t border-border/60">
                <button className="text-[10px] font-mono text-muted-foreground hover:text-foreground uppercase tracking-[0.25em] transition-all">View 12 more members →</button>
              </div>
            </div>

            <div className="card-surface p-0 overflow-hidden group">
              <div className="absolute inset-0 radial-spot opacity-5 group-hover:opacity-10 transition-opacity" />
              <div className="p-8 border-b border-border/60 flex items-center justify-between bg-surface-elevated/20 relative">
                <div className="space-y-1">
                  <h2 className="font-display text-2xl">Potential Pairings</h2>
                  <p className="text-xs text-muted-foreground">Matches surfaced by the community agent.</p>
                </div>
                <button className="text-[10px] font-mono text-electric uppercase tracking-[0.25em] hover:underline">Batch Welcome</button>
              </div>
              <div className="divide-y divide-border/60 relative">
                {suggestedMatches.map((m) => (
                  <div key={m.id} className="p-8 flex items-center justify-between hover:bg-surface-elevated/30 transition-all duration-500">
                    <div className="flex items-center gap-12">
                      <div className="flex items-center gap-4">
                        <div className="text-base font-display">{m.talent}</div>
                        <div className="text-muted-foreground/40 font-display">↔</div>
                        <div className="text-base font-display">{m.startup}</div>
                      </div>
                      <div className="flex items-center gap-3">
                        <div className="size-2 rounded-full bg-signal shadow-glow" />
                        <span className="text-[11px] font-mono text-muted-foreground">{m.score}% FIT</span>
                      </div>
                      <span className="text-sm text-muted-foreground italic leading-relaxed">"{m.reason}"</span>
                    </div>
                    <div className="flex gap-4">
                      <button className="btn-ghost py-2 px-6 text-xs hover:btn-ghost-hover">Review Story</button>
                      <button className="btn-primary py-2 px-6 text-xs hover:btn-primary-hover shadow-none">Introduce</button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </section>

          <aside className="space-y-8 sticky top-32">
            <div className="card-surface p-8 space-y-8">
              <h3 className="text-[11px] font-mono uppercase tracking-[0.25em] text-muted-foreground">Stewardship Links</h3>
              <nav className="space-y-2">
                {["The Full Community", "Flagged Stories", "Match Archives", "Community Settings", "Sync to Affinity"].map(l => (
                  <button key={l} className="w-full text-left px-4 py-3 text-sm font-display text-muted-foreground hover:text-foreground hover:bg-surface-elevated/60 rounded-xl transition-all duration-300">
                    {l}
                  </button>
                ))}
              </nav>
            </div>
            
            <div className="glass p-8 space-y-6 relative overflow-hidden group">
              <div className="absolute inset-0 radial-spot opacity-10 group-hover:opacity-20 transition-opacity" />
              <h3 className="text-[11px] font-mono uppercase tracking-[0.25em] text-bond relative">Community Health</h3>
              <div className="space-y-6 relative">
                <div className="space-y-3">
                  <div className="flex justify-between text-[10px] font-mono uppercase tracking-widest text-muted-foreground">
                    <span>Talent/Lab Ratio</span>
                    <span className="text-foreground">1.4:1</span>
                  </div>
                  <div className="h-1.5 bg-background rounded-full overflow-hidden">
                    <div className="h-full bg-bond w-[60%] shadow-glow" />
                  </div>
                </div>
                <p className="text-xs text-muted-foreground leading-relaxed italic">
                  "We're seeing a lot of life science interest this week. Let's make sure we're supporting our aerospace labs equally."
                </p>
              </div>
            </div>
          </aside>
        </div>
      </main>
      <Footer />
    </div>
  );
}
