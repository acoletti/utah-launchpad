import { createFileRoute, Link } from "@tanstack/react-router";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { matches } from "@/lib/mock-data";

export const Route = createFileRoute("/")({
  component: Landing,
  head: () => ({
    meta: [
      { title: "LaunchHive — AI matching for Utah deep tech" },
      { name: "description", content: "Match Utah's deep-tech startups with the executives, operators, and students who can commercialize them. Built by Nucleus." },
    ],
  }),
});

function Landing() {
  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Navbar />
      <Hero />
      <WhoItHelps />
      <ValueProps />
      <HowItWorks />
      <FeaturedMatches />
      <UtahEdge />
      <FinalCTA />
      <Footer />
    </div>
  );
}

function Hero() {
  return (
    <section className="relative overflow-hidden pt-20 pb-32">
      <div className="absolute inset-0 grid-bg opacity-30" />
      <div className="absolute inset-0 radial-spot opacity-60" />
      
      <div className="container-x relative z-10 text-center space-y-8">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-surface-elevated border border-border text-[10px] font-mono uppercase tracking-[0.2em] text-electric animate-in fade-in slide-in-from-top-4 duration-1000">
          <span className="size-2 rounded-full bg-electric animate-pulse" />
          The Utah Deep Tech Graph
        </div>
        
        <h1 className="text-6xl md:text-8xl font-display leading-[1.05] max-w-5xl mx-auto animate-in fade-in slide-in-from-bottom-8 duration-1000 delay-100">
          Commercializing <em className="text-electric not-italic italic-serif">research</em> with AI precision.
        </h1>
        
        <p className="text-xl text-muted-foreground max-w-2xl mx-auto leading-relaxed animate-in fade-in slide-in-from-bottom-8 duration-1000 delay-200">
          LaunchHive matches Utah's most promising research spinouts with the specific operators and executives ready to lead them.
        </p>
        
        <div className="flex flex-wrap items-center justify-center gap-4 pt-4 animate-in fade-in slide-in-from-bottom-8 duration-1000 delay-300">
          <Link to="/onboarding" className="btn-primary px-10 py-4 text-base hover:btn-primary-hover active:btn-primary-active">
            Build Your Profile
          </Link>
          <Link to="/matches" className="btn-ghost px-10 py-4 text-base hover:btn-ghost-hover">
            Explore Matches
          </Link>
        </div>

        <div className="pt-20 grid grid-cols-2 md:grid-cols-4 gap-8 max-w-4xl mx-auto animate-in fade-in duration-1000 delay-500">
          <Stat n="3" label="R1 Universities" />
          <Stat n="86%" label="Avg Match Score" />
          <Stat n="14d" label="Time to Intro" />
          <Stat n="200+" label="Verified Operators" />
        </div>
      </div>
    </section>
  );
}

function Stat({ n, label }: { n: string; label: string }) {
  return (
    <div className="space-y-1">
      <div className="text-4xl font-display text-foreground">{n}</div>
      <div className="text-[10px] font-mono uppercase tracking-widest text-muted-foreground">{label}</div>
    </div>
  );
}

function WhoItHelps() {
  const users = [
    { title: "Researchers", desc: "Spin out your lab's breakthroughs with world-class CEO partners.", icon: "⌬" },
    { title: "Executives", desc: "Find your next venture-scale seat in Utah's deepest tech corridor.", icon: "⌖" },
    { title: "Students", desc: "Bridge the gap between academic research and commercial impact.", icon: "⌘" },
    { title: "Advisors", desc: "Mentor the next generation of founders using your domain expertise.", icon: "⚗" },
  ];

  return (
    <section className="py-24 border-t border-border/40">
      <div className="container-x">
        <div className="grid sm:grid-cols-2 md:grid-cols-4 gap-4">
          {users.map((u) => (
            <div key={u.title} className="card-surface p-8 group hover:card-surface-hover">
              <div className="size-12 rounded-xl bg-surface-elevated border border-border flex items-center justify-center text-2xl mb-6 group-hover:scale-110 group-hover:text-electric transition-all">
                {u.icon}
              </div>
              <h3 className="text-xl font-display mb-2">{u.title}</h3>
              <p className="text-sm text-muted-foreground leading-relaxed">{u.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function ValueProps() {
  const props = [
    { title: "Explainable Matching", body: "We don't just give you a score. We explain the reasoning, the gaps, and the next steps for every match." },
    { title: "Ecosystem Aware", body: "Our AI is grounded in the actual Utah graph — universities, TTOs, and state programs are first-class dimensions." },
    { title: "Non-Technical UI", body: "Built for researchers and operators, not data scientists. Clear, approachable, and actionable." },
  ];

  return (
    <section className="py-24 bg-surface/30">
      <div className="container-x grid md:grid-cols-3 gap-12">
        {props.map((p) => (
          <div key={p.title} className="space-y-4">
            <h3 className="text-2xl font-display">{p.title}</h3>
            <p className="text-muted-foreground leading-relaxed">{p.body}</p>
          </div>
        ))}
      </div>
    </section>
  );
}

function HowItWorks() {
  const steps = [
    { n: "01", t: "Sync Your Experience", b: "Drop a LinkedIn URL or paste a deck. Our AI extracts your commercialization DNA instantly." },
    { n: "02", t: "AI Reasoning", b: "The Utah Eco Agent cross-references your profile with live spinout needs across the state." },
    { n: "03", t: "Direct Intros", b: "Review your matches, read the reasoning reports, and request a warm introduction with one click." },
  ];

  return (
    <section className="py-32 border-y border-border/40">
      <div className="container-x grid md:grid-cols-2 gap-20">
        <div className="space-y-6">
          <span className="chip text-electric border-electric/20 bg-electric/5">The Process</span>
          <h2 className="text-5xl font-display">A 4-minute bridge to your next venture.</h2>
          <p className="text-lg text-muted-foreground leading-relaxed">
            We've replaced the warm-intro lottery with an auditable, ecosystem-aware matching surface.
          </p>
        </div>
        <div className="space-y-8">
          {steps.map((s) => (
            <div key={s.n} className="flex gap-6 group">
              <span className="text-4xl font-display text-muted-foreground group-hover:text-electric transition-colors">{s.n}</span>
              <div className="space-y-2">
                <h3 className="text-xl font-display">{s.t}</h3>
                <p className="text-muted-foreground leading-relaxed">{s.b}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function FeaturedMatches() {
  return (
    <section className="py-24 container-x">
      <div className="flex items-end justify-between gap-8 mb-12">
        <div className="space-y-4">
          <h2 className="text-4xl font-display">Live match scenarios.</h2>
          <p className="text-muted-foreground max-w-xl">These represent the high-confidence pairings our system surfaces daily.</p>
        </div>
        <Link to="/matches" className="btn-ghost px-6 py-2 text-xs">View Full Queue →</Link>
      </div>

      <div className="grid md:grid-cols-3 gap-6">
        {matches.map((m) => (
          <Link key={m.id} to="/matches/$matchId" params={{ matchId: m.id }} className="card-surface p-6 group hover:card-surface-hover">
            <div className="flex items-center justify-between mb-6">
              <span className="chip text-[9px]">{m.talent.archetype}</span>
              <ScoreRing score={m.score} />
            </div>
            <h3 className="text-2xl font-display mb-1 group-hover:text-electric transition-colors">{m.talent.name}</h3>
            <div className="text-xs text-muted-foreground mb-4">↔ {m.startup.name}</div>
            <p className="text-sm text-muted-foreground leading-relaxed line-clamp-3 italic">"{m.reasons[0]}"</p>
            <div className="mt-8 flex items-center justify-between">
              <span className="text-[10px] font-mono text-muted-foreground uppercase">{m.startup.origin}</span>
              <span className="text-electric text-[10px] font-mono uppercase tracking-widest opacity-0 group-hover:opacity-100 transition-opacity">Read reasoning →</span>
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
}

function UtahEdge() {
  return (
    <section className="relative py-24 bg-surface/30 overflow-hidden">
      <div className="absolute inset-0 grid-bg opacity-10" />
      <div className="container-x relative text-center space-y-12">
        <h2 className="text-4xl font-display">Grounded in Utah's Actual Graph.</h2>
        <div className="grid sm:grid-cols-3 gap-12 text-left max-w-5xl mx-auto">
          <div>
            <h3 className="text-lg font-display mb-2">Triad of R1s</h3>
            <p className="text-sm text-muted-foreground leading-relaxed">Matching across U of U, BYU, and USU's complementary research specialties.</p>
          </div>
          <div>
            <h3 className="text-lg font-display mb-2">Program Aware</h3>
            <p className="text-sm text-muted-foreground leading-relaxed">USTAR, SBIR/STTR, and Utah Innovation Fund are first-class match dimensions.</p>
          </div>
          <div>
            <h3 className="text-lg font-display mb-2">Domain Specialization</h3>
            <p className="text-sm text-muted-foreground leading-relaxed">Routing life-science operators to therapeutics, and aerospace talent to USU.</p>
          </div>
        </div>
      </div>
    </section>
  );
}

function FinalCTA() {
  return (
    <section className="py-32 container-x">
      <div className="card-surface p-16 text-center space-y-8 relative overflow-hidden group">
        <div className="absolute inset-0 radial-spot opacity-40 group-hover:opacity-60 transition-opacity" />
        <h2 className="text-5xl font-display relative">Scale Utah's Deep Tech.</h2>
        <p className="text-xl text-muted-foreground max-w-xl mx-auto relative leading-relaxed">
          Four minutes to create your profile. A lifetime of impact in the ecosystem.
        </p>
        <div className="pt-4 relative">
          <Link to="/onboarding" className="btn-primary px-12 py-4 text-lg">
            Build Your Profile Now
          </Link>
        </div>
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
