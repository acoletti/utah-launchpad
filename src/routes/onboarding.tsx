import { createFileRoute, Link } from "@tanstack/react-router";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { useState, useCallback, useEffect, useMemo } from "react";
import { OnboardingWizard } from "@/components/OnboardingWizard";
import { 
  TextScramble, 
  Magnetic, 
  ImmersiveLayout 
} from "@/components/ui/Immersive";
import { useAudioTick } from "@/hooks/useHighFidelity";

export const Route = createFileRoute("/onboarding")({
  component: OnboardingPage,
  head: () => ({ meta: [{ title: "Join the Community — LaunchHive" }] }),
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
    { id: "goals", title: "What's next for you?" },
    { id: "expertise", title: "Your journey so far" },
    { id: "logistics", title: "The details" },
    { id: "review", title: "How's this look?" },
  ];

  return (
    <ImmersiveLayout>
      <Navbar />
      <div className="flex-1 flex justify-center py-24 px-4 relative z-10">
        <OnboardingWizard steps={steps} currentStep={stage}>
          <div className="space-y-12">
            <header className="space-y-4">
              <span className="chip bg-electric/10 text-electric border-electric/20 uppercase tracking-[0.2em] text-[10px] py-1 px-3">
                <TextScramble text={stage === 3 ? "The final check" : `Part ${stage + 1} of ${steps.length}`} delay={500} />
              </span>
              <h1 className="text-5xl font-display text-foreground leading-tight">
                {stage === 0 && "What are you dreaming of building?"}
                {stage === 1 && "Tell us about your story."}
                {stage === 2 && "A few practical details."}
                {stage === 3 && "This is how the community will see you."}
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
    </ImmersiveLayout>
  );
}


function RolePicker({ onPick }: { onPick: (r: string) => void }) {
  const roles = [
    { id: "researcher", title: "Researcher", desc: "You've made a discovery in the lab and you're ready to see it change the world.", icon: "⌬", color: "var(--bond)" },
    { id: "founder", title: "Founder", desc: "You're a builder looking for your next big mission in deep tech.", icon: "⌖", color: "var(--electric)" },
    { id: "mentor", title: "Mentor", desc: "You've been there before and want to help guide the next generation.", icon: "⚗", color: "var(--foreground)" },
    { id: "investor", title: "Investor", desc: "You see the potential before the pitch deck is perfect and you want first access to Utah's best deep-tech bets.", icon: "◈", color: "var(--signal)" },
    { id: "sme", title: "Subject-Matter Expert", desc: "You've spent years going deep in your field. Now you want to put that expertise to work where it actually matters.", icon: "⊕", color: "var(--bond)" },
    { id: "service-provider", title: "Service Provider", desc: "You offer the legal, financial, creative, or operational firepower that startups need to scale — and you want to be in the room.", icon: "⏣", color: "var(--muted-foreground)" },
  ];

  return (
    <div className="min-h-screen flex flex-col bg-background relative overflow-hidden">
      <div className="absolute inset-0 radial-spot opacity-30" />
      <Navbar />
      <main className="flex-1 flex flex-col items-center justify-center py-20 px-4 relative">
        <div className="w-full max-w-[1000px] relative space-y-12">
          <div className="text-center space-y-4">
            <span className="chip bg-electric/10 text-electric border-electric/20 uppercase tracking-[0.25em] text-[10px] py-1.5 px-4">
              <TextScramble text="Welcome to the hive" delay={300} />
            </span>
            <h1 className="text-6xl font-display leading-tight">Tell us about yourself.</h1>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto leading-relaxed">Choose the path that best describes where you are today. We'll take it from there.</p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {roles.map((r) => (
              <RoleCard key={r.id} role={r} onClick={() => onPick(r.id)} />
            ))}
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}

function RoleCard({ role, onClick }: { role: any; onClick: () => void }) {
  return (
    <Magnetic strength={15}>
      <button
        onClick={onClick}
        className="card-surface p-10 text-left hover:card-surface-hover group transition-all duration-500 relative overflow-hidden h-full w-full"
      >
        <div 
          className="size-16 rounded-2xl bg-surface-elevated border border-border flex items-center justify-center text-3xl group-hover:scale-110 transition-transform duration-700 mb-8 shadow-soft"
          style={{ color: role.color }}
        >
          {role.icon}
        </div>
        <h2 className="text-2xl font-display mb-3 group-hover:text-electric transition-colors">{role.title}</h2>
        <p className="text-base text-muted-foreground leading-relaxed">{role.desc}</p>
        
        <div className="absolute bottom-0 right-0 p-6 opacity-0 group-hover:opacity-100 transition-all translate-y-4 group-hover:translate-y-0 duration-500">
          <span className="text-electric text-3xl">→</span>
        </div>
      </button>
    </Magnetic>
  );
}


function GoalsStep({ data, update, onContinue }: any) {
  const playTick = useAudioTick();
  
  return (
    <div className="card-surface p-12 space-y-10 animate-in fade-in slide-in-from-bottom-6 duration-700">
      <div className="space-y-8">
        <div className="space-y-4">
          <label className="text-xs font-mono uppercase tracking-[0.2em] text-muted-foreground">In your own words...</label>
          <textarea
            value={data.lookingFor}
            onChange={(e) => update({ lookingFor: e.target.value })}
            placeholder="Tell us what you're hoping to find. Are you looking to lead a company, mentor a founder, or just explore what's possible in Utah deep tech?"
            className="w-full bg-surface-elevated/50 border border-border rounded-2xl px-6 py-5 text-lg focus:outline-none focus:border-electric transition-all min-h-[180px] resize-none leading-relaxed"
          />
        </div>
        <div className="space-y-6">
          <label className="text-xs font-mono uppercase tracking-[0.2em] text-muted-foreground">How would you like to be involved?</label>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
            {["Full-time", "Fractional", "Advisory", "Board seat", "Internship", "Cofounder"].map((t) => (
              <button
                key={t}
                onMouseEnter={playTick}
                onClick={() => { playTick(); update({ roleType: t }); }}
                className={`px-6 py-5 text-sm border rounded-2xl transition-all font-display ${
                  data.roleType === t 
                    ? "bg-electric text-electric-foreground border-electric shadow-glow scale-[1.02]" 
                    : "bg-surface-elevated/40 border-border text-muted-foreground hover:border-foreground hover:text-foreground"
                }`}
              >
                {t}
              </button>
            ))}
          </div>
        </div>
      </div>

      <div className="pt-6">
        <button 
          onClick={onContinue} 
          disabled={!data.lookingFor || !data.roleType} 
          className="btn-primary w-full py-5 text-lg hover:btn-primary-hover active:btn-primary-active disabled:opacity-20 transition-all"
        >
          Tell us about your journey →
        </button>
      </div>
    </div>
  );
}

function ExpertiseStep({ data, update, onBack, onContinue }: any) {
  return (
    <div className="card-surface p-12 space-y-10 animate-in fade-in slide-in-from-bottom-6 duration-700">
      <div className="space-y-8">
        <div className="space-y-4">
          <label className="text-xs font-mono uppercase tracking-[0.2em] text-muted-foreground">What have you built?</label>
          <textarea
            value={data.experience}
            onChange={(e) => update({ experience: e.target.value })}
            placeholder="Share the milestones of your career. Don't just list titles—tell us about the challenges you've faced and the impact you've made."
            className="w-full bg-surface-elevated/50 border border-border rounded-2xl px-6 py-5 text-lg focus:outline-none focus:border-electric transition-all min-h-[180px] resize-none leading-relaxed"
          />
        </div>
        <div className="space-y-4">
          <label className="text-xs font-mono uppercase tracking-[0.2em] text-muted-foreground">Which fields do you know best?</label>
          <input
            value={data.industries}
            onChange={(e) => update({ industries: e.target.value })}
            placeholder="e.g., Biotech, SaaS, Energy, Robotics"
            className="w-full bg-surface-elevated/50 border border-border rounded-2xl px-6 py-5 text-lg focus:outline-none focus:border-electric transition-all"
          />
          <p className="text-[11px] text-muted-foreground font-mono italic px-2">Separate with commas, or just write them out.</p>
        </div>
      </div>

      <div className="flex gap-6 pt-6">
        <button onClick={onBack} className="btn-ghost flex-1 py-5 hover:btn-ghost-hover">Wait, let's go back</button>
        <button 
          onClick={onContinue} 
          disabled={!data.experience} 
          className="btn-primary flex-2 py-5 text-lg hover:btn-primary-hover active:btn-primary-active disabled:opacity-20"
        >
          Almost there →
        </button>
      </div>
    </div>
  );
}

function LogisticsStep({ data, update, onBack, onContinue }: any) {
  return (
    <div className="card-surface p-12 space-y-10 animate-in fade-in slide-in-from-bottom-6 duration-700">
      <div className="grid sm:grid-cols-2 gap-10">
        <div className="space-y-4">
          <label className="text-xs font-mono uppercase tracking-[0.2em] text-muted-foreground">Company Stage</label>
          <div className="relative">
            <select
              value={data.startupStage}
              onChange={(e) => update({ startupStage: e.target.value })}
              className="w-full bg-surface-elevated/50 border border-border rounded-2xl px-6 py-5 text-lg focus:outline-none focus:border-electric transition-all appearance-none cursor-pointer font-display"
            >
              <option value="">Choose a stage</option>
              <option value="Pre-seed">Pre-seed (An idea or patent)</option>
              <option value="Seed">Seed (Building the core team)</option>
              <option value="Series A">Series A (Finding growth)</option>
              <option value="Late Stage">Late Stage (Scaling up)</option>
            </select>
            <div className="absolute right-6 top-1/2 -translate-y-1/2 pointer-events-none text-muted-foreground">↓</div>
          </div>
        </div>
        <div className="space-y-4">
          <label className="text-xs font-mono uppercase tracking-[0.2em] text-muted-foreground">Weekly Time</label>
          <input
            value={data.availability}
            onChange={(e) => update({ availability: e.target.value })}
            placeholder="e.g., 5-10 hours"
            className="w-full bg-surface-elevated/50 border border-border rounded-2xl px-6 py-5 text-lg focus:outline-none focus:border-electric transition-all"
          />
        </div>
      </div>
      <div className="space-y-4">
        <label className="text-xs font-mono uppercase tracking-[0.2em] text-muted-foreground">LinkedIn or Story link</label>
        <input
          value={data.links}
          onChange={(e) => update({ links: e.target.value })}
          placeholder="https://..."
          className="w-full bg-surface-elevated/50 border border-border rounded-2xl px-6 py-5 text-lg font-mono focus:outline-none focus:border-electric transition-all"
        />
      </div>

      <div className="flex gap-6 pt-6">
        <button onClick={onBack} className="btn-ghost flex-1 py-5 hover:btn-ghost-hover">Back a step</button>
        <button 
          onClick={onContinue} 
          disabled={!data.startupStage || !data.availability} 
          className="btn-primary flex-2 py-5 text-lg hover:btn-primary-hover active:btn-primary-active disabled:opacity-20"
        >
          Let's see the profile →
        </button>
      </div>
    </div>
  );
}

function AIReviewStep({ data, onBack }: any) {
  const [confirmed, setConfirmed] = useState(false);

  if (confirmed) {
    return (
      <div className="card-surface p-20 text-center animate-in zoom-in-95 duration-1000">
        <div className="size-28 rounded-full bg-signal/10 text-signal grid place-items-center mx-auto text-5xl mb-10 border border-signal/20 shadow-glow animate-pulse">✓</div>
        <h2 className="text-5xl font-display mb-6">You're in.</h2>
        <p className="text-xl text-muted-foreground max-w-sm mx-auto leading-relaxed">
          We've shared your story with the ecosystem. We already see a few matches that could be a great fit.
        </p>
        <div className="mt-16">
          <Link to="/dashboard" className="btn-primary px-16 py-6 text-xl shadow-glow">
            Take me to my dashboard
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-8 duration-1000">
      <div className="card-surface p-12 relative overflow-hidden group">
        <div className="absolute inset-0 radial-spot opacity-5 group-hover:opacity-10 transition-opacity" />
        <div className="absolute top-0 right-0 p-8">
          <span className="chip bg-electric/5 text-electric border-electric/20 text-[10px] font-mono tracking-widest">
            <span className="size-2 rounded-full bg-electric animate-pulse mr-2" />
            MATCH READY
          </span>
        </div>
        
        <h2 className="text-4xl font-display mb-12">How's this look?</h2>

        <div className="grid lg:grid-cols-2 gap-16">
          <div className="space-y-12">
            <section className="space-y-4">
              <h3 className="text-[11px] font-mono uppercase tracking-[0.25em] text-muted-foreground">Your story, summarized</h3>
              <p className="text-xl leading-relaxed text-foreground/90 italic">
                "An experienced builder who knows how to navigate the messy middle of deep tech. You're looking for a mission that matters, and you have the GTM scars to prove you can handle it."
              </p>
            </section>
            <section className="space-y-4">
              <h3 className="text-[11px] font-mono uppercase tracking-[0.25em] text-muted-foreground">Your strengths</h3>
              <div className="flex flex-wrap gap-3">
                {["Storytelling", "IP Strategy", "GTM Execution", "Deep Tech Native", "IP Licensing"].map(s => (
                  <span key={s} className="chip bg-surface-elevated/60 text-xs font-display text-foreground px-4 py-2 border-border/60">{s}</span>
                ))}
              </div>
            </section>
          </div>
          
          <div className="space-y-8">
            <div className="glass p-8 rounded-3xl space-y-6 relative overflow-hidden">
              <div className="flex items-center justify-between relative">
                <span className="text-[11px] font-mono text-muted-foreground uppercase tracking-widest">Ecosystem Alignment</span>
                <span className="text-lg font-bold text-electric">85%</span>
              </div>
              <div className="h-2 bg-background/50 rounded-full overflow-hidden relative">
                <div className="h-full bg-electric rounded-full w-[85%] shadow-glow" />
              </div>
              <p className="text-xs text-muted-foreground italic leading-relaxed relative">
                "Your background in therapeutics aligns perfectly with current research spinouts at the U of U."
              </p>
            </div>
            
            <div className="grid grid-cols-2 gap-6">
              <div className="p-6 rounded-3xl bg-surface-elevated/30 border border-border/40">
                <div className="text-[11px] font-mono uppercase text-muted-foreground mb-2 tracking-widest">Time</div>
                <div className="text-lg font-display">{data.availability}</div>
              </div>
              <div className="p-6 rounded-3xl bg-surface-elevated/30 border border-border/40">
                <div className="text-[11px] font-mono uppercase text-muted-foreground mb-2 tracking-widest">Path</div>
                <div className="text-lg font-display text-signal">Balanced</div>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-16 pt-10 border-t border-border/60 flex items-center justify-between">
          <button onClick={onBack} className="text-sm text-muted-foreground hover:text-foreground transition-colors underline underline-offset-8 font-medium">Wait, I need to edit something</button>
          <button onClick={() => setConfirmed(true)} className="btn-primary px-16 py-6 text-lg shadow-glow transition-all active:scale-95">
            Looks good, let's go
          </button>
        </div>
      </div>
    </div>
  );
}
