import { createFileRoute, Link } from "@tanstack/react-router";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { useState } from "react";
import { OnboardingWizard } from "@/components/OnboardingWizard";

export const Route = createFileRoute("/onboarding")({
  component: OnboardingPage,
  head: () => ({ meta: [{ title: "Join the Ecosystem — LaunchHive" }] }),
});

type Step = { id: string; title: string };

function OnboardingPage() {
  const [userType, setUserType] = useState<string | null>(null);
  const [stage, setStage] = useState(0);
  const [formData, setFormData] = useState({
    lookingFor: "",
    experience: "",
    industries: "",
    startupStage: "",
    availability: "",
    roleType: "",
    links: "",
  });

  if (!userType) return <RolePicker onPick={setUserType} />;

  const steps: Step[] = [
    { id: "goals", title: "Commercial Goals" },
    { id: "expertise", title: "Domain Expertise" },
    { id: "logistics", title: "Fit & Logistics" },
    { id: "review", title: "Review Profile" },
  ];

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Navbar />
      <div className="flex-1 flex justify-center py-16 px-4">
        <OnboardingWizard steps={steps} currentStep={stage}>
          <div className="space-y-8">
            <header className="space-y-2">
              <span className="chip bg-electric/10 text-electric border-electric/20 uppercase tracking-widest text-[10px]">Step {stage + 1} of {steps.length}</span>
              <h1 className="text-4xl font-display text-foreground">
                {stage === 0 && "What are your commercial goals?"}
                {stage === 1 && "Tell us about your expertise."}
                {stage === 2 && "Logistics and availability."}
                {stage === 3 && "Confirm your ecosystem profile."}
              </h1>
            </header>

            <main>
              {stage === 0 && (
                <GoalsStep
                  data={formData}
                  update={(d: any) => setFormData({ ...formData, ...d })}
                  onContinue={() => setStage(1)}
                />
              )}
              {stage === 1 && (
                <ExpertiseStep
                  data={formData}
                  update={(d: any) => setFormData({ ...formData, ...d })}
                  onBack={() => setStage(0)}
                  onContinue={() => setStage(2)}
                />
              )}
              {stage === 2 && (
                <LogisticsStep
                  data={formData}
                  update={(d: any) => setFormData({ ...formData, ...d })}
                  onBack={() => setStage(1)}
                  onContinue={() => setStage(3)}
                />
              )}
              {stage === 3 && (
                <AIReviewStep
                  data={formData}
                  onBack={() => setStage(2)}
                />
              )}
            </main>
          </div>
        </OnboardingWizard>
      </div>
      <Footer />
    </div>
  );
}

function RolePicker({ onPick }: { onPick: (r: string) => void }) {
  const roles = [
    { id: "researcher", title: "Researcher / Founder", desc: "Spinning out deep tech from a lab.", icon: "⌬", color: "var(--bond)" },
    { id: "executive", title: "Executive / Operator", desc: "Scaling companies and commercializing.", icon: "⌖", color: "var(--electric)" },
    { id: "student", title: "Student / Intern", desc: "Learning the ropes in the ecosystem.", icon: "⌘", color: "var(--signal)" },
    { id: "advisor", title: "Advisor / Mentor", desc: "Guiding the next generation of founders.", icon: "⚗", color: "var(--foreground)" },
    { id: "admin", title: "Ecosystem Administrator", desc: "Managing programs or TTOs.", icon: "⏣", color: "var(--muted-foreground)" },
  ];

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Navbar />
      <main className="flex-1 flex flex-col items-center justify-center py-20 px-4 relative overflow-hidden">
        <div className="absolute inset-0 radial-spot opacity-30" />
        
        <div className="w-full max-w-[800px] relative">
          <div className="text-center mb-12 space-y-4">
            <span className="chip bg-electric/10 text-electric border-electric/20 uppercase tracking-widest text-[10px]">Join LaunchHive</span>
            <h1 className="text-6xl font-display leading-tight">Tell us who you are.</h1>
            <p className="text-xl text-muted-foreground max-w-xl mx-auto">We'll tailor your LaunchHive experience to your specific goals and role in the Utah ecosystem.</p>
          </div>

          <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-4">
            {roles.map((r) => (
              <button
                key={r.id}
                onClick={() => onPick(r.id)}
                className="card-surface p-8 text-left hover:card-surface-hover group transition-all duration-300 relative overflow-hidden"
              >
                <div 
                  className="size-14 rounded-2xl bg-surface-elevated border border-border flex items-center justify-center text-3xl group-hover:scale-110 transition-transform duration-500 mb-6 shadow-soft"
                  style={{ color: r.color }}
                >
                  {r.icon}
                </div>
                <h2 className="text-xl font-display mb-2 group-hover:text-electric transition-colors">{r.title}</h2>
                <p className="text-sm text-muted-foreground leading-relaxed">{r.desc}</p>
                
                <div className="absolute bottom-0 right-0 p-4 opacity-0 group-hover:opacity-100 transition-opacity translate-y-2 group-hover:translate-y-0 duration-300">
                  <span className="text-electric text-2xl">→</span>
                </div>
              </button>
            ))}
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}

function GoalsStep({ data, update, onContinue }: any) {
  return (
    <div className="card-surface p-10 space-y-8 animate-in fade-in slide-in-from-bottom-4">
      <div className="space-y-6">
        <div className="space-y-3">
          <label className="text-xs font-mono uppercase tracking-widest text-muted-foreground">What are you looking for?</label>
          <textarea
            value={data.lookingFor}
            onChange={(e) => update({ lookingFor: e.target.value })}
            placeholder="e.g., A founding CEO seat at a biotech spinout, or a part-time mentor for my life-science startup."
            className="w-full bg-surface-elevated border border-border rounded-xl px-5 py-4 text-base focus:outline-none focus:border-electric transition-all min-h-[140px] resize-none"
          />
        </div>
        <div className="space-y-4">
          <label className="text-xs font-mono uppercase tracking-widest text-muted-foreground">Preferred Engagement</label>
          <div className="grid grid-cols-2 gap-3">
            {["Full-time", "Fractional", "Advisory", "Board seat", "Internship", "Cofounder"].map((t) => (
              <button
                key={t}
                onClick={() => update({ roleType: t })}
                className={`px-4 py-4 text-sm border rounded-xl transition-all font-medium ${
                  data.roleType === t 
                    ? "bg-electric text-electric-foreground border-electric shadow-glow" 
                    : "bg-surface-elevated border-border text-muted-foreground hover:border-foreground hover:text-foreground"
                }`}
              >
                {t}
              </button>
            ))}
          </div>
        </div>
      </div>

      <div className="pt-4">
        <button 
          onClick={onContinue} 
          disabled={!data.lookingFor || !data.roleType} 
          className="btn-primary w-full py-4 text-base hover:btn-primary-hover active:btn-primary-active disabled:opacity-30"
        >
          Continue to Expertise
        </button>
      </div>
    </div>
  );
}

function ExpertiseStep({ data, update, onBack, onContinue }: any) {
  return (
    <div className="card-surface p-10 space-y-8 animate-in fade-in slide-in-from-bottom-4">
      <div className="space-y-6">
        <div className="space-y-3">
          <label className="text-xs font-mono uppercase tracking-widest text-muted-foreground">Key Experience</label>
          <textarea
            value={data.experience}
            onChange={(e) => update({ experience: e.target.value })}
            placeholder="e.g., 10 years in medical device commercialization, led two Series A rounds."
            className="w-full bg-surface-elevated border border-border rounded-xl px-5 py-4 text-base focus:outline-none focus:border-electric transition-all min-h-[140px] resize-none"
          />
        </div>
        <div className="space-y-3">
          <label className="text-xs font-mono uppercase tracking-widest text-muted-foreground">Industry Focus</label>
          <input
            value={data.industries}
            onChange={(e) => update({ industries: e.target.value })}
            placeholder="e.g., Biotech, SaaS, Advanced Manufacturing"
            className="w-full bg-surface-elevated border border-border rounded-xl px-5 py-4 text-base focus:outline-none focus:border-electric transition-all"
          />
          <p className="text-[10px] text-muted-foreground font-mono italic">Separate with commas</p>
        </div>
      </div>

      <div className="flex gap-4 pt-4">
        <button onClick={onBack} className="btn-ghost flex-1 py-4 hover:btn-ghost-hover">Back</button>
        <button 
          onClick={onContinue} 
          disabled={!data.experience} 
          className="btn-primary flex-2 py-4 hover:btn-primary-hover active:btn-primary-active disabled:opacity-30"
        >
          Continue
        </button>
      </div>
    </div>
  );
}

function LogisticsStep({ data, update, onBack, onContinue }: any) {
  return (
    <div className="card-surface p-10 space-y-8 animate-in fade-in slide-in-from-bottom-4">
      <div className="grid sm:grid-cols-2 gap-8">
        <div className="space-y-3">
          <label className="text-xs font-mono uppercase tracking-widest text-muted-foreground">Startup Stage</label>
          <div className="relative">
            <select
              value={data.startupStage}
              onChange={(e) => update({ startupStage: e.target.value })}
              className="w-full bg-surface-elevated border border-border rounded-xl px-5 py-4 text-base focus:outline-none focus:border-electric transition-all appearance-none"
            >
              <option value="">Select Stage</option>
              <option value="Pre-seed">Pre-seed (Ideation)</option>
              <option value="Seed">Seed (Spinout)</option>
              <option value="Series A">Series A (Growth)</option>
              <option value="Late Stage">Late Stage</option>
            </select>
            <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none text-muted-foreground">↓</div>
          </div>
        </div>
        <div className="space-y-3">
          <label className="text-xs font-mono uppercase tracking-widest text-muted-foreground">Weekly Availability</label>
          <input
            value={data.availability}
            onChange={(e) => update({ availability: e.target.value })}
            placeholder="e.g., 10-20 hrs"
            className="w-full bg-surface-elevated border border-border rounded-xl px-5 py-4 text-base focus:outline-none focus:border-electric transition-all"
          />
        </div>
      </div>
      <div className="space-y-3">
        <label className="text-xs font-mono uppercase tracking-widest text-muted-foreground">LinkedIn or Portfolio</label>
        <input
          value={data.links}
          onChange={(e) => update({ links: e.target.value })}
          placeholder="https://linkedin.com/in/..."
          className="w-full bg-surface-elevated border border-border rounded-xl px-5 py-4 text-base font-mono focus:outline-none focus:border-electric transition-all"
        />
      </div>

      <div className="flex gap-4 pt-4">
        <button onClick={onBack} className="btn-ghost flex-1 py-4 hover:btn-ghost-hover">Back</button>
        <button 
          onClick={onContinue} 
          disabled={!data.startupStage || !data.availability} 
          className="btn-primary flex-2 py-4 hover:btn-primary-hover active:btn-primary-active disabled:opacity-30"
        >
          Generate Profile
        </button>
      </div>
    </div>
  );
}

function AIReviewStep({ data, onBack }: any) {
  const [confirmed, setConfirmed] = useState(false);

  if (confirmed) {
    return (
      <div className="card-surface p-16 text-center animate-in zoom-in-95 duration-700">
        <div className="size-24 rounded-full bg-signal/10 text-signal grid place-items-center mx-auto text-4xl mb-8 border border-signal/20 shadow-glow">✓</div>
        <h2 className="text-4xl font-display mb-4">You're matched.</h2>
        <p className="text-lg text-muted-foreground max-w-sm mx-auto leading-relaxed">
          Based on your profile, we've identified 3 university spinouts ready for commercialization partners.
        </p>
        <div className="mt-12">
          <Link to="/dashboard" className="btn-primary px-12 py-4 text-base">
            Go to Dashboard
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4">
      <div className="card-surface p-10 relative overflow-hidden">
        <div className="absolute top-0 right-0 p-6">
          <span className="chip bg-electric/5 text-electric border-electric/20 text-[10px] font-mono">
            <span className="size-1.5 rounded-full bg-electric animate-pulse mr-2" />
            AI GENERATED
          </span>
        </div>
        
        <h2 className="text-3xl font-display mb-10">Review your profile.</h2>

        <div className="grid lg:grid-cols-2 gap-12">
          <div className="space-y-8">
            <section className="space-y-2">
              <h3 className="text-[10px] font-mono uppercase tracking-[0.2em] text-muted-foreground">Executive Summary</h3>
              <p className="text-base leading-relaxed text-foreground/90 italic">
                "Experienced commercial operator with a proven track record in deep-tech spinouts. Expert in navigating the TRL gap and building go-to-market strategies for university-born therapeutics."
              </p>
            </section>
            <section className="space-y-3">
              <h3 className="text-[10px] font-mono uppercase tracking-[0.2em] text-muted-foreground">Inferred Skills</h3>
              <div className="flex flex-wrap gap-2">
                {["FDA Pathway", "Series A Storytelling", "GTM Strategy", "Therapeutics", "IP Licensing"].map(s => (
                  <span key={s} className="chip bg-surface-elevated text-[11px] font-medium text-foreground">{s}</span>
                ))}
              </div>
            </section>
          </div>
          
          <div className="space-y-6">
            <div className="glass p-6 rounded-2xl space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-xs font-mono text-muted-foreground uppercase">Confidence Score</span>
                <span className="text-sm font-bold text-electric">85%</span>
              </div>
              <div className="h-1.5 bg-background rounded-full overflow-hidden">
                <div className="h-full bg-electric rounded-full w-[85%]" />
              </div>
              <p className="text-[10px] text-muted-foreground italic">Based on R1 database alignment.</p>
            </div>
            
            <div className="grid grid-cols-2 gap-4">
              <div className="p-5 rounded-2xl bg-surface-elevated/40 border border-border">
                <div className="text-[10px] font-mono uppercase text-muted-foreground mb-1">Availability</div>
                <div className="text-sm font-medium">{data.availability}</div>
              </div>
              <div className="p-5 rounded-2xl bg-surface-elevated/40 border border-border">
                <div className="text-[10px] font-mono uppercase text-muted-foreground mb-1">Risk Level</div>
                <div className="text-sm font-medium text-signal">Balanced</div>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-12 pt-8 border-t border-border flex items-center justify-between">
          <button onClick={onBack} className="text-sm text-muted-foreground hover:text-foreground transition-colors underline font-medium">Edit Details</button>
          <button onClick={() => setConfirmed(true)} className="btn-primary px-12 py-4 shadow-glow">
            Confirm & Finish
          </button>
        </div>
      </div>
    </div>
  );
}
