import { createFileRoute, Link } from "@tanstack/react-router";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { matches } from "@/lib/mock-data";

export const Route = createFileRoute("/")({
  component: Landing,
  head: () => ({
    meta: [
      { title: "LaunchHive — Building Utah's Deep Tech Future" },
      { name: "description", content: "Bringing the laboratory to the world. We connect Utah's brightest research with the founders ready to build it." },
    ],
  }),
});

function Landing() {
  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Navbar />
      <Hero />
      <WhoItHelps />
      <Mission />
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
      <div className="absolute inset-0 grid-bg opacity-20" />
      <div className="absolute inset-0 radial-spot opacity-50" />
      
      <div className="container-x relative z-10 text-center space-y-10">
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-surface-elevated/50 border border-border text-[10px] font-mono uppercase tracking-[0.25em] text-electric animate-in fade-in slide-in-from-top-4 duration-1000">
          <span className="size-2 rounded-full bg-electric animate-pulse" />
          A community effort for Utah's research labs
        </div>
        
        <h1 className="text-6xl md:text-8xl font-display leading-[1.02] max-w-5xl mx-auto animate-in fade-in slide-in-from-bottom-8 duration-1000 delay-100">
          The bridge between <em className="text-electric not-italic italic-serif">breakthroughs</em> and builds.
        </h1>
        
        <p className="text-xl text-muted-foreground max-w-2xl mx-auto leading-relaxed animate-in fade-in slide-in-from-bottom-8 duration-1000 delay-200">
          LaunchHive is where Utah's deepest tech finds its heartbeat. We pair world-changing research with the humans who know how to bring it to life.
        </p>
        
        <div className="flex flex-wrap items-center justify-center gap-6 pt-4 animate-in fade-in slide-in-from-bottom-8 duration-1000 delay-300">
          <Link to="/onboarding" className="btn-primary px-12 py-5 text-lg hover:btn-primary-hover active:btn-primary-active shadow-glow">
            Start your journey
          </Link>
          <Link to="/matches" className="btn-ghost px-12 py-5 text-lg hover:btn-ghost-hover">
            Browse active spinouts
          </Link>
        </div>

        <div className="pt-24 grid grid-cols-2 md:grid-cols-4 gap-12 max-w-5xl mx-auto animate-in fade-in duration-1000 delay-500">
          <Stat n="3" label="R1 Universities" />
          <Stat n="86%" label="Avg Match Score" />
          <Stat n="14d" label="Time to Handshake" />
          <Stat n="200+" label="Verified Founders" />
        </div>
      </div>
    </section>
  );
}

function Stat({ n, label }: { n: string; label: string }) {
  return (
    <div className="space-y-2">
      <div className="text-5xl font-display text-foreground tracking-tighter">{n}</div>
      <div className="text-[10px] font-mono uppercase tracking-[0.2em] text-muted-foreground">{label}</div>
    </div>
  );
}

function WhoItHelps() {
  const users = [
    { title: "Researchers", desc: "You've built something world-changing in the lab. Now find the partner who can help you share it with the world.", icon: "⌬" },
    { title: "Founders", desc: "You're ready for your next big build. Discover deep tech that's looking for a leader.", icon: "⌖" },
    { title: "Students", desc: "Bring your energy to the frontier. Find internships that aren't just 'work,' but real discovery.", icon: "⌘" },
    { title: "Mentors", desc: "You've seen it all. Lend your wisdom to the next generation of Utah breakthroughs.", icon: "⚗" },
  ];

  return (
    <section className="py-32 border-t border-border/40">
      <div className="container-x">
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {users.map((u) => (
            <div key={u.title} className="card-surface p-10 group hover:card-surface-hover flex flex-col items-center text-center">
              <div className="size-16 rounded-2xl bg-surface-elevated border border-border flex items-center justify-center text-3xl mb-8 group-hover:scale-110 group-hover:text-electric transition-all shadow-soft">
                {u.icon}
              </div>
              <h3 className="text-2xl font-display mb-4">{u.title}</h3>
              <p className="text-sm text-muted-foreground leading-relaxed">{u.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function Mission() {
  return (
    <section className="py-32 bg-surface/20 relative overflow-hidden">
      <div className="absolute inset-0 radial-spot opacity-20" />
      <div className="container-x relative">
        <div className="max-w-3xl space-y-8">
          <span className="chip bg-bond/10 text-bond border-bond/20">The Why</span>
          <h2 className="text-5xl font-display leading-tight">It’s about the people behind the patents.</h2>
          <p className="text-xl text-muted-foreground leading-relaxed">
            We believe Utah's best ideas shouldn't stay in the lab because they couldn't find a partner. 
            We're building a more human way to navigate the ecosystem—one where every match is backed by a reason, 
            and every reason is about moving the world forward.
          </p>
        </div>
      </div>
    </section>
  );
}

function HowItWorks() {
  const steps = [
    { n: "01", t: "Introduce Yourself", b: "No 20-page forms. Just tell us about your journey, what you've built, or what you're looking for. We'll listen." },
    { n: "02", t: "Find Your People", b: "Our community assistant looks through the Utah graph to find the labs and leaders that share your vision." },
    { n: "03", t: "The First Handshake", b: "Review your matches, see the reasoning behind them, and request an intro with a single click. We'll handle the rest." },
  ];

  return (
    <section className="py-32 border-y border-border/40 relative">
      <div className="container-x grid md:grid-cols-2 gap-24 items-center">
        <div className="space-y-8">
          <span className="chip text-electric border-electric/20 bg-electric/5">Our Approach</span>
          <h2 className="text-6xl font-display leading-tight">Built to feel like a warm introduction.</h2>
          <p className="text-lg text-muted-foreground leading-relaxed italic">
            "We aren't a job board. We're an infrastructure for the first conversation."
          </p>
        </div>
        <div className="space-y-12">
          {steps.map((s) => (
            <div key={s.n} className="flex gap-8 group">
              <span className="text-5xl font-display text-muted/50 group-hover:text-electric transition-colors duration-500">{s.n}</span>
              <div className="space-y-2">
                <h3 className="text-2xl font-display">{s.t}</h3>
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
    <section className="py-32 container-x">
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 mb-16">
        <div className="space-y-4">
          <h2 className="text-5xl font-display">Stories in the making.</h2>
          <p className="text-xl text-muted-foreground max-w-xl">Every match below is a real opportunity looking for the right person.</p>
        </div>
        <Link to="/matches" className="btn-ghost px-8 py-3">View the full queue →</Link>
      </div>

      <div className="grid md:grid-cols-3 gap-8">
        {matches.map((m) => (
          <Link key={m.id} to="/matches/$matchId" params={{ matchId: m.id }} className="card-surface p-10 group hover:card-surface-hover">
            <div className="flex items-center justify-between mb-8">
              <span className="chip text-[10px] uppercase tracking-widest">{m.talent.archetype}</span>
              <ScoreRing score={m.score} />
            </div>
            <h3 className="text-3xl font-display mb-2 group-hover:text-electric transition-colors">{m.talent.name}</h3>
            <div className="text-sm text-muted-foreground mb-6 font-mono">Founding opportunity with {m.startup.name}</div>
            <p className="text-base text-foreground/80 leading-relaxed line-clamp-3 italic">"{m.reasons[0]}"</p>
            <div className="mt-10 pt-8 border-t border-border flex items-center justify-between">
              <span className="text-[10px] font-mono text-muted-foreground uppercase tracking-widest">{m.startup.origin}</span>
              <span className="text-electric text-[10px] font-mono uppercase tracking-[0.2em] opacity-0 group-hover:opacity-100 transition-all translate-x-2 group-hover:translate-x-0">View Story →</span>
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
}

function UtahEdge() {
  return (
    <section className="relative py-32 bg-surface/30 overflow-hidden">
      <div className="absolute inset-0 grid-bg opacity-10" />
      <div className="container-x relative text-center space-y-16">
        <div className="space-y-4">
          <span className="chip bg-bond/10 text-bond border-bond/20">The Home Advantage</span>
          <h2 className="text-5xl font-display">Deeply rooted in Utah's future.</h2>
        </div>
        <div className="grid sm:grid-cols-3 gap-16 text-left max-w-6xl mx-auto">
          <EdgeItem title="Three Universities" body="We bridge the gap between U of U, BYU, and USU's research specialties to build a unified front for Utah innovation." />
          <EdgeItem title="A Trusted Graph" body="Silicon Slopes is a community, not just a location. We surface the human connections that make first meetings easy." />
          <EdgeItem title="Mission Driven" body="Every match is built with state programs and university TTOs in mind, ensuring the best outcome for the ecosystem." />
        </div>
      </div>
    </section>
  );
}

function EdgeItem({ title, body }: { title: string; body: string }) {
  return (
    <div className="space-y-4">
      <h3 className="text-2xl font-display">{title}</h3>
      <p className="text-base text-muted-foreground leading-relaxed">{body}</p>
    </div>
  );
}

function FinalCTA() {
  return (
    <section className="py-40 container-x">
      <div className="card-surface p-16 md:p-24 text-center space-y-12 relative overflow-hidden group">
        <div className="absolute inset-0 radial-spot opacity-30 group-hover:opacity-50 transition-opacity duration-1000" />
        <div className="relative space-y-6">
          <h2 className="text-6xl md:text-7xl font-display">Let's build something together.</h2>
          <p className="text-2xl text-muted-foreground max-w-2xl mx-auto leading-relaxed">
            You're just a few minutes away from a community that's ready to help you take the next step.
          </p>
        </div>
        <div className="relative">
          <Link to="/onboarding" className="btn-primary px-16 py-6 text-xl">
            Create your profile
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
    <div className="relative size-14">
      <svg viewBox="0 0 40 40" className="size-14 -rotate-90">
        <circle cx="20" cy="20" r={r} fill="none" stroke="var(--color-border)" strokeWidth="3" />
        <circle cx="20" cy="20" r={r} fill="none" stroke="var(--color-signal)" strokeWidth="3" strokeDasharray={`${dash} ${c}`} strokeLinecap="round" />
      </svg>
      <div className="absolute inset-0 flex items-center justify-center font-display text-sm font-semibold">{score}</div>
    </div>
  );
}
