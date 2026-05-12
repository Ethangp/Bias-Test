import type { TraitKey } from "@/types";

export const TRAIT_EXPLAINERS: Record<
  TraitKey,
  { headline: string; body: string; example: string }
> = {
  selfAwareness: {
    headline: "Self-Awareness",
    body: "How clearly you notice your own reactions, habits, and impact on others — before, during, and after tense moments.",
    example: "Someone gives you feedback and you can separate your intent from their experience without immediately defending.",
  },
  empathy: {
    headline: "Empathy",
    body: "Capacity to imagine another person’s emotional perspective and respond as if their feelings matter in the equation.",
    example: "A friend is quiet and you check in without assuming you already know what is wrong.",
  },
  defensiveness: {
    headline: "Defensiveness",
    body: "How quickly self-protection (justification, shutdown, counterattack) shows up when you feel criticized or exposed.",
    example: "You hear ‘that hurt me’ and your first move is to explain why you did not mean it — before they feel heard.",
  },
  conflictAvoidance: {
    headline: "Conflict Avoidance",
    body: "Tendency to delay, soften, or exit hard conversations — sometimes wisely, sometimes at a cost to honesty or repair.",
    example: "You say ‘it is fine’ for weeks, then resent someone for not reading your mind.",
  },
  boundaryStrength: {
    headline: "Boundary Strength",
    body: "How clearly you can name limits, tolerate disappointing others, and protect time and energy without excessive guilt.",
    example: "You decline a social invite because you are depleted — without inventing a dramatic excuse.",
  },
  pleasingTendency: {
    headline: "People-Pleasing",
    body: "Drive to keep harmony, approval, and ‘being easy’ — sometimes at the expense of your needs or authenticity.",
    example: "You agree to help with a project you do not have capacity for because saying no feels selfish.",
  },
  socialPerception: {
    headline: "Social Perception",
    body: "Reading social cues, reciprocity, and whether dynamics feel mutual, lopsided, or safe over time.",
    example: "You notice a friendship leaves you drained more often than restored — and you take that signal seriously.",
  },
  biasAwareness: {
    headline: "Bias Awareness",
    body: "Openness to examining assumptions about groups, attraction, and ‘preferences’ that may carry exclusion patterns.",
    example: "You notice a ‘type’ always excludes certain kinds of people and get curious instead of defensive.",
  },
  emotionalAvailability: {
    headline: "Emotional Availability",
    body: "How present you can stay with feelings — yours and others’ — without numbing, fleeing, or flooding.",
    example: "A partner is upset and you stay in the room emotionally instead of disappearing into your phone.",
  },
  attachmentSecurity: {
    headline: "Attachment Security",
    body: "Baseline sense of safety in closeness — trusting that connection can survive distance, disagreement, or ambiguity.",
    example: "They text late and you can assume benign explanations instead of spiraling into worst-case stories.",
  },
  accountability: {
    headline: "Accountability",
    body: "Willingness to own your part in a messy situation without collapsing into shame or over-apologizing.",
    example: "After a fight, you can say what you would do differently next time — without demanding they move on instantly.",
  },
  communicationDirectness: {
    headline: "Communication Directness",
    body: "How clearly and timely you say what you mean — with enough warmth that directness does not become cruelty.",
    example: "You name a boundary early instead of hinting until you explode.",
  },
};

export const TRAIT_KEYS_ORDER: TraitKey[] = [
  "selfAwareness",
  "empathy",
  "defensiveness",
  "conflictAvoidance",
  "boundaryStrength",
  "pleasingTendency",
  "socialPerception",
  "biasAwareness",
  "emotionalAvailability",
  "attachmentSecurity",
  "accountability",
  "communicationDirectness",
];

export function isTraitKey(key: string): key is TraitKey {
  return key in TRAIT_EXPLAINERS;
}
