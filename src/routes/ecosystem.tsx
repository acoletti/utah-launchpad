import { createFileRoute } from "@tanstack/react-router";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";

export const Route = createFileRoute("/ecosystem")({
  component: EcosystemPage,
  head: () => ({ meta: [{ title: "The Community Map — LaunchHive" }] }),
});

type Node = { id: string; label: string; type: "uni" | "startup" | "talent" | "program"; x: number; y: number };
const nodes: Node[] = [
  { id: "uofu", label: "The U", type: "uni", x: 50, y: 25 },
  { id: "byu", label: "BYU", type: "uni", x: 25, y: 65 },
  { id: "usu", label: "USU", type: "uni", x: 78, y: 60 },
  { id: "ustar", label: "USTAR", type: "program", x: 50, y: 50 },
  { id: "uif", label: "Innovation Fund", type: "program", x: 70, y: 35 },
  { id: "sbir", label: "SBIR/STTR", type: "program", x: 30, y: 35 },

  { id: "helix", label: "Helix Therapeutics", type: "startup", x: 60, y: 18 },
  { id: "alta", label: "AltaGrid", type: "startup", x: 40, y: 15 },
  { id: "ridge", label: "Ridgeline AI", type: "startup", x: 18, y: 75 },
  { id: "sentry", label: "Sentry Mesh", type: "startup", x: 32, y: 80 },
  { id: "wasatch", label: "Wasatch Orbital", type: "startup", x: 86, y: 70 },

  { id: "maya", label: "Maya Chen", type: "talent", x: 72, y: 18 },
  { id: "jordan", label: "Jordan Park", type: "talent", x: 12, y: 78 },
  { id: "rafa", label: "Rafael Ortiz", type: "talent", x: 45, y: 88 },
];

const edges: [string, string, number?][] = [
  ["uofu", "helix"], ["uofu", "alta"], ["uofu", "ustar"],
  ["byu", "ridge"], ["byu", "sentry"],
  ["usu", "wasatch"],
  ["ustar", "helix"], ["ustar", "alta"],
  ["uif", "wasatch"],
  ["sbir", "helix"], ["sbir", "wasatch"],
  ["maya", "helix", 1], ["jordan", "ridge", 1], ["rafa", "sentry", 1],
  ["maya", "alta", 0.4], ["rafa", "ridge", 0.4],
];

function colorFor(t: Node["type"]) {
  return t === "uni" ? "var(--bond)" : t === "startup" ? "var(--electric)" : t === "talent" ? "var(--signal)" : "var(--muted-foreground)";
}

function EcosystemPage() {
  const find = (id: string) => nodes.find((n) => n.id === id)!;
  
  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Navbar />
      <main className="container-x py-24 flex-1 space-y-16 animate-in fade-in slide-in-from-bottom-8 duration-1000">
        <header className="max-w-3xl space-y-6">
          <span className="chip bg-bond/10 text-bond border-bond/20 uppercase tracking-[0.25em] text-[10px] py-1 px-3">Our Home</span>
          <h1 className="text-6xl font-display leading-[1.1]">The Community Map.</h1>
          <p className="text-2xl text-muted-foreground leading-relaxed">
            Utah's deep tech family is closely knit. This is how we're all connected—from the lab to the first handshake.
          </p>
        </header>

        <div className="grid lg:grid-cols-[1fr_360px] gap-12">
          <div className="card-surface p-0 aspect-video relative overflow-hidden group shadow-premium">
            <div className="absolute inset-0 grid-bg opacity-15" />
            <div className="absolute inset-0 bg-linear-to-t from-background/90 to-transparent pointer-events-none" />
            
            <svg viewBox="0 0 100 100" className="absolute inset-0 size-full transition-all duration-1000 group-hover:scale-[1.02]">
              {edges.map(([a, b, w], i) => {
                const A = find(a); const B = find(b);
                return (
                  <line 
                    key={i} 
                    x1={A.x} y1={A.y} x2={B.x} y2={B.y} 
                    stroke="var(--electric)" 
                    strokeOpacity={(w ?? 0.5) * 0.3 + 0.1} 
                    strokeWidth={(w ?? 0.5) * 0.25 + 0.1} 
                  />
                );
              })}
              {nodes.map((n) => (
                <g key={n.id} transform={`translate(${n.x} ${n.y})`} className="cursor-pointer group/node">
                  <circle r={n.type === "uni" ? 2.8 : 2} fill={colorFor(n.type)} className="shadow-glow transition-all duration-500 group-hover/node:scale-125" />
                  <circle r={n.type === "uni" ? 6 : 5} fill={colorFor(n.type)} opacity={0.1} className="animate-pulse" />
                </g>
              ))}
            </svg>
            
            {nodes.map((n) => (
              <div 
                key={n.id} 
                className="absolute -translate-x-1/2 text-[10px] font-mono uppercase tracking-[0.2em] whitespace-nowrap pointer-events-none select-none transition-all duration-500" 
                style={{ left: `${n.x}%`, top: `calc(${n.y}% + 18px)`, color: colorFor(n.type) }}
              >
                {n.label}
              </div>
            ))}
            
            <div className="absolute bottom-8 left-8 flex gap-8 px-8 py-4 glass rounded-2xl shadow-soft">
              <LegendItem c="var(--bond)" l="Universities" />
              <LegendItem c="var(--electric)" l="Founders" />
              <LegendItem c="var(--signal)" l="People" />
              <LegendItem c="var(--muted-foreground)" l="Programs" />
            </div>
          </div>

          <aside className="space-y-8 sticky top-48">
            <div className="card-surface p-8 space-y-6 relative overflow-hidden group">
              <div className="absolute inset-0 radial-spot opacity-5 group-hover:opacity-10 transition-opacity" />
              <h3 className="text-2xl font-display leading-tight relative">Everything is connected.</h3>
              <p className="text-base text-muted-foreground leading-relaxed relative">
                In Utah, we're rarely more than two degrees apart. We use this proximity to make sure every match feels like a warm introduction from a friend.
              </p>
            </div>
            
            <div className="glass p-8 rounded-3xl space-y-6 relative overflow-hidden group">
              <div className="absolute inset-0 radial-spot opacity-10 group-hover:opacity-20 transition-opacity" />
              <h3 className="text-[11px] font-mono uppercase tracking-[0.25em] text-electric relative">Coming Soon</h3>
              <ul className="space-y-4 relative">
                {["Find your path to a founder", "Who knows whom", "Community timelines"].map(item => (
                  <li key={item} className="flex items-center gap-3 text-sm text-muted-foreground group-hover:text-foreground transition-colors duration-500">
                    <span className="size-1.5 rounded-full bg-border group-hover:bg-electric transition-colors" />
                    {item}
                  </li>
                ))}
              </ul>
            </div>

            <div className="card-surface p-8 bg-bond/5 border-bond/20">
              <h3 className="text-[11px] font-mono uppercase tracking-[0.25em] text-bond mb-3">A Note from the Hive</h3>
              <p className="text-sm text-bond/80 leading-relaxed italic">
                "The therapeutics cluster at the U is currently our most active community. It's a beautiful example of research meeting leadership."
              </p>
            </div>
          </aside>
        </div>
      </main>
      <Footer />
    </div>
  );
}

function LegendItem({ c, l }: { c: string; l: string }) {
  return (
    <div className="flex items-center gap-3">
      <span className="size-2.5 rounded-full shadow-soft" style={{ background: c }} />
      <span className="text-[10px] font-mono uppercase tracking-[0.2em] text-foreground/70">{l}</span>
    </div>
  );
}
