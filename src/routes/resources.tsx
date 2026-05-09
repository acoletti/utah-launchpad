import { createFileRoute, Link } from "@tanstack/react-router";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";

export const Route = createFileRoute("/resources")({
  component: ResourcesPage,
  head: () => ({ meta: [{ title: "Resources — LaunchHive" }] }),
});

function ResourcesPage() {
  const categories = [
    {
      title: "For Researchers",
      resources: [
        { title: "What kind of operator do I need?", time: "5 min read", type: "Guide" },
        { title: "Advisor vs. Mentor vs. Fractional CEO", time: "8 min read", type: "Framework" },
        { title: "How to evaluate commercialization readiness", time: "12 min read", type: "Assessment" },
      ]
    },
    {
      title: "For Operators",
      resources: [
        { title: "Understanding Utah's TTO landscape", time: "10 min read", type: "Deep Dive" },
        { title: "How to prepare for an intro call", time: "4 min read", type: "Checklist" },
        { title: "Equity vs. Cash in pre-seed spinouts", time: "15 min read", type: "Whitepaper" },
      ]
    },
    {
      title: "Ecosystem Insights",
      resources: [
        { title: "Utah's Life Science Cluster Map", time: "Updated 2024", type: "Resource" },
        { title: "The Silicon Slopes Bridge program", time: "Join now", type: "Program" },
      ]
    }
  ];

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="container-x py-12 flex-1">
        <header className="max-w-3xl mb-16">
          <h1 className="font-display text-5xl">Ecosystem Resources</h1>
          <p className="text-muted-foreground mt-4 text-lg">Lightweight education for non-business users. No jargon, just the essentials of commercialization.</p>
          <div className="mt-8 flex gap-2">
            <input 
              type="text" 
              placeholder="Search resources..." 
              className="flex-1 max-w-sm bg-input/40 border border-border rounded-lg px-4 py-2 text-sm focus:outline-none focus:border-electric/60 transition-colors"
            />
          </div>
        </header>

        <div className="space-y-16">
          {categories.map((cat) => (
            <section key={cat.title}>
              <div className="flex items-center gap-4 mb-8">
                <h2 className="font-display text-2xl shrink-0">{cat.title}</h2>
                <div className="h-px bg-border flex-1" />
              </div>
              <div className="grid md:grid-cols-3 gap-6">
                {cat.resources.map((r) => (
                  <div key={r.title} className="card-surface p-6 hover:border-electric/40 transition-all cursor-pointer group">
                    <div className="flex items-center justify-between mb-4">
                      <span className="chip text-[10px] lowercase">{r.type}</span>
                      <span className="text-[10px] font-mono text-muted-foreground">{r.time}</span>
                    </div>
                    <h3 className="font-display text-xl leading-snug group-hover:text-electric transition-colors">{r.title}</h3>
                    <div className="mt-6 flex items-center text-xs font-mono text-electric uppercase tracking-wider group-hover:gap-2 transition-all">
                      Read article <span className="opacity-0 group-hover:opacity-100 transition-opacity">→</span>
                    </div>
                  </div>
                ))}
              </div>
            </section>
          ))}
        </div>
      </main>
      <Footer />
    </div>
  );
}
