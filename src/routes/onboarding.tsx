import { createFileRoute, Link } from "@tanstack/react-router";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { useState } from "react";
import { OnboardingWizard } from "@/components/OnboardingWizard";
import { Slider } from "@/components/ui/slider";
import { ENGAGEMENT_TYPES, INDUSTRIES, STARTUP_STAGES } from "@/lib/schemas/sme";

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
  if (userType === "sme") return <SMEOnboardingFlow onBack={() => setUserType(null)} />;

  const steps: Step[] = [
    { id: "goals", title: "What's next for you?" },
    { id: "expertise", title: "Your journey so far" },
    { id: "logistics", title: "The details" },
    { id: "review", title: "How's this look?" },
  ];

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Navbar />
      <div className="flex-1 flex justify-center py-24 px-4">
        <OnboardingWizard steps={steps} currentStep={stage}>
          <div className="space-y-12">
            <header className="space-y-4">
              <span className="chip bg-electric/10 text-electric border-electric/20 uppercase tracking-[0.2em] text-[10px] py-1 px-3">
                {stage === 3 ? "The final check" : `Part ${stage + 1} of ${steps.length}`}
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
    </div>
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
    <div className="min-h-screen flex flex-col bg-background">
      <Navbar />
      <main className="flex-1 flex flex-col items-center justify-center py-24 px-4 relative overflow-hidden">
        <div className="absolute inset-0 radial-spot opacity-30" />
        
        <div className="w-full max-w-[1000px] relative space-y-16">
          <div className="text-center space-y-6">
            <span className="chip bg-electric/10 text-electric border-electric/20 uppercase tracking-[0.25em] text-[10px] py-1.5 px-4">Welcome to the hive</span>
            <h1 className="text-7xl font-display leading-tight">Tell us about yourself.</h1>
            <p className="text-2xl text-muted-foreground max-w-2xl mx-auto leading-relaxed">Choose the path that best describes where you are today. We'll take it from there.</p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {roles.map((r) => (
              <button
                key={r.id}
                onClick={() => onPick(r.id)}
                className="card-surface p-10 text-left hover:card-surface-hover group transition-all duration-500 relative overflow-hidden"
              >
                <div 
                  className="size-16 rounded-2xl bg-surface-elevated border border-border flex items-center justify-center text-3xl group-hover:scale-110 transition-transform duration-700 mb-8 shadow-soft"
                  style={{ color: r.color }}
                >
                  {r.icon}
                </div>
                <h2 className="text-2xl font-display mb-3 group-hover:text-electric transition-colors">{r.title}</h2>
                <p className="text-base text-muted-foreground leading-relaxed">{r.desc}</p>
                
                <div className="absolute bottom-0 right-0 p-6 opacity-0 group-hover:opacity-100 transition-all translate-y-4 group-hover:translate-y-0 duration-500">
                  <span className="text-electric text-3xl">→</span>
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
                onClick={() => update({ roleType: t })}
                className={`px-6 py-5 text-sm border rounded-2xl transition-all font-display ${
                  data.roleType === t 
                    ? "bg-electric text-electric-foreground border-electric shadow-glow" 
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

// ─── Shared SME primitives ────────────────────────────────────────────────────

type SMEData = {
  firstName: string; lastName: string; email: string;
  city: string; state: string; zip: string; country: string; address: string;
  linkedinUrl: string; currentOrganization: string; currentTitle: string; professionalHistory: string;
  industries: string[]; otherIndustry: string; skills: string;
  engagementTypes: string[];
  startupStageExpertise: string[]; technicalBusinessDepth: number;
  researchIpHistory: boolean; researchIpDetail: string;
  keyAchievement: string; monthlyAvailability: string;
};

const SME_DEFAULT: SMEData = {
  firstName: "", lastName: "", email: "",
  city: "", state: "", zip: "", country: "United States", address: "",
  linkedinUrl: "", currentOrganization: "", currentTitle: "", professionalHistory: "",
  industries: [], otherIndustry: "", skills: "",
  engagementTypes: [],
  startupStageExpertise: [], technicalBusinessDepth: 5,
  researchIpHistory: false, researchIpDetail: "",
  keyAchievement: "", monthlyAvailability: "",
};

const INPUT_CLS = "w-full bg-surface-elevated/50 border border-border rounded-2xl px-6 py-5 text-lg focus:outline-none focus:border-electric transition-all";
const TEXTAREA_CLS = INPUT_CLS + " resize-none leading-relaxed";

function SmeField({ label, children, optional }: { label: string; children: React.ReactNode; optional?: boolean }) {
  return (
    <div className="space-y-3">
      <label className="text-xs font-mono uppercase tracking-[0.2em] text-muted-foreground">
        {label}{optional && <span className="ml-2 text-muted-foreground/40 normal-case tracking-normal not-uppercase">(optional)</span>}
      </label>
      {children}
    </div>
  );
}

function MultiSelect({ options, selected, onChange }: { options: readonly string[]; selected: string[]; onChange: (v: string[]) => void }) {
  const toggle = (opt: string) =>
    onChange(selected.includes(opt) ? selected.filter(x => x !== opt) : [...selected, opt]);
  return (
    <div className="flex flex-wrap gap-3">
      {options.map(opt => (
        <button key={opt} type="button" onClick={() => toggle(opt)}
          className={`px-5 py-3 text-sm border rounded-2xl transition-all font-display ${
            selected.includes(opt)
              ? "bg-electric text-electric-foreground border-electric shadow-glow"
              : "bg-surface-elevated/40 border-border text-muted-foreground hover:border-foreground hover:text-foreground"
          }`}
        >{opt}</button>
      ))}
    </div>
  );
}

// ─── SME flow container ───────────────────────────────────────────────────────

function SMEOnboardingFlow({ onBack }: { onBack: () => void }) {
  const [stage, setStage] = useState(0);
  const [data, setData] = useState<SMEData>(SME_DEFAULT);
  const update = (d: Partial<SMEData>) => setData(prev => ({ ...prev, ...d }));

  const steps = [
    { id: "identity",   title: "Your identity"        },
    { id: "foundation", title: "Your foundation"      },
    { id: "domain",     title: "Your domain"          },
    { id: "engagement", title: "How you engage"       },
    { id: "expertise",  title: "Your expertise"       },
    { id: "impact",     title: "Research & impact"    },
    { id: "review",     title: "How's this look?"     },
  ];

  const headings = [
    "Tell us who you are.",
    "Your professional foundation.",
    "The domains you know best.",
    "How do you like to engage?",
    "Where do you add the most value?",
    "Your research background and biggest impact.",
    "How's this look?",
  ];

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Navbar />
      <div className="flex-1 flex justify-center py-24 px-4">
        <OnboardingWizard steps={steps} currentStep={stage}>
          <div className="space-y-12">
            <header className="space-y-4">
              <span className="chip bg-electric/10 text-electric border-electric/20 uppercase tracking-[0.2em] text-[10px] py-1 px-3">
                {stage === 6 ? "The final check" : `Part ${stage + 1} of ${steps.length}`}
              </span>
              <h1 className="text-5xl font-display text-foreground leading-tight">{headings[stage]}</h1>
            </header>
            <main>
              {stage === 0 && <SMEIdentityStep   data={data} update={update} onBack={onBack}           onContinue={() => setStage(1)} />}
              {stage === 1 && <SMEFoundationStep data={data} update={update} onBack={() => setStage(0)} onContinue={() => setStage(2)} />}
              {stage === 2 && <SMEDomainStep     data={data} update={update} onBack={() => setStage(1)} onContinue={() => setStage(3)} />}
              {stage === 3 && <SMEEngagementStep data={data} update={update} onBack={() => setStage(2)} onContinue={() => setStage(4)} />}
              {stage === 4 && <SMEExpertiseStep  data={data} update={update} onBack={() => setStage(3)} onContinue={() => setStage(5)} />}
              {stage === 5 && <SMEImpactStep     data={data} update={update} onBack={() => setStage(4)} onContinue={() => setStage(6)} />}
              {stage === 6 && <SMEReviewStep     data={data} onBack={() => setStage(5)} />}
            </main>
          </div>
        </OnboardingWizard>
      </div>
      <Footer />
    </div>
  );
}

// ─── Step 1: Identity ─────────────────────────────────────────────────────────

function SMEIdentityStep({ data, update, onBack, onContinue }: { data: SMEData; update: (d: Partial<SMEData>) => void; onBack: () => void; onContinue: () => void }) {
  const can = data.firstName && data.lastName && data.email && data.city && data.state && data.zip;
  return (
    <div className="card-surface p-12 space-y-10 animate-in fade-in slide-in-from-bottom-6 duration-700">
      <div className="space-y-7">
        <div className="grid sm:grid-cols-2 gap-6">
          <SmeField label="First Name">
            <input value={data.firstName} onChange={e => update({ firstName: e.target.value })} placeholder="Maya" className={INPUT_CLS} />
          </SmeField>
          <SmeField label="Last Name">
            <input value={data.lastName} onChange={e => update({ lastName: e.target.value })} placeholder="Chen" className={INPUT_CLS} />
          </SmeField>
        </div>
        <SmeField label="Email">
          <input type="email" value={data.email} onChange={e => update({ email: e.target.value })} placeholder="maya@example.com" className={INPUT_CLS} />
        </SmeField>
        <div className="grid sm:grid-cols-2 gap-6">
          <SmeField label="City">
            <input value={data.city} onChange={e => update({ city: e.target.value })} placeholder="Salt Lake City" className={INPUT_CLS} />
          </SmeField>
          <SmeField label="State">
            <input value={data.state} onChange={e => update({ state: e.target.value })} placeholder="UT" className={INPUT_CLS} />
          </SmeField>
        </div>
        <div className="grid sm:grid-cols-2 gap-6">
          <SmeField label="ZIP Code">
            <input value={data.zip} onChange={e => update({ zip: e.target.value })} placeholder="84101" className={INPUT_CLS} />
          </SmeField>
          <SmeField label="Country">
            <input value={data.country} onChange={e => update({ country: e.target.value })} placeholder="United States" className={INPUT_CLS} />
          </SmeField>
        </div>
        <SmeField label="Street Address" optional>
          <input value={data.address} onChange={e => update({ address: e.target.value })} placeholder="123 Innovation Dr" className={INPUT_CLS} />
        </SmeField>
      </div>
      <div className="flex gap-6 pt-6">
        <button onClick={onBack} className="btn-ghost flex-1 py-5 hover:btn-ghost-hover">Back to roles</button>
        <button onClick={onContinue} disabled={!can} className="btn-primary flex-2 py-5 text-lg hover:btn-primary-hover active:btn-primary-active disabled:opacity-20">
          That's me →
        </button>
      </div>
    </div>
  );
}

// ─── Step 2: Professional foundation ─────────────────────────────────────────

function SMEFoundationStep({ data, update, onBack, onContinue }: { data: SMEData; update: (d: Partial<SMEData>) => void; onBack: () => void; onContinue: () => void }) {
  const can = data.currentOrganization && data.currentTitle;
  return (
    <div className="card-surface p-12 space-y-10 animate-in fade-in slide-in-from-bottom-6 duration-700">
      <div className="space-y-7">
        <SmeField label="LinkedIn URL" optional>
          <input value={data.linkedinUrl} onChange={e => update({ linkedinUrl: e.target.value })} placeholder="https://linkedin.com/in/yourname" className={INPUT_CLS + " font-mono"} />
        </SmeField>
        <div className="grid sm:grid-cols-2 gap-6">
          <SmeField label="Current Organization">
            <input value={data.currentOrganization} onChange={e => update({ currentOrganization: e.target.value })} placeholder="University of Utah" className={INPUT_CLS} />
          </SmeField>
          <SmeField label="Current Title">
            <input value={data.currentTitle} onChange={e => update({ currentTitle: e.target.value })} placeholder="Professor of Biomedical Engineering" className={INPUT_CLS} />
          </SmeField>
        </div>
        <SmeField label="Professional History" optional>
          <textarea
            value={data.professionalHistory}
            onChange={e => update({ professionalHistory: e.target.value })}
            placeholder="Walk us through your career. Where have you been, what have you built, and what roles are you most proud of? Don't worry about formatting — just tell the story."
            className={TEXTAREA_CLS + " min-h-[160px]"}
          />
        </SmeField>
      </div>
      <div className="flex gap-6 pt-6">
        <button onClick={onBack} className="btn-ghost flex-1 py-5 hover:btn-ghost-hover">Back a step</button>
        <button onClick={onContinue} disabled={!can} className="btn-primary flex-2 py-5 text-lg hover:btn-primary-hover active:btn-primary-active disabled:opacity-20">
          Let's talk domains →
        </button>
      </div>
    </div>
  );
}

// ─── Step 3: Domain + Skills ──────────────────────────────────────────────────

function SMEDomainStep({ data, update, onBack, onContinue }: { data: SMEData; update: (d: Partial<SMEData>) => void; onBack: () => void; onContinue: () => void }) {
  const can = data.industries.length > 0;
  return (
    <div className="card-surface p-12 space-y-10 animate-in fade-in slide-in-from-bottom-6 duration-700">
      <div className="space-y-8">
        <SmeField label="Which industries do you know best? Select all that apply.">
          <MultiSelect options={INDUSTRIES} selected={data.industries} onChange={v => update({ industries: v })} />
          {data.industries.includes("Other") && (
            <input
              value={data.otherIndustry}
              onChange={e => update({ otherIndustry: e.target.value })}
              placeholder="Describe your industry..."
              className={INPUT_CLS + " mt-4"}
            />
          )}
        </SmeField>
        <SmeField label="Any additional skills or expertise?" optional>
          <textarea
            value={data.skills}
            onChange={e => update({ skills: e.target.value })}
            placeholder="e.g., systems architecture, FDA regulatory pathways, SBIR writing, materials characterization..."
            className={TEXTAREA_CLS + " min-h-[120px]"}
          />
        </SmeField>
      </div>
      <div className="flex gap-6 pt-6">
        <button onClick={onBack} className="btn-ghost flex-1 py-5 hover:btn-ghost-hover">Back a step</button>
        <button onClick={onContinue} disabled={!can} className="btn-primary flex-2 py-5 text-lg hover:btn-primary-hover active:btn-primary-active disabled:opacity-20">
          Now let's talk engagement →
        </button>
      </div>
    </div>
  );
}

// ─── Step 4: Engagement types ─────────────────────────────────────────────────

function SMEEngagementStep({ data, update, onBack, onContinue }: { data: SMEData; update: (d: Partial<SMEData>) => void; onBack: () => void; onContinue: () => void }) {
  const can = data.engagementTypes.length > 0;
  return (
    <div className="card-surface p-12 space-y-10 animate-in fade-in slide-in-from-bottom-6 duration-700">
      <div className="space-y-8">
        <SmeField label="How do you want to work with startups? Select all that apply.">
          <MultiSelect options={ENGAGEMENT_TYPES} selected={data.engagementTypes} onChange={v => update({ engagementTypes: v })} />
        </SmeField>
        <p className="text-sm text-muted-foreground italic px-1 leading-relaxed">
          Advisory board roles look different from hands-on technical consulting — we'll make sure the fit is right before we make any introduction.
        </p>
      </div>
      <div className="flex gap-6 pt-6">
        <button onClick={onBack} className="btn-ghost flex-1 py-5 hover:btn-ghost-hover">Back a step</button>
        <button onClick={onContinue} disabled={!can} className="btn-primary flex-2 py-5 text-lg hover:btn-primary-hover active:btn-primary-active disabled:opacity-20">
          Almost there →
        </button>
      </div>
    </div>
  );
}

// ─── Step 5: Stage expertise + depth slider ───────────────────────────────────

function SMEExpertiseStep({ data, update, onBack, onContinue }: { data: SMEData; update: (d: Partial<SMEData>) => void; onBack: () => void; onContinue: () => void }) {
  const can = data.startupStageExpertise.length > 0;
  const depth = data.technicalBusinessDepth;
  const depthLabel = depth <= 2 ? "Pure Business / GTM" : depth <= 4 ? "Business-leaning" : depth <= 6 ? "Balanced" : depth <= 8 ? "Technical-leaning" : "Deep Technical / R&D";
  return (
    <div className="card-surface p-12 space-y-10 animate-in fade-in slide-in-from-bottom-6 duration-700">
      <div className="space-y-10">
        <SmeField label="Which startup stages have you worked with? Select all that apply.">
          <MultiSelect options={STARTUP_STAGES} selected={data.startupStageExpertise} onChange={v => update({ startupStageExpertise: v })} />
        </SmeField>
        <div className="space-y-5">
          <label className="text-xs font-mono uppercase tracking-[0.2em] text-muted-foreground">Where do you sit on the spectrum?</label>
          <Slider
            value={[depth]}
            onValueChange={([v]) => update({ technicalBusinessDepth: v })}
            min={1} max={10} step={1}
          />
          <div className="flex justify-between text-[11px] font-mono text-muted-foreground">
            <span>1 — Business / GTM</span>
            <span>10 — Deep Technical / R&D</span>
          </div>
          <div className="text-center pt-1">
            <span className="chip bg-electric/10 text-electric border-electric/20 font-mono text-sm px-6 py-2">
              {depthLabel} — {depth}/10
            </span>
          </div>
        </div>
      </div>
      <div className="flex gap-6 pt-6">
        <button onClick={onBack} className="btn-ghost flex-1 py-5 hover:btn-ghost-hover">Back a step</button>
        <button onClick={onContinue} disabled={!can} className="btn-primary flex-2 py-5 text-lg hover:btn-primary-hover active:btn-primary-active disabled:opacity-20">
          One more section →
        </button>
      </div>
    </div>
  );
}

// ─── Step 6: Research, key achievement, capacity ──────────────────────────────

function SMEImpactStep({ data, update, onBack, onContinue }: { data: SMEData; update: (d: Partial<SMEData>) => void; onBack: () => void; onContinue: () => void }) {
  const can = data.keyAchievement.length >= 10 && Number(data.monthlyAvailability) >= 1;
  return (
    <div className="card-surface p-12 space-y-10 animate-in fade-in slide-in-from-bottom-6 duration-700">
      <div className="space-y-8">
        <div className="space-y-4">
          <label className="text-xs font-mono uppercase tracking-[0.2em] text-muted-foreground">
            Have you authored patents, papers, or led tech transfer?
          </label>
          <div className="flex gap-4">
            {([{ v: true, label: "Yes — I have research or IP history" }, { v: false, label: "No, and that's fine" }] as const).map(({ v, label }) => (
              <button key={String(v)} type="button"
                onClick={() => update({ researchIpHistory: v, researchIpDetail: v ? data.researchIpDetail : "" })}
                className={`flex-1 px-6 py-5 text-sm border rounded-2xl transition-all font-display text-left ${
                  data.researchIpHistory === v
                    ? "bg-electric text-electric-foreground border-electric shadow-glow"
                    : "bg-surface-elevated/40 border-border text-muted-foreground hover:border-foreground hover:text-foreground"
                }`}
              >{label}</button>
            ))}
          </div>
          {data.researchIpHistory && (
            <textarea
              value={data.researchIpDetail}
              onChange={e => update({ researchIpDetail: e.target.value })}
              placeholder="Tell us more — patents filed, publications, tech transfer deals, or university licensing experience."
              className={TEXTAREA_CLS + " min-h-[120px] mt-2"}
            />
          )}
        </div>
        <SmeField label="What's the biggest impact you've made in your career? Be specific.">
          <textarea
            value={data.keyAchievement}
            onChange={e => update({ keyAchievement: e.target.value })}
            placeholder="Describe a moment where your expertise moved the needle — a product you launched, a company you helped scale, a technical challenge you unlocked."
            className={TEXTAREA_CLS + " min-h-[160px]"}
          />
        </SmeField>
        <SmeField label="Hours per month you can commit">
          <input
            type="number" min={1}
            value={data.monthlyAvailability}
            onChange={e => update({ monthlyAvailability: e.target.value })}
            placeholder="e.g., 10"
            className={INPUT_CLS}
          />
          <p className="text-[11px] text-muted-foreground font-mono italic px-2 mt-2">
            This sets expectations for the startups we match you with.
          </p>
        </SmeField>
      </div>
      <div className="flex gap-6 pt-6">
        <button onClick={onBack} className="btn-ghost flex-1 py-5 hover:btn-ghost-hover">Back a step</button>
        <button onClick={onContinue} disabled={!can} className="btn-primary flex-2 py-5 text-lg hover:btn-primary-hover active:btn-primary-active disabled:opacity-20">
          Let's see the profile →
        </button>
      </div>
    </div>
  );
}

// ─── Step 7: Review ───────────────────────────────────────────────────────────

function SMEReviewStep({ data, onBack }: { data: SMEData; onBack: () => void }) {
  const [confirmed, setConfirmed] = useState(false);
  const depth = data.technicalBusinessDepth;
  const depthLabel = depth <= 2 ? "Pure Business / GTM" : depth <= 4 ? "Business-leaning" : depth <= 6 ? "Balanced" : depth <= 8 ? "Technical-leaning" : "Deep Technical / R&D";

  if (confirmed) {
    return (
      <div className="card-surface p-20 text-center animate-in zoom-in-95 duration-1000">
        <div className="size-28 rounded-full bg-signal/10 text-signal grid place-items-center mx-auto text-5xl mb-10 border border-signal/20 shadow-glow animate-pulse">✓</div>
        <h2 className="text-5xl font-display mb-6">You're in.</h2>
        <p className="text-xl text-muted-foreground max-w-sm mx-auto leading-relaxed">
          We've shared your expertise with the ecosystem. We already see a few spinouts that need exactly what you bring.
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
            <span className="size-2 rounded-full bg-electric animate-pulse mr-2" />MATCH READY
          </span>
        </div>
        <h2 className="text-4xl font-display mb-12">How's this look?</h2>
        <div className="grid lg:grid-cols-2 gap-16">
          <div className="space-y-10">
            <section className="space-y-3">
              <h3 className="text-[11px] font-mono uppercase tracking-[0.25em] text-muted-foreground">Identity</h3>
              <p className="text-2xl font-display">{data.firstName} {data.lastName}</p>
              <p className="text-base text-muted-foreground">{data.currentTitle} · {data.currentOrganization}</p>
              <p className="text-sm text-muted-foreground font-mono">{data.email}</p>
              <p className="text-sm text-muted-foreground font-mono">{data.city}, {data.state}</p>
            </section>
            <section className="space-y-3">
              <h3 className="text-[11px] font-mono uppercase tracking-[0.25em] text-muted-foreground">Domains</h3>
              <div className="flex flex-wrap gap-2">
                {data.industries.map(i => (
                  <span key={i} className="chip bg-surface-elevated/60 text-xs font-display text-foreground px-4 py-2 border-border/60">{i}</span>
                ))}
              </div>
            </section>
            <section className="space-y-3">
              <h3 className="text-[11px] font-mono uppercase tracking-[0.25em] text-muted-foreground">Engagement</h3>
              <div className="flex flex-wrap gap-2">
                {data.engagementTypes.map(e => (
                  <span key={e} className="chip bg-electric/10 text-electric border-electric/20 text-xs font-display px-4 py-2">{e}</span>
                ))}
              </div>
            </section>
            {data.researchIpHistory && (
              <section className="space-y-2">
                <h3 className="text-[11px] font-mono uppercase tracking-[0.25em] text-muted-foreground">Research & IP</h3>
                <p className="text-sm text-foreground/80 leading-relaxed italic">
                  "{data.researchIpDetail || "Has patents, papers, or tech transfer experience."}"
                </p>
              </section>
            )}
          </div>
          <div className="space-y-8">
            <div className="glass p-8 rounded-3xl space-y-6">
              <div className="flex items-center justify-between">
                <span className="text-[11px] font-mono text-muted-foreground uppercase tracking-widest">Technical Depth</span>
                <span className="text-lg font-bold text-electric">{depth}/10</span>
              </div>
              <div className="h-2 bg-background/50 rounded-full overflow-hidden">
                <div className="h-full bg-electric rounded-full shadow-glow transition-all duration-700" style={{ width: `${(depth / 10) * 100}%` }} />
              </div>
              <p className="text-xs text-muted-foreground italic">{depthLabel} — how the matching engine will weight your profile.</p>
            </div>
            <div className="glass p-8 rounded-3xl space-y-4">
              <h3 className="text-[11px] font-mono uppercase tracking-[0.25em] text-muted-foreground">Startup Stages</h3>
              <div className="flex flex-wrap gap-2">
                {data.startupStageExpertise.map(s => (
                  <span key={s} className="chip bg-bond/10 text-bond border-bond/20 text-xs font-display px-4 py-2">{s}</span>
                ))}
              </div>
            </div>
            <div className="grid grid-cols-2 gap-6">
              <div className="p-6 rounded-3xl bg-surface-elevated/30 border border-border/40">
                <div className="text-[11px] font-mono uppercase text-muted-foreground mb-2 tracking-widest">Capacity</div>
                <div className="text-lg font-display">{data.monthlyAvailability} hrs / mo</div>
              </div>
              <div className="p-6 rounded-3xl bg-surface-elevated/30 border border-border/40">
                <div className="text-[11px] font-mono uppercase text-muted-foreground mb-2 tracking-widest">R&D Background</div>
                <div className="text-lg font-display text-signal">{data.researchIpHistory ? "Yes" : "No"}</div>
              </div>
            </div>
            {data.keyAchievement && (
              <div className="glass p-8 rounded-3xl">
                <h3 className="text-[11px] font-mono uppercase tracking-[0.25em] text-muted-foreground mb-4">Key Achievement</h3>
                <p className="text-sm text-foreground/80 leading-relaxed italic line-clamp-4">"{data.keyAchievement}"</p>
              </div>
            )}
          </div>
        </div>
        <div className="mt-16 pt-10 border-t border-border/60 flex items-center justify-between">
          <button onClick={onBack} className="text-sm text-muted-foreground hover:text-foreground transition-colors underline underline-offset-8 font-medium">
            Wait, I need to edit something
          </button>
          <button onClick={() => setConfirmed(true)} className="btn-primary px-16 py-6 text-lg shadow-glow transition-all active:scale-95">
            Looks good, let's go
          </button>
        </div>
      </div>
    </div>
  );
}

// ─── Generic review step (unchanged) ─────────────────────────────────────────

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
