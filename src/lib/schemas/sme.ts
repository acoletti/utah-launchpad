export type SMEData = {
  firstName: string;
  lastName: string;
  email: string;
  city: string;
  state: string;
  zip: string;
  country: string;
  address: string;
  linkedinUrl: string;
  currentOrganization: string;
  currentTitle: string;
  professionalHistory: string;
  industries: string[];
  otherIndustry: string;
  skills: string;
  engagementTypes: string[];
  startupStageExpertise: string[];
  technicalBusinessDepth: number;
  researchIpHistory: boolean;
  researchIpDetail: string;
  keyAchievement: string;
  monthlyAvailability: string;
};

export const SME_DEFAULT: SMEData = {
  firstName: "",
  lastName: "",
  email: "",
  city: "",
  state: "",
  zip: "",
  country: "United States",
  address: "",
  linkedinUrl: "",
  currentOrganization: "",
  currentTitle: "",
  professionalHistory: "",
  industries: [],
  otherIndustry: "",
  skills: "",
  engagementTypes: [],
  startupStageExpertise: [],
  technicalBusinessDepth: 5,
  researchIpHistory: false,
  researchIpDetail: "",
  keyAchievement: "",
  monthlyAvailability: "",
};

export const INDUSTRIES = [
  "Life Sciences",
  "AI",
  "Defense / Aerospace",
  "Cybersecurity",
  "Energy",
  "Advanced Manufacturing",
  "Fintech",
  "Software",
  "Other"
] as const;

export const ENGAGEMENT_TYPES = [
  "Full-time",
  "Fractional",
  "Advisory",
  "Board seat",
  "Internship",
  "Cofounder"
] as const;

export const STARTUP_STAGES = [
  "Pre-seed",
  "Seed",
  "Series A",
  "Late Stage"
] as const;
