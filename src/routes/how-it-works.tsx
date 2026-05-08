import { createFileRoute, Link } from "@tanstack/react-router";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";

export const Route = createFileRoute("/how-it-works")({
  component: HowItWorks,
  head: () => ({ meta: [{ title: "How EyeToEye works — architecture & models" }] }),
});

function HowItWorks() {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="container-x py-12 flex-1">
        <div className="max-w-3xl">
          <span className="chip">Architecture</span>
          <h1 className="font-display text-5xl mt-4">One reasoning surface. Many grounded inputs.</h1>
          <p className="text-muted-foreground mt-4 text-lg leading-relaxed">EyeToEye uses a centralized AI orchestration model — Gemini — wrapped around a Utah-specific RAG pipeline and a hybrid scoring engine. No agent swarm, no autonomous theater. Just an explainable system.</p>
        </div>

        <div className="mt-12 card-surface p-8">
          <FlowDiagram />
        </div>

        <div className="mt-12 grid md:grid-cols-2 gap-6">
          <Block title="Models & tools used" items={[
            ["Gemini 2.5 Pro", "Onboarding conversation, follow-up questioning, match reasoning, plain-English explanations."],
            ["Gemini Embeddings", "Vectorize talent profiles, startup descriptions, lab pages, and pitch decks."],
            ["pgvector on Supabase", "Semantic retrieval. Hybrid query with structured filters."],
            ["Hybrid scorer (TS)", "Weighted score across 6 dimensions. Deterministic, auditable."],
            ["Utah Eco Agent (RAG)", "Grounded knowledge: USTAR, SBIR/STTR, university TTOs, funding events, named operators."],
          ]} />
          <Block title="Why this beats LinkedIn / job boards" items={[
            ["Commercialization-aware", "TRL, regulatory complexity, and university-program eligibility are first-class fields."],
            ["Fractional-native", "Availability, equity vs. cash, and engagement count are inputs to the score, not afterthoughts."],
            ["Explained matches", "Every match shows the reasoning, the gaps, and the next step. Trust before transaction."],
            ["Ecosystem proximity", "Match weight increases when both sides share a path through Utah's graph."],
            ["Spam filtered", "Trust layer rejects sales pitches and unverified profiles before they reach the queue."],
          ]} />
        </div>

        <div className="mt-12 card-surface p-8">
          <h2 className="font-display text-3xl">Workflow integration</h2>
          <div className="mt-6 grid md:grid-cols-3 gap-4">
            {[
              { k: "Squarespace", v: "Embed widget for nucleusutah.org. Profile capture flows into the same pipeline." },
              { k: "Affinity CRM", v: "Two-way sync: every match becomes an opportunity, every intro is logged. No double entry for Eliza." },
              { k: "Webhooks", v: "Real-time events for any downstream tool — Slack alerts, Notion logs, email digests." },
            ].map((i) => (
              <div key={i.k} className="bg-surface-elevated/50 rounded-lg p-5">
                <div className="text-xs font-mono uppercase tracking-wider text-electric">{i.k}</div>
                <p className="text-sm mt-2">{i.v}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="mt-12 text-center">
          <Link to="/onboarding" className="btn-primary hover:[filter:brightness(1.08)]">Try the onboarding flow →</Link>
        </div>
      </main>
      <Footer />
    </div>
  );
}

function Block({ title, items }: { title: string; items: [string, string][] }) {
  return (
    <div className="card-surface p-8">
      <h2 className="font-display text-2xl">{title}</h2>
      <dl className="mt-6 space-y-5">
        {items.map(([k, v]) => (
          <div key={k}>
            <dt className="font-mono text-xs uppercase tracking-wider text-electric">{k}</dt>
            <dd className="text-sm text-foreground/85 mt-1 leading-relaxed">{v}</dd>
          </div>
        ))}
      </dl>
    </div>
  );
}

function FlowDiagram() {
  const stages = [
    { t: "Inputs", items: ["LinkedIn URL", "Lab page", "Resume", "Pitch deck"], c: "var(--muted-foreground)" },
    { t: "Gemini Extractor", items: ["Structured JSON profile", "Inferred attributes", "Follow-up questions"], c: "var(--electric)" },
    { t: "Utah Eco Agent (RAG)", items: ["pgvector retrieval", "Program metadata", "Ecosystem graph"], c: "var(--bond)" },
    { t: "Hybrid Matcher", items: ["Weighted score", "Confidence band", "Gap analysis"], c: "var(--signal)" },
    { t: "Explainer + Trust", items: ["Plain-English reasons", "Spam filter", "Next-step suggestion"], c: "var(--electric)" },
  ];
  return (
    <div className="grid md:grid-cols-5 gap-3">
      {stages.map((s, i) => (
        <div key={s.t} className="relative">
          <div className="border border-border rounded-lg p-4 h-full bg-surface-elevated/50">
            <div className="text-[10px] font-mono uppercase tracking-wider" style={{ color: s.c }}>Stage {i + 1}</div>
            <div className="font-display text-base mt-1">{s.t}</div>
            <ul className="mt-3 space-y-1 text-xs text-muted-foreground">
              {s.items.map((it) => <li key={it}>· {it}</li>)}
            </ul>
          </div>
          {i < stages.length - 1 && (
            <div className="hidden md:block absolute top-1/2 -right-2 text-electric text-xl -translate-y-1/2 z-10">→</div>
          )}
        </div>
      ))}
    </div>
  );
}
