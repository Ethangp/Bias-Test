/** Default entry for “Start Core Assessment” on Home / Dashboard. */
export const DEFAULT_CORE_ASSESSMENT_SLUG = "preference-or-bias";

/**
 * Take Tests hub — IA “Core / Advanced” tiles mapped to live slugs where possible.
 */
export type HubTestTier = "core" | "advanced";

export type HubTestTile = {
  id: string;
  title: string;
  blurb: string;
  slug: string | null;
  tier: HubTestTier;
  /** Shown when slug is null */
  comingSoon?: boolean;
  /** Optional anchor on /tests for related cluster */
  relatedAnchor?: string;
};

export const CORE_HUB_TESTS: HubTestTile[] = [
  {
    id: "identity",
    title: "Identity Assessment",
    blurb: "Attraction patterns and identity reflection — you define the labels.",
    slug: "am-i-gay-bi-curious",
    tier: "core",
  },
  {
    id: "cognitive-bias",
    title: "Cognitive Bias Scanner",
    blurb: "Microaggressions, blind spots, and preference vs. exclusion patterns.",
    slug: "microaggression-checker",
    tier: "core",
    relatedAnchor: "bias-pack",
  },
  {
    id: "relationship-style",
    title: "Relationship Style Test",
    blurb: "Compatibility, situationships, and how you show up in romance.",
    slug: "are-we-compatible",
    tier: "core",
  },
  {
    id: "work-career",
    title: "Work / Career Profile",
    blurb: "Professional patterns, fairness, and collaboration — coming soon.",
    slug: null,
    tier: "core",
    comingSoon: true,
  },
  {
    id: "risk-decision",
    title: "Risk & Decision Profile",
    blurb: "Reactions under stress, confrontation readiness, and proportionality.",
    slug: "am-i-overreacting",
    tier: "core",
  },
  {
    id: "social-intelligence",
    title: "Social Intelligence Test",
    blurb: "People-pleasing, boundaries, and reading social dynamics.",
    slug: "do-i-people-please",
    tier: "core",
  },
];

export const ADVANCED_HUB_TESTS: HubTestTile[] = [
  {
    id: "moral-dilemma",
    title: "Moral Dilemma Simulator",
    blurb: "Tradeoffs under pressure — narrative scenarios.",
    slug: null,
    tier: "advanced",
    comingSoon: true,
  },
  {
    id: "media-internet",
    title: "Media & Internet Behavior Test",
    blurb: "Feeds, outrage cycles, and how you process online conflict.",
    slug: null,
    tier: "advanced",
    comingSoon: true,
  },
  {
    id: "political-worldview",
    title: "Political / Worldview Map",
    blurb: "Values and worldview reflection — careful, slow journalism style.",
    slug: null,
    tier: "advanced",
    comingSoon: true,
  },
];
