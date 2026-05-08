import { createFileRoute } from "@tanstack/react-router";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";

export const Route = createFileRoute("/ecosystem")({
  component: EcosystemPage,
  head: () => ({ meta: [{ title: "Utah Ecosystem Map — LaunchHive" }] }),
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
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="container-x py-12 flex-1">
        <div className="max-w-2xl">
          <span className="chip">Ecosystem mapping · beta</span>
          <h1 className="font-display text-5xl mt-4">Utah's deep-tech graph.</h1>
          <p className="text-muted-foreground mt-3">Universities, programs, spinouts, and talent — and the bonds between them. Match weight increases with proximity in this graph.</p>
        </div>

        <div className="mt-10 grid lg:grid-cols-[2fr_1fr] gap-6">
          <div className="card-surface p-4 aspect-[4/3] relative overflow-hidden">
            <div className="absolute inset-0 grid-bg opacity-40" />
            <svg viewBox="0 0 100 100" className="absolute inset-0 size-full">
              {edges.map(([a, b, w], i) => {
                const A = find(a); const B = find(b);
                return <line key={i} x1={A.x} y1={A.y} x2={B.x} y2={B.y} stroke="currentColor" className="text-electric" strokeOpacity={(w ?? 0.5) * 0.5 + 0.1} strokeWidth={(w ?? 0.5) * 0.4 + 0.15} />;
              })}
              {nodes.map((n) => (
                <g key={n.id} transform={`translate(${n.x} ${n.y})`}>
                  <circle r={n.type === "uni" ? 2.2 : n.type === "startup" ? 1.6 : 1.3} fill={colorFor(n.type)} opacity={0.95} />
                  <circle r={n.type === "uni" ? 4.5 : 3} fill={colorFor(n.type)} opacity={0.15} />
                </g>
              ))}
            </svg>
            {nodes.map((n) => (
              <div key={n.id} className="absolute -translate-x-1/2 text-[10px] font-mono uppercase tracking-wider whitespace-nowrap pointer-events-none" style={{ left: `${n.x}%`, top: `calc(${n.y}% + 14px)`, color: colorFor(n.type) }}>{n.label}</div>
            ))}
          </div>

          <aside className="space-y-4">
            <div className="card-surface p-6">
              <h3 className="font-display text-lg">Legend</h3>
              <div className="mt-4 space-y-2 text-sm">
                <LegendItem c="var(--bond)" l="University" />
                <LegendItem c="var(--electric)" l="Startup / spinout" />
                <LegendItem c="var(--signal)" l="Talent" />
                <LegendItem c="var(--muted-foreground)" l="Program (USTAR, SBIR, UIF)" />
              </div>
            </div>
            <div className="card-surface p-6">
              <h3 className="font-display text-lg">Why this matters</h3>
              <p className="text-sm text-muted-foreground mt-3 leading-relaxed">Utah is two degrees deep. Matches that share a path through this graph close 3.2× faster than cold matches. Ecosystem proximity is a first-class scoring dimension, not a vibe.</p>
            </div>
            <div className="card-surface p-6">
              <h3 className="font-display text-lg">Coming soon</h3>
              <ul className="mt-3 space-y-2 text-sm text-muted-foreground">
                <li>· Connection paths ("Maya → Eliza → Dr. Patel")</li>
                <li>· Affinity-synced relationship scores</li>
                <li>· Funding event timeline overlay</li>
              </ul>
            </div>
          </aside>
        </div>
      </main>
      <Footer />
    </div>
  );
}

function LegendItem({ c, l }: { c: string; l: string }) {
  return <div className="flex items-center gap-3"><span className="size-2.5 rounded-full" style={{ background: c }} />{l}</div>;
}
