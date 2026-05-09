import { createFileRoute, Link } from "@tanstack/react-router";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { ScoreRing } from "@/routes/index";

export const Route = createFileRoute("/dashboard")({
  component: Dashboard,
  head: () => ({ meta: [{ title: "Dashboard — LaunchHive" }] }),
});

function Dashboard() {
  const nextActions = [
    { title: "Review your matches", desc: "We found 3 research spinouts that shared your vision.", link: "/matches", icon: "✦" },
    { title: "Update your story", desc: "The more context you give, the better we can match you.", link: "/onboarding", icon: "⌘" },
    { title: "Explore the graph", desc: "See how the Utah ecosystem is connected.", link: "/ecosystem", icon: "⌬" },
  ];

  const recentMatches = [
    { name: "Helix Therapeutics", role: "Founding Partner", score: 92, sector: "Biotech", confidence: "High" },
    { name: "AltaGrid", role: "GTM Lead", score: 88, sector: "Energy", confidence: "High" },
    { name: "Sentry Mesh", role: "Advisor", score: 76, sector: "Cyber", confidence: "Medium" },
  ];

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Navbar />
      <div className="flex-1 flex flex-col lg:flex-row container-x py-12 gap-12">
        {/* Navigation Sidebar */}
        <aside className="w-full lg:w-64 shrink-0 space-y-12">
          <div className="space-y-6">
            <div className="flex items-center gap-4 px-3">
              <div className="size-12 rounded-2xl bg-surface-elevated border border-border flex items-center justify-center text-2xl shadow-soft">👤</div>
              <div className="min-w-0">
                <div className="font-display text-lg truncate">Maya Chen</div>
                <div className="text-[10px] uppercase font-mono text-electric tracking-[0.2em]">Operator</div>
              </div>
            </div>
            
            <nav className="space-y-1.5">
              <SidebarLink to="/dashboard" label="Your Dashboard" active />
              <SidebarLink to="/matches" label="Match Queue" badge="3" />
              <SidebarLink to="/opportunities" label="Open Roles" />
              <SidebarLink to="/talent" label="The Community" />
              <div className="pt-6 pb-2 px-3 text-[10px] font-mono uppercase tracking-[0.25em] text-muted-foreground/60">The Ecosystem</div>
              <SidebarLink to="/ecosystem" label="Ecosystem Graph" />
              <SidebarLink to="/resources" label="Founder Docs" />
            </nav>
          </div>

          <div className="glass p-6 rounded-2xl space-y-4 relative overflow-hidden group">
            <div className="absolute inset-0 radial-spot opacity-5 group-hover:opacity-10 transition-opacity" />
            <div className="text-[10px] font-mono uppercase tracking-[0.2em] text-muted-foreground relative">Your Presence</div>
            <div className="flex items-center justify-between relative">
              <span className="text-sm font-display">Verified Founder</span>
              <span className="text-[10px] bg-signal/10 text-signal border border-signal/20 px-2 py-0.5 rounded-full font-mono">Active</span>
            </div>
            <div className="h-1.5 bg-muted/40 rounded-full overflow-hidden relative">
              <div className="h-full bg-electric w-[85%] shadow-glow" />
            </div>
            <p className="text-[11px] text-muted-foreground leading-relaxed relative italic">"Your profile is being shared with U of U research labs."</p>
          </div>
        </aside>

        {/* Main Content Area */}
        <main className="flex-1 space-y-16 animate-in fade-in slide-in-from-right-8 duration-1000">
          <header className="space-y-4">
            <h1 className="text-6xl font-display leading-tight">Welcome back, Maya.</h1>
            <p className="text-xl text-muted-foreground max-w-2xl">There are a few people who would love to talk to you about their spinouts.</p>
          </header>

          {/* Quick Actions / Focus Area */}
          <section className="grid sm:grid-cols-3 gap-6">
            {nextActions.map((a) => (
              <Link 
                key={a.title} 
                to={a.link} 
                className="card-surface p-8 group hover:card-surface-hover relative overflow-hidden"
              >
                <div className="size-12 rounded-xl bg-surface-elevated border border-border flex items-center justify-center text-xl mb-6 group-hover:scale-110 group-hover:text-electric transition-all duration-500 shadow-soft">
                  {a.icon}
                </div>
                <h3 className="font-display text-xl mb-2 group-hover:text-electric transition-colors">{a.title}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">{a.desc}</p>
                <div className="absolute bottom-0 right-0 p-6 opacity-0 group-hover:opacity-100 transition-all translate-y-2 group-hover:translate-y-0">
                  <span className="text-electric text-2xl">→</span>
                </div>
              </Link>
            ))}
          </section>

          <div className="grid lg:grid-cols-[1fr_360px] gap-12">
            {/* Main Feed / Matches */}
            <section className="space-y-8">
              <div className="flex items-center justify-between">
                <h2 className="text-[11px] font-mono uppercase tracking-[0.25em] text-muted-foreground">Matches waiting for review</h2>
                <Link to="/matches" className="text-xs text-electric hover:underline font-medium">View your full queue</Link>
              </div>
              
              <div className="space-y-4">
                {recentMatches.map((m) => (
                  <Link 
                    key={m.name} 
                    to="/matches" 
                    className="card-surface p-8 flex items-center gap-8 group hover:card-surface-hover"
                  >
                    <ScoreRing score={m.score} />
                    <div className="flex-1 min-w-0 space-y-1">
                      <div className="flex items-center gap-3">
                        <h3 className="font-display text-2xl truncate group-hover:text-electric transition-colors">{m.name}</h3>
                        <span className="chip text-[9px] py-0.5 px-2 border-signal/20 text-signal bg-signal/5 uppercase tracking-widest">{m.confidence} FIT</span>
                      </div>
                      <div className="text-sm text-muted-foreground">{m.role} · {m.sector}</div>
                    </div>
                    <div className="text-xs font-mono text-muted-foreground group-hover:text-electric transition-all translate-x-0 group-hover:translate-x-2">Review Story →</div>
                  </Link>
                ))}
              </div>
            </section>

            {/* Sidebar / Insights */}
            <aside className="space-y-8">
              <div className="glass p-10 rounded-3xl space-y-6 relative overflow-hidden group">
                <div className="absolute inset-0 radial-spot opacity-10 group-hover:opacity-20 transition-opacity" />
                <div className="text-[10px] font-mono uppercase tracking-[0.25em] text-electric relative">Ecosystem Insight</div>
                <h3 className="text-2xl font-display leading-tight relative">Biotech spinouts need more operators like you.</h3>
                <p className="text-sm text-muted-foreground leading-relaxed relative">
                  U of U research in therapeutics currently has a gap in regulatory expertise. Your background would be a huge asset here.
                </p>
                <button className="text-[11px] font-mono text-electric hover:underline uppercase tracking-[0.2em] relative">Read the full report</button>
              </div>

              <div className="card-surface p-8 space-y-6">
                <h3 className="text-[11px] font-mono uppercase tracking-[0.25em] text-muted-foreground">Recent Activity</h3>
                <div className="space-y-6">
                  {[
                    { text: "You requested an intro to Helix", time: "2h ago" },
                    { text: "Your profile was verified by Nucleus", time: "1d ago" },
                    { text: "You matched with AltaGrid", time: "2d ago" },
                  ].map((act, i) => (
                    <div key={i} className="flex gap-4 group">
                      <div className="size-2 rounded-full bg-electric/40 mt-1.5 shrink-0 group-hover:bg-electric transition-colors" />
                      <div className="min-w-0 space-y-1">
                        <p className="text-sm text-foreground/90 leading-snug">{act.text}</p>
                        <p className="text-[10px] font-mono text-muted-foreground uppercase tracking-widest">{act.time}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </aside>
          </div>
        </main>
      </div>
      <Footer />
    </div>
  );
}

function SidebarLink({ to, label, active = false, badge }: { to: string; label: string; active?: boolean; badge?: string }) {
  return (
    <Link
      to={to}
      className={`sidebar-item py-3 px-4 ${active ? "sidebar-item-active" : "sidebar-item-hover"} group transition-all duration-300`}
    >
      <span className="flex-1 font-display text-base">{label}</span>
      {badge && (
        <span className="bg-electric/20 text-electric text-[10px] px-2 py-0.5 rounded-full font-mono font-bold tracking-tighter">
          {badge}
        </span>
      )}
    </Link>
  );
}
