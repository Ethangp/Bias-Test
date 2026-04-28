export type TraitKey =
  | "selfAwareness"
  | "empathy"
  | "defensiveness"
  | "conflictAvoidance"
  | "boundaryStrength"
  | "pleasingTendency"
  | "socialPerception"
  | "biasAwareness"
  | "emotionalAvailability"
  | "attachmentSecurity"
  | "accountability"
  | "communicationDirectness";

export type ResultLevel = 1 | 2 | 3 | 4 | 5;

export interface AnswerOption {
  text: string;
  value: number;
  traitWeights: Partial<Record<TraitKey, number>>;
}

export interface Question {
  id: string;
  text: string;
  answers: AnswerOption[];
}

export interface ResultDescriptor {
  level: ResultLevel;
  label: string;
  description: string;
  details: string;
  color: string;
}

export interface Quiz {
  slug: string;
  title: string;
  titleSelf: string;
  titleObserver: string;
  description: string;
  category: string;
  categorySlug: string;
  emoji: string;
  hasObserverMode: boolean;
  observerTargets?: string[];
  traits: TraitKey[];
  questionsSelf: Question[];
  questionsObserver?: Question[];
  results: ResultDescriptor[];
  disclaimer?: string;
}

export const TRAIT_LABELS: Record<TraitKey, string> = {
  selfAwareness: "Self-Awareness",
  empathy: "Empathy",
  defensiveness: "Defensiveness",
  conflictAvoidance: "Conflict Avoidance",
  boundaryStrength: "Boundary Strength",
  pleasingTendency: "People-Pleasing",
  socialPerception: "Social Perception",
  biasAwareness: "Bias Awareness",
  emotionalAvailability: "Emotional Availability",
  attachmentSecurity: "Attachment Security",
  accountability: "Accountability",
  communicationDirectness: "Communication Directness",
};

export const TRAIT_DESCRIPTIONS: Record<TraitKey, string> = {
  selfAwareness:
    "How clearly you see your own behaviors, patterns, and impact on others.",
  empathy:
    "How well you understand and share the feelings and perspectives of others.",
  defensiveness:
    "How quickly you feel attacked and shut down when challenged or criticized.",
  conflictAvoidance:
    "How often you avoid addressing tension or difficult conversations directly.",
  boundaryStrength:
    "How clearly you define and maintain personal limits with others.",
  pleasingTendency:
    "How much you prioritize others' comfort over your own needs.",
  socialPerception:
    "How well you pick up on subtle social dynamics, group patterns, and unspoken tension.",
  biasAwareness:
    "How clearly you recognize potential blind spots and biases in your own behavior.",
  emotionalAvailability:
    "How open and present you are in emotional conversations and close relationships.",
  attachmentSecurity:
    "How secure and stable you feel in your close relationships.",
  accountability: "How readily you take responsibility for your actions.",
  communicationDirectness:
    "How clearly and directly you express what you think, feel, and need.",
};

const defaultResults: ResultDescriptor[] = [
  {
    level: 1,
    label: "Low Concern",
    description:
      "No major pattern appears from your answers. Keep observing, but nothing strongly points to a serious issue.",
    details:
      "Your answers suggest things are mostly okay in this area. That said, no one is perfect—staying open to feedback is always worthwhile.",
    color: "green",
  },
  {
    level: 2,
    label: "Mild Pattern",
    description:
      "A few signs are worth thinking about. This may be habit, insecurity, lack of awareness, or context.",
    details:
      "A few of your answers suggest a recurring pattern. It may not be a big deal, but it's worth reflecting on where it comes from.",
    color: "lime",
  },
  {
    level: 3,
    label: "Mixed / Unclear",
    description:
      "There are noticeable signs, but not enough to make a strong conclusion. More context matters.",
    details:
      "Your answers show conflicting signals—some patterns worth noticing, but also factors that complicate the read. Context matters a lot here.",
    color: "yellow",
  },
  {
    level: 4,
    label: "Strong Pattern",
    description:
      "The answers suggest a repeated pattern. This is worth addressing directly or reflecting on seriously.",
    details:
      "Multiple answers point in the same direction. Whether this is something to address with someone else or work on in yourself, it's probably worth taking seriously.",
    color: "orange",
  },
  {
    level: 5,
    label: "High Concern",
    description:
      "The pattern seems consistent. This may be affecting how people are treated, included, respected, or trusted.",
    details:
      "Your answers suggest a consistent pattern that could be causing real harm—to you, to others, or to the relationship. This result is not proof of anything, but it's a strong signal worth acting on.",
    color: "red",
  },
];

export const quizzes: Quiz[] = [
  {
    slug: "am-i-the-problem",
    title: "Am I the Problem?",
    titleSelf: "Am I the Problem?",
    titleObserver: "Are They the Problem?",
    description:
      "Reflect on whether you might be contributing to a recurring conflict or difficult dynamic.",
    category: "Conflict & Communication",
    categorySlug: "conflict",
    emoji: "🤔",
    hasObserverMode: true,
    observerTargets: [
      "About myself",
      "About a friend",
      "About a romantic partner",
      "About a roommate",
      "About a family member",
      "About a coworker",
    ],
    traits: [
      "selfAwareness",
      "accountability",
      "conflictAvoidance",
      "defensiveness",
    ],
    results: defaultResults,
    disclaimer:
      "This quiz is for reflection and self-awareness, not proof or diagnosis.",
    questionsSelf: [
      {
        id: "q1",
        text: "When a conflict happens, what is your first instinct?",
        answers: [
          {
            text: "Try to understand what happened from all sides",
            value: 0,
            traitWeights: {
              selfAwareness: 5,
              empathy: 4,
              accountability: 3,
            },
          },
          {
            text: "Explain my side and why I was right",
            value: 3,
            traitWeights: { defensiveness: 3, selfAwareness: -1 },
          },
          {
            text: "Go quiet and wait for it to blow over",
            value: 3,
            traitWeights: { conflictAvoidance: 4, communicationDirectness: -3 },
          },
          {
            text: "Get upset and need time before I can talk",
            value: 2,
            traitWeights: { defensiveness: 2 },
          },
          {
            text: "Apologize immediately even if I'm not sure I was wrong",
            value: 2,
            traitWeights: { pleasingTendency: 4, accountability: -1 },
          },
        ],
      },
      {
        id: "q2",
        text: "How often do you find yourself in conflict with people in your life?",
        answers: [
          {
            text: "Rarely — my relationships are mostly smooth",
            value: 0,
            traitWeights: { selfAwareness: 2 },
          },
          {
            text: "Sometimes — issues come up but get resolved",
            value: 1,
            traitWeights: { selfAwareness: 3, accountability: 2 },
          },
          {
            text: "Often — I always seem to be in some kind of drama",
            value: 4,
            traitWeights: { selfAwareness: -2 },
          },
          {
            text: "It depends on the person",
            value: 2,
            traitWeights: { socialPerception: 2 },
          },
        ],
      },
      {
        id: "q3",
        text: "When someone tells you that you hurt them, what do you usually do first?",
        answers: [
          {
            text: "Listen and ask what I did",
            value: 0,
            traitWeights: { empathy: 5, accountability: 5, defensiveness: -3 },
          },
          {
            text: "Explain what I meant",
            value: 2,
            traitWeights: { defensiveness: 2, accountability: 1 },
          },
          {
            text: "Feel attacked and shut down",
            value: 4,
            traitWeights: {
              defensiveness: 5,
              emotionalAvailability: -3,
              accountability: -2,
            },
          },
          {
            text: "Apologize even if I don't fully understand",
            value: 1,
            traitWeights: { pleasingTendency: 3, accountability: 2 },
          },
          {
            text: "Get defensive but think about it later",
            value: 3,
            traitWeights: { defensiveness: 3, selfAwareness: 2 },
          },
        ],
      },
      {
        id: "q4",
        text: "Multiple people have told you something bothers them about your behavior. What do you think?",
        answers: [
          {
            text: "That's a real pattern I should look at",
            value: 0,
            traitWeights: { selfAwareness: 5, accountability: 5 },
          },
          {
            text: "Maybe — but they don't always understand the full context",
            value: 2,
            traitWeights: { defensiveness: 2, selfAwareness: 1 },
          },
          {
            text: "They're all wrong or overreacting",
            value: 5,
            traitWeights: { defensiveness: 5, selfAwareness: -5 },
          },
          {
            text: "I'd feel bad and apologize, but not sure I'd change",
            value: 3,
            traitWeights: { pleasingTendency: 2, accountability: -1 },
          },
        ],
      },
      {
        id: "q5",
        text: "How do you handle an argument when you know you were partially wrong?",
        answers: [
          {
            text: "I own my part clearly and apologize for it",
            value: 0,
            traitWeights: { accountability: 5, communicationDirectness: 4 },
          },
          {
            text: "I acknowledge it but point out what they did too",
            value: 2,
            traitWeights: { accountability: 2, defensiveness: 2 },
          },
          {
            text: "I wait to see if they apologize first",
            value: 4,
            traitWeights: {
              conflictAvoidance: 3,
              accountability: -2,
              pleasingTendency: 1,
            },
          },
          {
            text: "I rarely admit I was wrong",
            value: 5,
            traitWeights: { defensiveness: 5, accountability: -5 },
          },
        ],
      },
      {
        id: "q6",
        text: "Do you notice a pattern where the same type of conflict keeps happening with different people?",
        answers: [
          {
            text: "Yes — and I've thought about my role in it",
            value: 1,
            traitWeights: { selfAwareness: 5, accountability: 3 },
          },
          {
            text: "Yes — but I think those people are just difficult",
            value: 4,
            traitWeights: { selfAwareness: -3, defensiveness: 3 },
          },
          {
            text: "Not really — my conflicts are all different",
            value: 1,
            traitWeights: { selfAwareness: 1 },
          },
          {
            text: "I don't look for patterns like that",
            value: 2,
            traitWeights: { selfAwareness: -1 },
          },
        ],
      },
      {
        id: "q7",
        text: "After a conflict ends, what usually happens?",
        answers: [
          {
            text: "We talk it through and both feel okay",
            value: 0,
            traitWeights: {
              communicationDirectness: 4,
              emotionalAvailability: 4,
            },
          },
          {
            text: "It blows over without being fully addressed",
            value: 3,
            traitWeights: { conflictAvoidance: 4, communicationDirectness: -2 },
          },
          {
            text: "I tend to stay resentful even after it's over",
            value: 4,
            traitWeights: { boundaryStrength: 1, accountability: -2 },
          },
          {
            text: "The other person usually apologizes and we move on",
            value: 2,
            traitWeights: {
              pleasingTendency: -1,
              communicationDirectness: 1,
            },
          },
        ],
      },
    ],
    questionsObserver: [
      {
        id: "q1",
        text: "When a conflict happens, what is their first instinct?",
        answers: [
          {
            text: "Try to understand what happened from all sides",
            value: 0,
            traitWeights: { selfAwareness: 3, empathy: 3 },
          },
          {
            text: "Explain their side and why they were right",
            value: 3,
            traitWeights: { defensiveness: 3 },
          },
          {
            text: "Go quiet and wait for it to blow over",
            value: 3,
            traitWeights: { conflictAvoidance: 4 },
          },
          {
            text: "Get upset and need a lot of time to cool down",
            value: 2,
            traitWeights: { defensiveness: 2 },
          },
          {
            text: "Apologize immediately even if unsure they were wrong",
            value: 1,
            traitWeights: { pleasingTendency: 4 },
          },
        ],
      },
      {
        id: "q2",
        text: "How often are they involved in conflict with people around them?",
        answers: [
          {
            text: "Rarely",
            value: 0,
            traitWeights: {},
          },
          {
            text: "Sometimes — but things usually get resolved",
            value: 1,
            traitWeights: {},
          },
          {
            text: "Often — there's always some drama",
            value: 4,
            traitWeights: { selfAwareness: -2 },
          },
          {
            text: "It depends on the person",
            value: 2,
            traitWeights: {},
          },
        ],
      },
      {
        id: "q3",
        text: "When someone tells them they were hurt by something they did, what do they usually do?",
        answers: [
          {
            text: "Listen and ask what they did",
            value: 0,
            traitWeights: { accountability: 5, empathy: 4 },
          },
          {
            text: "Explain what they meant",
            value: 2,
            traitWeights: { defensiveness: 2 },
          },
          {
            text: "Get defensive and shut down",
            value: 4,
            traitWeights: { defensiveness: 5, accountability: -3 },
          },
          {
            text: "Apologize immediately without really engaging",
            value: 1,
            traitWeights: { pleasingTendency: 3 },
          },
        ],
      },
      {
        id: "q4",
        text: "If multiple people have raised the same concern about their behavior, how do they respond?",
        answers: [
          {
            text: "Take it seriously and reflect",
            value: 0,
            traitWeights: { selfAwareness: 5, accountability: 5 },
          },
          {
            text: "Acknowledge it but still find excuses",
            value: 2,
            traitWeights: { defensiveness: 2 },
          },
          {
            text: "Dismiss it — says everyone else is wrong",
            value: 5,
            traitWeights: { defensiveness: 5, selfAwareness: -4 },
          },
        ],
      },
      {
        id: "q5",
        text: "Do the same kinds of conflict keep coming up with different people in their life?",
        answers: [
          {
            text: "Yes — and they seem aware of it",
            value: 1,
            traitWeights: { selfAwareness: 3 },
          },
          {
            text: "Yes — but they always blame the other person",
            value: 4,
            traitWeights: { selfAwareness: -3, defensiveness: 3 },
          },
          {
            text: "Not really",
            value: 0,
            traitWeights: {},
          },
        ],
      },
      {
        id: "q6",
        text: "How do they handle being partially wrong in an argument?",
        answers: [
          {
            text: "Own their part and apologize clearly",
            value: 0,
            traitWeights: { accountability: 5 },
          },
          {
            text: "Acknowledge it but bring up what the other person did",
            value: 2,
            traitWeights: { accountability: 2, defensiveness: 2 },
          },
          {
            text: "Rarely admit they were wrong",
            value: 5,
            traitWeights: { defensiveness: 5, accountability: -5 },
          },
        ],
      },
    ],
  },
  {
    slug: "is-my-friend-toxic",
    title: "Is My Friend Toxic?",
    titleSelf: "Am I the Toxic Friend?",
    titleObserver: "Is My Friend Toxic?",
    description:
      "Reflect on whether a friendship has patterns that may be harmful, one-sided, or emotionally draining.",
    category: "Friendship",
    categorySlug: "friendship",
    emoji: "😬",
    hasObserverMode: true,
    observerTargets: ["About myself", "About a friend"],
    traits: [
      "empathy",
      "boundaryStrength",
      "pleasingTendency",
      "socialPerception",
      "emotionalAvailability",
    ],
    results: defaultResults,
    disclaimer:
      "This quiz reflects patterns, not proof. A result does not make someone a bad person.",
    questionsSelf: [
      {
        id: "q1",
        text: "How do you feel after most interactions with this person?",
        answers: [
          {
            text: "Energized and good",
            value: 0,
            traitWeights: { emotionalAvailability: 3 },
          },
          {
            text: "Mostly fine, sometimes drained",
            value: 1,
            traitWeights: {},
          },
          {
            text: "Drained more often than not",
            value: 3,
            traitWeights: { boundaryStrength: -2 },
          },
          {
            text: "Exhausted, anxious, or like something's off",
            value: 5,
            traitWeights: { boundaryStrength: -3 },
          },
        ],
      },
      {
        id: "q2",
        text: "Does this person make your problems feel smaller or less valid than theirs?",
        answers: [
          {
            text: "Never — they're supportive",
            value: 0,
            traitWeights: { empathy: 3 },
          },
          { text: "Sometimes", value: 2, traitWeights: { socialPerception: 2 } },
          {
            text: "Often — it's always about them",
            value: 4,
            traitWeights: { socialPerception: 3 },
          },
          {
            text: "Every time — I've stopped sharing things",
            value: 5,
            traitWeights: { socialPerception: 4, boundaryStrength: -2 },
          },
        ],
      },
      {
        id: "q3",
        text: "Does this person celebrate your wins, or do they seem bothered by them?",
        answers: [
          {
            text: "They celebrate me genuinely",
            value: 0,
            traitWeights: { empathy: 3 },
          },
          {
            text: "They're happy for me but sometimes make it about them",
            value: 2,
            traitWeights: {},
          },
          {
            text: "They get weirdly quiet or competitive",
            value: 4,
            traitWeights: { socialPerception: 3 },
          },
          {
            text: "They downplay or dismiss my wins",
            value: 5,
            traitWeights: { socialPerception: 4 },
          },
        ],
      },
      {
        id: "q4",
        text: "Does this person keep bringing up your past mistakes or using them against you?",
        answers: [
          {
            text: "No — they let things go after they're resolved",
            value: 0,
            traitWeights: {},
          },
          {
            text: "Occasionally in a joking way",
            value: 1,
            traitWeights: {},
          },
          {
            text: "Yes — they bring things up when it helps their argument",
            value: 4,
            traitWeights: { socialPerception: 3 },
          },
          {
            text: "Yes — it feels like they keep score",
            value: 5,
            traitWeights: { socialPerception: 4, boundaryStrength: -2 },
          },
        ],
      },
      {
        id: "q5",
        text: "Is this friendship mostly give and take, or does it feel one-sided?",
        answers: [
          {
            text: "Pretty balanced",
            value: 0,
            traitWeights: {},
          },
          {
            text: "I give a bit more, but it's okay",
            value: 1,
            traitWeights: { pleasingTendency: 1 },
          },
          {
            text: "I give significantly more",
            value: 3,
            traitWeights: { pleasingTendency: 3, boundaryStrength: -2 },
          },
          {
            text: "I give almost everything and rarely receive",
            value: 5,
            traitWeights: { pleasingTendency: 4, boundaryStrength: -3 },
          },
        ],
      },
      {
        id: "q6",
        text: "Do you feel like you can be honest with this person without them getting weird or pulling back?",
        answers: [
          {
            text: "Yes — we're honest with each other",
            value: 0,
            traitWeights: { communicationDirectness: 3 },
          },
          {
            text: "Mostly, but I pick my moments",
            value: 1,
            traitWeights: {},
          },
          {
            text: "I've learned not to say certain things",
            value: 3,
            traitWeights: { boundaryStrength: -2 },
          },
          {
            text: "No — I feel like I'm walking on eggshells",
            value: 5,
            traitWeights: {
              boundaryStrength: -3,
              emotionalAvailability: -2,
            },
          },
        ],
      },
      {
        id: "q7",
        text: "Has this person said things that made you feel bad about yourself?",
        answers: [
          {
            text: "No — they're encouraging",
            value: 0,
            traitWeights: {},
          },
          {
            text: "Once or twice, but they apologized",
            value: 1,
            traitWeights: {},
          },
          {
            text: "More than once — and it was framed as 'just being honest'",
            value: 4,
            traitWeights: { socialPerception: 3 },
          },
          {
            text: "Yes — it's become a pattern and I've noticed it",
            value: 5,
            traitWeights: { socialPerception: 4, boundaryStrength: -2 },
          },
        ],
      },
    ],
    questionsObserver: [
      {
        id: "q1",
        text: "How do people generally feel after spending time with this friend?",
        answers: [
          {
            text: "Good and energized",
            value: 0,
            traitWeights: {},
          },
          {
            text: "Fine for the most part",
            value: 1,
            traitWeights: {},
          },
          {
            text: "Often drained or a little off",
            value: 3,
            traitWeights: { socialPerception: 2 },
          },
          {
            text: "Exhausted, anxious, or confused",
            value: 5,
            traitWeights: { socialPerception: 3 },
          },
        ],
      },
      {
        id: "q2",
        text: "Does this friend make other people's problems seem less valid than their own?",
        answers: [
          {
            text: "No — they're a good listener and supporter",
            value: 0,
            traitWeights: { empathy: 3 },
          },
          { text: "Sometimes", value: 2, traitWeights: {} },
          {
            text: "Often — conversations always come back to them",
            value: 4,
            traitWeights: { empathy: -2 },
          },
          {
            text: "Almost always — people have stopped sharing with them",
            value: 5,
            traitWeights: { empathy: -3 },
          },
        ],
      },
      {
        id: "q3",
        text: "Does this friend genuinely celebrate others' wins?",
        answers: [
          {
            text: "Yes — they're supportive and happy for others",
            value: 0,
            traitWeights: { empathy: 3 },
          },
          {
            text: "Usually, but sometimes makes it about themselves",
            value: 2,
            traitWeights: {},
          },
          {
            text: "They tend to get competitive or sulk",
            value: 4,
            traitWeights: { empathy: -2 },
          },
          {
            text: "They dismiss or downplay others' wins",
            value: 5,
            traitWeights: { empathy: -3 },
          },
        ],
      },
      {
        id: "q4",
        text: "Does this friend use people's past mistakes against them?",
        answers: [
          {
            text: "No — they're forgiving",
            value: 0,
            traitWeights: {},
          },
          {
            text: "Occasionally as a joke",
            value: 1,
            traitWeights: {},
          },
          {
            text: "Yes — when it suits their argument",
            value: 4,
            traitWeights: { socialPerception: 3 },
          },
          {
            text: "Yes — it feels like they keep score",
            value: 5,
            traitWeights: { socialPerception: 4 },
          },
        ],
      },
      {
        id: "q5",
        text: "Is this friendship generally balanced or one-sided?",
        answers: [
          {
            text: "Pretty balanced — they give and receive",
            value: 0,
            traitWeights: {},
          },
          {
            text: "Slight imbalance, but okay",
            value: 1,
            traitWeights: {},
          },
          {
            text: "They tend to take more than they give",
            value: 3,
            traitWeights: {},
          },
          {
            text: "Very one-sided — others always give, they rarely do",
            value: 5,
            traitWeights: {},
          },
        ],
      },
      {
        id: "q6",
        text: "Do people feel like they can be honest with this friend without facing backlash?",
        answers: [
          {
            text: "Yes — they handle honesty well",
            value: 0,
            traitWeights: {},
          },
          {
            text: "Usually — depends on the topic",
            value: 1,
            traitWeights: {},
          },
          {
            text: "People tend to avoid certain topics with them",
            value: 3,
            traitWeights: { defensiveness: 2 },
          },
          {
            text: "No — people walk on eggshells around them",
            value: 5,
            traitWeights: { defensiveness: 4 },
          },
        ],
      },
    ],
  },
  {
    slug: "is-this-preference-or-bias",
    title: "Is This a Preference or Bias?",
    titleSelf: "Is This a Preference or Bias?",
    titleObserver: "Is Their Dating Type a Preference or Bias?",
    description:
      "Explore whether your dating type reflects genuine attraction or a pattern that consistently excludes certain groups.",
    category: "Bias & Awareness",
    categorySlug: "bias",
    emoji: "🔍",
    hasObserverMode: true,
    observerTargets: ["About myself", "About a friend", "About a partner"],
    traits: [
      "biasAwareness",
      "defensiveness",
      "selfAwareness",
      "socialPerception",
    ],
    results: defaultResults,
    disclaimer:
      "This quiz explores possible patterns, not intent. It is not a measure of character.",
    questionsSelf: [
      {
        id: "q1",
        text: "When you say you have a 'type', does that type consistently exclude one or more entire racial or ethnic groups?",
        answers: [
          {
            text: "No — I'm attracted to people across different groups",
            value: 0,
            traitWeights: { biasAwareness: 3 },
          },
          {
            text: "I mostly gravitate toward certain groups but I'm open",
            value: 1,
            traitWeights: { biasAwareness: 1 },
          },
          {
            text: "Yes — I rarely find myself attracted to certain groups",
            value: 3,
            traitWeights: { biasAwareness: -2 },
          },
          {
            text: "Yes — and I've never dated or considered certain groups",
            value: 5,
            traitWeights: { biasAwareness: -4 },
          },
        ],
      },
      {
        id: "q2",
        text: "When you're attracted to someone from a specific racial or ethnic background, does that attraction often come with certain expectations about how they should act or look?",
        answers: [
          {
            text: "No — I like individuals, not stereotypes",
            value: 0,
            traitWeights: { biasAwareness: 3 },
          },
          {
            text: "Maybe — I've never really thought about it",
            value: 2,
            traitWeights: { selfAwareness: -1 },
          },
          {
            text: "Yes — certain traits feel tied to the attraction",
            value: 4,
            traitWeights: { biasAwareness: -3 },
          },
          {
            text: "Yes — if they don't match those traits, my interest drops",
            value: 5,
            traitWeights: { biasAwareness: -4 },
          },
        ],
      },
      {
        id: "q3",
        text: "Have you ever said or thought 'I just don't find [group] attractive' as a complete statement with no exceptions?",
        answers: [
          {
            text: "No — that feels too broad",
            value: 0,
            traitWeights: { biasAwareness: 3, selfAwareness: 3 },
          },
          {
            text: "I may have thought it but didn't really examine it",
            value: 2,
            traitWeights: { selfAwareness: -1 },
          },
          {
            text: "Yes — and I stand by it as just my preference",
            value: 5,
            traitWeights: { biasAwareness: -4, defensiveness: 2 },
          },
        ],
      },
      {
        id: "q4",
        text: "If someone pointed out that your dating pattern consistently excludes a racial group, how would you respond?",
        answers: [
          {
            text: "I'd take it seriously and think about where that comes from",
            value: 0,
            traitWeights: { selfAwareness: 5, biasAwareness: 4 },
          },
          {
            text: "I'd consider it, but feel like attraction isn't something I can control",
            value: 2,
            traitWeights: { selfAwareness: 2, defensiveness: 1 },
          },
          {
            text: "I'd get defensive — preferences are personal",
            value: 4,
            traitWeights: { defensiveness: 4, biasAwareness: -2 },
          },
          {
            text: "I'd dismiss it — who I'm attracted to has nothing to do with bias",
            value: 5,
            traitWeights: { defensiveness: 5, biasAwareness: -4 },
          },
        ],
      },
      {
        id: "q5",
        text: "Do you engage with, befriend, or enjoy media by people from the groups you don't date?",
        answers: [
          {
            text: "Yes — no real connection between those things",
            value: 0,
            traitWeights: { biasAwareness: 2 },
          },
          {
            text: "Sometimes — depends on the person",
            value: 1,
            traitWeights: {},
          },
          {
            text: "I realize I don't have many close relationships with those groups at all",
            value: 4,
            traitWeights: { biasAwareness: -3, socialPerception: -2 },
          },
          {
            text: "Not really — I tend to keep to certain circles",
            value: 3,
            traitWeights: { biasAwareness: -2 },
          },
        ],
      },
      {
        id: "q6",
        text: "Have you ever felt fetishized or objectified based on your own background — or done that to someone else?",
        answers: [
          {
            text: "No, not in any significant way",
            value: 0,
            traitWeights: {},
          },
          {
            text: "I've felt it — it made me uncomfortable",
            value: 1,
            traitWeights: { biasAwareness: 2 },
          },
          {
            text: "I may have reduced someone to their background without meaning to",
            value: 3,
            traitWeights: { biasAwareness: -2, selfAwareness: 2 },
          },
          {
            text: "I've specifically been drawn to someone because of racial stereotypes I associate with them",
            value: 5,
            traitWeights: { biasAwareness: -4 },
          },
        ],
      },
    ],
    questionsObserver: [
      {
        id: "q1",
        text: "Does their dating pattern consistently exclude one or more entire racial or ethnic groups?",
        answers: [
          {
            text: "No — they seem open to different people",
            value: 0,
            traitWeights: {},
          },
          {
            text: "They have clear preferences but seem open",
            value: 1,
            traitWeights: {},
          },
          {
            text: "Yes — they rarely consider certain groups",
            value: 3,
            traitWeights: { biasAwareness: -2 },
          },
          {
            text: "Yes — they've explicitly said they don't date certain groups",
            value: 5,
            traitWeights: { biasAwareness: -4 },
          },
        ],
      },
      {
        id: "q2",
        text: "When they're attracted to someone from a certain background, do they seem to expect them to fit a certain stereotype?",
        answers: [
          {
            text: "No — they treat people as individuals",
            value: 0,
            traitWeights: {},
          },
          {
            text: "Maybe — haven't paid close attention",
            value: 1,
            traitWeights: {},
          },
          {
            text: "Yes — they seem to like the idea of someone's background more than the person",
            value: 4,
            traitWeights: { biasAwareness: -3 },
          },
        ],
      },
      {
        id: "q3",
        text: "How do they respond when this pattern is pointed out to them?",
        answers: [
          {
            text: "They take it seriously and reflect",
            value: 0,
            traitWeights: { selfAwareness: 4 },
          },
          {
            text: "They consider it but push back a little",
            value: 2,
            traitWeights: { defensiveness: 2 },
          },
          {
            text: "They get defensive and say it's just preference",
            value: 4,
            traitWeights: { defensiveness: 4, biasAwareness: -2 },
          },
          {
            text: "They completely shut down the conversation",
            value: 5,
            traitWeights: { defensiveness: 5 },
          },
        ],
      },
      {
        id: "q4",
        text: "Do they have close friendships or meaningful relationships with people from the groups they don't date?",
        answers: [
          {
            text: "Yes — their social circle is fairly diverse",
            value: 0,
            traitWeights: {},
          },
          {
            text: "Somewhat",
            value: 1,
            traitWeights: {},
          },
          {
            text: "Not really — it's a noticeable gap",
            value: 3,
            traitWeights: { biasAwareness: -2 },
          },
          {
            text: "No — they avoid certain groups across all contexts",
            value: 5,
            traitWeights: { biasAwareness: -4 },
          },
        ],
      },
    ],
  },
  {
    slug: "microaggression-checker",
    title: "Microaggression Checker",
    titleSelf: "Do I Make Microaggressions?",
    titleObserver: "Does My Friend Make Microaggressions?",
    description:
      "Reflect on whether certain comments, habits, or reactions fall into patterns associated with microaggressions.",
    category: "Bias & Awareness",
    categorySlug: "bias",
    emoji: "🧐",
    hasObserverMode: true,
    observerTargets: [
      "About myself",
      "About a friend",
      "About a coworker",
      "About a family member",
    ],
    traits: [
      "biasAwareness",
      "empathy",
      "defensiveness",
      "socialPerception",
      "accountability",
    ],
    results: [
      {
        level: 1,
        label: "Low Concern",
        description:
          "Your answers don't suggest a clear pattern of microaggressions.",
        details:
          "No major pattern came up. This doesn't mean the topic isn't relevant — it just means your answers don't reflect a clear pattern right now.",
        color: "green",
      },
      {
        level: 2,
        label: "A Few Patterns Worth Noticing",
        description: "A few habits or responses may be worth reflecting on.",
        details:
          "Some of your answers touch on patterns that can come across as dismissive or othering, even without intent. Awareness is the first step.",
        color: "lime",
      },
      {
        level: 3,
        label: "Possible Blind Spots",
        description:
          "There are signs of possible blind spots that may affect how others experience interactions with you.",
        details:
          "A few patterns stood out. These may not be intentional, but intent doesn't always determine impact. Worth paying attention to.",
        color: "yellow",
      },
      {
        level: 4,
        label: "Clear Pattern Present",
        description:
          "Your answers suggest a pattern that may regularly be experienced as othering or dismissive by those it affects.",
        details:
          "Multiple answers pointed in the same direction. This is worth examining honestly — patterns like these can create real friction even when the person doesn't realize it.",
        color: "orange",
      },
      {
        level: 5,
        label: "Strong and Repeated Pattern",
        description:
          "The pattern appears consistent across multiple areas and may be causing real harm to the people around you.",
        details:
          "This doesn't make someone a bad person, but it does suggest a pattern that's likely affecting people in real ways. Genuine reflection and willingness to change are what matter most here.",
        color: "red",
      },
    ],
    disclaimer:
      "This quiz does not diagnose prejudice or racism. It reflects patterns in behavior and response that may be worth examining.",
    questionsSelf: [
      {
        id: "q1",
        text: "Have you ever asked someone 'Where are you really from?' after they said they were from somewhere in the US?",
        answers: [
          {
            text: "No — that question feels weird to me",
            value: 0,
            traitWeights: { biasAwareness: 3 },
          },
          {
            text: "Maybe, I was just curious about their heritage",
            value: 2,
            traitWeights: { biasAwareness: -1, socialPerception: -1 },
          },
          {
            text: "Yes, and I don't think that's a problem",
            value: 5,
            traitWeights: { biasAwareness: -3, defensiveness: 2 },
          },
        ],
      },
      {
        id: "q2",
        text: "When you meet someone from a different background and they're articulate and polished, do you find yourself surprised?",
        answers: [
          {
            text: "No — I expect competence from everyone",
            value: 0,
            traitWeights: { biasAwareness: 3, empathy: 2 },
          },
          {
            text: "I might have been — it's something I've been working on",
            value: 1,
            traitWeights: { selfAwareness: 3, biasAwareness: 1 },
          },
          {
            text: "Sometimes — I try not to show it",
            value: 3,
            traitWeights: { biasAwareness: -2 },
          },
          {
            text: "It does catch me off guard — I assume it's just statistics",
            value: 5,
            traitWeights: { biasAwareness: -4 },
          },
        ],
      },
      {
        id: "q3",
        text: "Have you ever touched someone's hair without asking because it seemed interesting or different?",
        answers: [
          {
            text: "No — I would always ask first or just not do that",
            value: 0,
            traitWeights: { biasAwareness: 3, empathy: 3 },
          },
          {
            text: "I did it once and didn't realize it was a big deal at the time",
            value: 3,
            traitWeights: { biasAwareness: -1, selfAwareness: 2 },
          },
          {
            text: "Yes — and I still think it was harmless",
            value: 5,
            traitWeights: { biasAwareness: -3, defensiveness: 3 },
          },
        ],
      },
      {
        id: "q4",
        text: "When someone from a marginalized group tells you that something you said was hurtful, what is your first reaction?",
        answers: [
          {
            text: "I take it seriously and try to understand",
            value: 0,
            traitWeights: { empathy: 5, accountability: 5, defensiveness: -3 },
          },
          {
            text: "I listen but want to explain my intent",
            value: 2,
            traitWeights: { defensiveness: 2, empathy: 2 },
          },
          {
            text: "I feel like I'm being accused and get defensive",
            value: 4,
            traitWeights: {
              defensiveness: 5,
              biasAwareness: -2,
              accountability: -2,
            },
          },
          {
            text: "I think they're overreacting",
            value: 5,
            traitWeights: { defensiveness: 5, biasAwareness: -4, empathy: -4 },
          },
        ],
      },
      {
        id: "q5",
        text: "Have you ever told someone they're 'not like other [group members]' as a compliment?",
        answers: [
          {
            text: "No — that kind of framing seems off to me",
            value: 0,
            traitWeights: { biasAwareness: 3, socialPerception: 3 },
          },
          {
            text: "I might have — I meant it as a compliment at the time",
            value: 3,
            traitWeights: { biasAwareness: -2, selfAwareness: 2 },
          },
          {
            text: "Yes — and I still think it's a compliment",
            value: 5,
            traitWeights: { biasAwareness: -4, defensiveness: 2 },
          },
        ],
      },
      {
        id: "q6",
        text: "Do you ever assume someone's job, education level, or neighborhood based on how they look?",
        answers: [
          {
            text: "I actively try not to — I'm aware of that bias",
            value: 0,
            traitWeights: { biasAwareness: 4, selfAwareness: 3 },
          },
          {
            text: "I try not to, but it happens sometimes before I catch it",
            value: 2,
            traitWeights: { selfAwareness: 3, biasAwareness: 1 },
          },
          {
            text: "Probably — but it's just pattern recognition",
            value: 4,
            traitWeights: { biasAwareness: -3 },
          },
          {
            text: "Yes — and I think those reads are usually accurate",
            value: 5,
            traitWeights: { biasAwareness: -5, defensiveness: 2 },
          },
        ],
      },
      {
        id: "q7",
        text: "Do you sometimes tokenize someone from a minority group — like asking for 'the Black perspective' or 'what women think'?",
        answers: [
          {
            text: "No — I know people aren't representatives of their whole group",
            value: 0,
            traitWeights: { biasAwareness: 4, empathy: 3 },
          },
          {
            text: "I might do it occasionally without realizing",
            value: 2,
            traitWeights: { selfAwareness: 2, biasAwareness: -1 },
          },
          {
            text: "Yes — I think it's useful to get that perspective",
            value: 4,
            traitWeights: { biasAwareness: -3 },
          },
        ],
      },
    ],
    questionsObserver: [
      {
        id: "q1",
        text: "Have they asked someone 'Where are you really from?' after learning they were born in the US?",
        answers: [
          {
            text: "Not that I've noticed",
            value: 0,
            traitWeights: {},
          },
          {
            text: "Once or twice — they seemed curious",
            value: 2,
            traitWeights: { biasAwareness: -1 },
          },
          {
            text: "Yes — regularly",
            value: 4,
            traitWeights: { biasAwareness: -3 },
          },
        ],
      },
      {
        id: "q2",
        text: "Have you noticed them seeming surprised when someone from a minority background is articulate or successful?",
        answers: [
          {
            text: "No — they seem to treat everyone as capable",
            value: 0,
            traitWeights: {},
          },
          {
            text: "Occasionally — they usually catch themselves",
            value: 2,
            traitWeights: {},
          },
          {
            text: "Yes — there's a pattern of this",
            value: 4,
            traitWeights: { biasAwareness: -3 },
          },
        ],
      },
      {
        id: "q3",
        text: "When people from marginalized groups raise a concern about something they said, how do they respond?",
        answers: [
          {
            text: "They take it seriously and reflect",
            value: 0,
            traitWeights: { accountability: 4, empathy: 4 },
          },
          {
            text: "They try to explain their intent",
            value: 2,
            traitWeights: { defensiveness: 2 },
          },
          {
            text: "They get defensive or dismissive",
            value: 4,
            traitWeights: { defensiveness: 4, accountability: -3 },
          },
          {
            text: "They say the person is overreacting",
            value: 5,
            traitWeights: { defensiveness: 5, biasAwareness: -4 },
          },
        ],
      },
      {
        id: "q4",
        text: "Have they ever said something like 'You're not like other [group members]' as a compliment?",
        answers: [
          {
            text: "No",
            value: 0,
            traitWeights: {},
          },
          {
            text: "Once or twice — meant well",
            value: 2,
            traitWeights: { biasAwareness: -1 },
          },
          {
            text: "Yes — it's a pattern",
            value: 5,
            traitWeights: { biasAwareness: -4 },
          },
        ],
      },
      {
        id: "q5",
        text: "Do they make assumptions about people's backgrounds, education, or abilities based on appearance?",
        answers: [
          {
            text: "Not that I've noticed",
            value: 0,
            traitWeights: {},
          },
          {
            text: "Sometimes but they catch themselves",
            value: 2,
            traitWeights: { selfAwareness: 2 },
          },
          {
            text: "Yes — and they defend it as pattern recognition",
            value: 5,
            traitWeights: { biasAwareness: -4, defensiveness: 3 },
          },
        ],
      },
    ],
  },
  {
    slug: "does-my-friend-have-racial-blind-spots",
    title: "Does My Friend Have Racial Blind Spots?",
    titleSelf: "Do I Have Racial Blind Spots?",
    titleObserver: "Does My Friend Have Racial Blind Spots?",
    description:
      "Reflect on whether a friend (or you) shows patterns of racial avoidance, dismissal, or inconsistency in their stated values.",
    category: "Bias & Awareness",
    categorySlug: "bias",
    emoji: "👁️",
    hasObserverMode: true,
    observerTargets: [
      "About myself",
      "About a friend",
      "About a coworker",
      "About a family member",
    ],
    traits: [
      "biasAwareness",
      "defensiveness",
      "empathy",
      "accountability",
      "socialPerception",
    ],
    results: defaultResults,
    disclaimer:
      "This quiz reflects observable patterns, not proof of intent. Use it for reflection, not accusation.",
    questionsSelf: [
      {
        id: "q1",
        text: "Do you say you support racial equality but rarely have close relationships with people from different racial groups?",
        answers: [
          {
            text: "No — my close relationships are fairly diverse",
            value: 0,
            traitWeights: { biasAwareness: 3 },
          },
          {
            text: "My circle is fairly homogeneous, but I'm open to change",
            value: 2,
            traitWeights: { selfAwareness: 2 },
          },
          {
            text: "Yes — my social circle is pretty racially uniform",
            value: 3,
            traitWeights: { biasAwareness: -2 },
          },
          {
            text: "Yes — and I haven't really questioned that",
            value: 4,
            traitWeights: { biasAwareness: -3, selfAwareness: -2 },
          },
        ],
      },
      {
        id: "q2",
        text: "Do you enjoy Black music, culture, food, or style — but keep your personal life mostly separate from Black people?",
        answers: [
          {
            text: "No — I have genuine relationships, not just cultural consumption",
            value: 0,
            traitWeights: { biasAwareness: 3 },
          },
          {
            text: "I enjoy certain aspects of the culture but recognize I could build more real connections",
            value: 2,
            traitWeights: { selfAwareness: 3, biasAwareness: 1 },
          },
          {
            text: "Now that you mention it — yes, that gap does exist",
            value: 3,
            traitWeights: { biasAwareness: -2 },
          },
          {
            text: "Yes — and I think that's fine, culture is culture",
            value: 4,
            traitWeights: { biasAwareness: -3, defensiveness: 2 },
          },
        ],
      },
      {
        id: "q3",
        text: "When racial incidents or conversations come up in your friend group, what do you usually do?",
        answers: [
          {
            text: "Engage directly — I'm comfortable in those conversations",
            value: 0,
            traitWeights: { biasAwareness: 3, communicationDirectness: 3 },
          },
          {
            text: "Participate, but carefully — I don't want to say the wrong thing",
            value: 1,
            traitWeights: { biasAwareness: 2, conflictAvoidance: 2 },
          },
          {
            text: "Stay quiet — it doesn't feel like my place",
            value: 3,
            traitWeights: { conflictAvoidance: 3, biasAwareness: -1 },
          },
          {
            text: "Change the subject — I don't like where it goes",
            value: 4,
            traitWeights: { conflictAvoidance: 4, biasAwareness: -2 },
          },
        ],
      },
      {
        id: "q4",
        text: "Have you ever defended a racist or racially insensitive action from someone you like?",
        answers: [
          {
            text: "No — I hold people I care about to the same standard",
            value: 0,
            traitWeights: { biasAwareness: 4, accountability: 4 },
          },
          {
            text: "I've tried to offer context without outright defending it",
            value: 2,
            traitWeights: { accountability: 2, biasAwareness: 1 },
          },
          {
            text: "Yes — I made excuses because I know they're 'a good person'",
            value: 4,
            traitWeights: { biasAwareness: -3, accountability: -2 },
          },
          {
            text: "Yes — and I still think I was right to defend them",
            value: 5,
            traitWeights: { biasAwareness: -4, defensiveness: 3 },
          },
        ],
      },
      {
        id: "q5",
        text: "Do you get visibly uncomfortable or defensive when your own racial blind spots are pointed out?",
        answers: [
          {
            text: "I try to listen and genuinely reflect",
            value: 0,
            traitWeights: { biasAwareness: 4, accountability: 4 },
          },
          {
            text: "I try to be open but I do feel a little defensive",
            value: 2,
            traitWeights: { defensiveness: 2, selfAwareness: 2 },
          },
          {
            text: "I get pretty defensive — it feels personal",
            value: 4,
            traitWeights: { defensiveness: 4, biasAwareness: -2 },
          },
          {
            text: "I dismiss it — it feels like an attack",
            value: 5,
            traitWeights: { defensiveness: 5, biasAwareness: -4 },
          },
        ],
      },
    ],
    questionsObserver: [
      {
        id: "q1",
        text: "Does your friend claim to support racial equality but have very few close relationships with people from different racial backgrounds?",
        answers: [
          {
            text: "No — their relationships are genuinely diverse",
            value: 0,
            traitWeights: {},
          },
          {
            text: "Their circle is fairly homogeneous but they seem open",
            value: 2,
            traitWeights: {},
          },
          {
            text: "Yes — there's a noticeable gap between what they say and who they know",
            value: 4,
            traitWeights: { biasAwareness: -3 },
          },
        ],
      },
      {
        id: "q2",
        text: "Do they consume and enjoy Black or minority culture while keeping their actual social life mostly segregated?",
        answers: [
          {
            text: "No — they have genuine cross-racial relationships",
            value: 0,
            traitWeights: {},
          },
          {
            text: "There's some gap — they enjoy the culture more than the people",
            value: 3,
            traitWeights: { biasAwareness: -2 },
          },
          {
            text: "Yes — very noticeably",
            value: 5,
            traitWeights: { biasAwareness: -4 },
          },
        ],
      },
      {
        id: "q3",
        text: "When racial topics come up, how do they react?",
        answers: [
          {
            text: "Engage thoughtfully and comfortably",
            value: 0,
            traitWeights: { biasAwareness: 3 },
          },
          {
            text: "Participate but visibly uncomfortable",
            value: 2,
            traitWeights: {},
          },
          {
            text: "Shut down or change the subject",
            value: 4,
            traitWeights: { conflictAvoidance: 3, biasAwareness: -2 },
          },
          {
            text: "Get defensive or say people are too sensitive",
            value: 5,
            traitWeights: { defensiveness: 4, biasAwareness: -3 },
          },
        ],
      },
      {
        id: "q4",
        text: "Have you seen them defend someone's racially insensitive behavior because they personally like that person?",
        answers: [
          {
            text: "No",
            value: 0,
            traitWeights: {},
          },
          {
            text: "Once — they offered context without fully endorsing it",
            value: 2,
            traitWeights: {},
          },
          {
            text: "Yes — they made excuses",
            value: 4,
            traitWeights: { biasAwareness: -3, accountability: -2 },
          },
          {
            text: "Yes — and they saw nothing wrong with it",
            value: 5,
            traitWeights: { biasAwareness: -4, defensiveness: 3 },
          },
        ],
      },
    ],
  },
  {
    slug: "am-i-gay-bi-or-curious",
    title: "Am I Gay, Bi, or Just Curious?",
    titleSelf: "Am I Gay, Bi, or Just Curious?",
    titleObserver: "Am I Gay, Bi, or Just Curious?",
    description:
      "A reflection-based test to explore patterns in your attraction, curiosity, and comfort. This quiz cannot define your identity — only you can do that.",
    category: "LGBTQ+ & Identity",
    categorySlug: "identity",
    emoji: "🌈",
    hasObserverMode: false,
    traits: ["attachmentSecurity", "emotionalAvailability", "selfAwareness"],
    results: [
      {
        level: 1,
        label: "Probably Straight",
        description:
          "Your answers don't suggest strong signs of same-sex attraction or questioning right now.",
        details:
          "That said, identity is fluid and personal. Only you can define yours — and it can evolve. There's no wrong answer here.",
        color: "blue",
      },
      {
        level: 2,
        label: "Possibly Curious",
        description:
          "Your answers suggest some curiosity or openness worth exploring on your own terms.",
        details:
          "Curiosity doesn't define your identity — but it's worth sitting with. Only you can determine what it means for you.",
        color: "purple",
      },
      {
        level: 3,
        label: "Signs Worth Exploring",
        description:
          "Your answers reflect patterns that suggest attraction or identity questions that may be worth reflecting on more deeply.",
        details:
          "This quiz can't tell you who you are. But the patterns in your answers suggest something worth sitting with, talking about, or simply acknowledging on your own terms.",
        color: "yellow",
      },
      {
        level: 4,
        label: "Strong Signs of Same-Sex Attraction",
        description:
          "Your answers suggest significant same-sex attraction or questioning.",
        details:
          "This result is not a label or a verdict. It's a reflection of the patterns in your answers. Only you can determine what your identity is and what it means to you.",
        color: "orange",
      },
      {
        level: 5,
        label: "Only You Can Define This",
        description:
          "Your answers suggest strong attraction or connection that may be worth acknowledging.",
        details:
          "Whatever these feelings mean, they're yours to define. There's no rush, no pressure, and no single right answer. This quiz cannot tell you who you are.",
        color: "rainbow",
      },
    ],
    disclaimer:
      "This test cannot define your sexual orientation or identity. It can only help you reflect on patterns in attraction, curiosity, and comfort. Only you can define what you feel and who you are.",
    questionsSelf: [
      {
        id: "q1",
        text: "Have you ever felt attracted to someone of the same gender — physically, emotionally, or both?",
        answers: [
          {
            text: "No — not in any way that stuck",
            value: 0,
            traitWeights: {},
          },
          {
            text: "Maybe once or twice, but I brushed it off",
            value: 2,
            traitWeights: { selfAwareness: 2 },
          },
          {
            text: "Yes — a few times, and it surprised me",
            value: 3,
            traitWeights: { selfAwareness: 3 },
          },
          {
            text: "Yes — more than a few times",
            value: 4,
            traitWeights: { selfAwareness: 3 },
          },
          {
            text: "Yes — pretty regularly",
            value: 5,
            traitWeights: { selfAwareness: 4 },
          },
        ],
      },
      {
        id: "q2",
        text: "When you imagine a romantic relationship, does your mind ever naturally include someone of the same gender?",
        answers: [
          {
            text: "No — not really",
            value: 0,
            traitWeights: {},
          },
          {
            text: "Occasionally — but it feels more abstract than real",
            value: 2,
            traitWeights: {},
          },
          {
            text: "Sometimes, yes — and it doesn't feel abstract",
            value: 3,
            traitWeights: {},
          },
          {
            text: "Often",
            value: 5,
            traitWeights: {},
          },
        ],
      },
      {
        id: "q3",
        text: "Have you ever avoided thinking about same-sex attraction because it felt uncomfortable or scary?",
        answers: [
          {
            text: "No — it's never been relevant to me",
            value: 0,
            traitWeights: {},
          },
          {
            text: "Maybe — I haven't dug into it",
            value: 2,
            traitWeights: { selfAwareness: 1 },
          },
          {
            text: "Yes — I've consciously pushed it away",
            value: 4,
            traitWeights: { selfAwareness: 3 },
          },
          {
            text: "Yes — it's something I've actively tried not to think about",
            value: 5,
            traitWeights: { selfAwareness: 4 },
          },
        ],
      },
      {
        id: "q4",
        text: "How do you feel when you see a same-sex couple that seems genuinely happy?",
        answers: [
          {
            text: "Happy for them — doesn't affect me beyond that",
            value: 0,
            traitWeights: {},
          },
          {
            text: "Warm, like it's something I could see for myself",
            value: 3,
            traitWeights: {},
          },
          {
            text: "I feel something I can't quite name — maybe envy, or recognition",
            value: 4,
            traitWeights: {},
          },
          {
            text: "Uncomfortable — I prefer not to think about it",
            value: 2,
            traitWeights: {},
          },
        ],
      },
      {
        id: "q5",
        text: "Have you ever had a close same-gender friendship that felt more intense than expected — emotionally, physically, or both?",
        answers: [
          {
            text: "No — my close friendships feel platonic",
            value: 0,
            traitWeights: {},
          },
          {
            text: "Maybe once — it was confusing at the time",
            value: 2,
            traitWeights: {},
          },
          {
            text: "Yes — and I've wondered what it meant",
            value: 3,
            traitWeights: {},
          },
          {
            text: "Yes — more than once",
            value: 4,
            traitWeights: {},
          },
        ],
      },
      {
        id: "q6",
        text: "If someone close to you asked whether you were gay or bi, how would you honestly feel?",
        answers: [
          {
            text: "Fine — it's not something that applies to me",
            value: 0,
            traitWeights: {},
          },
          {
            text: "I'd be caught off guard — it's something I think about",
            value: 3,
            traitWeights: { selfAwareness: 3 },
          },
          {
            text: "I'd feel exposed — like someone noticed something I haven't admitted",
            value: 5,
            traitWeights: { selfAwareness: 4 },
          },
          {
            text: "I'd laugh it off — but feel something underneath",
            value: 4,
            traitWeights: { selfAwareness: 3 },
          },
        ],
      },
    ],
  },
  {
    slug: "does-my-friend-like-me",
    title: "Does My Friend Like Me?",
    titleSelf: "Does My Friend Actually Like Me?",
    titleObserver: "Does My Friend Actually Like Me?",
    description:
      "Reflect on whether your friend values the friendship or whether certain patterns suggest otherwise.",
    category: "Friendship",
    categorySlug: "friendship",
    emoji: "🤝",
    hasObserverMode: false,
    traits: ["socialPerception", "attachmentSecurity", "selfAwareness"],
    results: [
      {
        level: 1,
        label: "Signs Look Good",
        description:
          "Your answers suggest this person does value the friendship.",
        details:
          "Things seem fairly solid. No major red flags in your answers. If you're here, it might just be the overthinking talking.",
        color: "green",
      },
      {
        level: 2,
        label: "Probably Fine, But Worth Watching",
        description:
          "A few things might be worth paying attention to, but nothing alarming.",
        details:
          "The friendship seems okay, but a couple of your answers suggest some small friction or imbalance worth noticing.",
        color: "lime",
      },
      {
        level: 3,
        label: "Mixed Signals",
        description:
          "Your answers show conflicting signals — some things are fine, others aren't.",
        details:
          "There's a mix here. Some parts of this friendship seem solid, but other patterns suggest possible distance or ambivalence. More context matters.",
        color: "yellow",
      },
      {
        level: 4,
        label: "Some Signs Worth Addressing",
        description:
          "Multiple answers suggest this person may not be as invested as you are.",
        details:
          "This doesn't mean they don't care — but the pattern suggests there may be a real imbalance. Whether it's worth addressing or adjusting your expectations is up to you.",
        color: "orange",
      },
      {
        level: 5,
        label: "Strong Signs of Disinterest",
        description:
          "Your answers suggest this person may not be putting much into this friendship.",
        details:
          "This result doesn't prove how they feel. But the pattern is worth looking at honestly. It may be time to have a conversation or to recalibrate what you expect from this person.",
        color: "red",
      },
    ],
    questionsSelf: [
      {
        id: "q1",
        text: "Who usually initiates plans or reaches out first?",
        answers: [
          {
            text: "It's pretty equal",
            value: 0,
            traitWeights: { attachmentSecurity: 3 },
          },
          {
            text: "I do a bit more, but they respond well",
            value: 1,
            traitWeights: { attachmentSecurity: 2 },
          },
          {
            text: "I almost always reach out first",
            value: 4,
            traitWeights: { attachmentSecurity: -2, socialPerception: 3 },
          },
          {
            text: "I always do — and when I don't, nothing happens",
            value: 5,
            traitWeights: { attachmentSecurity: -3, socialPerception: 4 },
          },
        ],
      },
      {
        id: "q2",
        text: "When you share something personal or vulnerable, how do they respond?",
        answers: [
          {
            text: "They engage, listen, and follow up",
            value: 0,
            traitWeights: { socialPerception: 3 },
          },
          {
            text: "They listen, but don't always follow up",
            value: 1,
            traitWeights: {},
          },
          {
            text: "They acknowledge it but quickly redirect to themselves",
            value: 3,
            traitWeights: { socialPerception: 3 },
          },
          {
            text: "They don't really engage with it",
            value: 5,
            traitWeights: { socialPerception: 4 },
          },
        ],
      },
      {
        id: "q3",
        text: "Have you noticed them canceling on you more than on others?",
        answers: [
          {
            text: "No — they treat me the same as others",
            value: 0,
            traitWeights: {},
          },
          {
            text: "Maybe once or twice — nothing clear",
            value: 1,
            traitWeights: {},
          },
          {
            text: "Yes — I've noticed a pattern",
            value: 3,
            traitWeights: { socialPerception: 3 },
          },
          {
            text: "Yes — and they seem to have energy for others but not me",
            value: 5,
            traitWeights: { socialPerception: 4 },
          },
        ],
      },
      {
        id: "q4",
        text: "Do they remember things you've told them before?",
        answers: [
          {
            text: "Yes — they pay attention",
            value: 0,
            traitWeights: {},
          },
          {
            text: "Sometimes — depends on the topic",
            value: 1,
            traitWeights: {},
          },
          {
            text: "Rarely — I often have to re-explain things",
            value: 3,
            traitWeights: { socialPerception: 2 },
          },
          {
            text: "No — they clearly aren't retaining what I share",
            value: 4,
            traitWeights: { socialPerception: 3 },
          },
        ],
      },
      {
        id: "q5",
        text: "Do you feel included in their life, or do you find out about things after the fact?",
        answers: [
          {
            text: "Included — they keep me in the loop",
            value: 0,
            traitWeights: {},
          },
          {
            text: "Mostly — minor exceptions",
            value: 1,
            traitWeights: {},
          },
          {
            text: "I often find out later when I wasn't included",
            value: 4,
            traitWeights: { socialPerception: 3 },
          },
          {
            text: "I feel like a last resort or backup plan",
            value: 5,
            traitWeights: { socialPerception: 4 },
          },
        ],
      },
      {
        id: "q6",
        text: "When you're going through something hard, do they show up?",
        answers: [
          {
            text: "Yes — they check in and are present",
            value: 0,
            traitWeights: { socialPerception: 3 },
          },
          {
            text: "Sometimes — depends on what it is",
            value: 1,
            traitWeights: {},
          },
          {
            text: "Rarely — I've mostly stopped expecting it",
            value: 4,
            traitWeights: { socialPerception: 3 },
          },
          {
            text: "No — they go quiet when things get hard",
            value: 5,
            traitWeights: { socialPerception: 4 },
          },
        ],
      },
    ],
  },
  {
    slug: "is-this-a-situationship",
    title: "Is This a Situationship?",
    titleSelf: "Is This a Situationship?",
    titleObserver: "Is This a Situationship?",
    description:
      "Reflect on whether your dynamic with someone is a genuine relationship, a situationship, or something harder to define.",
    category: "Dating & Relationships",
    categorySlug: "dating",
    emoji: "💭",
    hasObserverMode: false,
    traits: [
      "attachmentSecurity",
      "communicationDirectness",
      "boundaryStrength",
    ],
    results: [
      {
        level: 1,
        label: "This Looks Like a Real Relationship",
        description:
          "Your answers suggest this connection has real structure, clarity, and mutual investment.",
        details:
          "Things seem pretty defined. If something still feels unclear to you, a simple conversation would probably sort it out quickly.",
        color: "green",
      },
      {
        level: 2,
        label: "Mostly Clear, Some Uncertainty",
        description: "Mostly good signs — a few things might be worth naming.",
        details:
          "The dynamic seems mostly healthy and defined, but a couple of answers suggest some ambiguity worth addressing before it becomes a bigger issue.",
        color: "lime",
      },
      {
        level: 3,
        label: "Unclear Territory",
        description: "This could be a situationship or something developing.",
        details:
          "The signals are mixed. Some things suggest real connection; others suggest you're operating in undefined space. A conversation could help — or reveal that you're both avoiding one on purpose.",
        color: "yellow",
      },
      {
        level: 4,
        label: "Strong Situationship Signs",
        description:
          "Your answers suggest this dynamic has most of the features of a situationship — closeness without clarity.",
        details:
          "You may be getting relationship-level emotional investment with relationship-level uncertainty. That's a hard place to stay in long-term.",
        color: "orange",
      },
      {
        level: 5,
        label: "Classic Situationship",
        description:
          "The pattern in your answers looks very much like an undefined relationship with most of the emotional weight and none of the clarity.",
        details:
          "This doesn't mean it can't work out — but going on like this indefinitely usually favors the person who needs less. If you want more, it may be time to say something.",
        color: "red",
      },
    ],
    questionsSelf: [
      {
        id: "q1",
        text: "Have you and this person ever clearly defined what you are?",
        answers: [
          {
            text: "Yes — we've talked about it and we're on the same page",
            value: 0,
            traitWeights: {
              communicationDirectness: 4,
              attachmentSecurity: 4,
            },
          },
          {
            text: "Sort of — it came up once but wasn't fully resolved",
            value: 2,
            traitWeights: { communicationDirectness: 1 },
          },
          {
            text: "No — we've avoided the conversation",
            value: 4,
            traitWeights: {
              communicationDirectness: -3,
              conflictAvoidance: 3,
            },
          },
          {
            text: "No — and I'm not sure either of us wants to",
            value: 5,
            traitWeights: {
              communicationDirectness: -4,
              conflictAvoidance: 4,
            },
          },
        ],
      },
      {
        id: "q2",
        text: "Do you spend time together that feels like dating — but it's never called that?",
        answers: [
          {
            text: "No — what we do is clearly romantic",
            value: 0,
            traitWeights: { attachmentSecurity: 3 },
          },
          {
            text: "Sometimes — but it feels mutual",
            value: 2,
            traitWeights: {},
          },
          {
            text: "Yes — we do relationship things but without the label",
            value: 4,
            traitWeights: { attachmentSecurity: -2 },
          },
          {
            text: "Yes — and we both avoid naming what it is",
            value: 5,
            traitWeights: {
              attachmentSecurity: -3,
              conflictAvoidance: 3,
            },
          },
        ],
      },
      {
        id: "q3",
        text: "Are you exclusive, or are you both free to see other people?",
        answers: [
          {
            text: "Exclusive — we've discussed it",
            value: 0,
            traitWeights: {
              communicationDirectness: 3,
              attachmentSecurity: 4,
            },
          },
          {
            text: "We assume exclusivity but haven't said it out loud",
            value: 2,
            traitWeights: { communicationDirectness: -1 },
          },
          {
            text: "Unclear — I don't actually know",
            value: 4,
            traitWeights: {
              communicationDirectness: -3,
              attachmentSecurity: -2,
            },
          },
          {
            text: "We're not exclusive, but I'd prefer to be",
            value: 5,
            traitWeights: {
              attachmentSecurity: -4,
              boundaryStrength: -2,
            },
          },
        ],
      },
      {
        id: "q4",
        text: "How consistent are they with communication and plans?",
        answers: [
          {
            text: "Very consistent — they follow through reliably",
            value: 0,
            traitWeights: { attachmentSecurity: 4 },
          },
          {
            text: "Mostly — occasional flakiness",
            value: 1,
            traitWeights: {},
          },
          {
            text: "Inconsistent — hot and cold",
            value: 4,
            traitWeights: { attachmentSecurity: -3 },
          },
          {
            text: "Very inconsistent — I never know where I stand",
            value: 5,
            traitWeights: { attachmentSecurity: -4, boundaryStrength: -2 },
          },
        ],
      },
      {
        id: "q5",
        text: "Do they introduce you to people in their life?",
        answers: [
          {
            text: "Yes — I'm part of their social world",
            value: 0,
            traitWeights: { attachmentSecurity: 3 },
          },
          {
            text: "Some people — still meeting others",
            value: 1,
            traitWeights: {},
          },
          {
            text: "Not really — I haven't met important people",
            value: 3,
            traitWeights: { attachmentSecurity: -2 },
          },
          {
            text: "No — I feel like I exist separately from their life",
            value: 5,
            traitWeights: { attachmentSecurity: -4 },
          },
        ],
      },
      {
        id: "q6",
        text: "How do you feel when they go quiet or pull back?",
        answers: [
          {
            text: "Fine — I trust it's temporary and normal",
            value: 0,
            traitWeights: { attachmentSecurity: 4 },
          },
          {
            text: "A little anxious, but I give space",
            value: 1,
            traitWeights: { attachmentSecurity: 2 },
          },
          {
            text: "Worried and unsure what it means",
            value: 3,
            traitWeights: { attachmentSecurity: -2 },
          },
          {
            text: "Panicked — like I might lose them without warning",
            value: 5,
            traitWeights: {
              attachmentSecurity: -4,
              conflictAvoidance: 3,
            },
          },
        ],
      },
    ],
  },
  {
    slug: "are-we-compatible",
    title: "Are We Compatible?",
    titleSelf: "Are We Compatible?",
    titleObserver: "Are We Compatible?",
    description:
      "Reflect on whether you and someone else have the values, communication patterns, and life rhythms to build something that works.",
    category: "Compatibility",
    categorySlug: "compatibility",
    emoji: "🔗",
    hasObserverMode: false,
    traits: [
      "communicationDirectness",
      "emotionalAvailability",
      "attachmentSecurity",
      "conflictAvoidance",
    ],
    results: [
      {
        level: 1,
        label: "Strong Compatibility Signs",
        description:
          "Your answers suggest a strong foundation across key areas.",
        details:
          "There's real overlap in how you both communicate, handle conflict, and show up emotionally. The patterns you described suggest a healthy dynamic.",
        color: "green",
      },
      {
        level: 2,
        label: "Mostly Compatible",
        description:
          "A few differences, but nothing that looks like a dealbreaker.",
        details:
          "You seem generally compatible with a couple of areas worth discussing. Most successful relationships have some friction — it's how it's handled that matters.",
        color: "lime",
      },
      {
        level: 3,
        label: "Mixed — Worth Exploring",
        description:
          "Some real compatibility alongside some genuine differences.",
        details:
          "There are areas where you match well, and areas where your patterns diverge. This isn't necessarily a problem — but it's worth talking about openly.",
        color: "yellow",
      },
      {
        level: 4,
        label: "Notable Incompatibilities",
        description:
          "Several patterns suggest real friction that may need to be addressed.",
        details:
          "Some important differences showed up. This doesn't mean it can't work — but ignoring the gaps tends to make them bigger over time.",
        color: "orange",
      },
      {
        level: 5,
        label: "Significant Compatibility Challenges",
        description:
          "Your answers suggest major differences in values, communication, or emotional needs.",
        details:
          "This result doesn't tell you what to do. But the patterns suggest a real gap worth examining honestly. Compatibility can sometimes be worked on — but both people have to see it and want to.",
        color: "red",
      },
    ],
    questionsSelf: [
      {
        id: "q1",
        text: "How do you two handle disagreements?",
        answers: [
          {
            text: "We talk it out — can disagree without it becoming a big thing",
            value: 0,
            traitWeights: {
              communicationDirectness: 4,
              conflictAvoidance: -2,
            },
          },
          {
            text: "We usually resolve it, but it takes time",
            value: 1,
            traitWeights: {},
          },
          {
            text: "We tend to avoid the conversation and move on",
            value: 3,
            traitWeights: { conflictAvoidance: 3, communicationDirectness: -2 },
          },
          {
            text: "Disagreements usually escalate or one of us shuts down",
            value: 5,
            traitWeights: {
              conflictAvoidance: 4,
              emotionalAvailability: -3,
            },
          },
        ],
      },
      {
        id: "q2",
        text: "Do you have similar values around things like honesty, effort, and how you treat people?",
        answers: [
          {
            text: "Very similar — it's one of the reasons we connect",
            value: 0,
            traitWeights: { attachmentSecurity: 3 },
          },
          {
            text: "Mostly similar with some differences",
            value: 1,
            traitWeights: {},
          },
          {
            text: "Different enough that it comes up sometimes",
            value: 3,
            traitWeights: { attachmentSecurity: -2 },
          },
          {
            text: "Very different — it's a source of friction",
            value: 5,
            traitWeights: { attachmentSecurity: -4 },
          },
        ],
      },
      {
        id: "q3",
        text: "Do you feel like you can be yourself around this person?",
        answers: [
          {
            text: "Yes — fully",
            value: 0,
            traitWeights: { emotionalAvailability: 4, attachmentSecurity: 4 },
          },
          {
            text: "Mostly — I hold back a little",
            value: 1,
            traitWeights: { emotionalAvailability: 2 },
          },
          {
            text: "I perform a version of myself with them",
            value: 3,
            traitWeights: { emotionalAvailability: -2 },
          },
          {
            text: "No — I feel like I have to edit myself significantly",
            value: 5,
            traitWeights: { emotionalAvailability: -4, attachmentSecurity: -3 },
          },
        ],
      },
      {
        id: "q4",
        text: "Do you have similar needs around communication — how often you talk, check in, and share?",
        answers: [
          {
            text: "Very similar — it feels natural",
            value: 0,
            traitWeights: { communicationDirectness: 3, attachmentSecurity: 3 },
          },
          {
            text: "Fairly similar",
            value: 1,
            traitWeights: {},
          },
          {
            text: "Somewhat different — one of us needs more",
            value: 3,
            traitWeights: { attachmentSecurity: -2 },
          },
          {
            text: "Very different — it creates tension",
            value: 5,
            traitWeights: {
              attachmentSecurity: -4,
              communicationDirectness: -2,
            },
          },
        ],
      },
      {
        id: "q5",
        text: "Do your long-term goals or lifestyle priorities align?",
        answers: [
          {
            text: "Yes — we're in similar places and want similar things",
            value: 0,
            traitWeights: { attachmentSecurity: 3 },
          },
          {
            text: "Mostly — some differences but nothing dealbreaking",
            value: 1,
            traitWeights: {},
          },
          {
            text: "Somewhat — there are real gaps we haven't fully addressed",
            value: 3,
            traitWeights: { attachmentSecurity: -1 },
          },
          {
            text: "Very different — it's hard to see how they'd mesh",
            value: 5,
            traitWeights: { attachmentSecurity: -3 },
          },
        ],
      },
      {
        id: "q6",
        text: "When one of you is struggling emotionally, how does the other respond?",
        answers: [
          {
            text: "They show up — and so do I",
            value: 0,
            traitWeights: { emotionalAvailability: 5 },
          },
          {
            text: "Usually okay — occasionally pulls back",
            value: 1,
            traitWeights: { emotionalAvailability: 2 },
          },
          {
            text: "One of us tends to shut down or disappear under stress",
            value: 3,
            traitWeights: { emotionalAvailability: -2 },
          },
          {
            text: "It usually makes things worse between us",
            value: 5,
            traitWeights: {
              emotionalAvailability: -4,
              attachmentSecurity: -3,
            },
          },
        ],
      },
    ],
  },
  {
    slug: "am-i-overreacting",
    title: "Am I Overreacting?",
    titleSelf: "Am I Overreacting?",
    titleObserver: "Am I Overreacting?",
    description:
      "Reflect on whether your emotional reaction to a situation is proportional, or whether you might be overreacting — or actually under-trusting yourself.",
    category: "Conflict & Communication",
    categorySlug: "conflict",
    emoji: "😤",
    hasObserverMode: false,
    traits: [
      "selfAwareness",
      "emotionalAvailability",
      "conflictAvoidance",
      "defensiveness",
    ],
    results: [
      {
        level: 1,
        label: "Probably Not Overreacting",
        description:
          "Your answers suggest your reaction is proportional to what happened.",
        details:
          "Nothing in your answers suggests this is a disproportionate response. You may just need support, not self-correction.",
        color: "green",
      },
      {
        level: 2,
        label: "Reaction Seems Reasonable",
        description:
          "A few things worth checking in on, but your reaction seems grounded.",
        details:
          "You're likely reading the situation fairly accurately. A small amount of self-questioning is healthy — this doesn't look like an overreaction.",
        color: "lime",
      },
      {
        level: 3,
        label: "Hard to Tell Without More Context",
        description:
          "There are conflicting signals — you may be reacting appropriately or may have some extra emotional charge in the mix.",
        details:
          "Your answers are mixed. The reaction may be reasonable, but there may also be something underneath driving more intensity than the situation alone warrants.",
        color: "yellow",
      },
      {
        level: 4,
        label: "Some Signs of a Bigger Trigger",
        description:
          "Your reaction may be partly about this situation and partly about something deeper.",
        details:
          "This doesn't mean you're wrong about the situation — but the intensity of your response may be pulling from a larger pattern. Worth looking at what else is going on.",
        color: "orange",
      },
      {
        level: 5,
        label: "Possible Overreaction",
        description:
          "Your answers suggest your reaction may be stronger than the situation warrants.",
        details:
          "This doesn't mean your feelings aren't real. But the gap between what happened and how you're responding may be worth examining. Something may have been triggered that's bigger than this one event.",
        color: "red",
      },
    ],
    questionsSelf: [
      {
        id: "q1",
        text: "How would most people you trust describe the situation if they saw it?",
        answers: [
          {
            text: "They'd probably agree it was a real issue",
            value: 0,
            traitWeights: { selfAwareness: 3 },
          },
          {
            text: "They'd probably see both sides",
            value: 2,
            traitWeights: { selfAwareness: 2 },
          },
          {
            text: "They might say I'm reading too much into it",
            value: 4,
            traitWeights: { selfAwareness: -1, defensiveness: 2 },
          },
          {
            text: "Most would say I'm overreacting",
            value: 5,
            traitWeights: { selfAwareness: -2, defensiveness: 3 },
          },
        ],
      },
      {
        id: "q2",
        text: "Does this situation remind you of something that's hurt you before?",
        answers: [
          {
            text: "No — this feels pretty separate",
            value: 0,
            traitWeights: {},
          },
          {
            text: "A little — but I'm mostly responding to this specific thing",
            value: 1,
            traitWeights: { selfAwareness: 2 },
          },
          {
            text: "Yes — this hit a familiar nerve",
            value: 3,
            traitWeights: { selfAwareness: 3 },
          },
          {
            text: "Yes — this has a much older feeling attached to it",
            value: 5,
            traitWeights: { selfAwareness: 4, attachmentSecurity: -2 },
          },
        ],
      },
      {
        id: "q3",
        text: "Were you already stressed or on edge before this happened?",
        answers: [
          {
            text: "No — I was in a calm place",
            value: 0,
            traitWeights: {},
          },
          {
            text: "A little — normal level of stress",
            value: 1,
            traitWeights: {},
          },
          {
            text: "Yes — I was already overwhelmed",
            value: 4,
            traitWeights: { selfAwareness: 3, emotionalAvailability: -2 },
          },
          {
            text: "Very — I had almost no emotional bandwidth left",
            value: 5,
            traitWeights: { selfAwareness: 4, emotionalAvailability: -3 },
          },
        ],
      },
      {
        id: "q4",
        text: "Is your reaction staying the same, getting more intense, or calming down with time?",
        answers: [
          {
            text: "It's calming down — I feel better with distance",
            value: 0,
            traitWeights: { selfAwareness: 3, emotionalAvailability: 3 },
          },
          {
            text: "About the same — still processing",
            value: 2,
            traitWeights: {},
          },
          {
            text: "Getting more intense the more I think about it",
            value: 4,
            traitWeights: { defensiveness: 3 },
          },
          {
            text: "I feel like I'm spiraling",
            value: 5,
            traitWeights: { defensiveness: 4, attachmentSecurity: -2 },
          },
        ],
      },
      {
        id: "q5",
        text: "Do you feel hurt, angry, or both?",
        answers: [
          {
            text: "Hurt — but not in an extreme way",
            value: 0,
            traitWeights: {},
          },
          {
            text: "A mix of both",
            value: 2,
            traitWeights: {},
          },
          {
            text: "Angry first, hurt underneath",
            value: 3,
            traitWeights: { defensiveness: 2 },
          },
          {
            text: "Extremely intense — it's hard to think clearly",
            value: 5,
            traitWeights: { defensiveness: 3, emotionalAvailability: -2 },
          },
        ],
      },
    ],
  },
  {
    slug: "should-i-confront-them",
    title: "Should I Confront Them?",
    titleSelf: "Should I Confront Them?",
    titleObserver: "Should I Confront Them?",
    description:
      "Reflect on whether a confrontation is the right move, the right time, and whether you're ready for it.",
    category: "Conflict & Communication",
    categorySlug: "conflict",
    emoji: "💬",
    hasObserverMode: false,
    traits: [
      "conflictAvoidance",
      "communicationDirectness",
      "boundaryStrength",
    ],
    results: [
      {
        level: 1,
        label: "Yes — This Is Worth Addressing",
        description:
          "Your answers suggest you're ready, the issue is real, and addressing it is the right call.",
        details:
          "You seem clear on what you want to say, your reasons are solid, and the relationship can handle the conversation. Go ahead.",
        color: "green",
      },
      {
        level: 2,
        label: "Probably — With Some Preparation",
        description:
          "The conversation seems worth having — you may want to think through your approach first.",
        details:
          "You're mostly ready, but a couple of things suggest you might benefit from being clearer on what you want to say and what you want to come out of it.",
        color: "lime",
      },
      {
        level: 3,
        label: "It Depends — More Clarity Needed",
        description:
          "The issue may be real, but your readiness and the timing are less clear.",
        details:
          "There's something real here, but your answers suggest you may not be fully ready or sure of what you want from the conversation. Getting clearer on that first will help.",
        color: "yellow",
      },
      {
        level: 4,
        label: "Wait — Not Quite Ready",
        description:
          "You may want to confront, but your answers suggest you're not in the best place to do it effectively right now.",
        details:
          "Confronting someone while you're too activated often makes things worse. Some processing or cooling off first might lead to a better outcome.",
        color: "orange",
      },
      {
        level: 5,
        label: "Not Yet — Address Your Own Clarity First",
        description:
          "Your answers suggest several things are unclear, including what you want and whether this is the right moment.",
        details:
          "This doesn't mean the issue isn't real. It means the conditions for a productive conversation aren't quite there yet. Working on your own clarity first will make the eventual conversation more effective.",
        color: "red",
      },
    ],
    questionsSelf: [
      {
        id: "q1",
        text: "How clear are you on exactly what you want to say?",
        answers: [
          {
            text: "Very clear — I know what I need to address",
            value: 0,
            traitWeights: { communicationDirectness: 4 },
          },
          {
            text: "Mostly clear — a few things to sort out",
            value: 1,
            traitWeights: { communicationDirectness: 2 },
          },
          {
            text: "Not very clear — I'd probably ramble",
            value: 3,
            traitWeights: { communicationDirectness: -2 },
          },
          {
            text: "Not clear at all — I just know I'm upset",
            value: 5,
            traitWeights: {
              communicationDirectness: -4,
              conflictAvoidance: 2,
            },
          },
        ],
      },
      {
        id: "q2",
        text: "What is your main goal in having this conversation?",
        answers: [
          {
            text: "To address the issue and find a path forward",
            value: 0,
            traitWeights: { communicationDirectness: 4 },
          },
          {
            text: "To express how I feel and be heard",
            value: 1,
            traitWeights: { communicationDirectness: 3 },
          },
          {
            text: "To prove I was right",
            value: 4,
            traitWeights: { defensiveness: 4, communicationDirectness: -1 },
          },
          {
            text: "To release tension — I just need to let it out",
            value: 3,
            traitWeights: { communicationDirectness: 1 },
          },
        ],
      },
      {
        id: "q3",
        text: "How calm are you right now?",
        answers: [
          {
            text: "Calm — I can have this conversation without losing control",
            value: 0,
            traitWeights: {
              communicationDirectness: 3,
              emotionalAvailability: 3,
            },
          },
          {
            text: "A little emotional but manageable",
            value: 1,
            traitWeights: {},
          },
          {
            text: "Pretty activated — I might say things I don't mean",
            value: 3,
            traitWeights: {
              defensiveness: 3,
              emotionalAvailability: -2,
            },
          },
          {
            text: "Not calm at all — I'd definitely escalate it",
            value: 5,
            traitWeights: {
              defensiveness: 4,
              emotionalAvailability: -3,
            },
          },
        ],
      },
      {
        id: "q4",
        text: "Does addressing this matter for the relationship, or would you be fine just walking away from it?",
        answers: [
          {
            text: "It matters — I want to preserve or improve the relationship",
            value: 0,
            traitWeights: { boundaryStrength: 3 },
          },
          {
            text: "It matters, but I'd be okay either way",
            value: 1,
            traitWeights: {},
          },
          {
            text: "I mostly want to be heard — the relationship matters less now",
            value: 2,
            traitWeights: {},
          },
          {
            text: "I've mostly checked out — I just want to say my piece",
            value: 3,
            traitWeights: { boundaryStrength: 1 },
          },
        ],
      },
      {
        id: "q5",
        text: "Are you prepared for the possibility that the conversation doesn't go well?",
        answers: [
          {
            text: "Yes — I've thought about that",
            value: 0,
            traitWeights: { selfAwareness: 4, boundaryStrength: 4 },
          },
          {
            text: "Mostly — I'm hoping for the best",
            value: 1,
            traitWeights: { selfAwareness: 2 },
          },
          {
            text: "Not really — I'm expecting them to respond well",
            value: 3,
            traitWeights: { selfAwareness: -1, conflictAvoidance: 2 },
          },
          {
            text: "No — I'll be devastated if it doesn't go right",
            value: 5,
            traitWeights: {
              conflictAvoidance: 3,
              attachmentSecurity: -2,
            },
          },
        ],
      },
    ],
  },
  {
    slug: "is-this-friendship-one-sided",
    title: "Is This Friendship One-Sided?",
    titleSelf: "Is This Friendship One-Sided?",
    titleObserver: "Is This Friendship One-Sided?",
    description:
      "Reflect on whether you're giving significantly more to a friendship than you're getting back.",
    category: "Friendship",
    categorySlug: "friendship",
    emoji: "⚖️",
    hasObserverMode: false,
    traits: [
      "boundaryStrength",
      "pleasingTendency",
      "socialPerception",
      "attachmentSecurity",
    ],
    results: [
      {
        level: 1,
        label: "Looks Fairly Balanced",
        description:
          "Your answers don't suggest a significant imbalance in this friendship.",
        details:
          "Both people seem to contribute and invest. If something still feels off, it may be worth having a direct conversation.",
        color: "green",
      },
      {
        level: 2,
        label: "Slight Imbalance",
        description: "A small gap, but nothing alarming.",
        details:
          "You give a little more, but the friendship still functions. This may just be a season, or it may be worth noting over time.",
        color: "lime",
      },
      {
        level: 3,
        label: "Noticeable Imbalance",
        description: "There's a pattern here worth paying attention to.",
        details:
          "You consistently give more in at least a few key areas. Whether that's okay with you depends on what you need from this friendship.",
        color: "yellow",
      },
      {
        level: 4,
        label: "Significantly One-Sided",
        description:
          "Your answers suggest you give much more than you receive in this friendship.",
        details:
          "This kind of imbalance is emotionally expensive over time. It's worth deciding whether to address it directly or adjust your expectations.",
        color: "orange",
      },
      {
        level: 5,
        label: "Strongly One-Sided",
        description:
          "The pattern in your answers suggests this friendship may cost more than it gives you.",
        details:
          "This doesn't mean the other person is a bad friend or a bad person. But the dynamic as it exists may not be sustainable for you.",
        color: "red",
      },
    ],
    questionsSelf: [
      {
        id: "q1",
        text: "Who reaches out first most of the time?",
        answers: [
          {
            text: "Usually them or both of us",
            value: 0,
            traitWeights: { attachmentSecurity: 3 },
          },
          {
            text: "I do a little more, but they respond well",
            value: 1,
            traitWeights: {},
          },
          {
            text: "Almost always me",
            value: 4,
            traitWeights: { pleasingTendency: 3, attachmentSecurity: -2 },
          },
          {
            text: "Always me — and if I stop, we don't talk",
            value: 5,
            traitWeights: {
              pleasingTendency: 4,
              boundaryStrength: -3,
              attachmentSecurity: -3,
            },
          },
        ],
      },
      {
        id: "q2",
        text: "Do they ask about your life with genuine interest?",
        answers: [
          {
            text: "Yes — they check in and follow up",
            value: 0,
            traitWeights: { socialPerception: 3 },
          },
          {
            text: "Sometimes — when I bring it up",
            value: 1,
            traitWeights: {},
          },
          {
            text: "Rarely — most conversation is about them",
            value: 4,
            traitWeights: { socialPerception: 3 },
          },
          {
            text: "No — I feel like a listener, not a friend",
            value: 5,
            traitWeights: { socialPerception: 4, pleasingTendency: 2 },
          },
        ],
      },
      {
        id: "q3",
        text: "When you're going through something, do they show up?",
        answers: [
          {
            text: "Yes — without me having to ask",
            value: 0,
            traitWeights: { socialPerception: 3 },
          },
          {
            text: "Usually — if I tell them what's happening",
            value: 1,
            traitWeights: {},
          },
          {
            text: "Rarely — I've stopped expecting it",
            value: 4,
            traitWeights: {
              boundaryStrength: -2,
              socialPerception: 3,
            },
          },
          {
            text: "Never — they disappear when it's about me",
            value: 5,
            traitWeights: {
              boundaryStrength: -3,
              socialPerception: 4,
            },
          },
        ],
      },
      {
        id: "q4",
        text: "Do they celebrate your wins and successes?",
        answers: [
          {
            text: "Yes — genuinely",
            value: 0,
            traitWeights: {},
          },
          {
            text: "Usually — sometimes makes it about themselves",
            value: 1,
            traitWeights: {},
          },
          {
            text: "Rarely — they seem indifferent",
            value: 3,
            traitWeights: { socialPerception: 3 },
          },
          {
            text: "They compete or dismiss my wins",
            value: 5,
            traitWeights: { socialPerception: 4 },
          },
        ],
      },
      {
        id: "q5",
        text: "If you pulled back and stopped initiating for a while, what would happen?",
        answers: [
          {
            text: "They'd reach out — they'd notice",
            value: 0,
            traitWeights: { attachmentSecurity: 4 },
          },
          {
            text: "They'd probably reach out eventually",
            value: 1,
            traitWeights: { attachmentSecurity: 2 },
          },
          {
            text: "The friendship would basically stop",
            value: 4,
            traitWeights: {
              boundaryStrength: -3,
              attachmentSecurity: -3,
            },
          },
          {
            text: "Nothing — I'm not sure they'd even notice",
            value: 5,
            traitWeights: {
              boundaryStrength: -4,
              attachmentSecurity: -4,
            },
          },
        ],
      },
      {
        id: "q6",
        text: "Have you ever felt resentful about how much you give to this friendship?",
        answers: [
          {
            text: "No — it feels worth it",
            value: 0,
            traitWeights: {},
          },
          {
            text: "Occasionally — I've noticed but moved past it",
            value: 2,
            traitWeights: { selfAwareness: 2 },
          },
          {
            text: "Yes — more than once",
            value: 4,
            traitWeights: {
              selfAwareness: 3,
              boundaryStrength: -2,
              pleasingTendency: 3,
            },
          },
          {
            text: "Yes — and I've said nothing about it",
            value: 5,
            traitWeights: {
              selfAwareness: 4,
              boundaryStrength: -4,
              pleasingTendency: 4,
            },
          },
        ],
      },
    ],
  },
];

export const quizzesBySlug = Object.fromEntries(
  quizzes.map((q) => [q.slug, q])
);

export const quizzesByCategory = quizzes.reduce(
  (acc, quiz) => {
    if (!acc[quiz.categorySlug]) {
      acc[quiz.categorySlug] = {
        label: quiz.category,
        slug: quiz.categorySlug,
        quizzes: [],
      };
    }
    acc[quiz.categorySlug].quizzes.push(quiz);
    return acc;
  },
  {} as Record<string, { label: string; slug: string; quizzes: Quiz[] }>
);
