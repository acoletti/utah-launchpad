import { createFileRoute, Link } from "@tanstack/react-router";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";

export const Route = createFileRoute("/profile")({
  component: ProfilePage,
  head: () => ({ meta: [{ title: "My Ecosystem Profile — LaunchHive" }] }),
});

function ProfilePage() {
  const profileData = {
    name: "Maya Chen",
    role: "Visionary Builder / Operator",
    location: "Salt Lake City, UT",
    summary: "I've spent my career bridging the gap between world-class research and real-world impact. I'm especially passionate about helping therapeutics spinouts find their footing and scale within the Utah ecosystem.",
    skills: ["FDA Strategy", "Series A Narrative", "GTM Execution", "Life Sciences", "IP Licensing"],
    experience: [
      { company: "BioHive Startup", role: "VP Commercial", years: "2021 - 2024" },
      { company: "Salt Lake Health", role: "Director of Strategy", years: "2018 - 2021" },
    ],
    preferences: {
      stage: "The Seed Stage",
      availability: "10-20 hrs / week",
      risk: "Balanced Path",
      missions: ["Therapeutics", "Rare Disease", "Utah Ecosystem"]
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Navbar />
      <main className="container-x py-24 flex-1 animate-in fade-in slide-in-from-bottom-8 duration-1000">
        <div className="max-w-6xl mx-auto">
          <div className="flex flex-col lg:flex-row gap-16 items-start">
            {/* Sidebar / Avatar Area */}
            <aside className="w-full lg:w-80 shrink-0 lg:sticky lg:top-32">
              <div className="card-surface p-10 text-center space-y-8 relative overflow-hidden group">
                <div className="absolute inset-0 radial-spot opacity-5 group-hover:opacity-10 transition-opacity" />
                <div className="size-32 rounded-[2rem] bg-surface-elevated border border-border flex items-center justify-center text-5xl mx-auto shadow-soft group-hover:scale-105 transition-transform duration-700 relative">👤</div>
                <div className="space-y-2 relative">
                  <h1 className="text-3xl font-display leading-tight">{profileData.name}</h1>
                  <p className="text-sm text-muted-foreground italic">{profileData.role}</p>
                </div>
                <div className="space-y-3 relative pt-4">
                  <button className="btn-primary w-full py-4 text-sm shadow-none">Tell more of your story</button>
                  <button className="btn-ghost w-full py-4 text-sm">Download your story</button>
                </div>
                <div className="pt-8 border-t border-border/60 flex items-center justify-center gap-3 relative">
                  <span className="size-2 rounded-full bg-signal shadow-glow" />
                  <span className="text-[10px] font-mono text-muted-foreground uppercase tracking-widest">Verified Member</span>
                </div>
              </div>
            </aside>

            {/* Main Content Area */}
            <div className="flex-1 space-y-16">
              <section className="space-y-6">
                <h2 className="text-[11px] font-mono uppercase tracking-[0.3em] text-electric">Your Story</h2>
                <div className="card-surface p-10 bg-surface/30 group hover:card-surface-hover transition-all duration-700">
                  <p className="text-xl leading-relaxed text-foreground/90 font-medium italic italic-serif">"{profileData.summary}"</p>
                </div>
              </section>

              <section className="space-y-6">
                <h2 className="text-[11px] font-mono uppercase tracking-[0.3em] text-muted-foreground">The Strengths you bring</h2>
                <div className="flex flex-wrap gap-3">
                  {profileData.skills.map(s => (
                    <span key={s} className="chip bg-surface-elevated/60 border-border/60 px-6 py-3 text-base font-display hover:border-electric transition-colors">{s}</span>
                  ))}
                </div>
              </section>

              <div className="grid md:grid-cols-2 gap-10">
                <section className="space-y-6">
                  <h2 className="text-[11px] font-mono uppercase tracking-[0.3em] text-bond">What you're looking for</h2>
                  <div className="card-surface p-8 space-y-6">
                    <PreferenceItem label="Preferred Stage" value={profileData.preferences.stage} />
                    <PreferenceItem label="Weekly Time" value={profileData.preferences.availability} />
                    <PreferenceItem label="Risk Tolerance" value={profileData.preferences.risk} />
                  </div>
                </section>
                <section className="space-y-6">
                  <h2 className="text-[11px] font-mono uppercase tracking-[0.3em] text-signal">Missions that matter to you</h2>
                  <div className="card-surface p-8 flex flex-wrap gap-3 h-full items-start">
                    {profileData.preferences.missions.map(m => (
                      <span key={m} className="chip border-electric/20 text-electric bg-electric/5 text-xs font-display px-4 py-2 uppercase tracking-widest">{m}</span>
                    ))}
                  </div>
                </section>
              </div>

              <section className="space-y-8">
                <h2 className="text-[11px] font-mono uppercase tracking-[0.3em] text-muted-foreground">Your Milestones</h2>
                <div className="space-y-4">
                  {profileData.experience.map((ex) => (
                    <div key={ex.company} className="card-surface p-8 flex justify-between items-center group hover:card-surface-hover transition-all duration-500">
                      <div className="space-y-1">
                        <div className="text-2xl font-display group-hover:text-electric transition-colors">{ex.company}</div>
                        <div className="text-base text-muted-foreground italic">{ex.role}</div>
                      </div>
                      <div className="text-[10px] font-mono text-muted-foreground uppercase tracking-[0.25em]">{ex.years}</div>
                    </div>
                  ))}
                </div>
              </section>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}

function PreferenceItem({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex items-center justify-between py-1">
      <span className="text-base text-muted-foreground font-display">{label}</span>
      <span className="text-base font-display font-medium">{value}</span>
    </div>
  );
}
