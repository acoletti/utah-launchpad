import { useState, useEffect, useRef, useMemo, useCallback } from "react";
import { useMagnetic as useMagneticHook } from "@/hooks/useHighFidelity";

// --- Text Animations ---

export function TextScramble({ text, delay = 0 }: { text: string; delay?: number }) {
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

export function CharReveal({ text, delay = 0 }: { text: string; delay?: number }) {
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
          className={`inline-block transition-all duration-800 cubic-bezier(0.2, 1, 0.3, 1) ${isVisible ? "opacity-100 translate-y-0 filter-none" : "opacity-0 translate-y-4 blur-sm"}`}
          style={{ transitionDelay: `${i * 20}ms` }}
        >
          {char === " " ? "\u00A0" : char}
        </span>
      ))}
    </div>
  );
}

// --- Interaction ---

export function Magnetic({ children, strength = 15 }: { children: React.ReactElement; strength?: number }) {
  const { ref, position, handleMouseMove, handleMouseLeave, handleMouseEnter } = useMagneticHook(strength);

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

// --- Layout & Effects ---

export function Reveal({ children, delay = 0, variant = "slide" }: { children: React.ReactNode; delay?: number; variant?: "slide" | "scale" }) {
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

export function Stat({ value, label, suffix = "" }: { value: number; label: string; suffix?: string }) {
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

export function ImmersiveLayout({ children }: { children: React.ReactNode }) {
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [glowPos, setGlowPos] = useState({ x: 0, y: 0 });
  
  const handleMouseMove = useCallback((e: React.MouseEvent) => {
    setMousePos({ x: e.clientX, y: e.clientY });
  }, []);

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
      {children}
    </div>
  );
}
