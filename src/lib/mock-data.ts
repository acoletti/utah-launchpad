// Realistic Utah deep-tech ecosystem mock data
export type Match = {
  id: string;
  score: number; // 0-100
  confidence: "high" | "medium" | "exploratory";
  startup: Startup;
  talent: Talent;
  reasons: string[];
  gaps: string[];
  nextSteps: string[];
};

export type Startup = {
  id: string;
  name: string;
  oneLiner: string;
  origin: "University of Utah" | "BYU" | "Utah State University" | "Independent";
  sector: "Life Sciences" | "AI" | "Defense / Aerospace" | "Cybersecurity" | "Energy" | "Advanced Manufacturing" | "Fintech" | "Software";
  trl: number; // 1-9
  fundingStage: "Pre-seed" | "Seed" | "Series A" | "Grant-funded" | "Bootstrapped";
  funding: string;
  needs: string[];
  regulatory: "Heavy" | "Moderate" | "Light";
  utahPrograms: string[];
  team: number;
  description: string;
};

export type Talent = {
  id: string;
  name: string;
  headline: string;
  archetype: "Executive" | "Fractional" | "Operator" | "Student" | "Mentor" | "SME" | "Investor" | "Service Provider";
  skills: string[];
  domains: string[];
  stagePreference: string[];
  availability: string;
  riskTolerance: "Low" | "Moderate" | "High";
  compensation: string;
  mission: string;
  ecosystemSignals: string[];
  avatarHue: number;
};

export const startups: Startup[] = [
  {
    id: "helix-bio",
    name: "Helix Therapeutics",
    oneLiner: "mRNA-delivered gene therapies for inherited retinal disorders.",
    origin: "University of Utah",
    sector: "Life Sciences",
    trl: 4,
    fundingStage: "Pre-seed",
    funding: "$1.4M SBIR Phase I + USTAR commercialization grant",
    needs: ["Commercialization CEO", "Regulatory/FDA strategy", "Series A narrative"],
    regulatory: "Heavy",
    utahPrograms: ["USTAR", "SBIR Phase I", "U of U TVC"],
    team: 4,
    description: "Spinout from the Moran Eye Center. Pre-clinical data in two animal models. Preparing IND-enabling studies.",
  },
  {
    id: "ridgeline-ai",
    name: "Ridgeline AI",
    oneLiner: "On-device LLM inference for regulated workflows in defense and healthcare.",
    origin: "BYU",
    sector: "AI",
    trl: 6,
    fundingStage: "Seed",
    funding: "$3.2M seed (Pelion, Album)",
    needs: ["Founding GTM lead", "Federal sales / DoD pilots", "ML systems engineer"],
    regulatory: "Moderate",
    utahPrograms: ["BYU Crocker Innovation Fellowship"],
    team: 9,
    description: "Two BYU cybersecurity researchers + an ex-Recursion engineer. Three pilots in motion with regional health systems.",
  },
  {
    id: "wasatch-orbital",
    name: "Wasatch Orbital",
    oneLiner: "Solid-state propulsion for small-sat constellations.",
    origin: "Utah State University",
    sector: "Defense / Aerospace",
    trl: 5,
    fundingStage: "Pre-seed",
    funding: "$900K AFWERX + Utah Innovation Fund",
    needs: ["Fractional COO", "Aerospace BD", "Mfg engineer"],
    regulatory: "Heavy",
    utahPrograms: ["AFWERX", "Utah Innovation Fund", "USU SDL adjacent"],
    team: 6,
    description: "Two PhDs out of USU's Space Dynamics Lab orbit. ITAR-controlled. Testing on a sounding rocket Q2.",
  },
  {
    id: "alta-grid",
    name: "AltaGrid",
    oneLiner: "Grid-scale iron-air batteries for long-duration storage in arid climates.",
    origin: "University of Utah",
    sector: "Energy",
    trl: 4,
    fundingStage: "Grant-funded",
    funding: "$2.1M DOE ARPA-E + USTAR",
    needs: ["Energy CEO", "Utility partnerships lead", "Materials scientist"],
    regulatory: "Moderate",
    utahPrograms: ["USTAR", "DOE ARPA-E", "Rocky Mountain Power POC"],
    team: 5,
    description: "Materials science spinout pursuing 100-hour storage. Pilot interest from RMP and Idaho Power.",
  },
  {
    id: "sentry-cyber",
    name: "Sentry Mesh",
    oneLiner: "Zero-trust mesh networking for OT/ICS environments.",
    origin: "BYU",
    sector: "Cybersecurity",
    trl: 7,
    fundingStage: "Series A",
    funding: "$11M Series A",
    needs: ["VP Sales", "Customer success lead", "Senior security researcher"],
    regulatory: "Light",
    utahPrograms: ["Silicon Slopes scaling cohort"],
    team: 24,
    description: "Scaling fast — 4 Fortune 500 customers, expanding into utilities. Needs operators, not founders.",
  },
];

export const talent: Talent[] = [
  {
    id: "maya-chen",
    name: "Maya Chen",
    headline: "Ex-Recursion VP Commercial. Two FDA approvals. Looking for CEO seat #2.",
    archetype: "Executive",
    skills: ["FDA pathway strategy", "BD for therapeutics", "Series A storytelling", "Board management"],
    domains: ["Therapeutics", "Gene therapy", "Diagnostics"],
    stagePreference: ["Pre-seed", "Seed"],
    availability: "Full-time, ready Q1",
    riskTolerance: "High",
    compensation: "Founding equity + market salary",
    mission: "Bring Utah-born therapeutics to clinic. Specifically rare disease.",
    ecosystemSignals: ["3 yrs Recursion", "Mentor at U of U TVC", "SBIR reviewer"],
    avatarHue: 195,
  },
  {
    id: "jordan-park",
    name: "Jordan Park",
    headline: "BYU CS senior. Built two production RAG systems. Looking for first startup role.",
    archetype: "Student",
    skills: ["LLM application engineering", "Python", "Retrieval systems", "Evals"],
    domains: ["Applied AI", "Developer tools"],
    stagePreference: ["Pre-seed", "Seed"],
    availability: "Internship — 20 hrs/wk now, FT in May",
    riskTolerance: "High",
    compensation: "Equity + stipend",
    mission: "Ship something users actually rely on. Bonus if it touches healthcare or defense.",
    ecosystemSignals: ["BYU Crocker fellow", "Hack-the-U finalist 2024"],
    avatarHue: 145,
  },
  {
    id: "rafael-ortiz",
    name: "Rafael Ortiz",
    headline: "Fractional COO. Scaled two SaaS companies past $20M ARR. 12 hrs/wk.",
    archetype: "Fractional",
    skills: ["Ops scaling", "Hiring systems", "Forecasting", "GTM ops"],
    domains: ["B2B SaaS", "Cybersecurity", "DevTools"],
    stagePreference: ["Seed", "Series A"],
    availability: "Fractional, 2-3 engagements",
    riskTolerance: "Moderate",
    compensation: "Cash + advisory equity",
    mission: "Help technical founders avoid the chaos I lived through twice.",
    ecosystemSignals: ["Ex-Domo", "Ex-Lucid", "Silicon Slopes board"],
    avatarHue: 75,
  },
  {
    id: "dr-linda-walsh",
    name: "Dr. Linda Walsh",
    headline: "Retired biotech CEO. 30 yrs commercializing university IP. Now mentoring full-time.",
    archetype: "Mentor",
    skills: ["IP licensing", "Founder coaching", "Regulatory navigation", "Investor readiness"],
    domains: ["Life Sciences", "Medical Devices", "Diagnostics"],
    stagePreference: ["Pre-seed", "Seed"],
    availability: "Mentor, ~5 hrs/wk per company",
    riskTolerance: "Low",
    compensation: "Volunteer / advisory equity only",
    mission: "Pay forward 30 years of hard-won lessons to Utah's next generation of deep-tech founders.",
    ecosystemSignals: ["U of U TVC mentor network", "USTAR advisory board", "Former Sorenson Bioscience CEO"],
    avatarHue: 310,
  },
  {
    id: "kai-okafor",
    name: "Kai Okafor",
    headline: "Aerospace systems engineer. 15 yrs DoD programs. Available for technical advisory.",
    archetype: "SME",
    skills: ["ITAR compliance", "Propulsion systems", "DoD procurement", "Systems integration"],
    domains: ["Defense / Aerospace", "Advanced Manufacturing", "Energy"],
    stagePreference: ["Pre-seed", "Seed", "Series A"],
    availability: "Advisory, 4–8 hrs/wk",
    riskTolerance: "Moderate",
    compensation: "Advisory equity",
    mission: "Help Utah aerospace founders avoid the DoD procurement pitfalls that derail most first-timers.",
    ecosystemSignals: ["USU SDL alumni", "AFWERX reviewer", "L3Harris 15 yrs"],
    avatarHue: 220,
  },
  {
    id: "priya-nair",
    name: "Priya Nair",
    headline: "Angel investor. 22 Utah deep-tech bets. Focus: pre-seed life sciences and AI.",
    archetype: "Investor",
    skills: ["Deal sourcing", "Due diligence", "Cap table strategy", "Network introductions"],
    domains: ["Life Sciences", "AI", "Cybersecurity"],
    stagePreference: ["Pre-seed", "Seed"],
    availability: "Active investor, 2–3 new deals/yr",
    riskTolerance: "High",
    compensation: "Equity (investor)",
    mission: "Close the early-capital gap for Utah founders who can't wait for a coastal VC to discover them.",
    ecosystemSignals: ["Utah Innovation Fund LP", "Silicon Slopes angels network", "Ex-Recursion board observer"],
    avatarHue: 35,
  },
];

export const matches: Match[] = [
  {
    id: "m-1",
    score: 94,
    confidence: "high",
    startup: startups[0],
    talent: talent[0],
    reasons: [
      "Two prior FDA approvals directly map to Helix's IND-enabling roadmap.",
      "Stage preference (pre-seed) aligns with Helix's commercialization gap.",
      "Domain overlap: gene therapy commercial strategy — rare in Utah's operator pool.",
      "Mission alignment: explicit interest in Utah-born therapeutics for rare disease.",
    ],
    gaps: [
      "Limited prior exposure to retinal indication networks — soluble via U of U Moran connections.",
    ],
    nextSteps: [
      "30-min intro with Dr. Patel (PI) and Helix board chair.",
      "Share IND roadmap and Series A narrative draft for review.",
      "Warm intro available via Eliza Wilson (Nucleus).",
    ],
  },
  {
    id: "m-2",
    score: 88,
    confidence: "high",
    startup: startups[1],
    talent: talent[1],
    reasons: [
      "Production RAG experience matches Ridgeline's on-device retrieval roadmap.",
      "Same BYU lab cohort as one of Ridgeline's co-founders — implicit trust.",
      "Stage and risk tolerance align: pre-Series A, equity-weighted comp acceptable.",
      "Internship structure matches Ridgeline's hiring sequencing (intern → FT in May).",
    ],
    gaps: [
      "No prior healthcare-regulated deployment experience — Ridgeline can mentor.",
    ],
    nextSteps: [
      "Async coding exercise from Ridgeline's eval suite.",
      "Coffee with founding engineer in Provo.",
    ],
  },
  {
    id: "m-3",
    score: 82,
    confidence: "high",
    startup: startups[4],
    talent: talent[2],
    reasons: [
      "Fractional COO availability matches Sentry Mesh's Series A scaling gap.",
      "B2B SaaS + cybersecurity domain overlap is direct.",
      "Compensation model (cash + advisory equity) matches Sentry's offer structure.",
      "Ecosystem signal: prior Domo/Lucid network maps to Sentry's enterprise targets.",
    ],
    gaps: [
      "OT/ICS-specific GTM is new — 4-week ramp recommended with VP Eng.",
      "OT/ICS domain knowledge gap.",
    ],
    nextSteps: [
      "Working session on Q1 hiring plan.",
      "Intro to Sentry's lead investor for advisory alignment.",
    ],
  },
  {
    id: "m-4",
    score: 79,
    confidence: "high",
    startup: startups[0],
    talent: talent[3], // Dr. Linda Walsh — Mentor
    reasons: [
      "30 years of biotech IP licensing maps precisely to Helix's pre-IND commercialization needs.",
      "Prior U of U TVC network puts her one connection from Helix's PI.",
      "Mentor archetype fits Helix's stage — they need wisdom, not another exec on the cap table.",
      "Former Sorenson Bioscience CEO: rare disease precedent in Utah context.",
    ],
    gaps: [
      "mRNA-specific delivery mechanisms are newer than her primary era — supplemental read recommended.",
    ],
    nextSteps: [
      "Informal coffee with Helix co-founders — no agenda, just pattern-matching.",
      "Share Helix's IND-enabling roadmap for Linda's regulatory read.",
    ],
  },
  {
    id: "m-5",
    score: 75,
    confidence: "medium",
    startup: startups[2],
    talent: talent[4], // Kai Okafor — SME
    reasons: [
      "15 years of DoD systems integration directly addresses Wasatch Orbital's ITAR compliance gap.",
      "USU SDL alumni connection creates implicit trust with the founding team.",
      "AFWERX reviewer experience: understands the funding language Wasatch is writing for.",
      "Propulsion systems domain overlap is rare in Utah's operator pool.",
    ],
    gaps: [
      "Solid-state propulsion is a narrower specialty — Kai's background is systems-level, not propellant chemistry.",
    ],
    nextSteps: [
      "Technical advisory agreement scoping call.",
      "Intro to Wasatch's AFWERX program officer via Kai's network.",
    ],
  },
  {
    id: "m-6",
    score: 71,
    confidence: "medium",
    startup: startups[1],
    talent: talent[5], // Priya Nair — Investor
    reasons: [
      "Pre-seed AI investment thesis aligns with Ridgeline's current raise.",
      "Prior Recursion board observer role signals healthcare AI pattern recognition.",
      "Utah Innovation Fund LP status gives her visibility into co-investment opportunities.",
      "Checks average $250K–$500K — right size for Ridgeline's bridge round.",
    ],
    gaps: [
      "On-device / edge inference is outside her core thesis — requires a technical sponsor to co-lead diligence.",
    ],
    nextSteps: [
      "Send Ridgeline's seed deck and eval results.",
      "Warm intro via Nucleus — Priya has expressed interest in regulated-AI bets.",
    ],
  },
];
