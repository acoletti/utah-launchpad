import { createFileRoute, Link } from "@tanstack/react-router";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { matches } from "@/lib/mock-data";
import { ScoreRing } from "./index";
import { useState } from "react";

export const Route = createFileRoute("/matches")({
  component: MatchesPage,
  head: () => ({ meta: [{ title: "Matches — EyeToEye" }] }),
});

function MatchesPage() {
  const [filter, setFilter] = useState<string>("all");
  const filters = ["all", "Executive", "Fractional", "Student"];
  const filtered = filter === "all" ? matches : matches.filter((m) => m.talent.archetype === filter);

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="container-x py-12 flex-1">
        <div className="flex items-end justify-between flex-wrap gap-4">
          <div>
            <span className="chip">Match queue · live</span>
            <h1 className="font-display text-5xl mt-4">Three matches need your eyes today.</h1>
            <p className="text-muted-foreground mt-3 max-w-xl">Sorted by confidence. Every match includes the reasoning, the gaps, and a concrete next step. Click in for the full picture.</p>
          </div>
          <div className="flex gap-2 flex-wrap">
            {filters.map((f) => (
              <button key={f} onClick={() => setFilter(f)} className={`px-3 py-1.5 rounded-full text-xs font-mono uppercase tracking-wider transition-colors ${filter === f ? "bg-electric text-electric-foreground" : "border border-border text-muted-foreground hover:text-foreground"}`}>{f}</button>
            ))}
          </div>
        </div>

        <div className="mt-10 grid gap-4">
          {filtered.map((m) => (
            <Link key={m.id} to="/matches/$matchId" params={{ matchId: m.id }} className="card-surface p-6 md:p-8 grid md:grid-cols-[auto_1fr_auto] gap-6 items-start hover:border-electric/50 transition-colors group">
              <div className="flex flex-col items-center gap-3">
                <ScoreRing score={m.score} />
                <span className="chip">{m.confidence}</span>
              </div>
              <div className="min-w-0">
                <div className="flex items-center gap-3 flex-wrap">
                  <span className="chip">{m.talent.archetype}</span>
                  <span className="text-muted-foreground">→</span>
                  <span className="chip" style={{ color: "var(--bond)", borderColor: "color-mix(in oklab, var(--bond) 40%, transparent)" }}>{m.startup.sector}</span>
                  <span className="text-muted-foreground">·</span>
                  <span className="text-xs font-mono uppercase tracking-wider text-muted-foreground">{m.startup.origin}</span>
                </div>
                <h2 className="font-display text-2xl md:text-3xl mt-4 group-hover:text-electric transition-colors">
                  {m.talent.name} <span className="text-muted-foreground font-normal">↔</span> {m.startup.name}
                </h2>
                <p className="text-sm text-muted-foreground mt-1">{m.talent.headline}</p>
                <div className="mt-5 space-y-2.5">
                  {m.reasons.slice(0, 2).map((r, i) => (
                    <div key={i} className="flex items-start gap-3 text-sm">
                      <span className="text-electric font-mono text-xs mt-1">{String(i + 1).padStart(2, "0")}</span>
                      <span className="text-foreground/90">{r}</span>
                    </div>
                  ))}
                </div>
              </div>
              <div className="text-right text-xs font-mono uppercase tracking-wider text-electric self-end">Open →</div>
            </Link>
          ))}
        </div>

        <div className="mt-12 card-surface p-6 flex items-center justify-between flex-wrap gap-4">
          <div>
            <div className="text-xs font-mono uppercase tracking-wider text-muted-foreground">Filtered out by trust layer this week</div>
            <div className="font-display text-2xl mt-1">14 spam profiles · 8 service-pitch accounts · 3 unverified</div>
          </div>
          <button className="btn-ghost text-xs">View moderation log</button>
        </div>
      </main>
      <Footer />
    </div>
  );
}
