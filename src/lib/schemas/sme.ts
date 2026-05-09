import { z } from "zod";

// ─── Option arrays ─────────────────────────────────────────────────────────────
// Single source of truth consumed by both UI (MultiSelect) and Zod schema.

export const INDUSTRIES = [
  "Aerospace",
  "AI",
  "B2B SaaS",
  "Crypto",
  "Cyber",
  "Defense",
  "Fintech / Blockchain",
  "Marketplace",
  "VR / AR",
  "Other",
] as const;

export const ENGAGEMENT_TYPES = [
  "Advisory Board",
  "Technical Consulting",
  "Mentorship",
  "Fractional Leadership",
  "Research Collaboration",
] as const;

export const STARTUP_STAGES = [
  "Idea / Pre-seed",
  "Seed to Series A",
  "Growth / Scale-up",
  "Enterprise",
] as const;

// ─── Runtime type + default (used directly by the multi-step form) ─────────────

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

// ─── Zod schema (for API submission / Supabase insert validation) ──────────────

export const smeSchema = z.object({
  firstName: z.string().min(1, "First name is required"),
  lastName: z.string().min(1, "Last name is required"),
  email: z.string().email("Valid email required"),
  city: z.string().min(1, "City is required"),
  state: z.string().min(1, "State is required"),
  zip: z.string().min(1, "ZIP is required"),
  country: z.string().min(1, "Country is required"),
  address: z.string().optional(),
  linkedinUrl: z.string().url("Must be a valid URL").optional().or(z.literal("")),
  currentOrganization: z.string().min(1, "Organization is required"),
  currentTitle: z.string().min(1, "Title is required"),
  professionalHistory: z.string().optional(),
  industries: z.array(z.string()).min(1, "Select at least one industry"),
  otherIndustry: z.string().optional(),
  skills: z.string().optional(),
  engagementTypes: z.array(z.string()).min(1, "Select at least one engagement type"),
  startupStageExpertise: z.array(z.string()).min(1, "Select at least one stage"),
  technicalBusinessDepth: z.number().int().min(1).max(10),
  researchIpHistory: z.boolean(),
  researchIpDetail: z.string().optional(),
  keyAchievement: z.string().min(10, "Please share at least a sentence"),
  monthlyAvailability: z.string().refine(v => Number(v) >= 1, "Must be at least 1 hour per month"),
});

export type SMEFormData = z.infer<typeof smeSchema>;
