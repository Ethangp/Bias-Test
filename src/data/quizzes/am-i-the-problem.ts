import type { Quiz } from "@/types/quiz";

const answerScale = [
  { id: "a1", label: "Almost never", value: 0 },
  { id: "a2", label: "Rarely", value: 1 },
  { id: "a3", label: "Sometimes", value: 2 },
  { id: "a4", label: "Often", value: 3 },
  { id: "a5", label: "Almost always", value: 4 },
];

export const amITheProblemQuiz: Quiz = {
  id: "am-i-the-problem",
  slug: "am-i-the-problem",
  title: "Am I the Problem?",
  category: "Conflict & Communication",
  categoryIcon: "⚡",
  shortDescription:
    "Reflect on whether your habits may be escalating conflict or making repair harder.",
  longDescription:
    "This test helps you think through accountability, defensiveness, empathy, and how you respond when conflict gets tense. It does not prove fault, but it can surface patterns worth noticing.",
  estimatedTime: "~5 min",
  supportsModes: true,
  availableModes: ["self", "observer"],
  tags: ["Self + Observer", "Conflict", "Reflection"],
  questions: [
    {
      id: "aip-1",
      textSelf:
        "When someone says you hurt them, do you usually listen before explaining yourself?",
      textObserver:
        "When someone says they were hurt, do they usually listen before explaining themselves?",
      helperText: "Early reactions often reveal whether a repair conversation can happen.",
      answers: [
        {
          id: "a1",
          label: "Almost never",
          value: 0,
          traitEffects: { accountability: 2, defensiveness: -1, empathy: 1 },
        },
        {
          id: "a2",
          label: "Rarely",
          value: 1,
          traitEffects: { accountability: 1, defensiveness: 0 },
        },
        {
          id: "a3",
          label: "Sometimes",
          value: 2,
          traitEffects: { accountability: 0, selfAwareness: 1 },
        },
        {
          id: "a4",
          label: "Often",
          value: 3,
          traitEffects: { defensiveness: 1, accountability: -1 },
        },
        {
          id: "a5",
          label: "Almost always",
          value: 4,
          traitEffects: { defensiveness: 2, accountability: -2 },
        },
      ],
    },
    {
      id: "aip-2",
      textSelf:
        "After conflict, do you usually check your tone, timing, or wording?",
      textObserver:
        "After conflict, do they usually check their tone, timing, or wording?",
      answers: [
        { ...answerScale[0], traitEffects: { selfAwareness: 2, communicationDirectness: 1 } },
        { ...answerScale[1], traitEffects: { selfAwareness: 1 } },
        { ...answerScale[2], traitEffects: { selfAwareness: 0 } },
        { ...answerScale[3], traitEffects: { defensiveness: 1 } },
        { ...answerScale[4], traitEffects: { defensiveness: 2, accountability: -1 } },
      ],
    },
    {
      id: "aip-3",
      textSelf:
        "When you get feedback, do you try to understand the impact before defending your intent?",
      textObserver:
        "When they get feedback, do they try to understand the impact before defending their intent?",
      answers: [
        { ...answerScale[0], traitEffects: { empathy: 2, accountability: 1 } },
        { ...answerScale[1], traitEffects: { empathy: 1 } },
        { ...answerScale[2], traitEffects: { selfAwareness: 1 } },
        { ...answerScale[3], traitEffects: { defensiveness: 1 } },
        { ...answerScale[4], traitEffects: { defensiveness: 2, empathy: -1 } },
      ],
    },
    {
      id: "aip-4",
      textSelf:
        "Do you bring up old issues in a way that makes the current conversation harder to resolve?",
      textObserver:
        "Do they bring up old issues in a way that makes the current conversation harder to resolve?",
      answers: [
        { ...answerScale[0], traitEffects: { communicationDirectness: 2, conflictAvoidance: -1 } },
        { ...answerScale[1], traitEffects: { communicationDirectness: 1 } },
        { ...answerScale[2], traitEffects: { selfAwareness: 0 } },
        { ...answerScale[3], traitEffects: { defensiveness: 1, conflictAvoidance: 1 } },
        { ...answerScale[4], traitEffects: { defensiveness: 2, accountability: -1 } },
      ],
    },
    {
      id: "aip-5",
      textSelf:
        "When tension rises, do you feel like you need to be right before you can repair?",
      textObserver:
        "When tension rises, do they seem to need to be right before they can repair?",
      answers: [
        { ...answerScale[0], traitEffects: { accountability: 2, selfAwareness: 1 } },
        { ...answerScale[1], traitEffects: { accountability: 1 } },
        { ...answerScale[2], traitEffects: { selfAwareness: 0 } },
        { ...answerScale[3], traitEffects: { defensiveness: 1 } },
        { ...answerScale[4], traitEffects: { defensiveness: 3, accountability: -2 } },
      ],
    },
    {
      id: "aip-6",
      textSelf:
        "After a conflict, do you usually take some responsibility even if the situation was messy?",
      textObserver:
        "After a conflict, do they usually take some responsibility even if the situation was messy?",
      answers: [
        { ...answerScale[0], traitEffects: { accountability: 2, empathy: 1 } },
        { ...answerScale[1], traitEffects: { accountability: 1 } },
        { ...answerScale[2], traitEffects: { selfAwareness: 0 } },
        { ...answerScale[3], traitEffects: { defensiveness: 1 } },
        { ...answerScale[4], traitEffects: { defensiveness: 2, accountability: -2 } },
      ],
    },
  ],
  scoring: { maxScorePerQuestion: 4 },
  resultBands: [
    {
      id: "low-concern",
      minScore: 0,
      maxScore: 4,
      title: "Low concern",
      level: "Low concern",
      summary:
        "Your answers suggest you usually stay open enough to repair when conflict shows up.",
      whatThisMeans:
        "You may already be doing many of the things that help conflict move forward: listening, checking your role, and trying to understand impact.",
      whatThisDoesNotMean:
        "This does not mean you never contribute to conflict. It only suggests your current pattern does not look strongly defensive.",
      patterns: [
        "You may be able to slow the conversation down before it escalates.",
        "You seem willing to reflect on your part after the fact.",
      ],
      nextSteps: [
        "Keep asking for specific feedback when something feels off.",
        "Notice which topics make you more reactive than usual.",
      ],
      profileImpact: {
        traits: ["accountability", "selfAwareness", "communicationDirectness"],
        note: "This result should slightly strengthen your accountability and self-awareness signals.",
      },
      recommendedPatternChecks: ["conflict-avoidance-check", "defensiveness-under-pressure-check"],
    },
    {
      id: "some-gaps",
      minScore: 5,
      maxScore: 8,
      title: "Some accountability gaps",
      level: "Some accountability gaps",
      summary:
        "Your answers suggest there may be a few moments where defensiveness or self-protection gets in the way of repair.",
      whatThisMeans:
        "You may be contributing to conflict in some situations, especially when feedback feels personal or unfair.",
      whatThisDoesNotMean:
        "This does not prove blame or bad intent. It points to habits that may be worth adjusting.",
      patterns: [
        "You may explain your side quickly before fully hearing the other person.",
        "You may need time to process before accountability feels possible.",
      ],
      nextSteps: [
        "Pause before responding and summarize what you heard first.",
        "Try separating your intent from the impact the other person felt.",
      ],
      profileImpact: {
        traits: ["accountability", "defensiveness", "empathy"],
        note: "This result may slightly lower defensiveness and strengthen accountability when you save it.",
      },
      recommendedPatternChecks: ["defensiveness-under-pressure-check"],
    },
    {
      id: "mixed-pattern",
      minScore: 9,
      maxScore: 13,
      title: "Mixed pattern",
      level: "Mixed pattern",
      summary:
        "Your answers suggest a mixed pattern: some repair habits are present, but defensiveness may still show up under pressure.",
      whatThisMeans:
        "You may handle conflict well in some moments and struggle in others. More context matters.",
      whatThisDoesNotMean:
        "This is not a verdict. It does not prove that you are the main cause of any conflict.",
      patterns: [
        "You may switch between reflection and self-protection depending on the situation.",
        "Certain topics may bring out a sharper response.",
      ],
      nextSteps: [
        "Track which conflicts repeat and what usually starts them.",
        "Ask whether your response changed the outcome or just protected your ego.",
      ],
      profileImpact: {
        traits: ["selfAwareness", "defensiveness", "communicationDirectness"],
        note: "Saving this result adds mixed signals, which can help sharpen your profile over time.",
      },
      recommendedPatternChecks: ["conflict-avoidance-check", "defensiveness-under-pressure-check"],
    },
    {
      id: "strong-defensive-pattern",
      minScore: 14,
      maxScore: 18,
      title: "Strong defensive pattern",
      level: "Strong defensive pattern",
      summary:
        "Your answers suggest a recurring pattern where defensiveness or justification may be blocking repair.",
      whatThisMeans:
        "You may be contributing more to the conflict than you realize, especially when feedback feels critical.",
      whatThisDoesNotMean:
        "This does not prove fault or bad character. It points to a pattern worth examining with more care.",
      patterns: [
        "You may move into explanation mode before the other person feels heard.",
        "Repair may be harder when you feel misunderstood.",
      ],
      nextSteps: [
        "Try reflecting on the other person’s point before responding.",
        "Consider whether the need to be right is protecting something more vulnerable.",
      ],
      profileImpact: {
        traits: ["defensiveness", "accountability", "communicationDirectness"],
        note: "When saved, this result should meaningfully shape your defensiveness and accountability signals.",
      },
      recommendedPatternChecks: ["defensiveness-under-pressure-check", "conflict-avoidance-check"],
    },
    {
      id: "high-conflict-contribution",
      minScore: 19,
      maxScore: 24,
      title: "High conflict contribution",
      level: "High conflict contribution",
      summary:
        "Your answers suggest a strong pattern of defensiveness or missed accountability in conflict.",
      whatThisMeans:
        "This result points to a pattern, not a moral label. It suggests your responses may be making repair much harder.",
      whatThisDoesNotMean:
        "This does not prove you are always wrong or that the other person is always right. More context matters.",
      patterns: [
        "You may feel attacked quickly and then stop hearing the other person.",
        "Repair may be turning into explanation, denial, or shutdown.",
      ],
      nextSteps: [
        "If possible, revisit the conflict after you’ve cooled down.",
        "Ask a trusted person to help you separate impact from intent.",
      ],
      profileImpact: {
        traits: ["defensiveness", "accountability", "empathy"],
        note: "Saving this result should strongly affect your conflict-related profile signals.",
      },
      recommendedPatternChecks: ["defensiveness-under-pressure-check", "conflict-avoidance-check"],
    },
  ],
  traitImpacts: [
    "accountability",
    "defensiveness",
    "communicationDirectness",
    "empathy",
    "selfAwareness",
  ],
  startPageTraits: [
    "Accountability",
    "Defensiveness",
    "Communication",
    "Empathy",
    "Self-awareness",
  ],
};
