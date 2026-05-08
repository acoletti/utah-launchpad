export function Footer() {
  return (
    <footer className="border-t border-border/60 mt-24">
      <div className="container-x py-10 flex flex-col md:flex-row items-start md:items-center justify-between gap-6 text-sm text-muted-foreground">
        <div className="max-w-md">
          <div className="font-display text-base text-foreground">EyeToEye</div>
          <p className="mt-1">AI-native commercialization infrastructure for Utah's deep-tech ecosystem.</p>
        </div>
        <div className="flex flex-wrap gap-6 text-xs font-mono uppercase tracking-wider">
          <span>Built for U of U · BYU · USU</span>
          <span>Squarespace + Affinity ready</span>
          <span>v0.1 prototype</span>
        </div>
      </div>
    </footer>
  );
}
