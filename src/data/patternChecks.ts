export interface PatternCheckDefinition {
  id: string;
  slug: string;
  title: string;
  shortDescription: string;
  category: string;
  comingSoon?: boolean;
}

export const PATTERN_CHECKS: PatternCheckDefinition[] = [
  {
    id: "conflict-avoidance-check",
    slug: "conflict-avoidance-check",
    title: "Conflict Avoidance Check",
    shortDescription: "See how often you delay, soften, or dodge direct conflict.",
    category: "Conflict & Communication",
    comingSoon: true,
  },
  {
    id: "people-pleasing-check",
    slug: "people-pleasing-check",
    title: "People-Pleasing Check",
    shortDescription: "Notice where agreement, comfort, or guilt shape your choices.",
    category: "Conflict & Communication",
    comingSoon: true,
  },
  {
    id: "boundary-confidence-check",
    slug: "boundary-confidence-check",
    title: "Boundary Confidence Check",
    shortDescription: "Clarify how firmly you can say no or ask for what you need.",
    category: "Friendship",
    comingSoon: true,
  },
  {
    id: "social-pattern-detection-check",
    slug: "social-pattern-detection-check",
    title: "Social Pattern Detection Check",
    shortDescription: "Spot repeated social dynamics before they become habits.",
    category: "Bias & Awareness",
    comingSoon: true,
  },
  {
    id: "bias-awareness-check",
    slug: "bias-awareness-check",
    title: "Bias Awareness Check",
    shortDescription: "Look for assumptions, exclusions, and automatic reactions.",
    category: "Bias & Awareness",
    comingSoon: true,
  },
  {
    id: "defensiveness-under-pressure-check",
    slug: "defensiveness-under-pressure-check",
    title: "Defensiveness Under Pressure Check",
    shortDescription: "Notice how your response shifts when feedback feels uncomfortable.",
    category: "Conflict & Communication",
    comingSoon: true,
  },
];
