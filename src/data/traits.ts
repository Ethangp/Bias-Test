import type { TraitKey } from "@/types/quiz";

export const TRAIT_LABELS: Record<TraitKey, string> = {
  selfAwareness: "Self-Awareness",
  empathy: "Empathy",
  defensiveness: "Defensiveness",
  conflictAvoidance: "Conflict Avoidance",
  boundaryStrength: "Boundary Strength",
  peoplePleasing: "People-Pleasing",
  socialPerception: "Social Perception",
  biasAwareness: "Bias Awareness",
  emotionalAvailability: "Emotional Availability",
  attachmentSecurity: "Attachment Security",
  accountability: "Accountability",
  communicationDirectness: "Communication Directness",
};

export const DEFAULT_TRAIT_ORDER: TraitKey[] = [
  "selfAwareness",
  "empathy",
  "defensiveness",
  "conflictAvoidance",
  "boundaryStrength",
  "peoplePleasing",
  "socialPerception",
  "biasAwareness",
  "emotionalAvailability",
  "attachmentSecurity",
  "accountability",
  "communicationDirectness",
];
