import { createFileRoute, Link } from "@tanstack/react-router";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { ScoreRing } from "@/components/ui/Immersive";

export const Route = createFileRoute("/talent")({
  component: TalentPage,
  head: () => ({ meta: [{ title: "The Community — LaunchHive" }] }),
});

function TalentPage() {
  const talent = [
    { 
      name: "Maya Chen", 
      role: "Visionary Builder", 
      skills: ["GTM Storytelling", "FDA Navigation", "Series A"], 
      industry: "Life Sciences",
      availability: "Fractional Support",
      summary: "I've built two companies from the ground up and love navigating the tricky parts of therapeutics licensing. I'm looking for a lab that's ready for its first leader.",
      matchScore: 92
    },
    { 
      name: "Jordan Park", 
      role: "Product Craftsman", 
      skills: ["SaaS Design", "Energy Systems", "Growth"], 
      industry: "Deep Tech / Energy",
      availability: "Full-time Focus",
      summary: "After years at Tesla, I want to bring my experience in energy systems to a pre-seed spinout. I love the messy early days of building something that matters.",
      matchScore: 88
    },
    { 
      name: "Rafael Ortiz", 
      role: "Strategic Guide", 
      skills: ["IP Strategy", "Legal Wisdom", "M&A"], 
      industry: "Across the Ecosystem",
      availability: "Advisory",
      summary: "I've spent my career in venture and now I want to give back to the university labs. I'm here to help you protect what you've built.",
      matchScore: 76
    },
    { 
      name: "Eliza Watts", 
      role: "Future Founder", 
      skills: ["Market Discovery", "Financial Storytelling"], 
      industry: "Biotech",
      availability: "Summer Journey",
      summary: "I'm finishing my MBA and have a deep love for molecular biology. I'm looking for a team where I can help translate science into a story.",
      matchScore: 82
    }
  ];

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Navbar />
      <main className="container-x py-24 flex-1 animate-in fade-in slide-in-from-bottom-8 duration-1000">
        <header className="flex flex-col md:flex-row md:items-end justify-between gap-12 mb-20">
          <div className="max-w-3xl space-y-6">
            <span className="chip bg-electric/10 text-electric border-electric/20 uppercase tracking-[0.25em] text-[10px] py-1 px-3">The Community</span>
            <h1 className="text-6xl font-display leading-tight">The people building Utah's future.</h1>
            <p className="text-xl text-muted-foreground leading-relaxed">
              Meet the builders, dreamers, and guides who make up our ecosystem. 
              We've organized this space to help you find the person who shares your vision.
            </p>
          </div>
          <div className="flex gap-3">
            <button className="chip bg-surface-elevated/50 px-6 py-3 text-foreground font-display text-sm hover:border-electric transition-all cursor-pointer">What they do</button>
            <button className="chip bg-surface-elevated/50 px-6 py-3 text-foreground font-display text-sm hover:border-electric transition-all cursor-pointer">What they know</button>
          </div>
        </header>

        <div className="grid md:grid-cols-2 gap-8">
          {talent.map((t) => (
            <div key={t.name} className="card-surface p-10 group hover:card-surface-hover relative overflow-hidden transition-all duration-700">
              <div className="absolute inset-0 radial-spot opacity-5 group-hover:opacity-10 transition-opacity" />
              
              <div className="flex items-start justify-between mb-8 relative">
                <div className="flex gap-6">
                  <div className="size-16 rounded-2xl bg-surface-elevated border border-border flex items-center justify-center text-3xl group-hover:scale-110 group-hover:text-electric transition-all duration-700 shadow-soft shrink-0">👤</div>
                  <div className="space-y-1">
                    <h2 className="text-3xl font-display group-hover:text-electric transition-colors">{t.name}</h2>
                    <div className="text-base text-muted-foreground italic">{t.role} · {t.availability}</div>
                  </div>
                </div>
                <div className="scale-110">
                  <ScoreRing score={t.matchScore} />
                </div>
              </div>
              
              <div className="flex flex-wrap gap-2 mb-8 relative">
                {t.skills.map(s => <span key={s} className="chip text-[11px] font-medium bg-surface-elevated/60">{s}</span>)}
                <span className="chip text-[11px] font-display text-bond border-bond/20 bg-bond/5">{t.industry}</span>
              </div>
              
              <p className="text-lg text-muted-foreground leading-relaxed italic relative line-clamp-3">
                "{t.summary}"
              </p>

              <div className="mt-12 pt-10 border-t border-border/60 flex items-center justify-between relative">
                <div className="flex items-center gap-3">
                  <span className="size-2 rounded-full bg-signal shadow-glow" />
                  <span className="text-[10px] font-mono text-muted-foreground uppercase tracking-[0.2em]">Verified Community Member</span>
                </div>
                <button className="btn-primary py-3 px-8 text-sm shadow-none hover:btn-primary-hover active:scale-95 transition-all">Request a Handshake</button>
              </div>
            </div>
          ))}
        </div>
      </main>
      <Footer />
    </div>
  );
}
