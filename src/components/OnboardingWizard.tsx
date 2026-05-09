import React from "react";

type Step = {
  id: string;
  title: string;
  description?: string;
};

interface OnboardingWizardProps {
  steps: Step[];
  currentStep: number;
  children: React.ReactNode;
}

export function OnboardingWizard({ steps, currentStep, children }: OnboardingWizardProps) {
  return (
    <div className="w-full max-w-[900px] flex flex-col md:flex-row gap-16 items-start">
      {/* Step Indicator Sidebar */}
      <aside className="w-full md:w-64 space-y-12 sticky top-24">
        <div className="space-y-8">
          {steps.map((step, index) => {
            const isCompleted = index < currentStep;
            const isActive = index === currentStep;

            return (
              <div key={step.id} className="flex gap-5 group">
                <div className="flex flex-col items-center">
                  <div 
                    className={`size-10 rounded-xl border-2 flex items-center justify-center text-sm font-display transition-all duration-700 ${
                      isCompleted 
                        ? "bg-electric border-electric text-electric-foreground shadow-glow" 
                        : isActive 
                          ? "border-electric text-electric scale-110" 
                          : "border-border text-muted-foreground"
                    }`}
                  >
                    {isCompleted ? "✓" : index + 1}
                  </div>
                  {index < steps.length - 1 && (
                    <div className={`w-0.5 h-16 my-2 transition-colors duration-700 ${isCompleted ? "bg-electric" : "bg-border/60"}`} />
                  )}
                </div>
                
                <div className="pt-2 space-y-1.5">
                  <div className={`text-base font-display transition-colors duration-500 ${isActive || isCompleted ? "text-foreground" : "text-muted-foreground"}`}>
                    {step.title}
                  </div>
                  {isActive && (
                    <div className="text-[10px] text-electric uppercase tracking-[0.2em] animate-in fade-in slide-in-from-left-2 duration-500">
                      We're here
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </div>

        <div className="glass p-6 rounded-2xl space-y-4 relative overflow-hidden group">
          <div className="absolute inset-0 radial-spot opacity-10 group-hover:opacity-20 transition-opacity" />
          <div className="text-[10px] font-mono uppercase tracking-[0.25em] text-electric relative">A quick note</div>
          <p className="text-xs text-muted-foreground leading-relaxed relative italic">
            "Think of this as a warm introduction. The more heart you put into your story, the better we can find your people."
          </p>
        </div>
      </aside>

      {/* Main Content Area */}
      <main className="flex-1 w-full animate-in fade-in slide-in-from-right-8 duration-1000">
        {children}
      </main>
    </div>
  );
}
