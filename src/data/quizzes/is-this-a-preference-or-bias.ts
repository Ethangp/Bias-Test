import type { Quiz } from "@/types/quiz";

const answerScale = [
  { id: "a1", label: "Almost never", value: 0 },
  { id: "a2", label: "Rarely", value: 1 },
  { id: "a3", label: "Sometimes", value: 2 },
  { id: "a4", label: "Often", value: 3 },
  { id: "a5", label: "Almost always", value: 4 },
];

export const isThisAPreferenceOrBiasQuiz: Quiz = {
  id: "is-this-a-preference-or-bias",
  slug: "is-this-a-preference-or-bias",
  title: "Is This a Preference or Bias?",
  category: "Bias & Awareness",
  categoryIcon: "🔍",
  shortDescription:
    "Reflect on whether your attraction patterns are broad, selective, or shaped by unexamined assumptions.",
  longDescription:
    "This test helps you notice whether your stated preferences feel consistent, reflective, and open to context, or whether they may hide exclusion patterns that deserve more attention.",
  estimatedTime: "~6 min",
  supportsModes: true,
  availableModes: ["self", "observer"],
  tags: ["Self + Observer", "Bias", "Attraction"],
  questions: [
    {
      id: "pb-1",
      textSelf:
        "Do your dating preferences consistently exclude certain racial or ethnic groups?",
      textObserver:
        "Do their dating preferences consistently exclude certain racial or ethnic groups?",
      helperText: "Consistency matters more than any single preference statement.",
      answers: [
        { ...answerScale[0], traitEffects: { biasAwareness: 2, socialPerception: 1 } },
        { ...answerScale[1], traitEffects: { biasAwareness: 1 } },
        { ...answerScale[2], traitEffects: { selfAwareness: 0 } },
        { ...answerScale[3], traitEffects: { biasAwareness: -1 } },
        { ...answerScale[4], traitEffects: { biasAwareness: -3, defensiveness: 1 } },
      ],
    },
    {
      id: "pb-2",
      textSelf:
        "When you explain why you are not attracted to someone, do you rely on stereotypes or broad assumptions?",
      textObserver:
        "When they explain why they are not attracted to someone, do they rely on stereotypes or broad assumptions?",
      answers: [
        { ...answerScale[0], traitEffects: { biasAwareness: 2, empathy: 1 } },
        { ...answerScale[1], traitEffects: { biasAwareness: 1 } },
        { ...answerScale[2], traitEffects: { selfAwareness: 0 } },
        { ...answerScale[3], traitEffects: { biasAwareness: -2, socialPerception: -1 } },
        { ...answerScale[4], traitEffects: { biasAwareness: -3, defensiveness: 2 } },
      ],
    },
    {
      id: "pb-3",
      textSelf:
        "If someone noticed a racial pattern in your preferences, would you explore it or shut it down?",
      textObserver:
        "If someone noticed a racial pattern in their preferences, would they explore it or shut it down?",
      answers: [
        { ...answerScale[0], traitEffects: { biasAwareness: 2, selfAwareness: 1 } },
        { ...answerScale[1], traitEffects: { biasAwareness: 1 } },
        { ...answerScale[2], traitEffects: { selfAwareness: 0 } },
        { ...answerScale[3], traitEffects: { defensiveness: 1, biasAwareness: -1 } },
        { ...answerScale[4], traitEffects: { defensiveness: 3, biasAwareness: -3 } },
      ],
    },
    {
      id: "pb-4",
      textSelf:
        "Do you feel social comfort or attraction shift depending on someone’s race or the proximity of their features to whiteness?",
      textObserver:
        "Do they seem to feel social comfort or attraction shift depending on someone’s race or proximity to whiteness?",
      answers: [
        { ...answerScale[0], traitEffects: { biasAwareness: 2, socialPerception: 1 } },
        { ...answerScale[1], traitEffects: { biasAwareness: 1 } },
        { ...answerScale[2], traitEffects: { selfAwareness: 0 } },
        { ...answerScale[3], traitEffects: { biasAwareness: -1 } },
        { ...answerScale[4], traitEffects: { biasAwareness: -3, socialPerception: -1 } },
      ],
    },
    {
      id: "pb-5",
      textSelf:
        "Do you consume culture from groups you would not date while still excluding people from those groups romantically?",
      textObserver:
        "Do they consume culture from groups they would not date while still excluding people from those groups romantically?",
      answers: [
        { ...answerScale[0], traitEffects: { biasAwareness: 2, empathy: 1 } },
        { ...answerScale[1], traitEffects: { biasAwareness: 1 } },
        { ...answerScale[2], traitEffects: { selfAwareness: 0 } },
        { ...answerScale[3], traitEffects: { biasAwareness: -1 } },
        { ...answerScale[4], traitEffects: { biasAwareness: -3, empathy: -1 } },
      ],
    },
    {
      id: "pb-6",
      textSelf:
        "Do you think impact matters even when you did not intend harm?",
      textObserver:
        "Do they think impact matters even when they did not intend harm?",
      answers: [
        { ...answerScale[0], traitEffects: { empathy: 2, biasAwareness: 2 } },
        { ...answerScale[1], traitEffects: { biasAwareness: 1 } },
        { ...answerScale[2], traitEffects: { selfAwareness: 0 } },
        { ...answerScale[3], traitEffects: { defensiveness: 1 } },
        { ...answerScale[4], traitEffects: { defensiveness: 3, biasAwareness: -2 } },
      ],
    },
  ],
  scoring: { maxScorePerQuestion: 4 },
  resultBands: [
    {
      id: "mostly-consistent-preference",
      minScore: 0,
      maxScore: 4,
      title: "Mostly consistent preference",
      level: "Mostly consistent preference",
      summary:
        "Your answers suggest your preferences may be broad, reflective, and not strongly exclusionary.",
      whatThisMeans:
        "You appear open to checking whether attraction patterns come from personal experience rather than rigid group assumptions.",
      whatThisDoesNotMean:
        "This does not prove there is no bias anywhere in your thinking. It only suggests the answers do not point to a strong exclusion pattern.",
      patterns: [
        "You may think in terms of individual connection more than fixed type.",
        "You may be able to separate attraction from stereotype.",
      ],
      nextSteps: [
        "Keep checking whether your type shifts as your experiences expand.",
        "Stay open if someone notices a blind spot you missed.",
      ],
      profileImpact: {
        traits: ["biasAwareness", "selfAwareness", "empathy"],
        note: "Saving this result can strengthen your bias-awareness profile without making a hard label.",
      },
      recommendedPatternChecks: ["bias-awareness-check", "social-pattern-detection-check"],
    },
    {
      id: "some-patterns-worth-noticing",
      minScore: 5,
      maxScore: 8,
      title: "Some patterns worth noticing",
      level: "Some patterns worth noticing",
      summary:
        "Your answers suggest there may be some selective patterns in how attraction or comfort works for you.",
      whatThisMeans:
        "This may be more than neutral taste. It may be worth reflecting on how much your preferences are shaped by familiarity or assumptions.",
      whatThisDoesNotMean:
        "This does not prove prejudice. It simply suggests a pattern worth looking at more closely.",
      patterns: [
        "Your preferences may shift depending on context or exposure.",
        "You may not have fully unpacked where your type came from.",
      ],
      nextSteps: [
        "Ask yourself whether your preferences are consistent or selectively applied.",
        "Notice whether the language you use turns groups into stereotypes.",
      ],
      profileImpact: {
        traits: ["biasAwareness", "selfAwareness", "socialPerception"],
        note: "Saving this result slightly strengthens your bias-awareness signals.",
      },
      recommendedPatternChecks: ["bias-awareness-check"],
    },
    {
      id: "mixed-unclear",
      minScore: 9,
      maxScore: 13,
      title: "Mixed / unclear",
      level: "Mixed / unclear",
      summary:
        "Your answers suggest a mixed pattern where preference, familiarity, and unexamined assumptions may all be involved.",
      whatThisMeans:
        "There may be something more than a simple attraction preference here, but more context is needed.",
      whatThisDoesNotMean:
        "This is not proof of bias. It is a sign that reflection could sharpen the picture.",
      patterns: [
        "You may feel defensive when the topic is raised.",
        "The story you tell yourself about attraction may not be the full story.",
      ],
      nextSteps: [
        "Separate what you were taught from what you actually feel.",
        "Ask whether your dating choices match your broader social values.",
      ],
      profileImpact: {
        traits: ["biasAwareness", "defensiveness", "socialPerception"],
        note: "Saving this result helps the profile learn where your answers are still uncertain.",
      },
      recommendedPatternChecks: ["bias-awareness-check", "social-pattern-detection-check"],
    },
    {
      id: "possible-bias-pattern",
      minScore: 14,
      maxScore: 18,
      title: "Possible bias pattern",
      level: "Possible bias pattern",
      summary:
        "Your answers suggest this may be more than a neutral preference.",
      whatThisMeans:
        "The pattern points toward exclusion, discomfort, or assumptions that may deserve careful reflection.",
      whatThisDoesNotMean:
        "This does not prove intent. It does suggest impact may exist even if your intentions are different.",
      patterns: [
        "You may default to broad group rules instead of individual connection.",
        "Defensiveness may make reflection harder once the pattern is named.",
      ],
      nextSteps: [
        "Ask what shaped this preference and whether it still serves you.",
        "Notice whether your reasoning would feel fair if someone used it toward you.",
      ],
      profileImpact: {
        traits: ["biasAwareness", "defensiveness", "selfAwareness"],
        note: "Saving this result should strongly update your bias-awareness profile.",
      },
      recommendedPatternChecks: ["bias-awareness-check", "defensiveness-under-pressure-check"],
    },
    {
      id: "strong-exclusion-pattern",
      minScore: 19,
      maxScore: 24,
      title: "Strong exclusion pattern",
      level: "Strong exclusion pattern",
      summary:
        "Your answers suggest a repeated exclusion pattern that may be tied to bias rather than simple taste.",
      whatThisMeans:
        "The result points to a pattern that may affect how you perceive, exclude, or describe people in dating contexts.",
      whatThisDoesNotMean:
        "This does not prove you are a harmful person. It does suggest the pattern is worth taking seriously.",
      patterns: [
        "Your attraction story may be built on narrow social messages.",
        "You may dismiss impact too quickly when the pattern is challenged.",
      ],
      nextSteps: [
        "Reflect on whether the exclusion pattern still feels defensible once you slow down.",
        "Read or listen to people affected by racialized dating preferences.",
      ],
      profileImpact: {
        traits: ["biasAwareness", "defensiveness", "socialPerception"],
        note: "Saving this result should meaningfully update your profile around bias and defensiveness.",
      },
      recommendedPatternChecks: ["bias-awareness-check", "social-pattern-detection-check"],
    },
  ],
  traitImpacts: ["biasAwareness", "defensiveness", "socialPerception", "empathy", "selfAwareness"],
  startPageTraits: [
    "Bias awareness",
    "Attraction patterns",
    "Defensiveness",
    "Consistency",
    "Social awareness",
  ],
};
