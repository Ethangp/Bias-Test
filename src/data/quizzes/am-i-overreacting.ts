import type { Quiz } from "@/types/quiz";

const answerScale = [
  { id: "a1", label: "Almost never", value: 0 },
  { id: "a2", label: "Rarely", value: 1 },
  { id: "a3", label: "Sometimes", value: 2 },
  { id: "a4", label: "Often", value: 3 },
  { id: "a5", label: "Almost always", value: 4 },
];

export const amIOverreactingQuiz: Quiz = {
  id: "am-i-overreacting",
  slug: "am-i-overreacting",
  title: "Am I Overreacting?",
  category: "Conflict & Communication",
  categoryIcon: "⚡",
  shortDescription:
    "Reflect on whether your reaction may be understandable, amplified, or missing context.",
  longDescription:
    "This test helps you think about emotional intensity, context, and whether a moment is being read more broadly than it really is. It does not invalidate your feelings.",
  estimatedTime: "~5 min",
  supportsModes: true,
  availableModes: ["self", "observer"],
  tags: ["Self + Observer", "Reactions", "Conflict"],
  questions: [
    {
      id: "ao-1",
      textSelf:
        "Do you usually have the facts before deciding how intense your reaction should be?",
      textObserver:
        "Do they usually have the facts before deciding how intense their reaction should be?",
      helperText: "Fact-checking first can separate strong feeling from strong evidence.",
      answers: [
        { ...answerScale[0], traitEffects: { selfAwareness: 2, socialPerception: 1 } },
        { ...answerScale[1], traitEffects: { selfAwareness: 1 } },
        { ...answerScale[2], traitEffects: { selfAwareness: 0 } },
        { ...answerScale[3], traitEffects: { emotionalAvailability: -1 } },
        { ...answerScale[4], traitEffects: { selfAwareness: -2, defensiveness: 1 } },
      ],
    },
    {
      id: "ao-2",
      textSelf:
        "When something hurts you, do you ask a direct question before building the story in your head?",
      textObserver:
        "When something hurts them, do they ask a direct question before building the story in their head?",
      answers: [
        { ...answerScale[0], traitEffects: { communicationDirectness: 2, selfAwareness: 1 } },
        { ...answerScale[1], traitEffects: { communicationDirectness: 1 } },
        { ...answerScale[2], traitEffects: { selfAwareness: 0 } },
        { ...answerScale[3], traitEffects: { conflictAvoidance: 1 } },
        { ...answerScale[4], traitEffects: { conflictAvoidance: 2, defensiveness: 1 } },
      ],
    },
    {
      id: "ao-3",
      textSelf:
        "Do stress, lack of sleep, or old frustration make your reaction feel bigger than the current moment?",
      textObserver:
        "Do stress, lack of sleep, or old frustration make their reaction feel bigger than the current moment?",
      answers: [
        { ...answerScale[0], traitEffects: { selfAwareness: 2, emotionalAvailability: 1 } },
        { ...answerScale[1], traitEffects: { selfAwareness: 1 } },
        { ...answerScale[2], traitEffects: { selfAwareness: 0 } },
        { ...answerScale[3], traitEffects: { emotionalAvailability: -1 } },
        { ...answerScale[4], traitEffects: { emotionalAvailability: -2, conflictAvoidance: 1 } },
      ],
    },
    {
      id: "ao-4",
      textSelf:
        "When you feel dismissed, do you spiral into worst-case thinking quickly?",
      textObserver:
        "When they feel dismissed, do they spiral into worst-case thinking quickly?",
      answers: [
        { ...answerScale[0], traitEffects: { selfAwareness: 2, socialPerception: 1 } },
        { ...answerScale[1], traitEffects: { selfAwareness: 1 } },
        { ...answerScale[2], traitEffects: { emotionalAvailability: 0 } },
        { ...answerScale[3], traitEffects: { emotionalAvailability: -1 } },
        { ...answerScale[4], traitEffects: { emotionalAvailability: -2, defensiveness: 1 } },
      ],
    },
    {
      id: "ao-5",
      textSelf:
        "Do you usually tell the person what hurt you, or do you just hold the feeling inside?",
      textObserver:
        "Do they usually tell the person what hurt them, or do they just hold the feeling inside?",
      answers: [
        { ...answerScale[0], traitEffects: { communicationDirectness: 2, conflictAvoidance: -1 } },
        { ...answerScale[1], traitEffects: { communicationDirectness: 1 } },
        { ...answerScale[2], traitEffects: { selfAwareness: 0 } },
        { ...answerScale[3], traitEffects: { conflictAvoidance: 1 } },
        { ...answerScale[4], traitEffects: { conflictAvoidance: 2, peoplePleasing: 1 } },
      ],
    },
    {
      id: "ao-6",
      textSelf:
        "If you waited a day, would your reaction likely feel smaller, clearer, or more specific?",
      textObserver:
        "If they waited a day, would their reaction likely feel smaller, clearer, or more specific?",
      answers: [
        { ...answerScale[0], traitEffects: { selfAwareness: 2, emotionalAvailability: 1 } },
        { ...answerScale[1], traitEffects: { selfAwareness: 1 } },
        { ...answerScale[2], traitEffects: { selfAwareness: 0 } },
        { ...answerScale[3], traitEffects: { emotionalAvailability: -1 } },
        { ...answerScale[4], traitEffects: { emotionalAvailability: -2, conflictAvoidance: 1 } },
      ],
    },
  ],
  scoring: { maxScorePerQuestion: 4 },
  resultBands: [
    {
      id: "proportionate-reaction",
      minScore: 0,
      maxScore: 4,
      title: "Reaction seems proportionate",
      level: "Reaction seems proportionate",
      summary:
        "Your answers suggest your reaction may be big for a reason, but you are also checking reality and context.",
      whatThisMeans:
        "You seem to be balancing emotion with reflection, which usually helps keep things grounded.",
      whatThisDoesNotMean:
        "This does not mean your feelings are small. It simply suggests they are not being carried away from the facts.",
      patterns: [
        "You may be able to name what actually happened.",
        "You may not rush to the strongest conclusion.",
      ],
      nextSteps: [
        "Keep asking what you know versus what you assume.",
        "Let the other person respond before deciding the story.",
      ],
      profileImpact: {
        traits: ["selfAwareness", "communicationDirectness", "socialPerception"],
        note: "Saving this result slightly strengthens grounded reaction signals.",
      },
      recommendedPatternChecks: ["social-pattern-detection-check"],
    },
    {
      id: "some-emotional-intensity",
      minScore: 5,
      maxScore: 8,
      title: "Some emotional intensity",
      level: "Some emotional intensity",
      summary:
        "Your answers suggest the reaction may be understandable, but intensity can sometimes outrun context.",
      whatThisMeans:
        "You may be feeling something real while also magnifying parts of the situation before they are clear.",
      whatThisDoesNotMean:
        "This does not mean you are wrong to be upset. It only suggests the way the feeling is building may need attention.",
      patterns: [
        "Stress or fatigue may be amplifying the meaning of the moment.",
        "You may benefit from more direct questions before drawing conclusions.",
      ],
      nextSteps: [
        "Pause and ask for the missing facts.",
        "Write down the part that hurt you most in one sentence.",
      ],
      profileImpact: {
        traits: ["selfAwareness", "emotionalAvailability", "communicationDirectness"],
        note: "Saving this result can help the profile track your reaction timing and clarity.",
      },
      recommendedPatternChecks: ["conflict-avoidance-check"],
    },
    {
      id: "mixed-needs-context",
      minScore: 9,
      maxScore: 13,
      title: "Mixed / needs context",
      level: "Mixed / needs context",
      summary:
        "Your answers suggest this reaction could be understandable, but more context is needed before calling it overreaction.",
      whatThisMeans:
        "The moment may be real, but the interpretation may still be shifting based on assumptions or stress.",
      whatThisDoesNotMean:
        "It does not invalidate your feelings. It just means the situation may not be as simple as it first appears.",
      patterns: [
        "You may carry old tension into new situations.",
        "The reaction may grow while the facts are still incomplete.",
      ],
      nextSteps: [
        "Check whether this is a repeat pattern or a one-off event.",
        "Ask whether you want repair, reassurance, or just space.",
      ],
      profileImpact: {
        traits: ["selfAwareness", "conflictAvoidance", "socialPerception"],
        note: "Saving this result helps the profile distinguish context from escalation.",
      },
      recommendedPatternChecks: ["conflict-avoidance-check", "social-pattern-detection-check"],
    },
    {
      id: "possible-overthinking-loop",
      minScore: 14,
      maxScore: 18,
      title: "Possible overthinking loop",
      level: "Possible overthinking loop",
      summary:
        "Your answers suggest the reaction may be getting larger as the story in your head fills in missing pieces.",
      whatThisMeans:
        "The concern may be understandable, but the emotional read may be stretching beyond what is known.",
      whatThisDoesNotMean:
        "This does not mean you are being dramatic. It points to a loop worth slowing down.",
      patterns: [
        "You may be guessing the other person’s intent before checking it.",
        "Waiting a little may change how the situation feels.",
      ],
      nextSteps: [
        "Ask one direct question before deciding the meaning.",
        "Revisit the situation after your body has calmed down.",
      ],
      profileImpact: {
        traits: ["conflictAvoidance", "selfAwareness", "communicationDirectness"],
        note: "Saving this result can sharpen your profile around reaction loops and direct communication.",
      },
      recommendedPatternChecks: ["conflict-avoidance-check", "people-pleasing-check"],
    },
    {
      id: "strong-escalation-pattern",
      minScore: 19,
      maxScore: 24,
      title: "Strong escalation pattern",
      level: "Strong escalation pattern",
      summary:
        "Your answers suggest a pattern where the reaction may grow fast and become hard to separate from the facts.",
      whatThisMeans:
        "Your feelings may be understandable, but the way they are being processed could be making the situation feel bigger.",
      whatThisDoesNotMean:
        "This does not mean your concern is fake. It means the interpretation may need more checking.",
      patterns: [
        "You may jump to meaning before checking evidence.",
        "The emotional charge may be taking over the conversation.",
      ],
      nextSteps: [
        "Slow the process down before you respond.",
        "Separate the fact, the feeling, and the story into three notes.",
      ],
      profileImpact: {
        traits: ["emotionalAvailability", "selfAwareness", "communicationDirectness"],
        note: "Saving this result should meaningfully update your emotional intensity and reaction pattern signals.",
      },
      recommendedPatternChecks: ["conflict-avoidance-check", "social-pattern-detection-check"],
    },
  ],
  traitImpacts: [
    "selfAwareness",
    "emotionalAvailability",
    "conflictAvoidance",
    "socialPerception",
    "communicationDirectness",
  ],
  startPageTraits: [
    "Emotional intensity",
    "Context",
    "Self-trust",
    "Communication",
    "Conflict style",
  ],
};
