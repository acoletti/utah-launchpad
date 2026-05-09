import { createFileRoute, Link } from "@tanstack/react-router";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";

export const Route = createFileRoute("/profile")({
  component: ProfilePage,
  head: () => ({ meta: [{ title: "My Profile — LaunchHive" }] }),
});

function ProfilePage() {
  const profileData = {
    name: "Maya Chen",
    role: "VP Commercial / Operator",
    location: "Salt Lake City, UT",
    summary: "Experienced commercial operator with a focus on deep-tech spinouts. Seeking to bridge the gap between academic research and market entry in the Utah ecosystem.",
    skills: ["FDA Pathway", "Series A Storytelling", "GTM Strategy", "Life Sciences", "BD Therapeutics"],
    experience: [
      { company: "BioHive Startup", role: "VP Commercial", years: "2021 - 2024" },
      { company: "Salt Lake Health", role: "Director of Strategy", years: "2018 - 2021" },
    ],
    preferences: {
      stage: "Seed",
      availability: "10-20 hrs/week",
      risk: "Balanced",
      missions: ["Therapeutics", "Rare Disease", "Utah Ecosystem"]
    }
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="container-x py-12 flex-1">
        <div className="max-w-4xl mx-auto">
          <div className="flex flex-col md:flex-row gap-12">
            <aside className="w-full md:w-64 shrink-0">
              <div className="card-surface p-8 text-center sticky top-24">
                <div className="size-24 rounded-3xl bg-surface-elevated border border-border flex items-center justify-center text-4xl mx-auto mb-6">👤</div>
                <h1 className="font-display text-2xl">{profileData.name}</h1>
                <p className="text-sm text-muted-foreground mt-1">{profileData.role}</p>
                <div className="mt-8 space-y-3">
                  <button className="btn-primary w-full text-sm">Edit Profile</button>
                  <button className="btn-ghost w-full text-sm">Download Resume</button>
                </div>
              </div>
            </aside>

            <div className="flex-1 space-y-10">
              <section>
                <h2 className="text-xs font-mono uppercase tracking-widest text-muted-foreground mb-4">Summary</h2>
                <div className="card-surface p-6">
                  <p className="text-lg leading-relaxed text-foreground/90">{profileData.summary}</p>
                </div>
              </section>

              <section>
                <h2 className="text-xs font-mono uppercase tracking-widest text-muted-foreground mb-4">Core Skills</h2>
                <div className="flex flex-wrap gap-2">
                  {profileData.skills.map(s => (
                    <span key={s} className="chip bg-surface-elevated border-border px-4 py-2 text-sm lowercase">{s}</span>
                  ))}
                </div>
              </section>

              <div className="grid sm:grid-cols-2 gap-8">
                <section>
                  <h2 className="text-xs font-mono uppercase tracking-widest text-muted-foreground mb-4">Match Preferences</h2>
                  <div className="card-surface p-6 space-y-4">
                    <PreferenceItem label="Startup Stage" value={profileData.preferences.stage} />
                    <PreferenceItem label="Availability" value={profileData.preferences.availability} />
                    <PreferenceItem label="Risk Tolerance" value={profileData.preferences.risk} />
                  </div>
                </section>
                <section>
                  <h2 className="text-xs font-mono uppercase tracking-widest text-muted-foreground mb-4">Mission Interests</h2>
                  <div className="card-surface p-6">
                    <div className="flex flex-wrap gap-2">
                      {profileData.preferences.missions.map(m => (
                        <span key={m} className="chip border-electric/30 text-electric bg-electric/5 text-[10px] uppercase tracking-wider">{m}</span>
                      ))}
                    </div>
                  </div>
                </section>
              </div>

              <section>
                <h2 className="text-xs font-mono uppercase tracking-widest text-muted-foreground mb-4">Experience</h2>
                <div className="space-y-4">
                  {profileData.experience.map((ex) => (
                    <div key={ex.company} className="card-surface p-6 flex justify-between items-center">
                      <div>
                        <div className="font-display text-lg">{ex.company}</div>
                        <div className="text-sm text-muted-foreground">{ex.role}</div>
                      </div>
                      <div className="text-xs font-mono text-muted-foreground uppercase">{ex.years}</div>
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
    <div className="flex items-center justify-between">
      <span className="text-sm text-muted-foreground">{label}</span>
      <span className="text-sm font-medium">{value}</span>
    </div>
  );
}
