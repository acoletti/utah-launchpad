import { createFileRoute, Link } from "@tanstack/react-router";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { matches } from "@/lib/mock-data";
import { useState, useEffect, useRef, useCallback, useMemo } from "react";
import { useMagnetic } from "@/hooks/useHighFidelity";

export const Route = createFileRoute("/")({
  component: Landing,
  head: () => ({
    meta: [
      { title: "LaunchHive — Building Utah's Deep Tech Future" },
      { name: "description", content: "Bringing the laboratory to the world. We connect Utah's brightest research with the founders ready to build it." },
    ],
  }),
});

// --- High-Fidelity Interaction Components ---

function TextScramble({ text, delay = 0 }: { text: string; delay?: number }) {
  const [displayText, setDisplayText] = useState("");
  const [isScrambling, setIsScrambling] = useState(false);
  const chars = "!<>-_\\/[]{}—=+*^?#________";
  
  useEffect(() => {
    let iteration = 0;
    let interval: any;
    
    const timeout = setTimeout(() => {
      setIsScrambling(true);
      interval = setInterval(() => {
        setDisplayText(
          text.split("")
            .map((char, index) => {
              if (index < iteration) return text[index];
              return chars[Math.floor(Math.random() * chars.length)];
            })
            .join("")
        );
        
        if (iteration >= text.length) {
          clearInterval(interval);
          setIsScrambling(false);
        }
        iteration += 1 / 3;
      }, 30);
    }, delay);

    return () => {
      clearTimeout(timeout);
      clearInterval(interval);
    };
  }, [text, delay]);

  return <span className={isScrambling ? "text-scramble" : ""}>{displayText}</span>;
}

function CharReveal({ text, delay = 0 }: { text: string; delay?: number }) {
  const [isVisible, setIsVisible] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        setTimeout(() => setIsVisible(true), delay);
        observer.unobserve(entry.target);
      }
    });
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, [delay]);

  return (
    <div ref={ref} className="inline-block">
      {text.split("").map((char, i) => (
        <span 
          key={i} 
          className={`inline-block transition-all duration-[800ms] cubic-bezier(0.2, 1, 0.3, 1) ${isVisible ? "opacity-100 translate-y-0 filter-none" : "opacity-0 translate-y-4 blur-sm"}`}
          style={{ transitionDelay: `${i * 20}ms` }}
        >
          {char === " " ? "\u00A0" : char}
        </span>
      ))}
    </div>
  );
}

function Magnetic({ children, strength = 15 }: { children: React.ReactElement; strength?: number }) {
  const { ref, position, handleMouseMove, handleMouseLeave, handleMouseEnter } = useMagnetic(strength);

  return (
    <div 
      ref={ref} 
      onMouseMove={handleMouseMove} 
      onMouseLeave={handleMouseLeave}
      onMouseEnter={handleMouseEnter}
      className="magnetic-btn w-fit"
      style={{ transform: `translate(${position.x}px, ${position.y}px)` }}
    >
      {children}
    </div>
  );
}

function Reveal({ children, delay = 0, variant = "slide" }: { children: React.ReactNode; delay?: number; variant?: "slide" | "scale" }) {
  const [isVisible, setIsVisible] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setTimeout(() => setIsVisible(true), delay);
          observer.unobserve(entry.target);
        }
      },
      { threshold: 0.1 }
    );

    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, [delay]);

  const baseClass = variant === "scale" ? "reveal-scale" : "reveal-on-scroll";
  const activeClass = variant === "scale" ? "reveal-scale-active" : "reveal-on-scroll-active";

  return (
    <div ref={ref} className={`${baseClass} ${isVisible ? activeClass : ""}`}>
      {children}
    </div>
  );
}

function useScrollY() {
  const [scrollY, setScrollY] = useState(0);
  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);
  return scrollY;
}

// --- Main Page ---

function Landing() {
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [glowPos, setGlowPos] = useState({ x: 0, y: 0 });
  
  const handleMouseMove = useCallback((e: React.MouseEvent) => {
    setMousePos({ x: e.clientX, y: e.clientY });
  }, []);

  // Smooth cursor glow lag
  useEffect(() => {
    let frame: number;
    const animate = () => {
      setGlowPos(prev => ({
        x: prev.x + (mousePos.x - prev.x) * 0.1,
        y: prev.y + (mousePos.y - prev.y) * 0.1
      }));
      frame = requestAnimationFrame(animate);
    };
    frame = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(frame);
  }, [mousePos]);

  const cssMousePos = useMemo(() => {
    if (typeof window === "undefined") return {} as React.CSSProperties;
    return {
      "--mouse-x": `${(mousePos.x / window.innerWidth) * 100}%`,
      "--mouse-y": `${(mousePos.y / window.innerHeight) * 100}%`
    } as React.CSSProperties;
  }, [mousePos]);

  return (
    <div 
      className="min-h-screen flex flex-col bg-background selection:bg-electric/30 overflow-x-hidden relative"
      onMouseMove={handleMouseMove}
      style={cssMousePos}
    >
      <div className="cursor-glow" style={{ left: glowPos.x, top: glowPos.y }} />
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
  const scrollY = useScrollY();
  
  return (
    <section className="relative min-h-[85vh] flex items-center justify-center pt-20 pb-32 perspective-1000 overflow-hidden">
      {/* Immersive Backgrounds */}
      <div className="absolute inset-0 grid-bg opacity-30 pointer-events-none transition-opacity duration-1000" />
      <div className="absolute inset-0 bloom-bg opacity-20 pointer-events-none" />
      <div 
        className="absolute inset-0 grid-bg-static opacity-5 parallax-bg" 
        style={{ transform: `translateY(${scrollY * 0.1}px)` }}
      />
      <div 
        className="absolute inset-0 radial-spot opacity-40 parallax-bg" 
        style={{ transform: `translateY(${scrollY * -0.03}px) scale(${1 + scrollY * 0.0002})` }}
      />
      
      <div className="container-x relative z-10 text-center space-y-12">
        <Reveal>
          <div className="inline-flex items-center gap-3 px-5 py-1.5 rounded-full bg-surface-elevated/40 border border-border text-[10px] font-mono uppercase tracking-[0.3em] text-electric backdrop-blur-md">
            <span className="size-1.5 rounded-full bg-electric animate-ping" />
            <TextScramble text="Utah's deep tech heartbeat" delay={500} />
          </div>
        </Reveal>
        
        <div className="space-y-2">
          <h1 className="text-6xl md:text-8xl font-display leading-[0.9] max-w-5xl mx-auto tracking-tighter">
            <CharReveal text="The bridge between" delay={100} /> <br />
            <em className="text-electric not-italic italic-serif relative inline-block group">
              <CharReveal text="breakthroughs" delay={400} />
              <svg className="absolute -bottom-2 left-0 w-full h-3 text-electric/40 transition-all duration-1000 group-hover:text-electric" viewBox="0 0 100 10" preserveAspectRatio="none">
                <path d="M0 5 Q 25 0 50 5 T 100 5" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
              </svg>
            </em> <br />
            <CharReveal text="and builds." delay={600} />
          </h1>
        </div>
        
        <Reveal delay={1000}>
          <p className="text-xl md:text-2xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
            LaunchHive is where Utah's deepest research finds its human counterpart. We pair world-changing science with the leaders ready to bring it to life.
          </p>
        </Reveal>
        
        <Reveal delay={1200}>
          <div className="flex flex-wrap items-center justify-center gap-6 pt-6">
            <Magnetic strength={20}>
              <Link to="/onboarding" className="btn-primary px-12 py-5 text-lg hover:scale-105 active:scale-95 transition-all shadow-glow group relative overflow-hidden">
                <span className="relative z-10">Start your journey</span>
                <span className="absolute inset-0 bg-linear-to-r from-transparent via-white/10 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000" />
              </Link>
            </Magnetic>
            <Magnetic strength={10}>
              <Link to="/matches" className="btn-ghost px-12 py-5 text-lg hover:bg-surface-elevated/60 backdrop-blur-sm">
                Browse the library
              </Link>
            </Magnetic>
          </div>
        </Reveal>

        <Reveal delay={1400}>
          <div className="pt-20 grid grid-cols-2 md:grid-cols-4 gap-12 max-w-6xl mx-auto">
            <Stat value={3} label="R1 Universities" />
            <Stat value={86} label="Avg Match Score" suffix="%" />
            <Stat value={14} label="Time to Handshake" suffix="d" />
            <Stat value={200} label="Verified Founders" suffix="+" />
          </div>
        </Reveal>
      </div>
    </section>
  );
}

function Stat({ value, label, suffix = "" }: { value: number; label: string; suffix?: string }) {
  const [displayValue, setDisplayValue] = useState(0);
  const countRef = useRef<number>(0);
  const startTimeRef = useRef<number | null>(null);
  const [isStarted, setIsStarted] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) setIsStarted(true);
    });
    if (containerRef.current) observer.observe(containerRef.current);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!isStarted) return;
    let animationFrameId: number;
    const duration = 2000;

    const animate = (timestamp: number) => {
      if (!startTimeRef.current) startTimeRef.current = timestamp;
      const progress = Math.min((timestamp - startTimeRef.current) / duration, 1);
      const easeProgress = progress === 1 ? 1 : 1 - Math.pow(2, -10 * progress);
      const currentCount = Math.floor(easeProgress * value);
      
      if (currentCount !== countRef.current) {
        countRef.current = currentCount;
        setDisplayValue(currentCount);
      }
      if (progress < 1) animationFrameId = requestAnimationFrame(animate);
    };

    animationFrameId = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(animationFrameId);
  }, [value, isStarted]);

  return (
    <div ref={containerRef} className="space-y-3 group">
      <div className="text-5xl font-display text-foreground tracking-tighter tabular-nums group-hover:text-electric transition-colors duration-500">
        {displayValue}{suffix}
      </div>
      <div className="text-[10px] font-mono uppercase tracking-[0.3em] text-muted-foreground/60">{label}</div>
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
    <section className="py-24 border-t border-border/20">
      <div className="container-x">
        <Reveal>
          <div className="text-center mb-16 space-y-4">
            <span className="chip bg-bond/5 text-bond border-bond/20 uppercase tracking-[0.3em] text-[10px] py-1 px-3">Community Hub</span>
            <h2 className="text-4xl font-display">A space for everyone.</h2>
            <p className="text-lg text-muted-foreground max-w-xl mx-auto">Every role in the ecosystem matters to the mission.</p>
          </div>
        </Reveal>
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {users.map((u, i) => (
            <Reveal key={u.title} delay={i * 100}>
              <div className="card-surface p-8 group hover:card-surface-hover flex flex-col items-center text-center transition-all duration-700 hover:-translate-y-1">
                <div className="size-16 rounded-2xl bg-surface-elevated border border-border flex items-center justify-center text-3xl mb-8 group-hover:scale-110 group-hover:text-electric transition-all duration-700 shadow-soft group-hover:shadow-glow">
                  {u.icon}
                </div>
                <h3 className="text-2xl font-display mb-4">{u.title}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">{u.desc}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

function Mission() {
  return (
    <section className="py-24 bg-surface/10 relative overflow-hidden group">
      <div className="absolute inset-0 radial-spot opacity-20 group-hover:opacity-30 transition-opacity duration-1000" />
      <div className="container-x relative">
        <Reveal>
          <div className="max-w-4xl space-y-10">
            <span className="chip bg-bond/10 text-bond border-bond/20 uppercase tracking-[0.3em] text-[10px] py-1 px-3">The Purpose</span>
            <h2 className="text-6xl font-display leading-[1.1] tracking-tighter">It’s about the people <br /> behind the patents.</h2>
            <p className="text-xl text-muted-foreground leading-relaxed max-w-3xl">
              We believe Utah's best ideas shouldn't stay in the lab because they couldn't find a partner. 
              We're building a more human way to navigate the ecosystem—one where every match is backed by a reason, 
              and every reason is about moving the world forward.
            </p>
          </div>
        </Reveal>
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
    <section className="py-24 border-y border-border/20 relative">
      <div className="container-x grid lg:grid-cols-2 gap-20 items-center">
        <Reveal>
          <div className="space-y-8">
            <span className="chip text-electric border-electric/20 bg-electric/5 uppercase tracking-[0.3em] text-[10px] py-1 px-3">The Journey</span>
            <h2 className="text-5xl font-display leading-[1.1] tracking-tight">Built to feel like a <br /> warm introduction.</h2>
            <p className="text-xl text-muted-foreground leading-relaxed italic border-l-2 border-electric pl-6">
              "We aren't a job board. We're an infrastructure for the first conversation."
            </p>
          </div>
        </Reveal>
        <div className="space-y-12">
          {steps.map((s, i) => (
            <Reveal key={s.n} delay={i * 150}>
              <div className="flex gap-8 group">
                <span className="text-6xl font-display text-muted/20 group-hover:text-electric transition-colors duration-1000 leading-none">{s.n}</span>
                <div className="space-y-3 pt-3">
                  <h3 className="text-2xl font-display">{s.t}</h3>
                  <p className="text-base text-muted-foreground leading-relaxed">{s.b}</p>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

function FeaturedMatches() {
  return (
    <section className="py-24 container-x">
      <Reveal>
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-12 mb-16">
          <div className="space-y-4">
            <h2 className="text-5xl font-display tracking-tight">Stories in the making.</h2>
            <p className="text-xl text-muted-foreground max-w-xl">Every match below is a real opportunity looking for the right human energy.</p>
          </div>
          <Link to="/matches" className="btn-ghost px-8 py-3 text-lg hover:text-electric transition-all border-border/40 rounded-xl">
            View the full queue →
          </Link>
        </div>
      </Reveal>

      <div className="grid lg:grid-cols-3 gap-8">
        {matches.slice(0, 3).map((m, i) => (
          <Reveal key={m.id} delay={i * 150}>
            <Link to="/matches/$matchId" params={{ matchId: m.id }} className="card-surface p-8 group hover:card-surface-hover h-full flex flex-col transition-all duration-700">
              <div className="flex items-start justify-between mb-10">
                <div className="space-y-3">
                  <span className="chip text-[10px] uppercase tracking-[0.3em] font-mono border-border/40 bg-surface-elevated/50">{m.talent.archetype}</span>
                  <div className="text-[10px] text-muted-foreground font-mono uppercase tracking-[0.3em]">{m.startup.origin}</div>
                </div>
                <ScoreRing score={m.score} />
              </div>
              <h3 className="text-3xl font-display mb-4 group-hover:text-electric transition-colors leading-[1.1]">{m.talent.name}</h3>
              <div className="text-[10px] text-muted-foreground mb-8 font-mono uppercase tracking-[0.3em]">Founding opportunity with {m.startup.name}</div>
              <p className="text-lg text-foreground/80 leading-relaxed line-clamp-3 italic mb-10 font-medium">"{m.reasons[0]}"</p>
              <div className="mt-auto pt-8 border-t border-border flex items-center justify-between relative overflow-hidden">
                <span className="text-electric text-[10px] font-mono uppercase tracking-[0.3em] group-hover:translate-x-1 transition-transform duration-500">View Story →</span>
              </div>
            </Link>
          </Reveal>
        ))}
      </div>
    </section>
  );
}

function UtahEdge() {
  return (
    <section className="relative py-24 bg-surface/20 overflow-hidden group">
      <div className="absolute inset-0 grid-bg opacity-10" />
      <div className="container-x relative text-center space-y-20">
        <Reveal>
          <div className="space-y-6">
            <span className="chip bg-bond/10 text-bond border-bond/20 uppercase tracking-[0.3em] text-[10px] py-1 px-3">Home Soil</span>
            <h2 className="text-5xl font-display tracking-tight">Deeply rooted in Utah's future.</h2>
          </div>
        </Reveal>
        <div className="grid sm:grid-cols-3 gap-16 text-left max-w-6xl mx-auto">
          <Reveal delay={100}><EdgeItem title="Three Universities" body="We bridge the gap between U of U, BYU, and USU's research specialties to build a unified front for Utah innovation." /></Reveal>
          <Reveal delay={200}><EdgeItem title="A Trusted Graph" body="Silicon Slopes is a community, not just a location. We surface the human connections that make first meetings easy." /></Reveal>
          <Reveal delay={300}><EdgeItem title="Mission Driven" body="Every match is built with state programs and university TTOs in mind, ensuring the best outcome for the ecosystem." /></Reveal>
        </div>
      </div>
    </section>
  );
}

function EdgeItem({ title, body }: { title: string; body: string }) {
  return (
    <div className="space-y-4 group">
      <h3 className="text-2xl font-display group-hover:text-electric transition-colors duration-500">{title}</h3>
      <p className="text-base text-muted-foreground leading-relaxed">{body}</p>
    </div>
  );
}

function FinalCTA() {
  return (
    <section className="py-32 container-x">
      <Reveal variant="scale">
        <div className="card-surface p-16 md:p-24 text-center space-y-12 relative overflow-hidden group shadow-premium border border-border/40">
          <div className="absolute inset-0 radial-spot opacity-30 group-hover:opacity-60 transition-opacity duration-1000" />
          <div className="relative space-y-6">
            <h2 className="text-6xl md:text-8xl font-display leading-[0.85] tracking-tighter">Let's build <br /> something together.</h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto leading-relaxed">
              You're just a few minutes away from a community that's ready to help you take the next step.
            </p>
          </div>
          <div className="relative">
            <Magnetic strength={30}>
              <Link to="/onboarding" className="btn-primary px-16 py-6 text-xl shadow-glow hover:scale-105 active:scale-95 transition-all rounded-2xl">
                Create your profile
              </Link>
            </Magnetic>
          </div>
        </div>
      </Reveal>
    </section>
  );
}

export function ScoreRing({ score }: { score: number }) {
  const r = 16;
  const c = 2 * Math.PI * r;
  const dash = (score / 100) * c;
  return (
    <div className="relative size-16">
      <svg viewBox="0 0 40 40" className="size-16 -rotate-90">
        <circle cx="20" cy="20" r={r} fill="none" stroke="var(--color-border)" strokeWidth="2" />
        <circle cx="20" cy="20" r={r} fill="none" stroke="var(--color-signal)" strokeWidth="2" strokeDasharray={`${dash} ${c}`} strokeLinecap="round" className="drop-shadow-glow" />
      </svg>
      <div className="absolute inset-0 flex items-center justify-center font-display text-lg font-bold">{score}</div>
    </div>
  );
}
