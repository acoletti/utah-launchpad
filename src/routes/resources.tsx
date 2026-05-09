import { createFileRoute, Link } from "@tanstack/react-router";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";

export const Route = createFileRoute("/resources")({
  component: ResourcesPage,
  head: () => ({ meta: [{ title: "Resources for the Community — LaunchHive" }] }),
});

function ResourcesPage() {
  const categories = [
    {
      title: "For the Visionaries",
      subtitle: "Guidance for researchers and lab-builders.",
      resources: [
        { title: "What kind of partner do I really need?", time: "5 min", type: "Guide" },
        { title: "The first conversation: How to tell your story", time: "8 min", type: "Framework" },
        { title: "Preparing your research for the world", time: "12 min", type: "Journey" },
      ]
    },
    {
      title: "For the Builders",
      subtitle: "Tools for operators and future founders.",
      resources: [
        { title: "Navigating the Utah lab landscape", time: "10 min", type: "Deep Dive" },
        { title: "The handshake: Preparing for your first intro", time: "4 min", type: "Checklist" },
        { title: "Building trust with research founders", time: "15 min", type: "Letter" },
      ]
    },
    {
      title: "Community Insights",
      subtitle: "How our ecosystem is growing.",
      resources: [
        { title: "Utah's Life Science Map", time: "Updated 2024", type: "Map" },
        { title: "Joining the Silicon Slopes family", time: "Join now", type: "Story" },
      ]
    }
  ];

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Navbar />
      <main className="container-x py-24 flex-1 animate-in fade-in slide-in-from-bottom-8 duration-1000">
        <header className="max-w-3xl mb-24 space-y-6">
          <span className="chip bg-electric/10 text-electric border-electric/20 uppercase tracking-[0.25em] text-[10px] py-1 px-3">Ecosystem Knowledge</span>
          <h1 className="font-display text-6xl leading-tight">Wisdom from the community.</h1>
          <p className="text-xl text-muted-foreground leading-relaxed">
            We've gathered a few guides to help you navigate the early days of commercialization. 
            No jargon, just honest advice from people who have been there.
          </p>
          <div className="pt-4 flex gap-4">
            <input 
              type="text" 
              placeholder="What are you looking for today?" 
              className="flex-1 max-w-sm bg-surface-elevated/40 border border-border rounded-2xl px-6 py-4 text-base focus:outline-none focus:border-electric transition-all shadow-soft"
            />
          </div>
        </header>

        <div className="space-y-32">
          {categories.map((cat) => (
            <section key={cat.title} className="space-y-12">
              <div className="space-y-2">
                <h2 className="font-display text-4xl">{cat.title}</h2>
                <p className="text-muted-foreground italic text-base">{cat.subtitle}</p>
              </div>
              <div className="grid md:grid-cols-3 gap-8">
                {cat.resources.map((r) => (
                  <div key={r.title} className="card-surface p-10 group hover:card-surface-hover cursor-pointer relative overflow-hidden transition-all duration-500">
                    <div className="absolute inset-0 radial-spot opacity-5 group-hover:opacity-10 transition-opacity" />
                    <div className="flex items-center justify-between mb-8 relative">
                      <span className="chip text-[10px] uppercase tracking-widest">{r.type}</span>
                      <span className="text-[10px] font-mono text-muted-foreground uppercase tracking-widest">{r.time}</span>
                    </div>
                    <h3 className="font-display text-2xl leading-tight group-hover:text-electric transition-colors relative">{r.title}</h3>
                    <div className="mt-10 pt-8 border-t border-border/60 flex items-center text-[10px] font-mono text-electric uppercase tracking-[0.25em] group-hover:gap-4 gap-2 transition-all relative">
                      Explore story <span>→</span>
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
