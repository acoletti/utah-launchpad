import { createFileRoute } from "@tanstack/react-router";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";

export const Route = createFileRoute("/ecosystem")({
  component: EcosystemPage,
  head: () => ({ meta: [{ title: "Ecosystem Graph — LaunchHive" }] }),
});

type Node = { id: string; label: string; type: "uni" | "startup" | "talent" | "program"; x: number; y: number };
const nodes: Node[] = [
  { id: "uofu", label: "U of U", type: "uni", x: 50, y: 25 },
  { id: "byu", label: "BYU", type: "uni", x: 25, y: 65 },
  { id: "usu", label: "USU", type: "uni", x: 78, y: 60 },
  { id: "ustar", label: "USTAR", type: "program", x: 50, y: 50 },
  { id: "uif", label: "UT Innovation Fund", type: "program", x: 70, y: 35 },
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
      <main className="container-x py-16 flex-1 space-y-12">
        <header className="max-w-3xl space-y-4">
          <span className="chip bg-bond/10 text-bond border-bond/20">Ecosystem Mapping · Live</span>
          <h1 className="text-5xl font-display leading-tight">Utah's Deep Tech Graph.</h1>
          <p className="text-xl text-muted-foreground leading-relaxed">
            The bonds between universities, funding programs, and talent. 
            Proximity in this graph drives our weighted match scores.
          </p>
        </header>

        <div className="grid lg:grid-cols-[1fr_320px] gap-8">
          <div className="card-surface p-0 aspect-video relative overflow-hidden group">
            <div className="absolute inset-0 grid-bg opacity-20" />
            <div className="absolute inset-0 bg-linear-to-t from-background/80 to-transparent pointer-events-none" />
            
            <svg viewBox="0 0 100 100" className="absolute inset-0 size-full transition-transform duration-1000 group-hover:scale-[1.02]">
              {edges.map(([a, b, w], i) => {
                const A = find(a); const B = find(b);
                return (
                  <line 
                    key={i} 
                    x1={A.x} y1={A.y} x2={B.x} y2={B.y} 
                    stroke="var(--electric)" 
                    strokeOpacity={(w ?? 0.5) * 0.4 + 0.1} 
                    strokeWidth={(w ?? 0.5) * 0.3 + 0.1} 
                  />
                );
              })}
              {nodes.map((n) => (
                <g key={n.id} transform={`translate(${n.x} ${n.y})`} className="cursor-pointer">
                  <circle r={n.type === "uni" ? 2.5 : 1.8} fill={colorFor(n.type)} className="shadow-glow" />
                  <circle r={n.type === "uni" ? 5 : 4} fill={colorFor(n.type)} opacity={0.1} className="animate-pulse" />
                </g>
              ))}
            </svg>
            
            {nodes.map((n) => (
              <div 
                key={n.id} 
                className="absolute -translate-x-1/2 text-[9px] font-mono uppercase tracking-widest whitespace-nowrap pointer-events-none select-none" 
                style={{ left: `${n.x}%`, top: `calc(${n.y}% + 16px)`, color: colorFor(n.type) }}
              >
                {n.label}
              </div>
            ))}
            
            <div className="absolute bottom-6 left-6 flex gap-6 px-6 py-3 glass rounded-xl">
              <LegendItem c="var(--bond)" l="University" />
              <LegendItem c="var(--electric)" l="Startup" />
              <LegendItem c="var(--signal)" l="Talent" />
              <LegendItem c="var(--muted-foreground)" l="Program" />
            </div>
          </div>

          <aside className="space-y-6">
            <div className="card-surface p-6 space-y-4">
              <h3 className="text-lg font-display">Graph Intelligence</h3>
              <p className="text-xs text-muted-foreground leading-relaxed">
                Matches that share a common node in the Utah graph close 3.2× faster than cold matches. 
                We use this distance to calculate "Ecosystem Fit."
              </p>
            </div>
            
            <div className="glass p-6 rounded-2xl space-y-4">
              <h3 className="text-xs font-mono uppercase tracking-widest text-electric">Coming Soon</h3>
              <ul className="space-y-3">
                {["Connection Path Finder", "Affinity Integration", "Funding Timelines"].map(item => (
                  <li key={item} className="flex items-center gap-2 text-xs text-muted-foreground">
                    <span className="size-1 rounded-full bg-border" />
                    {item}
                  </li>
                ))}
              </ul>
            </div>

            <div className="card-surface p-6 bg-bond/5 border-bond/20">
              <h3 className="text-xs font-mono uppercase tracking-widest text-bond mb-2">Analysis</h3>
              <p className="text-[10px] text-bond/80 leading-relaxed italic">
                "U of U's therapeutics cluster is currently the most interconnected node set in the ecosystem."
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
    <div className="flex items-center gap-2">
      <span className="size-2 rounded-full" style={{ background: c }} />
      <span className="text-[10px] font-mono uppercase tracking-wider text-foreground/80">{l}</span>
    </div>
  );
}
