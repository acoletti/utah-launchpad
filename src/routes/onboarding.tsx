import { createFileRoute, Link } from "@tanstack/react-router";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { useState } from "react";

export const Route = createFileRoute("/onboarding")({
  component: Onboarding,
  head: () => ({ meta: [{ title: "Onboarding — LaunchHive" }] }),
});

type Step = { id: string; title: string };

function Onboarding() {
  const [role, setRole] = useState<"talent" | "startup" | null>(null);
  const [stage, setStage] = useState(0);
  const [link, setLink] = useState("");
  const [extracted, setExtracted] = useState(false);

  if (!role) return <RolePicker onPick={setRole} />;

  const steps: Step[] = role === "talent"
    ? [
        { id: "import", title: "Import" },
        { id: "verify", title: "Verify" },
        { id: "preferences", title: "Preferences" },
        { id: "review", title: "Review" },
      ]
    : [
        { id: "import", title: "Import" },
        { id: "stage", title: "Stage & needs" },
        { id: "ecosystem", title: "Ecosystem" },
        { id: "review", title: "Review" },
      ];

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="container-x py-12 flex-1">
        <div className="max-w-3xl mx-auto">
          <div className="flex items-center gap-2 text-sm font-mono uppercase tracking-wider text-muted-foreground mb-6">
            {steps.map((s, i) => (
              <span key={s.id} className="flex items-center gap-2">
                <span className={`size-1.5 rounded-full ${i <= stage ? "bg-electric" : "bg-border"}`} />
                <span className={i === stage ? "text-foreground" : ""}>{s.title}</span>
                {i < steps.length - 1 && <span className="text-border">/</span>}
              </span>
            ))}
          </div>

          {stage === 0 && (
            <ImportStep
              role={role}
              link={link}
              setLink={setLink}
              extracted={extracted}
              onExtract={() => setExtracted(true)}
              onContinue={() => setStage(1)}
            />
          )}
          {stage === 1 && <VerifyStep role={role} onBack={() => setStage(0)} onContinue={() => setStage(2)} />}
          {stage === 2 && <PreferencesStep role={role} onBack={() => setStage(1)} onContinue={() => setStage(3)} />}
          {stage === 3 && <ReviewStep role={role} onBack={() => setStage(2)} />}
        </div>
      </main>
      <Footer />
    </div>
  );
}

function RolePicker({ onPick }: { onPick: (r: "talent" | "startup") => void }) {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="container-x py-20 flex-1">
        <div className="max-w-3xl mx-auto text-center">
          <span className="chip mx-auto">Welcome</span>
          <h1 className="font-display text-5xl mt-5">Which side of the bridge are you on?</h1>
          <p className="text-muted-foreground mt-4">Pick one. You can add the other later.</p>
        </div>
        <div className="grid md:grid-cols-2 gap-5 mt-14 max-w-4xl mx-auto">
          <button onClick={() => onPick("talent")} className="card-surface p-8 text-left hover:border-electric/50 transition-colors group">
            <div className="text-electric text-3xl">⌖</div>
            <h2 className="font-display text-2xl mt-4 group-hover:text-electric transition-colors">I'm an operator, executive, student, or advisor</h2>
            <p className="text-sm text-muted-foreground mt-3">You're looking to join, advise, mentor, or build something. We'll match you with Utah deep-tech opportunities that fit.</p>
            <div className="mt-6 flex flex-wrap gap-2">
              {["Executive", "Fractional", "Operator", "Student", "Advisor", "Mentor"].map((t) => <span key={t} className="chip">{t}</span>)}
            </div>
          </button>
          <button onClick={() => onPick("startup")} className="card-surface p-8 text-left hover:border-electric/50 transition-colors group">
            <div className="text-bond text-3xl">⌬</div>
            <h2 className="font-display text-2xl mt-4 group-hover:text-bond transition-colors">I'm a researcher, founder, or TTO</h2>
            <p className="text-sm text-muted-foreground mt-3">You have a spinout, a lab, or a license. We'll surface the operators, executives, and students who can move you forward.</p>
            <div className="mt-6 flex flex-wrap gap-2">
              {["U of U spinout", "BYU spinout", "USU spinout", "TTO", "Independent"].map((t) => <span key={t} className="chip">{t}</span>)}
            </div>
          </button>
        </div>
      </main>
      <Footer />
    </div>
  );
}

function ImportStep({ role, link, setLink, extracted, onExtract, onContinue }: any) {
  return (
    <div className="card-surface p-8">
      <h2 className="font-display text-3xl">Let's start fast.</h2>
      <p className="text-muted-foreground mt-2">Paste any link. Gemini will extract a structured profile in seconds. No 28-field form.</p>

      <div className="mt-8 space-y-3">
        <label className="text-xs font-mono uppercase tracking-wider text-muted-foreground">{role === "talent" ? "LinkedIn URL, personal site, or resume link" : "Company URL, lab page, or pitch deck link"}</label>
        <div className="flex gap-2">
          <input
            value={link}
            onChange={(e) => setLink(e.target.value)}
            placeholder={role === "talent" ? "https://linkedin.com/in/your-name" : "https://helixtherapeutics.com"}
            className="flex-1 bg-input/40 border border-border rounded-lg px-4 py-3 text-sm focus:outline-none focus:border-electric/60 focus:ring-2 focus:ring-electric/20 transition-colors font-mono"
          />
          <button onClick={onExtract} className="btn-primary hover:[filter:brightness(1.08)]" disabled={!link}>
            Extract
          </button>
        </div>
        <p className="text-xs text-muted-foreground">Or <button className="underline text-electric">paste a resume</button> · <button className="underline text-electric">talk to Gemini</button> · <button className="underline text-electric">fill manually</button></p>
      </div>

      {extracted && (
        <div className="mt-8 border border-electric/30 bg-electric/5 rounded-xl p-6 space-y-4 animate-in fade-in slide-in-from-bottom-2 duration-500">
          <div className="flex items-center gap-2 text-xs font-mono uppercase tracking-wider text-electric">
            <span className="size-1.5 rounded-full bg-electric animate-pulse" /> Gemini extracted · 4 follow-ups
          </div>
          {role === "talent" ? <ExtractedTalent /> : <ExtractedStartup />}
        </div>
      )}

      <div className="mt-8 flex justify-end">
        <button onClick={onContinue} disabled={!extracted} className="btn-primary disabled:opacity-30 disabled:cursor-not-allowed hover:[filter:brightness(1.08)]">
          Continue →
        </button>
      </div>
    </div>
  );
}

function ExtractedTalent() {
  const fields = [
    { k: "Headline", v: "VP Commercial · 2× FDA approvals · Seeking CEO seat" },
    { k: "Skills", v: "FDA pathway · BD therapeutics · Series A storytelling" },
    { k: "Domains", v: "Therapeutics · Gene therapy · Diagnostics" },
    { k: "Stage preference", v: "Pre-seed · Seed (inferred from 'CEO seat #2')" },
  ];
  const followups = [
    "What's your minimum equity stake to consider founding-CEO?",
    "Open to relocation within Utah, or remote-only from current base?",
    "Any indication areas you'd actively decline?",
  ];
  return (
    <>
      <div className="grid sm:grid-cols-2 gap-3">
        {fields.map((f) => (
          <div key={f.k} className="bg-background/50 rounded-lg p-3">
            <div className="text-[10px] uppercase font-mono tracking-wider text-muted-foreground">{f.k}</div>
            <div className="text-sm mt-1">{f.v}</div>
          </div>
        ))}
      </div>
      <div className="pt-3 border-t border-electric/20">
        <div className="text-xs font-mono uppercase tracking-wider text-electric mb-3">Quick follow-ups</div>
        <div className="space-y-2">
          {followups.map((f) => (
            <div key={f} className="flex items-start gap-2 text-sm">
              <span className="text-electric mt-0.5">→</span>
              <span className="text-foreground/85">{f}</span>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}

function ExtractedStartup() {
  const fields = [
    { k: "Sector", v: "Life Sciences — Therapeutics" },
    { k: "Origin", v: "University of Utah · Moran Eye Center" },
    { k: "TRL", v: "4 (pre-IND)" },
    { k: "Funding stage", v: "Pre-seed · SBIR Phase I active" },
  ];
  const followups = [
    "Confirm your immediate hiring needs (CEO, regulatory, scientific?).",
    "Are you open to a fractional commercialization lead while you fundraise?",
    "Should we tag this as USTAR-eligible for state-program matching?",
  ];
  return (
    <>
      <div className="grid sm:grid-cols-2 gap-3">
        {fields.map((f) => (
          <div key={f.k} className="bg-background/50 rounded-lg p-3">
            <div className="text-[10px] uppercase font-mono tracking-wider text-muted-foreground">{f.k}</div>
            <div className="text-sm mt-1">{f.v}</div>
          </div>
        ))}
      </div>
      <div className="pt-3 border-t border-electric/20">
        <div className="text-xs font-mono uppercase tracking-wider text-electric mb-3">Quick follow-ups</div>
        <div className="space-y-2">
          {followups.map((f) => (
            <div key={f} className="flex items-start gap-2 text-sm">
              <span className="text-electric mt-0.5">→</span>
              <span className="text-foreground/85">{f}</span>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}

function VerifyStep({ onBack, onContinue }: any) {
  return (
    <div className="card-surface p-8">
      <h2 className="font-display text-3xl">Trust signals</h2>
      <p className="text-muted-foreground mt-2">Verification weeds out spam, sales pitches, and tourists. Required for visibility.</p>
      <div className="mt-8 grid gap-3">
        {[
          { k: "Email verified", v: "@u.utah.edu — verified", ok: true },
          { k: "LinkedIn linked", v: "Verified profile · 480 connections", ok: true },
          { k: "Ecosystem reference", v: "Add 1 reference from your Utah network (optional, boosts match weight)", ok: false },
          { k: "ID match", v: "Optional — required only for board roles & equity grants", ok: false },
        ].map((r) => (
          <div key={r.k} className="flex items-center justify-between p-4 rounded-lg border border-border bg-surface-elevated/40">
            <div>
              <div className="text-sm font-medium">{r.k}</div>
              <div className="text-xs text-muted-foreground mt-0.5">{r.v}</div>
            </div>
            {r.ok ? (
              <span className="chip" style={{ color: "var(--signal)", borderColor: "color-mix(in oklab, var(--signal) 40%, transparent)" }}>✓ Verified</span>
            ) : (
              <button className="btn-ghost text-xs">Add</button>
            )}
          </div>
        ))}
      </div>
      <Nav onBack={onBack} onContinue={onContinue} />
    </div>
  );
}

function PreferencesStep({ role, onBack, onContinue }: any) {
  return (
    <div className="card-surface p-8">
      <h2 className="font-display text-3xl">{role === "talent" ? "Your fit dimensions" : "What you need"}</h2>
      <p className="text-muted-foreground mt-2">Sliders feed the match score. Adjust any time.</p>
      <div className="mt-8 space-y-7">
        <SliderRow label="Stage preference" left="Idea" right="Series A+" value={28} />
        <SliderRow label="Risk tolerance" left="Stable, paid" right="All-in equity" value={72} />
        <SliderRow label="Availability" left="Mentor / advisory" right="Full-time" value={role === "talent" ? 90 : 60} />
        <SliderRow label="Mission weight" left="Any sector" right="Mission-locked" value={65} />
        <div>
          <label className="text-xs font-mono uppercase tracking-wider text-muted-foreground">Mission statement (one sentence)</label>
          <textarea className="mt-2 w-full bg-input/40 border border-border rounded-lg px-4 py-3 text-sm focus:outline-none focus:border-electric/60 focus:ring-2 focus:ring-electric/20" rows={2} defaultValue="Bring Utah-born therapeutics to clinic, especially in rare disease." />
        </div>
      </div>
      <Nav onBack={onBack} onContinue={onContinue} />
    </div>
  );
}

function SliderRow({ label, left, right, value }: { label: string; left: string; right: string; value: number }) {
  return (
    <div>
      <div className="flex items-center justify-between mb-2">
        <div className="text-sm font-medium">{label}</div>
        <div className="text-xs font-mono text-muted-foreground">{value}%</div>
      </div>
      <div className="relative h-2 rounded-full bg-input">
        <div className="absolute inset-y-0 left-0 bg-electric rounded-full" style={{ width: `${value}%` }} />
        <div className="absolute -top-1 size-4 rounded-full bg-foreground border-2 border-background" style={{ left: `calc(${value}% - 8px)` }} />
      </div>
      <div className="flex justify-between text-[10px] font-mono uppercase tracking-wider text-muted-foreground mt-2">
        <span>{left}</span><span>{right}</span>
      </div>
    </div>
  );
}

function ReviewStep({ role, onBack }: any) {
  return (
    <div className="card-surface p-8 text-center">
      <div className="size-14 rounded-full bg-signal/20 text-signal grid place-items-center mx-auto text-2xl font-display">✓</div>
      <h2 className="font-display text-3xl mt-5">Profile live.</h2>
      <p className="text-muted-foreground mt-2">We're already running matches. First results below.</p>
      <div className="mt-8 grid sm:grid-cols-3 gap-3 text-left">
        {["3 high-confidence matches", "12 exploratory matches", "1 ecosystem warm intro available"].map((t, i) => (
          <div key={t} className="bg-surface-elevated/50 rounded-lg p-4 text-sm">
            <div className="text-electric text-xs font-mono uppercase tracking-wider">Live · {String(i + 1).padStart(2, "0")}</div>
            <div className="mt-1">{t}</div>
          </div>
        ))}
      </div>
      <div className="mt-8 flex justify-center gap-3">
        <button onClick={onBack} className="btn-ghost">← Back</button>
        <Link to="/matches" className="btn-primary hover:[filter:brightness(1.08)]">Open match queue →</Link>
      </div>
      <p className="text-xs text-muted-foreground mt-6">Profile syncs to Affinity via webhook · referenceable in Squarespace embed widget</p>
      {/* role var consumed for ts */}
      <span className="hidden">{role}</span>
    </div>
  );
}

function Nav({ onBack, onContinue }: any) {
  return (
    <div className="mt-10 flex justify-between">
      <button onClick={onBack} className="btn-ghost">← Back</button>
      <button onClick={onContinue} className="btn-primary hover:[filter:brightness(1.08)]">Continue →</button>
    </div>
  );
}
