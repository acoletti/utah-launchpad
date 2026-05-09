import { createFileRoute, Link } from "@tanstack/react-router";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";

export const Route = createFileRoute("/admin")({
  component: AdminPage,
  head: () => ({ meta: [{ title: "Admin Review — LaunchHive" }] }),
});

function AdminPage() {
  const reviewQueue = [
    { id: "1", name: "Dr. Aris Thorne", type: "Researcher", origin: "U of U", submitted: "2h ago", status: "Pending" },
    { id: "2", name: "Venture Partners LLC", type: "Service Provider", origin: "External", submitted: "5h ago", status: "Flagged" },
    { id: "3", name: "Sarah Miller", type: "Executive", origin: "Ex-Qualtrics", submitted: "1d ago", status: "Pending" },
  ];

  const suggestedMatches = [
    { id: "m1", talent: "Maya Chen", startup: "Helix Therapeutics", score: 92, reason: "Life Science GTM match" },
    { id: "m2", talent: "Jordan Park", startup: "AltaGrid", score: 88, reason: "Energy sector domain expert" },
  ];

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Navbar />
      <main className="flex-1 container-x py-10">
        <header className="mb-10">
          <div className="flex items-center gap-2 mb-2">
            <span className="size-2 rounded-full bg-electric animate-pulse" />
            <span className="text-xs font-mono text-electric uppercase tracking-widest">Admin Dashboard</span>
          </div>
          <h1 className="font-display text-4xl">Review Workflows</h1>
        </header>

        <div className="grid lg:grid-cols-3 gap-8">
          <section className="lg:col-span-2 space-y-8">
            <div className="card-surface p-0 overflow-hidden">
              <div className="p-6 border-b border-border flex items-center justify-between bg-surface-elevated/30">
                <h2 className="font-display text-xl">Review Queue</h2>
                <div className="flex gap-2">
                  <button className="px-3 py-1 bg-background border border-border rounded text-[10px] font-mono uppercase tracking-wider text-muted-foreground hover:text-foreground">All</button>
                  <button className="px-3 py-1 bg-background border border-border rounded text-[10px] font-mono uppercase tracking-wider text-electric">Pending</button>
                </div>
              </div>
              <div className="divide-y divide-border">
                {reviewQueue.map((item) => (
                  <div key={item.id} className="p-5 flex items-center justify-between hover:bg-surface-elevated/20 transition-colors">
                    <div className="flex items-center gap-4">
                      <div className="size-10 rounded bg-surface-elevated border border-border flex items-center justify-center font-display text-sm">{item.name[0]}</div>
                      <div>
                        <div className="text-sm font-medium">{item.name}</div>
                        <div className="text-xs text-muted-foreground">{item.type} · {item.origin}</div>
                      </div>
                    </div>
                    <div className="flex items-center gap-6">
                      <span className="text-[10px] font-mono text-muted-foreground">{item.submitted}</span>
                      <span className={`px-2 py-0.5 rounded text-[10px] font-mono uppercase ${item.status === "Flagged" ? "bg-destructive/10 text-destructive border border-destructive/20" : "bg-electric/10 text-electric border border-electric/20"}`}>{item.status}</span>
                      <div className="flex gap-2">
                        <button className="size-8 rounded border border-border flex items-center justify-center text-xs hover:bg-signal/10 hover:text-signal hover:border-signal/30 transition-all">✓</button>
                        <button className="size-8 rounded border border-border flex items-center justify-center text-xs hover:bg-destructive/10 hover:text-destructive hover:border-destructive/30 transition-all">✕</button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
              <div className="p-4 bg-surface-elevated/10 text-center">
                <button className="text-xs font-mono text-muted-foreground hover:text-foreground uppercase tracking-widest">View 12 more in queue</button>
              </div>
            </div>

            <div className="card-surface p-0 overflow-hidden">
              <div className="p-6 border-b border-border flex items-center justify-between bg-surface-elevated/30">
                <h2 className="font-display text-xl">System-Suggested Matches</h2>
                <button className="text-[10px] font-mono text-electric uppercase tracking-wider hover:underline">Batch Approve</button>
              </div>
              <div className="divide-y divide-border">
                {suggestedMatches.map((m) => (
                  <div key={m.id} className="p-6 flex items-center justify-between">
                    <div className="flex items-center gap-8">
                      <div className="flex items-center gap-3">
                        <div className="text-sm font-medium">{m.talent}</div>
                        <div className="text-muted-foreground">→</div>
                        <div className="text-sm font-medium">{m.startup}</div>
                      </div>
                      <div className="flex items-center gap-2">
                        <div className="size-1.5 rounded-full bg-signal" />
                        <span className="text-xs font-mono">{m.score}%</span>
                      </div>
                      <span className="text-xs text-muted-foreground italic">"{m.reason}"</span>
                    </div>
                    <div className="flex gap-2">
                      <button className="btn-ghost py-1 px-4 text-xs">Review Reasoning</button>
                      <button className="btn-primary py-1 px-4 text-xs">Curate</button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </section>

          <aside className="space-y-6">
            <div className="card-surface p-6">
              <h3 className="font-display text-lg mb-4">Admin Quick Links</h3>
              <nav className="space-y-2">
                {["Approved Profiles", "Flagged Profiles", "Match History", "Ecosystem Settings", "Export to Affinity"].map(l => (
                  <button key={l} className="w-full text-left px-3 py-2 text-sm text-muted-foreground hover:text-foreground hover:bg-surface-elevated/50 rounded transition-all">{l}</button>
                ))}
              </nav>
            </div>
            
            <div className="card-surface p-6 bg-bond/5 border-bond/20">
              <h3 className="font-display text-lg text-bond mb-3">Ecosystem Health</h3>
              <div className="space-y-4">
                <div>
                  <div className="flex justify-between text-[10px] font-mono uppercase text-muted-foreground mb-1">
                    <span>Talent/Startup Ratio</span>
                    <span>1.4:1</span>
                  </div>
                  <div className="h-1 bg-background rounded-full overflow-hidden">
                    <div className="h-full bg-bond w-[60%]" />
                  </div>
                </div>
                <div className="text-xs text-muted-foreground leading-relaxed">
                  Deep tech matching is currently biased towards life sciences. Consider sourcing more physical science operators.
                </div>
              </div>
            </div>
          </aside>
        </div>
      </main>
      <Footer />
    </div>
  );
}
