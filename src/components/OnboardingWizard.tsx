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
    <div className="w-full max-w-[800px] flex flex-col md:flex-row gap-12 items-start">
      {/* Step Indicator Sidebar */}
      <aside className="w-full md:w-64 space-y-8 sticky top-24">
        <div className="space-y-6">
          {steps.map((step, index) => {
            const isCompleted = index < currentStep;
            const isActive = index === currentStep;

            return (
              <div key={step.id} className="flex gap-4 group">
                <div className="flex flex-col items-center">
                  <div 
                    className={`size-8 rounded-full border-2 flex items-center justify-center text-xs font-mono transition-all duration-500 ${
                      isCompleted 
                        ? "bg-electric border-electric text-electric-foreground" 
                        : isActive 
                          ? "border-electric text-electric" 
                          : "border-border text-muted-foreground"
                    }`}
                  >
                    {isCompleted ? "✓" : index + 1}
                  </div>
                  {index < steps.length - 1 && (
                    <div className={`w-0.5 h-12 my-2 transition-colors duration-500 ${isCompleted ? "bg-electric" : "bg-border"}`} />
                  )}
                </div>
                
                <div className="pt-1 space-y-1">
                  <div className={`text-sm font-display transition-colors ${isActive || isCompleted ? "text-foreground" : "text-muted-foreground"}`}>
                    {step.title}
                  </div>
                  {isActive && (
                    <div className="text-[10px] text-muted-foreground uppercase tracking-widest animate-in fade-in duration-500">
                      Current Step
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </div>

        <div className="glass p-5 rounded-2xl space-y-3">
          <div className="text-[10px] font-mono uppercase tracking-[0.2em] text-electric">Onboarding Assistant</div>
          <p className="text-[11px] text-muted-foreground leading-relaxed">
            Filling this out accurately helps Gemini surface the best commercialization opportunities for your background.
          </p>
        </div>
      </aside>

      {/* Main Content Area */}
      <main className="flex-1 w-full animate-in fade-in slide-in-from-right-8 duration-700">
        {children}
      </main>
    </div>
  );
}
