import type { Quiz } from "@/types/quiz";

const answerScale = [
  { id: "a1", label: "Almost never", value: 0 },
  { id: "a2", label: "Rarely", value: 1 },
  { id: "a3", label: "Sometimes", value: 2 },
  { id: "a4", label: "Often", value: 3 },
  { id: "a5", label: "Almost always", value: 4 },
];

export const isMyFriendToxicQuiz: Quiz = {
  id: "is-my-friend-toxic",
  slug: "is-my-friend-toxic",
  title: "Is My Friend Toxic?",
  category: "Friendship",
  categoryIcon: "👥",
  shortDescription:
    "Look at whether this friendship feels mutual, draining, or hard to trust over time.",
  longDescription:
    "This test helps you notice friendship patterns around boundaries, emotional support, reciprocity, and accountability. It is about the dynamic, not a diagnosis of your friend.",
  estimatedTime: "~5 min",
  supportsModes: true,
  availableModes: ["self", "observer"],
  tags: ["Self + Observer", "Friendship", "Boundaries"],
  questions: [
    {
      id: "imt-1",
      textSelf:
        "After spending time with this friend, do you usually feel supported or drained?",
      textObserver:
        "After spending time with this friend, do they usually leave others feeling supported or drained?",
      helperText: "How you feel after contact is often one of the clearest signals.",
      answers: [
        { ...answerScale[0], traitEffects: { emotionalAvailability: 2, socialPerception: 1 } },
        { ...answerScale[1], traitEffects: { socialPerception: 1 } },
        { ...answerScale[2], traitEffects: { socialPerception: 0 } },
        { ...answerScale[3], traitEffects: { boundaryStrength: -1, socialPerception: -1 } },
        { ...answerScale[4], traitEffects: { boundaryStrength: -2, emotionalAvailability: -1 } },
      ],
    },
    {
      id: "imt-2",
      textSelf:
        "Do they make room for your feelings without turning the conversation back to themselves?",
      textObserver:
        "Do they make room for other people’s feelings without turning the conversation back to themselves?",
      answers: [
        { ...answerScale[0], traitEffects: { emotionalAvailability: 2, empathy: 1 } },
        { ...answerScale[1], traitEffects: { empathy: 1 } },
        { ...answerScale[2], traitEffects: { socialPerception: 0 } },
        { ...answerScale[3], traitEffects: { socialPerception: -1 } },
        { ...answerScale[4], traitEffects: { socialPerception: -2, emotionalAvailability: -1 } },
      ],
    },
    {
      id: "imt-3",
      textSelf:
        "When you set a boundary, do they usually respect it without guilt or pressure?",
      textObserver:
        "When someone sets a boundary, do they usually respect it without guilt or pressure?",
      answers: [
        { ...answerScale[0], traitEffects: { boundaryStrength: 2, accountability: 1 } },
        { ...answerScale[1], traitEffects: { boundaryStrength: 1 } },
        { ...answerScale[2], traitEffects: { boundaryStrength: 0 } },
        { ...answerScale[3], traitEffects: { boundaryStrength: -1, peoplePleasing: 1 } },
        { ...answerScale[4], traitEffects: { boundaryStrength: -3, peoplePleasing: 2 } },
      ],
    },
    {
      id: "imt-4",
      textSelf:
        "Do they take responsibility when they hurt you, or do they minimize it?",
      textObserver:
        "Do they take responsibility when they hurt someone, or do they minimize it?",
      answers: [
        { ...answerScale[0], traitEffects: { accountability: 2, empathy: 1 } },
        { ...answerScale[1], traitEffects: { accountability: 1 } },
        { ...answerScale[2], traitEffects: { socialPerception: 0 } },
        { ...answerScale[3], traitEffects: { accountability: -1, socialPerception: -1 } },
        { ...answerScale[4], traitEffects: { accountability: -2, emotionalAvailability: -1 } },
      ],
    },
    {
      id: "imt-5",
      textSelf:
        "Do you often feel like you are doing more emotional work than they are?",
      textObserver:
        "Do they often seem to do more emotional work than the other person?",
      answers: [
        { ...answerScale[0], traitEffects: { socialPerception: 2 } },
        { ...answerScale[1], traitEffects: { socialPerception: 1 } },
        { ...answerScale[2], traitEffects: { socialPerception: 0 } },
        { ...answerScale[3], traitEffects: { boundaryStrength: -1 } },
        { ...answerScale[4], traitEffects: { boundaryStrength: -2, peoplePleasing: 2 } },
      ],
    },
    {
      id: "imt-6",
      textSelf:
        "Do you ever leave hangouts feeling smaller, guilty, or like your needs do not matter?",
      textObserver:
        "Do others ever leave hangouts feeling smaller, guilty, or like their needs do not matter?",
      answers: [
        { ...answerScale[0], traitEffects: { boundaryStrength: 2, socialPerception: 1 } },
        { ...answerScale[1], traitEffects: { socialPerception: 1 } },
        { ...answerScale[2], traitEffects: { socialPerception: 0 } },
        { ...answerScale[3], traitEffects: { boundaryStrength: -1 } },
        { ...answerScale[4], traitEffects: { boundaryStrength: -3, peoplePleasing: 2 } },
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
        "Your answers suggest this friendship has a fairly healthy shape, even if it still has ordinary rough patches.",
      whatThisMeans:
        "You may be in a friendship with real mutuality, support, and room for honest conversation.",
      whatThisDoesNotMean:
        "It does not mean everything is perfect. It just means there is not a strong pattern of emotional harm in what you described.",
      patterns: [
        "The friendship likely feels balanced most of the time.",
        "Boundaries may be respected without much pushback.",
      ],
      nextSteps: [
        "Keep noticing whether support feels mutual over time.",
        "Talk early when something feels off instead of letting it build.",
      ],
      profileImpact: {
        traits: ["boundaryStrength", "socialPerception", "emotionalAvailability"],
        note: "Saving this result can strengthen your boundary and reciprocity signals.",
      },
      recommendedPatternChecks: ["boundary-confidence-check", "social-pattern-detection-check"],
    },
    {
      id: "draining-patterns",
      minScore: 5,
      maxScore: 8,
      title: "Some draining patterns",
      level: "Some draining patterns",
      summary:
        "Your answers suggest this friendship may have some draining or uneven moments worth paying attention to.",
      whatThisMeans:
        "The dynamic may leave you carrying more of the emotional weight than feels good long term.",
      whatThisDoesNotMean:
        "This does not prove the friendship is toxic. It does suggest that the pattern may be worth checking more closely.",
      patterns: [
        "You may feel responsible for keeping things smooth.",
        "The friendship may be supportive in some moments and draining in others.",
      ],
      nextSteps: [
        "Name one thing you need more of and say it directly.",
        "Notice whether they respond with care or with pushback.",
      ],
      profileImpact: {
        traits: ["boundaryStrength", "peoplePleasing", "socialPerception"],
        note: "Saving this result can slightly sharpen your boundary-strength and people-pleasing signals.",
      },
      recommendedPatternChecks: ["people-pleasing-check", "boundary-confidence-check"],
    },
    {
      id: "mixed-dynamic",
      minScore: 9,
      maxScore: 13,
      title: "Mixed friendship dynamic",
      level: "Mixed friendship dynamic",
      summary:
        "Your answers suggest a mixed picture: there are caring parts, but also repeated friction or imbalance.",
      whatThisMeans:
        "This friendship may not be outright harmful, but it may also not be giving you enough stability or support.",
      whatThisDoesNotMean:
        "It does not prove your friend is a bad person. More context matters.",
      patterns: [
        "Support may depend heavily on their mood.",
        "You may be stretching to keep the connection working.",
      ],
      nextSteps: [
        "Track the moments when you feel most drained.",
        "Compare what you give to what you receive over a few weeks.",
      ],
      profileImpact: {
        traits: ["socialPerception", "boundaryStrength", "emotionalAvailability"],
        note: "Saving this result helps your profile distinguish mutual support from emotional strain.",
      },
      recommendedPatternChecks: ["social-pattern-detection-check", "people-pleasing-check"],
    },
    {
      id: "strong-unhealthy-pattern",
      minScore: 14,
      maxScore: 18,
      title: "Strong unhealthy pattern",
      level: "Strong unhealthy pattern",
      summary:
        "Your answers suggest a repeated pattern of emotional strain, boundary pressure, or uneven support.",
      whatThisMeans:
        "The friendship may be consistently taking more than it gives, even if it sometimes feels familiar or hard to leave.",
      whatThisDoesNotMean:
        "This does not prove malicious intent. It does point to a dynamic that may be hurting you.",
      patterns: [
        "You may be over-accommodating to keep the peace.",
        "You may leave interactions feeling smaller or more tense.",
      ],
      nextSteps: [
        "Try stepping back and seeing whether the friendship adjusts.",
        "Ask yourself what you would tell a friend in the same situation.",
      ],
      profileImpact: {
        traits: ["boundaryStrength", "peoplePleasing", "accountability"],
        note: "Saving this result can meaningfully shift your boundary and people-pleasing signals.",
      },
      recommendedPatternChecks: ["boundary-confidence-check", "people-pleasing-check"],
    },
    {
      id: "high-concern-pattern",
      minScore: 19,
      maxScore: 24,
      title: "High concern pattern",
      level: "High concern pattern",
      summary:
        "Your answers suggest a strong pattern of emotional harm, boundary violation, or one-sided care.",
      whatThisMeans:
        "This friendship may be significantly draining your energy or making it hard to trust your own needs.",
      whatThisDoesNotMean:
        "This does not prove your friend is intentionally harmful. It does suggest the pattern is serious.",
      patterns: [
        "Boundaries may be repeatedly ignored or punished.",
        "The friendship may be sustained mostly by your effort.",
      ],
      nextSteps: [
        "Consider creating distance or changing the way you engage.",
        "Talk to someone you trust about what you are noticing.",
      ],
      profileImpact: {
        traits: ["boundaryStrength", "emotionalAvailability", "socialPerception"],
        note: "Saving this result should strongly update your profile around boundaries and relational strain.",
      },
      recommendedPatternChecks: ["boundary-confidence-check", "social-pattern-detection-check"],
    },
  ],
  traitImpacts: [
    "boundaryStrength",
    "socialPerception",
    "emotionalAvailability",
    "empathy",
    "accountability",
  ],
  startPageTraits: [
    "Boundaries",
    "Social perception",
    "Emotional availability",
    "Reciprocity",
    "Trust",
  ],
};
