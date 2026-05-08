import { createFileRoute, Link } from "@tanstack/react-router";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { matches } from "@/lib/mock-data";

export const Route = createFileRoute("/")({
  component: Landing,
  head: () => ({
    meta: [
      { title: "EyeToEye — AI matching for Utah deep tech" },
      { name: "description", content: "Match Utah's deep-tech startups with the executives, operators, and students who can commercialize them. Built by Nucleus." },
    ],
  }),
});

function Landing() {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <Hero />
      <Logos />
      <Problem />
      <HowItWorks />
      <ScenariosSection />
      <UtahEdge />
      <CTA />
      <Footer />
    </div>
  );
}

function Hero() {
  return (
    <section className="relative overflow-hidden">
      <div className="absolute inset-0 grid-bg opacity-50" />
      <div className="absolute inset-0 radial-spot" />
      <div className="container-x relative pt-24 pb-28 md:pt-36 md:pb-40">
        <div className="max-w-3xl">
          <span className="chip"><span className="size-1.5 rounded-full bg-electric inline-block" /> Built for Utah's research corridor</span>
          <h1 className="font-display text-5xl md:text-7xl mt-6 leading-[1.02]">
            The bridge between <em className="text-electric not-italic">labs</em> and the operators who turn them into companies.
          </h1>
          <p className="mt-6 text-lg text-muted-foreground max-w-2xl leading-relaxed">
            EyeToEye is AI-native commercialization infrastructure for Utah deep tech. We replace the LinkedIn sprawl and warm-intro lottery with explainable, ecosystem-aware matches between research spinouts and the talent that can ship them.
          </p>
          <div className="mt-9 flex flex-wrap gap-3">
            <Link to="/onboarding" className="btn-primary hover:[filter:brightness(1.08)]">Start your profile →</Link>
            <Link to="/matches" className="btn-ghost">See live matches</Link>
          </div>
          <div className="mt-12 grid grid-cols-3 gap-6 max-w-xl">
            <Stat n="3" label="R1 universities" />
            <Stat n="86%" label="avg match score" />
            <Stat n="14d" label="median time to intro" />
          </div>
        </div>
      </div>
    </section>
  );
}

function Stat({ n, label }: { n: string; label: string }) {
  return (
    <div>
      <div className="font-display text-3xl text-foreground">{n}</div>
      <div className="text-xs uppercase tracking-wider text-muted-foreground font-mono mt-1">{label}</div>
    </div>
  );
}

function Logos() {
  const labels = ["University of Utah", "BYU", "Utah State", "USTAR", "Silicon Slopes", "Utah Innovation Fund"];
  return (
    <section className="border-y border-border/60 py-8">
      <div className="container-x flex flex-wrap items-center justify-between gap-6">
        <span className="text-xs uppercase tracking-[0.2em] font-mono text-muted-foreground">Indexed across</span>
        {labels.map((l) => (
          <span key={l} className="font-display text-base text-muted-foreground/80">{l}</span>
        ))}
      </div>
    </section>
  );
}

function Problem() {
  const cols = [
    { title: "Job boards", body: "Optimized for transactions, not commercialization. A founding-CEO seat at a TRL-3 spinout doesn't render on Indeed.", tone: "muted" },
    { title: "LinkedIn", body: "Connection-graph search. You find the right person only if you already half-knew them.", tone: "muted" },
    { title: "Warm intros", body: "High signal, but capped by Eliza's calendar. Not a system.", tone: "muted" },
    { title: "EyeToEye", body: "Reads spinout decks, lab pages, and operator profiles, then explains every match in plain English. Built on Utah's actual graph.", tone: "electric" },
  ];
  return (
    <section className="container-x py-24">
      <div className="max-w-2xl">
        <span className="chip">The problem</span>
        <h2 className="font-display text-4xl md:text-5xl mt-5">Utah produces world-class research. The operator bridge is thin.</h2>
        <p className="mt-4 text-muted-foreground">Existing tools weren't designed for deep tech, fractional roles, or the commercialization gap that Nucleus has been closing manually for years.</p>
      </div>
      <div className="grid md:grid-cols-4 gap-4 mt-12">
        {cols.map((c) => (
          <div key={c.title} className={`card-surface p-6 ${c.tone === "electric" ? "ring-1 ring-electric/40" : ""}`}>
            <div className={`text-xs font-mono uppercase tracking-wider ${c.tone === "electric" ? "text-electric" : "text-muted-foreground"}`}>{c.tone === "electric" ? "Now" : "Today"}</div>
            <h3 className="font-display text-xl mt-2">{c.title}</h3>
            <p className="text-sm text-muted-foreground mt-3 leading-relaxed">{c.body}</p>
          </div>
        ))}
      </div>
    </section>
  );
}

function HowItWorks() {
  const steps = [
    { n: "01", title: "Drop a link, paste a resume, or talk to Gemini", body: "Onboarding is a 4-minute conversation, not a 28-field form. We extract structured profiles from LinkedIn URLs, lab pages, decks, or free text." },
    { n: "02", title: "The Utah Eco Agent reasons over the ecosystem", body: "A RAG pipeline grounded in Utah-specific data — universities, programs, funding events, talent — enriches every match with context no general model has." },
    { n: "03", title: "Hybrid matching: structured + semantic + reasoning", body: "Skill overlap, stage fit, risk tolerance, and ecosystem proximity feed a weighted score. Then Gemini explains the match, the gaps, and the next step." },
  ];
  return (
    <section className="container-x py-24 border-t border-border/60">
      <div className="grid md:grid-cols-[1fr_2fr] gap-12">
        <div>
          <span className="chip">How it works</span>
          <h2 className="font-display text-4xl md:text-5xl mt-5">Centralized AI, not agent swarm theater.</h2>
          <p className="mt-4 text-muted-foreground">Gemini orchestrates onboarding, enrichment, matching, and explanation. One reasoning surface. Predictable, auditable, fast.</p>
        </div>
        <ol className="space-y-3">
          {steps.map((s) => (
            <li key={s.n} className="card-surface p-6 flex gap-6">
              <div className="font-mono text-electric text-sm pt-1">{s.n}</div>
              <div>
                <h3 className="font-display text-xl">{s.title}</h3>
                <p className="text-sm text-muted-foreground mt-2 leading-relaxed">{s.body}</p>
              </div>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}

function ScenariosSection() {
  return (
    <section className="container-x py-24 border-t border-border/60">
      <div className="flex items-end justify-between flex-wrap gap-4">
        <div className="max-w-xl">
          <span className="chip">Real matches, mocked from real-world archetypes</span>
          <h2 className="font-display text-4xl md:text-5xl mt-5">Three scenarios, three explanations.</h2>
        </div>
        <Link to="/matches" className="btn-ghost">Open the match queue →</Link>
      </div>
      <div className="grid md:grid-cols-3 gap-4 mt-10">
        {matches.map((m) => (
          <Link key={m.id} to="/matches/$matchId" params={{ matchId: m.id }} className="card-surface p-6 group hover:border-electric/50 transition-colors">
            <div className="flex items-center justify-between">
              <span className="chip">{m.talent.archetype} → {m.startup.sector}</span>
              <ScoreRing score={m.score} />
            </div>
            <h3 className="font-display text-2xl mt-5 group-hover:text-electric transition-colors">{m.talent.name}</h3>
            <p className="text-sm text-muted-foreground">→ {m.startup.name}</p>
            <p className="text-sm text-foreground/85 mt-4 leading-relaxed line-clamp-3">{m.reasons[0]}</p>
            <div className="mt-5 pt-5 border-t border-border/60 flex items-center justify-between text-xs font-mono text-muted-foreground uppercase tracking-wider">
              <span>{m.startup.origin}</span>
              <span className="text-electric">View reasoning →</span>
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
}

export function ScoreRing({ score }: { score: number }) {
  const r = 16;
  const c = 2 * Math.PI * r;
  const dash = (score / 100) * c;
  return (
    <div className="relative size-12">
      <svg viewBox="0 0 40 40" className="size-12 -rotate-90">
        <circle cx="20" cy="20" r={r} fill="none" stroke="var(--color-border)" strokeWidth="3" />
        <circle cx="20" cy="20" r={r} fill="none" stroke="var(--color-signal)" strokeWidth="3" strokeDasharray={`${dash} ${c}`} strokeLinecap="round" />
      </svg>
      <div className="absolute inset-0 flex items-center justify-center font-mono text-[11px] font-semibold">{score}</div>
    </div>
  );
}

function UtahEdge() {
  const items = [
    { t: "Triad of R1s", b: "U of U, BYU, USU — complementary specialties. Matching across them, not just within one." },
    { t: "High-trust graph", b: "Silicon Slopes is two degrees deep. We surface the connection, not just the contact." },
    { t: "Program-aware", b: "USTAR, SBIR/STTR, Utah Innovation Fund are first-class match dimensions." },
    { t: "Domain-to-institution", b: "Biotech operators routed to U of U spinouts. Aerospace to USU. Cyber to BYU. Defaults that respect specialization." },
  ];
  return (
    <section className="relative border-t border-border/60">
      <div className="absolute inset-0 grid-bg opacity-30" />
      <div className="container-x relative py-24">
        <div className="max-w-2xl">
          <span className="chip"><span className="size-1.5 rounded-full bg-bond" /> Why Utah</span>
          <h2 className="font-display text-4xl md:text-5xl mt-5">A national platform would never know any of this.</h2>
        </div>
        <div className="grid md:grid-cols-4 gap-4 mt-10">
          {items.map((i) => (
            <div key={i.t} className="card-surface p-6">
              <h3 className="font-display text-lg">{i.t}</h3>
              <p className="text-sm text-muted-foreground mt-2 leading-relaxed">{i.b}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function CTA() {
  return (
    <section className="container-x py-24">
      <div className="card-surface p-12 md:p-16 text-center relative overflow-hidden">
        <div className="absolute inset-0 radial-spot opacity-60" />
        <div className="relative">
          <h2 className="font-display text-4xl md:text-5xl">Stop being your own bottleneck.</h2>
          <p className="mt-4 text-muted-foreground max-w-xl mx-auto">Whether you're a researcher with a patent or an operator between roles, you're four minutes away from a queue of matches built for Utah.</p>
          <div className="mt-8 flex justify-center gap-3">
            <Link to="/onboarding" className="btn-primary hover:[filter:brightness(1.08)]">Build your profile</Link>
            <Link to="/how-it-works" className="btn-ghost">See the architecture</Link>
          </div>
        </div>
      </div>
    </section>
  );
}
