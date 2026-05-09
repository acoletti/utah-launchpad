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
    { title: "Review top matches", desc: "3 high-confidence spinouts matched your background.", link: "/matches", icon: "✦" },
    { title: "Verify LinkedIn", desc: "Boost your match accuracy by syncing your latest experience.", link: "/onboarding", icon: "⌘" },
    { title: "Ecosystem Graph", desc: "Explore the connections in Utah's biotech cluster.", link: "/ecosystem", icon: "⌬" },
  ];

  const recentMatches = [
    { name: "Helix Therapeutics", role: "CEO / Founder", score: 92, sector: "Biotech", confidence: "High" },
    { name: "AltaGrid", role: "Fractional GTM", score: 88, sector: "Energy", confidence: "High" },
    { name: "Sentry Mesh", role: "Advisory", score: 76, sector: "Cyber", confidence: "Medium" },
  ];

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Navbar />
      <div className="flex-1 flex flex-col md:flex-row container-x py-8 gap-8">
        {/* Navigation Sidebar */}
        <aside className="w-full md:w-64 shrink-0 space-y-8">
          <div className="space-y-4">
            <div className="flex items-center gap-3 px-2">
              <div className="size-10 rounded-xl bg-surface-elevated border border-border flex items-center justify-center text-xl shadow-soft">👤</div>
              <div className="min-w-0">
                <div className="font-display text-sm truncate">Maya Chen</div>
                <div className="text-[10px] uppercase font-mono text-muted-foreground tracking-wider">Operator</div>
              </div>
            </div>
            
            <nav className="space-y-1">
              <SidebarLink to="/dashboard" label="Dashboard" active />
              <SidebarLink to="/matches" label="Match Queue" badge="3" />
              <SidebarLink to="/opportunities" label="Opportunities" />
              <SidebarLink to="/talent" label="Ecosystem Talent" />
              <div className="pt-4 pb-2 px-3 text-[10px] font-mono uppercase tracking-[0.2em] text-muted-foreground">Insights</div>
              <SidebarLink to="/ecosystem" label="Ecosystem Graph" />
              <SidebarLink to="/resources" label="Commercialization Docs" />
              <div className="pt-4 pb-2 px-3 text-[10px] font-mono uppercase tracking-[0.2em] text-muted-foreground">Admin</div>
              <SidebarLink to="/admin" label="Review Workflows" />
            </nav>
          </div>

          <div className="glass p-4 rounded-xl space-y-3">
            <div className="text-[10px] font-mono uppercase tracking-wider text-muted-foreground">Profile Status</div>
            <div className="flex items-center justify-between">
              <span className="text-xs font-medium">Verified Talent</span>
              <span className="text-[10px] bg-signal/10 text-signal border border-signal/20 px-1.5 py-0.5 rounded">Active</span>
            </div>
            <div className="h-1 bg-muted rounded-full overflow-hidden">
              <div className="h-full bg-electric w-[85%]" />
            </div>
            <p className="text-[10px] text-muted-foreground leading-relaxed">Your profile is visible to R1 founders and Nucleus admins.</p>
          </div>
        </aside>

        {/* Main Content Area */}
        <main className="flex-1 space-y-10">
          <header className="space-y-2">
            <h1 className="text-4xl font-display">Welcome back, Maya.</h1>
            <p className="text-muted-foreground">You have 3 new high-confidence matches waiting for review.</p>
          </header>

          {/* Quick Actions / Focus Area */}
          <section className="grid sm:grid-cols-3 gap-4">
            {nextActions.map((a) => (
              <Link 
                key={a.title} 
                to={a.link} 
                className="card-surface p-5 group hover:card-surface-hover relative overflow-hidden"
              >
                <div className="size-8 rounded-lg bg-surface-elevated border border-border flex items-center justify-center text-sm mb-4 group-hover:scale-110 transition-transform">
                  {a.icon}
                </div>
                <h3 className="font-display text-lg mb-1 group-hover:text-electric transition-colors">{a.title}</h3>
                <p className="text-xs text-muted-foreground leading-relaxed">{a.desc}</p>
                <div className="absolute top-0 right-0 p-3 opacity-0 group-hover:opacity-100 transition-opacity">
                  <span className="text-electric">→</span>
                </div>
              </Link>
            ))}
          </section>

          <div className="grid lg:grid-cols-[1fr_320px] gap-8">
            {/* Main Feed / Matches */}
            <section className="space-y-4">
              <div className="flex items-center justify-between mb-2">
                <h2 className="text-xs font-mono uppercase tracking-[0.2em] text-muted-foreground">Top Matches Today</h2>
                <Link to="/matches" className="text-xs text-electric hover:underline">View All Queue</Link>
              </div>
              
              <div className="space-y-3">
                {recentMatches.map((m) => (
                  <Link 
                    key={m.name} 
                    to="/matches" 
                    className="card-surface p-5 flex items-center gap-6 group hover:card-surface-hover"
                  >
                    <ScoreRing score={m.score} />
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 mb-1">
                        <h3 className="font-display text-lg truncate group-hover:text-electric transition-colors">{m.name}</h3>
                        <span className="chip text-[9px] py-0 px-1.5 border-signal/20 text-signal bg-signal/5 uppercase tracking-tighter">{m.confidence}</span>
                      </div>
                      <div className="text-xs text-muted-foreground">{m.role} · {m.sector}</div>
                    </div>
                    <div className="text-xs font-mono text-muted-foreground group-hover:text-electric transition-colors">Review →</div>
                  </Link>
                ))}
              </div>
            </section>

            {/* Sidebar / Insights */}
            <aside className="space-y-6">
              <div className="glass p-6 rounded-2xl space-y-4 relative overflow-hidden">
                <div className="absolute top-0 right-0 p-4 opacity-10">
                  <span className="text-4xl">💡</span>
                </div>
                <div className="text-[10px] font-mono uppercase tracking-[0.2em] text-electric">Ecosystem Insight</div>
                <h3 className="text-lg font-display leading-snug">Biotech spinouts often need regulatory operators.</h3>
                <p className="text-xs text-muted-foreground leading-relaxed">
                  U of U research in therapeutics currently has a 4:1 ratio of scientific founders to regulatory experts.
                </p>
                <button className="text-[10px] font-mono text-electric hover:underline uppercase tracking-widest">Read More</button>
              </div>

              <div className="card-surface p-6 space-y-4">
                <h3 className="text-sm font-display">Recent Activity</h3>
                <div className="space-y-4">
                  {[
                    { text: "Intro requested: Helix", time: "2h ago" },
                    { text: "Profile verified by Nucleus", time: "1d ago" },
                    { text: "Matched with AltaGrid", time: "2d ago" },
                  ].map((act, i) => (
                    <div key={i} className="flex gap-3">
                      <div className="size-1.5 rounded-full bg-muted mt-1.5 shrink-0" />
                      <div className="min-w-0">
                        <p className="text-[11px] text-foreground/90 truncate">{act.text}</p>
                        <p className="text-[9px] font-mono text-muted-foreground">{act.time}</p>
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
      className={`sidebar-item ${active ? "sidebar-item-active" : "sidebar-item-hover"}`}
    >
      <span className="flex-1">{label}</span>
      {badge && (
        <span className="bg-electric/20 text-electric text-[10px] px-1.5 py-0.5 rounded-md font-mono">
          {badge}
        </span>
      )}
    </Link>
  );
}
