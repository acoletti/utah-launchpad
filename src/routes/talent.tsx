import { createFileRoute, Link } from "@tanstack/react-router";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { ScoreRing } from "@/routes/index";

export const Route = createFileRoute("/talent")({
  component: TalentPage,
  head: () => ({ meta: [{ title: "Talent Pool — LaunchHive" }] }),
});

function TalentPage() {
  const talent = [
    { 
      name: "Maya Chen", 
      role: "Commercial Operator", 
      skills: ["GTM", "FDA Pathway", "Series A"], 
      industry: "Life Sciences",
      availability: "Fractional",
      summary: "2x founder, former VP Commercial at BioHive startup. Expert in therapeutics licensing.",
      matchScore: 92
    },
    { 
      name: "Jordan Park", 
      role: "Product Lead", 
      skills: ["SaaS", "Energy Systems", "Growth"], 
      industry: "Deep Tech / Energy",
      availability: "Full-time",
      summary: "Ex-Tesla product manager looking to lead a pre-seed energy spinout from USU.",
      matchScore: 88
    },
    { 
      name: "Rafael Ortiz", 
      role: "Strategic Advisor", 
      skills: ["IP Strategy", "Legal", "M&A"], 
      industry: "All Sectors",
      availability: "Advisory",
      summary: "Venture partner at Utah-based fund. Offering pro-bono advisory for university spinouts.",
      matchScore: 76
    },
    { 
      name: "Eliza Watts", 
      role: "MBA Intern", 
      skills: ["Market Research", "Financial Modeling"], 
      industry: "Biotech",
      availability: "Internship",
      summary: "U of U MBA student with a background in molecular biology. Looking for summer analyst roles.",
      matchScore: 82
    }
  ];

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="container-x py-12 flex-1">
        <header className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
          <div className="max-w-2xl">
            <h1 className="font-display text-5xl">Ecosystem Talent</h1>
            <p className="text-muted-foreground mt-4 text-lg">Utah's builders, operators, and advisors — indexed by commercialization fit.</p>
          </div>
          <div className="flex gap-2">
            <button className="chip bg-surface-elevated px-4 py-2 text-foreground lowercase">Role Type</button>
            <button className="chip bg-surface-elevated px-4 py-2 text-foreground lowercase">Skills</button>
          </div>
        </header>

        <div className="grid md:grid-cols-2 gap-6">
          {talent.map((t) => (
            <div key={t.name} className="card-surface p-8 group hover:border-electric/50 transition-all">
              <div className="flex items-start justify-between mb-6">
                <div className="flex gap-4">
                  <div className="size-14 rounded-2xl bg-surface-elevated border border-border flex items-center justify-center text-2xl group-hover:bg-electric group-hover:text-electric-foreground transition-colors shrink-0">👤</div>
                  <div>
                    <h2 className="font-display text-2xl group-hover:text-electric transition-colors">{t.name}</h2>
                    <div className="text-sm text-muted-foreground mt-0.5">{t.role} · {t.availability}</div>
                  </div>
                </div>
                <ScoreRing score={t.matchScore} />
              </div>
              
              <div className="flex flex-wrap gap-2 mb-4">
                {t.skills.map(s => <span key={s} className="chip text-[10px]">{s}</span>)}
                <span className="chip text-[10px] text-bond border-bond/20">{t.industry}</span>
              </div>
              
              <p className="mt-4 text-sm text-muted-foreground leading-relaxed line-clamp-2">
                {t.summary}
              </p>

              <div className="mt-8 pt-8 border-t border-border flex items-center justify-between">
                <div className="text-[10px] font-mono text-muted-foreground uppercase tracking-widest">Verified · U of U Network</div>
                <button className="btn-ghost text-xs py-2 px-6 hover:bg-electric hover:text-electric-foreground hover:border-electric transition-all">Request Intro</button>
              </div>
            </div>
          ))}
        </div>
      </main>
      <Footer />
    </div>
  );
}
