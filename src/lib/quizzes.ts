import { Quiz } from "@/types";

export const QUIZZES: Quiz[] = [
  // 1. Am I the Problem?
  {
    slug: "am-i-the-problem",
    title: "Am I the Problem?",
    observerTitle: "Are They the Problem?",
    category: "conflict",
    description:
      "Reflect on a recent conflict or tension. This quiz helps you identify whether your behavior may be contributing to the issue — or whether the situation is more complicated than it seems.",
    observerDescription:
      "Reflect on someone else's behavior in a recent conflict. This quiz helps you identify patterns in how they handle tension and disagreement.",
    hasObserverMode: true,
    isIdentityQuiz: false,
    estimatedMinutes: 5,
    tags: ["conflict", "self-awareness", "accountability"],
    startPageTraits: ["Accountability", "Defensiveness", "Communication", "Empathy", "Self-awareness"],
    traitWeights: {
      selfAwareness: 3,
      accountability: 3,
      defensiveness: 2,
      conflictAvoidance: 2,
    },
    questions: [
      {
        id: "aip-1",
        selfText:
          "When someone tells you that you hurt them, what do you usually do first?",
        observerText:
          "When someone tells them that they were hurt, what do they usually do first?",
        options: [
          {
            id: "a",
            text: "Listen and ask what I did",
            score: 0,
            traitDeltas: { accountability: 2, defensiveness: -1, empathy: 2 },
          },
          {
            id: "b",
            text: "Explain what I meant",
            score: 1,
            traitDeltas: { accountability: 0, defensiveness: 1 },
          },
          {
            id: "c",
            text: "Feel attacked and shut down",
            score: 3,
            traitDeltas: { defensiveness: 3, emotionalAvailability: -2 },
          },
          {
            id: "d",
            text: "Apologize even if I don't fully understand",
            score: 1,
            traitDeltas: { pleasingTendency: 2, accountability: 1 },
          },
          {
            id: "e",
            text: "Get defensive, but think about it later",
            score: 2,
            traitDeltas: { defensiveness: 2, selfAwareness: 1 },
          },
        ],
      },
      {
        id: "aip-2",
        selfText:
          "When a conflict happens, how often do you think about your own role in it?",
        observerText:
          "When a conflict happens, how often do they seem to reflect on their own role?",
        options: [
          {
            id: "a",
            text: "Almost always — I replay my actions carefully",
            score: 0,
            traitDeltas: { selfAwareness: 3, accountability: 2 },
          },
          {
            id: "b",
            text: "Sometimes, but I focus more on what the other person did",
            score: 2,
            traitDeltas: { selfAwareness: 1, accountability: -1 },
          },
          {
            id: "c",
            text: "Rarely — I usually assume I'm right",
            score: 4,
            traitDeltas: { selfAwareness: -2, defensiveness: 2 },
          },
          {
            id: "d",
            text: "Only after some time passes",
            score: 1,
            traitDeltas: { selfAwareness: 1 },
          },
        ],
      },
      {
        id: "aip-3",
        selfText:
          "Has more than one person told you the same thing is a problem with you?",
        observerText:
          "Have multiple people brought up the same concern about this person?",
        options: [
          {
            id: "a",
            text: "Yes, multiple people have said the same thing",
            score: 4,
            traitDeltas: { selfAwareness: -1, accountability: -1 },
          },
          {
            id: "b",
            text: "Yes, but they're probably all wrong",
            score: 4,
            traitDeltas: { defensiveness: 3, selfAwareness: -2 },
          },
          {
            id: "c",
            text: "One person has, but not more",
            score: 2,
            traitDeltas: { selfAwareness: 0 },
          },
          {
            id: "d",
            text: "No, this seems like a one-time thing",
            score: 0,
            traitDeltas: { selfAwareness: 1 },
          },
        ],
      },
      {
        id: "aip-4",
        selfText: "When you're in a conflict, do you tend to escalate or calm?",
        observerText:
          "When they're in a conflict, do they tend to escalate or calm things down?",
        options: [
          {
            id: "a",
            text: "I try to de-escalate, even when I'm upset",
            score: 0,
            traitDeltas: { communicationDirectness: 2, conflictAvoidance: -1 },
          },
          {
            id: "b",
            text: "I stay calm until I hit a limit, then I escalate",
            score: 2,
            traitDeltas: { emotionalAvailability: -1, defensiveness: 1 },
          },
          {
            id: "c",
            text: "I tend to raise my voice or say hurtful things",
            score: 4,
            traitDeltas: { defensiveness: 3, accountability: -2 },
          },
          {
            id: "d",
            text: "I shut down and stop talking",
            score: 2,
            traitDeltas: { conflictAvoidance: 3, emotionalAvailability: -1 },
          },
        ],
      },
      {
        id: "aip-5",
        selfText:
          "After a conflict, do you usually check in with the other person?",
        observerText:
          "After a conflict, do they usually check in with the other person?",
        options: [
          {
            id: "a",
            text: "Yes, I reach out once I've calmed down",
            score: 0,
            traitDeltas: { accountability: 2, empathy: 2 },
          },
          {
            id: "b",
            text: "Only if they reach out first",
            score: 2,
            traitDeltas: { conflictAvoidance: 1, pleasingTendency: -1 },
          },
          {
            id: "c",
            text: "No — I feel like they should come to me",
            score: 3,
            traitDeltas: { defensiveness: 2, accountability: -1 },
          },
          {
            id: "d",
            text: "I try to act like nothing happened",
            score: 3,
            traitDeltas: { conflictAvoidance: 3, accountability: -2 },
          },
        ],
      },
      {
        id: "aip-6",
        selfText: "Do you find it easy to apologize when you've done something wrong?",
        observerText: "Do they find it easy to apologize when they've done something wrong?",
        options: [
          {
            id: "a",
            text: "Yes — I apologize as soon as I realize the impact",
            score: 0,
            traitDeltas: { accountability: 3, empathy: 2 },
          },
          {
            id: "b",
            text: "Sometimes, but I need time to process first",
            score: 1,
            traitDeltas: { accountability: 1, selfAwareness: 1 },
          },
          {
            id: "c",
            text: "I apologize, but I tend to justify myself at the same time",
            score: 2,
            traitDeltas: { defensiveness: 2, accountability: -1 },
          },
          {
            id: "d",
            text: "I rarely apologize because I rarely feel I'm wrong",
            score: 4,
            traitDeltas: { defensiveness: 3, accountability: -3, selfAwareness: -2 },
          },
        ],
      },
    ],
    results: [
      {
        level: 1,
        label: "Low Concern",
        description:
          "Based on your answers, you seem self-aware and accountable in conflict. You're probably not the main source of the tension here. That said, no one is perfect — keep checking in with yourself.",
        nextSteps: [
          "Ask someone you trust for honest feedback on how you handle conflict",
          "Notice if any specific situations bring out your worst reactions",
        ],
      },
      {
        level: 2,
        label: "Mild Pattern",
        description:
          "There are a few patterns worth paying attention to. You may have some blind spots around how you come across during conflict — not necessarily a big problem, but worth reflecting on.",
        nextSteps: [
          "Try pausing for 24 hours before responding in a heated situation",
          "Ask the other person what they specifically need from you",
        ],
      },
      {
        level: 3,
        label: "Mixed / Unclear",
        description:
          "Your answers suggest a mixed picture. In some ways you handle conflict well, in others you may be contributing to the tension without fully realizing it. More reflection may help clarify what's happening.",
        nextSteps: [
          "Revisit the conflict from the other person's perspective specifically",
          "Consider whether this is a recurring pattern or a unique situation",
        ],
      },
      {
        level: 4,
        label: "Strong Pattern",
        description:
          "Your answers suggest you may be contributing significantly to the conflict. This doesn't mean you're entirely at fault, but there are real patterns here worth addressing — especially around defensiveness and accountability.",
        nextSteps: [
          "Try to have a calm, honest conversation with the other person",
          "Consider speaking with a therapist or trusted mentor about your conflict patterns",
        ],
      },
      {
        level: 5,
        label: "High Concern",
        description:
          "Based on these answers, there's a strong pattern of behavior that may be causing serious harm in your relationships. This isn't about blame — it's about recognizing what needs to change.",
        nextSteps: [
          "Reach out to the person you've hurt and take genuine accountability",
          "Consider professional support to work through these patterns",
        ],
      },
    ],
    disclaimer:
      "This quiz is for reflection and pattern recognition, not diagnosis or proof of fault.",
  },

  // 2. Is My Friend Toxic?
  {
    slug: "is-my-friend-toxic",
    title: "Is My Friend Toxic?",
    observerTitle: "Is This Friend Toxic?",
    category: "friendship",
    description:
      "Wondering if a friendship is draining you more than it should? This quiz helps you identify toxic patterns — not to label your friend, but to help you reflect on whether the dynamic is healthy.",
    hasObserverMode: false,
    isIdentityQuiz: false,
    estimatedMinutes: 5,
    tags: ["friendship", "toxic", "boundaries", "red-flags"],
    startPageTraits: ["Boundaries", "Social perception", "Emotional availability", "Reciprocity", "Trust"],
    traitWeights: {
      boundaryStrength: 3,
      socialPerception: 2,
      pleasingTendency: 2,
      empathy: 1,
    },
    questions: [
      {
        id: "imft-1",
        selfText:
          "After spending time with this friend, how do you usually feel?",
        observerText:
          "After spending time with this friend, how do you usually feel?",
        options: [
          {
            id: "a",
            text: "Good — energized, supported, or happy",
            score: 0,
            traitDeltas: { socialPerception: 1 },
          },
          {
            id: "b",
            text: "Neutral — sometimes fine, sometimes off",
            score: 1,
            traitDeltas: { socialPerception: 0 },
          },
          {
            id: "c",
            text: "Tired or a little drained",
            score: 2,
            traitDeltas: { boundaryStrength: -1 },
          },
          {
            id: "d",
            text: "Worse — anxious, small, or used",
            score: 4,
            traitDeltas: { boundaryStrength: -2, socialPerception: -1 },
          },
        ],
      },
      {
        id: "imft-2",
        selfText:
          "Does this friend support you the way you support them?",
        observerText:
          "Does this friend support you the way you support them?",
        options: [
          {
            id: "a",
            text: "Yes — it feels mutual and balanced",
            score: 0,
            traitDeltas: { socialPerception: 1 },
          },
          {
            id: "b",
            text: "Mostly, but they could do more",
            score: 1,
            traitDeltas: { pleasingTendency: 1 },
          },
          {
            id: "c",
            text: "Not really — I do most of the emotional labor",
            score: 3,
            traitDeltas: { pleasingTendency: 2, boundaryStrength: -1 },
          },
          {
            id: "d",
            text: "No — they disappear when I need them",
            score: 4,
            traitDeltas: { boundaryStrength: -2, socialPerception: -1 },
          },
        ],
      },
      {
        id: "imft-3",
        selfText:
          "Does this friend celebrate your wins, or do they minimize or ignore them?",
        observerText:
          "Does this friend celebrate your wins, or do they minimize or ignore them?",
        options: [
          {
            id: "a",
            text: "They genuinely celebrate with me",
            score: 0,
            traitDeltas: { socialPerception: 1 },
          },
          {
            id: "b",
            text: "Sometimes, but they can be inconsistent",
            score: 1,
            traitDeltas: {},
          },
          {
            id: "c",
            text: "They tend to minimize or make it about themselves",
            score: 3,
            traitDeltas: { socialPerception: -1 },
          },
          {
            id: "d",
            text: "They almost always ignore or dismiss my wins",
            score: 4,
            traitDeltas: { boundaryStrength: -1, socialPerception: -2 },
          },
        ],
      },
      {
        id: "imft-4",
        selfText:
          "Has this friend said things that made you feel bad about yourself — and then acted like it was a joke?",
        observerText:
          "Has this friend said things that made you feel bad about yourself — and then acted like it was a joke?",
        options: [
          {
            id: "a",
            text: "No, they're generally respectful",
            score: 0,
            traitDeltas: { socialPerception: 1 },
          },
          {
            id: "b",
            text: "Rarely, and they usually apologize",
            score: 1,
            traitDeltas: {},
          },
          {
            id: "c",
            text: "Sometimes — and they brush it off when I bring it up",
            score: 3,
            traitDeltas: { boundaryStrength: -1, socialPerception: -1 },
          },
          {
            id: "d",
            text: "Yes, frequently — and I feel bad for bringing it up",
            score: 4,
            traitDeltas: { boundaryStrength: -3, pleasingTendency: 2 },
          },
        ],
      },
      {
        id: "imft-5",
        selfText:
          "Do you ever feel like you have to manage this friend's emotions or walk on eggshells?",
        observerText:
          "Do you ever feel like you have to manage this friend's emotions or walk on eggshells?",
        options: [
          {
            id: "a",
            text: "No — I feel comfortable being myself",
            score: 0,
            traitDeltas: { boundaryStrength: 1 },
          },
          {
            id: "b",
            text: "A little — I choose my words carefully sometimes",
            score: 2,
            traitDeltas: { pleasingTendency: 1 },
          },
          {
            id: "c",
            text: "Yes — I often feel like I have to manage their mood",
            score: 4,
            traitDeltas: { pleasingTendency: 3, boundaryStrength: -2 },
          },
        ],
      },
      {
        id: "imft-6",
        selfText: "Do they respect your boundaries when you set them?",
        observerText: "Do they respect your boundaries when you set them?",
        options: [
          {
            id: "a",
            text: "Yes, they respect what I ask for",
            score: 0,
            traitDeltas: { boundaryStrength: 1, socialPerception: 1 },
          },
          {
            id: "b",
            text: "Usually, but they push back sometimes",
            score: 1,
            traitDeltas: { boundaryStrength: 0 },
          },
          {
            id: "c",
            text: "Often not — they guilt me or keep pushing",
            score: 3,
            traitDeltas: { boundaryStrength: -2, pleasingTendency: 2 },
          },
          {
            id: "d",
            text: "No — they ignore my limits completely",
            score: 4,
            traitDeltas: { boundaryStrength: -3 },
          },
        ],
      },
    ],
    results: [
      {
        level: 1,
        label: "Low Concern",
        description:
          "This friendship seems fairly healthy based on your answers. There's no strong pattern of toxicity here. All relationships have rough patches — this doesn't look like a toxic pattern.",
        nextSteps: [
          "Keep communicating openly when things feel off",
          "Appreciate what's working well in this friendship",
        ],
      },
      {
        level: 2,
        label: "Mild Pattern",
        description:
          "A few things are worth noticing. This friendship may have some imbalanced or draining moments — not necessarily toxic, but it could benefit from a clearer conversation about your needs.",
        nextSteps: [
          "Name one specific thing that bothers you and bring it up directly",
          "Notice whether things improve after you address it",
        ],
      },
      {
        level: 3,
        label: "Mixed / Unclear",
        description:
          "The friendship has both supportive and concerning patterns. It's hard to call it simply toxic or healthy. Context matters — is this person going through something, or is this their consistent behavior?",
        nextSteps: [
          "Reflect on whether the concerning patterns are new or longstanding",
          "Have an honest conversation about how this dynamic has been feeling",
        ],
      },
      {
        level: 4,
        label: "Strong Pattern",
        description:
          "There are consistent patterns here that look like emotional toxicity — minimizing your feelings, ignoring your wins, or crossing boundaries repeatedly. This is worth taking seriously.",
        nextSteps: [
          "Consider setting clear limits on what you will and won't accept",
          "Think about whether this friendship still serves you",
        ],
      },
      {
        level: 5,
        label: "High Concern",
        description:
          "Based on your answers, this friendship may be significantly harming your wellbeing. A pattern of repeated disrespect, boundary violations, or emotional manipulation is serious.",
        nextSteps: [
          "Consider creating distance or ending the friendship",
          "Talk to someone you trust about what you're experiencing",
        ],
      },
    ],
    disclaimer:
      "This quiz reflects patterns in your experience, not a diagnosis of your friend's personality.",
  },

  // 3. Is This a Preference or Bias?
  {
    slug: "preference-or-bias",
    title: "Is This a Preference or Bias?",
    observerTitle: "Is Their Dating Preference Actually Bias?",
    category: "bias",
    description:
      "Explore whether your dating preferences reflect genuine attraction — or whether they may involve patterns of racial or cultural exclusion that are worth reflecting on.",
    observerDescription:
      "Explore whether someone else's dating preferences reflect genuine attraction — or whether they may involve patterns of racial exclusion worth noticing.",
    hasObserverMode: true,
    isIdentityQuiz: false,
    estimatedMinutes: 6,
    tags: ["bias", "dating", "race", "attraction", "preferences"],
    startPageTraits: ["Bias awareness", "Attraction patterns", "Defensiveness", "Consistency", "Social awareness"],
    traitWeights: {
      biasAwareness: 4,
      defensiveness: 2,
      socialPerception: 2,
      selfAwareness: 2,
    },
    questions: [
      {
        id: "pob-1",
        selfText:
          "Would you say your 'type' consistently excludes certain racial or ethnic groups?",
        observerText:
          "Would you say their 'type' consistently excludes certain racial or ethnic groups?",
        options: [
          {
            id: "a",
            text: "No — I'm genuinely open to different backgrounds",
            score: 0,
            traitDeltas: { biasAwareness: 1 },
          },
          {
            id: "b",
            text: "I do have preferences, but I've dated across different backgrounds",
            score: 1,
            traitDeltas: { biasAwareness: 0 },
          },
          {
            id: "c",
            text: "Yes — there are groups I never seem to date",
            score: 3,
            traitDeltas: { biasAwareness: -2, selfAwareness: -1 },
          },
          {
            id: "d",
            text: "Yes, but I think that's just my preference",
            score: 4,
            traitDeltas: { biasAwareness: -3, defensiveness: 2 },
          },
        ],
      },
      {
        id: "pob-2",
        selfText:
          "When you think about why you're not attracted to certain groups, what comes up?",
        observerText:
          "When they explain why they're not attracted to certain groups, what comes up?",
        options: [
          {
            id: "a",
            text: "Specific experiences or individual personalities — not group-wide",
            score: 0,
            traitDeltas: { biasAwareness: 1, socialPerception: 1 },
          },
          {
            id: "b",
            text: "Certain cultural values that don't match mine",
            score: 1,
            traitDeltas: { biasAwareness: 0 },
          },
          {
            id: "c",
            text: "Stereotypes about how they look or act",
            score: 3,
            traitDeltas: { biasAwareness: -2, socialPerception: -1 },
          },
          {
            id: "d",
            text: "I don't know — I just don't feel attracted to them",
            score: 2,
            traitDeltas: { biasAwareness: -1 },
          },
        ],
      },
      {
        id: "pob-3",
        selfText:
          "If someone pointed out that your preferences seem racially exclusive, how would you react?",
        observerText:
          "If someone pointed out that their preferences seem racially exclusive, how would they react?",
        options: [
          {
            id: "a",
            text: "I'd genuinely think about it",
            score: 0,
            traitDeltas: { biasAwareness: 2, defensiveness: -1, selfAwareness: 1 },
          },
          {
            id: "b",
            text: "I'd listen, but still defend my preferences",
            score: 2,
            traitDeltas: { defensiveness: 1, biasAwareness: -1 },
          },
          {
            id: "c",
            text: "I'd feel attacked — it's just a preference",
            score: 3,
            traitDeltas: { defensiveness: 3, biasAwareness: -2 },
          },
          {
            id: "d",
            text: "I'd dismiss it entirely — attraction can't be racist",
            score: 4,
            traitDeltas: { defensiveness: 4, biasAwareness: -4 },
          },
        ],
      },
      {
        id: "pob-4",
        selfText:
          "Do you engage with or appreciate content, culture, or friendships from racial groups you wouldn't date?",
        observerText:
          "Do they engage with or appreciate content, culture, or friendships from racial groups they wouldn't date?",
        options: [
          {
            id: "a",
            text: "Yes — I have genuine relationships across backgrounds",
            score: 0,
            traitDeltas: { biasAwareness: 1, socialPerception: 1 },
          },
          {
            id: "b",
            text: "I appreciate the culture but don't have close personal relationships",
            score: 2,
            traitDeltas: { biasAwareness: -1 },
          },
          {
            id: "c",
            text: "Not really — I keep mostly to my own background",
            score: 3,
            traitDeltas: { biasAwareness: -2, socialPerception: -1 },
          },
        ],
      },
      {
        id: "pob-5",
        selfText:
          "Has your type shifted based on who you've spent more time around?",
        observerText:
          "Has their type shifted based on who they've spent more time around?",
        options: [
          {
            id: "a",
            text: "Yes — who I'm attracted to has changed as I've met more people",
            score: 0,
            traitDeltas: { biasAwareness: 1, socialPerception: 1 },
          },
          {
            id: "b",
            text: "A little, but my core type has stayed similar",
            score: 1,
            traitDeltas: {},
          },
          {
            id: "c",
            text: "No — my type has always been the same racial background",
            score: 3,
            traitDeltas: { biasAwareness: -2 },
          },
        ],
      },
      {
        id: "pob-6",
        selfText:
          "Do you think about how people from excluded groups might feel about your stated preferences?",
        observerText:
          "Do they think about how people from excluded groups might feel about their stated preferences?",
        options: [
          {
            id: "a",
            text: "Yes — I think about the impact on others",
            score: 0,
            traitDeltas: { empathy: 2, biasAwareness: 2, socialPerception: 1 },
          },
          {
            id: "b",
            text: "Sometimes, but I still think preferences are personal",
            score: 2,
            traitDeltas: { empathy: 0, biasAwareness: 0 },
          },
          {
            id: "c",
            text: "No — it's not their business who I'm attracted to",
            score: 3,
            traitDeltas: { empathy: -1, biasAwareness: -2 },
          },
          {
            id: "d",
            text: "No — and I don't think I should have to",
            score: 4,
            traitDeltas: { empathy: -2, biasAwareness: -3, defensiveness: 2 },
          },
        ],
      },
    ],
    results: [
      {
        level: 1,
        label: "Low Concern",
        description:
          "Based on your answers, your dating preferences don't show strong signs of racial exclusion. Your openness and self-reflection suggest genuine attraction rather than avoidance-based bias.",
        nextSteps: [
          "Keep reflecting on whether your preferences change as you meet more people",
          "Stay open to examining assumptions if they come up",
        ],
      },
      {
        level: 2,
        label: "Some Patterns Worth Noticing",
        description:
          "There are a few patterns that are worth thinking about. Some of your preferences may involve general assumptions about racial groups rather than purely individual-based attraction.",
        nextSteps: [
          "Ask yourself where your 'type' came from and when it formed",
          "Notice whether your preferences are truly individual-based or category-based",
        ],
      },
      {
        level: 3,
        label: "Possible Bias or Avoidance",
        description:
          "Your answers suggest there may be patterns of racial exclusion that go beyond personal preference. This doesn't prove intent, but it may be worth examining more carefully.",
        nextSteps: [
          "Reflect on what messages you absorbed growing up about who is attractive",
          "Consider whether your 'type' was shaped by cultural bias rather than personal experience",
        ],
      },
      {
        level: 4,
        label: "Strong Pattern of Bias",
        description:
          "There's a consistent pattern here that looks more like racial exclusion than individual preference. The combination of wholesale exclusion and defensiveness when questioned is worth reflecting on seriously.",
        nextSteps: [
          "Ask yourself honestly: would you rule out an entire racial group if they were otherwise perfect for you?",
          "Consider what it would feel like to be on the receiving end of this preference",
        ],
      },
      {
        level: 5,
        label: "High Concern",
        description:
          "The patterns here strongly suggest racial bias rather than individual preference. This is not about judging who you date — it's about recognizing what may be shaping your choices and its impact on others.",
        nextSteps: [
          "Speak with someone you trust about where these patterns came from",
          "Read or listen to people from excluded groups on how racial preferences affect them",
        ],
      },
    ],
    disclaimer:
      "This quiz is for reflection, not proof of bias or intent. Attraction is complex and personal. This result is a pattern read based on your answers.",
  },

  // 4. Microaggression Checker
  {
    slug: "microaggression-checker",
    title: "Microaggression Checker",
    observerTitle: "Does My Friend Make Microaggressions?",
    category: "bias",
    description:
      "Microaggressions are subtle comments or behaviors that communicate bias — often unintentionally. This quiz helps you reflect on whether certain patterns in your behavior may be landing as microaggressions.",
    observerDescription:
      "Microaggressions are subtle comments or behaviors that communicate bias — often unintentionally. This quiz helps you reflect on whether patterns in someone else's behavior may be landing as microaggressions.",
    hasObserverMode: true,
    isIdentityQuiz: false,
    estimatedMinutes: 6,
    tags: ["bias", "microaggressions", "race", "social-awareness"],
    traitWeights: {
      biasAwareness: 4,
      empathy: 3,
      defensiveness: 2,
      accountability: 2,
    },
    questions: [
      {
        id: "mac-1",
        selfText:
          "Have you ever told someone they speak English really well after learning they're from another country?",
        observerText:
          "Have they ever told someone they speak English really well after learning they're from another country?",
        options: [
          {
            id: "a",
            text: "No",
            score: 0,
            traitDeltas: { biasAwareness: 1 },
          },
          {
            id: "b",
            text: "I may have said something like that as a compliment",
            score: 2,
            traitDeltas: { biasAwareness: -1, empathy: -1 },
          },
          {
            id: "c",
            text: "Yes — but it was genuinely meant as a compliment",
            score: 3,
            traitDeltas: { biasAwareness: -2, defensiveness: 1 },
          },
          {
            id: "d",
            text: "Yes, and I don't see the problem with it",
            score: 4,
            traitDeltas: { biasAwareness: -3, defensiveness: 2 },
          },
        ],
      },
      {
        id: "mac-2",
        selfText:
          "Have you ever asked someone where they're 'really from' after they answered with a U.S. city?",
        observerText:
          "Have they ever pushed someone on where they're 'really from' after being told a U.S. city?",
        options: [
          {
            id: "a",
            text: "No",
            score: 0,
            traitDeltas: { biasAwareness: 1 },
          },
          {
            id: "b",
            text: "Maybe — I was just curious about their background",
            score: 2,
            traitDeltas: { biasAwareness: -1 },
          },
          {
            id: "c",
            text: "Yes — but that's just small talk",
            score: 3,
            traitDeltas: { biasAwareness: -2, empathy: -1 },
          },
          {
            id: "d",
            text: "Yes, and I think it's perfectly fine to ask",
            score: 4,
            traitDeltas: { biasAwareness: -3 },
          },
        ],
      },
      {
        id: "mac-3",
        selfText:
          "Have you ever touched or commented on someone's hair without permission because it seemed 'interesting'?",
        observerText:
          "Have they ever touched or commented on someone's hair without permission because it seemed 'interesting'?",
        options: [
          {
            id: "a",
            text: "No",
            score: 0,
            traitDeltas: { biasAwareness: 1 },
          },
          {
            id: "b",
            text: "I've complimented it but not touched without permission",
            score: 1,
            traitDeltas: {},
          },
          {
            id: "c",
            text: "I've touched someone's hair — I thought they wouldn't mind",
            score: 3,
            traitDeltas: { biasAwareness: -2, empathy: -2 },
          },
          {
            id: "d",
            text: "Yes, and I think it's fine — I meant it kindly",
            score: 4,
            traitDeltas: { biasAwareness: -3, defensiveness: 2 },
          },
        ],
      },
      {
        id: "mac-4",
        selfText:
          "Have you ever told someone they're 'so articulate' in a way that implied you didn't expect it from them?",
        observerText:
          "Have they ever told someone they're 'so articulate' in a way that implied surprise?",
        options: [
          {
            id: "a",
            text: "No",
            score: 0,
            traitDeltas: { biasAwareness: 1 },
          },
          {
            id: "b",
            text: "Possibly — but I really did mean it as a compliment",
            score: 2,
            traitDeltas: { biasAwareness: -1 },
          },
          {
            id: "c",
            text: "Maybe — I hadn't thought about the implication",
            score: 2,
            traitDeltas: { biasAwareness: -1, selfAwareness: 1 },
          },
          {
            id: "d",
            text: "Yes — and I still think it's a compliment",
            score: 4,
            traitDeltas: { biasAwareness: -3, defensiveness: 2 },
          },
        ],
      },
      {
        id: "mac-5",
        selfText:
          "When someone tells you that something you said landed as offensive, how do you typically respond?",
        observerText:
          "When someone tells them that something they said was offensive, how do they typically respond?",
        options: [
          {
            id: "a",
            text: "I apologize and think about what I said",
            score: 0,
            traitDeltas: { accountability: 3, empathy: 2, biasAwareness: 1 },
          },
          {
            id: "b",
            text: "I apologize but also explain what I meant",
            score: 1,
            traitDeltas: { accountability: 1, defensiveness: 1 },
          },
          {
            id: "c",
            text: "I feel defensive and explain why it wasn't offensive",
            score: 3,
            traitDeltas: { defensiveness: 3, accountability: -2, biasAwareness: -1 },
          },
          {
            id: "d",
            text: "I think they're too sensitive",
            score: 4,
            traitDeltas: { defensiveness: 4, empathy: -3, biasAwareness: -2 },
          },
        ],
      },
      {
        id: "mac-6",
        selfText:
          "Do you ever say things like 'you're so different from other [group]' as a compliment?",
        observerText:
          "Do they ever say things like 'you're so different from other [group]' as a compliment?",
        options: [
          {
            id: "a",
            text: "No — I wouldn't phrase it that way",
            score: 0,
            traitDeltas: { biasAwareness: 1 },
          },
          {
            id: "b",
            text: "I've said something similar but didn't think about the implication",
            score: 2,
            traitDeltas: { biasAwareness: -1 },
          },
          {
            id: "c",
            text: "Yes — and I think it's a compliment",
            score: 4,
            traitDeltas: { biasAwareness: -3, defensiveness: 2, empathy: -1 },
          },
        ],
      },
    ],
    results: [
      {
        level: 1,
        label: "Low Concern",
        description:
          "Based on your answers, you seem thoughtful about how your words land on others. You show awareness of microaggressions and seem open to feedback.",
        nextSteps: [
          "Keep listening when people share how language affects them",
          "Stay curious about blind spots you haven't encountered yet",
        ],
      },
      {
        level: 2,
        label: "Some Patterns Worth Noticing",
        description:
          "A few patterns emerged that may be worth reflecting on. Some comments you may make — even when intended kindly — can land as microaggressions. This is common, and awareness is the first step.",
        nextSteps: [
          "Look up the phrase 'well-intentioned microaggressions' for more context",
          "Practice pausing before commenting on things that seem 'different' about someone",
        ],
      },
      {
        level: 3,
        label: "Possible Bias or Avoidance",
        description:
          "There are noticeable patterns here. Multiple types of microaggressions may be showing up in your interactions, and there may be some defensiveness when the impact is named.",
        nextSteps: [
          "Pay attention to when you feel defensive about feedback — that moment is worth exploring",
          "Ask someone you trust whether they've ever experienced this from you",
        ],
      },
      {
        level: 4,
        label: "Strong Pattern",
        description:
          "Your answers suggest a consistent pattern of microaggressions, combined with resistance to feedback about them. This is worth taking seriously — especially because impact matters more than intent.",
        nextSteps: [
          "Separate 'I didn't mean it badly' from 'it didn't have a bad impact'",
          "Read or listen to people who have experienced microaggressions regularly",
        ],
      },
      {
        level: 5,
        label: "High Concern",
        description:
          "Based on your answers, there are strong recurring patterns of microaggressive behavior combined with dismissiveness of impact. Microaggressions accumulate — even if each one seems small individually.",
        nextSteps: [
          "Commit to listening without defending when someone names your impact",
          "Consider a workshop, book, or professional conversation on bias and microaggressions",
        ],
      },
    ],
    disclaimer:
      "This quiz is for reflection, not proof of bias or intent. It cannot determine what someone believes. It can help identify patterns worth examining.",
  },

  // 5. Does My Friend Have Racial Blind Spots?
  {
    slug: "racial-blind-spots",
    title: "Do I Have Racial Blind Spots?",
    observerTitle: "Does My Friend Have Racial Blind Spots?",
    category: "bias",
    description:
      "Racial blind spots are areas where someone holds unexamined assumptions about race without realizing it. This quiz helps you identify potential patterns.",
    observerDescription:
      "Racial blind spots are areas where someone holds unexamined assumptions about race without realizing it. This quiz helps you identify potential patterns in someone else.",
    hasObserverMode: true,
    isIdentityQuiz: false,
    estimatedMinutes: 5,
    tags: ["bias", "race", "blind-spots", "social-awareness"],
    traitWeights: {
      biasAwareness: 4,
      empathy: 2,
      socialPerception: 2,
      defensiveness: 2,
    },
    questions: [
      {
        id: "rbs-1",
        selfText:
          "When a racial issue comes up in a group conversation, what do you usually do?",
        observerText:
          "When a racial issue comes up in a group conversation, what do they usually do?",
        options: [
          {
            id: "a",
            text: "Engage thoughtfully — I think it's important to discuss",
            score: 0,
            traitDeltas: { biasAwareness: 2, socialPerception: 1 },
          },
          {
            id: "b",
            text: "Listen but stay quiet",
            score: 1,
            traitDeltas: { biasAwareness: 0, conflictAvoidance: 1 },
          },
          {
            id: "c",
            text: "Try to redirect — I find race talk uncomfortable or unnecessary",
            score: 3,
            traitDeltas: { biasAwareness: -2, conflictAvoidance: 2 },
          },
          {
            id: "d",
            text: "Say 'I don't see race' or suggest people are overreacting",
            score: 4,
            traitDeltas: { biasAwareness: -3, empathy: -2 },
          },
        ],
      },
      {
        id: "rbs-2",
        selfText:
          "If a Black friend told you they experienced something racist, what's your first instinct?",
        observerText:
          "If a Black person told them they experienced something racist, what's their first instinct?",
        options: [
          {
            id: "a",
            text: "Believe them and ask how they're doing",
            score: 0,
            traitDeltas: { empathy: 3, biasAwareness: 2 },
          },
          {
            id: "b",
            text: "Feel bad but want to hear both sides",
            score: 2,
            traitDeltas: { biasAwareness: -1 },
          },
          {
            id: "c",
            text: "Wonder if they're being too sensitive",
            score: 3,
            traitDeltas: { biasAwareness: -2, empathy: -2 },
          },
          {
            id: "d",
            text: "Try to explain why it probably wasn't intentional",
            score: 4,
            traitDeltas: { biasAwareness: -3, empathy: -2, defensiveness: 1 },
          },
        ],
      },
      {
        id: "rbs-3",
        selfText:
          "Do you engage with media, creators, or content mostly from one racial background?",
        observerText:
          "Do they engage with media, creators, or content mostly from one racial background?",
        options: [
          {
            id: "a",
            text: "No — my media consumption is pretty diverse",
            score: 0,
            traitDeltas: { biasAwareness: 1, socialPerception: 1 },
          },
          {
            id: "b",
            text: "Mostly — but I'm open to branching out",
            score: 1,
            traitDeltas: {},
          },
          {
            id: "c",
            text: "Yes, mostly my own background — but I don't think that matters",
            score: 3,
            traitDeltas: { biasAwareness: -2 },
          },
        ],
      },
      {
        id: "rbs-4",
        selfText:
          "Do you ever say things like 'I don't see color' or 'race doesn't matter to me'?",
        observerText:
          "Do they ever say things like 'I don't see color' or 'race doesn't matter'?",
        options: [
          {
            id: "a",
            text: "No — I understand that erasing race isn't the same as racial equality",
            score: 0,
            traitDeltas: { biasAwareness: 2, socialPerception: 1 },
          },
          {
            id: "b",
            text: "I've said it before but I understand now why it's problematic",
            score: 1,
            traitDeltas: { biasAwareness: 1 },
          },
          {
            id: "c",
            text: "Sometimes — I genuinely mean it as a good thing",
            score: 3,
            traitDeltas: { biasAwareness: -2, empathy: -1 },
          },
          {
            id: "d",
            text: "Yes, all the time — I think it's the right attitude",
            score: 4,
            traitDeltas: { biasAwareness: -3, empathy: -2 },
          },
        ],
      },
      {
        id: "rbs-5",
        selfText:
          "If someone told you that you said something racist, what would you feel first?",
        observerText:
          "If someone told them they said something racist, what would they likely feel first?",
        options: [
          {
            id: "a",
            text: "Concern — I'd want to understand what I said",
            score: 0,
            traitDeltas: { accountability: 2, biasAwareness: 2 },
          },
          {
            id: "b",
            text: "Embarrassed — I'd want to apologize quickly",
            score: 0,
            traitDeltas: { accountability: 1, empathy: 1 },
          },
          {
            id: "c",
            text: "Defensive — I'm not a racist person",
            score: 3,
            traitDeltas: { defensiveness: 3, biasAwareness: -2 },
          },
          {
            id: "d",
            text: "Dismissive — they're probably overreacting",
            score: 4,
            traitDeltas: { defensiveness: 4, biasAwareness: -3, empathy: -2 },
          },
        ],
      },
    ],
    results: [
      {
        level: 1,
        label: "Low Concern",
        description:
          "Your answers suggest a solid level of racial awareness. You seem to engage thoughtfully with racial topics and show empathy when others share their experiences.",
        nextSteps: [
          "Continue educating yourself — racial awareness is an ongoing practice",
          "Stay open to feedback, even when it feels uncomfortable",
        ],
      },
      {
        level: 2,
        label: "Some Patterns Worth Noticing",
        description:
          "There are some areas that may be worth examining. A few responses suggest some blind spots — not intentional harm, but gaps in awareness that are worth filling.",
        nextSteps: [
          "Read or listen to perspectives from people with different racial experiences than yours",
          "Notice moments where you feel resistant to racial conversations",
        ],
      },
      {
        level: 3,
        label: "Possible Blind Spots",
        description:
          "Several patterns suggest possible racial blind spots — especially around dismissing or minimizing others' experiences. This is common, but it can have a real impact.",
        nextSteps: [
          "Ask yourself: when someone shares a racial experience, do you lead with skepticism or empathy?",
          "Notice what happens when race comes up — do you redirect or engage?",
        ],
      },
      {
        level: 4,
        label: "Strong Pattern",
        description:
          "Your answers suggest significant racial blind spots combined with resistance to examining them. This combination can cause harm, even without any intention to do so.",
        nextSteps: [
          "Start with listening instead of responding when race comes up",
          "Challenge your first instinct to explain or defend when someone names racism",
        ],
      },
      {
        level: 5,
        label: "High Concern",
        description:
          "Based on your answers, there appears to be a strong pattern of racial dismissiveness and resistance to feedback. This can cause real harm in your relationships, even unintentionally.",
        nextSteps: [
          "Commit to listening first, without defending, when racial experiences are shared",
          "Consider seeking out anti-racism education resources",
        ],
      },
    ],
    disclaimer:
      "This quiz is for reflection. It cannot prove someone's beliefs or intent. It can help identify patterns worth examining.",
  },

  // 6. Am I Gay, Bi, or Just Curious?
  {
    slug: "am-i-gay-bi-curious",
    title: "Am I Gay, Bi, or Just Curious?",
    category: "identity",
    description:
      "Exploring your attraction patterns and what they might mean. This quiz won't define your identity — only you can do that. But it may help you reflect on your feelings more clearly.",
    hasObserverMode: false,
    isIdentityQuiz: true,
    estimatedMinutes: 5,
    tags: ["identity", "sexuality", "gay", "bisexual", "questioning"],
    traitWeights: {
      selfAwareness: 3,
      emotionalAvailability: 1,
    },
    questions: [
      {
        id: "agbc-1",
        selfText:
          "When you imagine a romantic or intimate situation, who are you typically with?",
        observerText:
          "When you imagine a romantic or intimate situation, who are you typically with?",
        options: [
          {
            id: "a",
            text: "Only someone of a different gender",
            score: 0,
            traitDeltas: { selfAwareness: 0 },
          },
          {
            id: "b",
            text: "Mostly someone of a different gender, but sometimes the same",
            score: 1,
            traitDeltas: { selfAwareness: 1 },
          },
          {
            id: "c",
            text: "Equally across different genders",
            score: 2,
            traitDeltas: { selfAwareness: 1 },
          },
          {
            id: "d",
            text: "Mostly someone of the same gender",
            score: 3,
            traitDeltas: { selfAwareness: 1 },
          },
          {
            id: "e",
            text: "Someone of the same gender",
            score: 4,
            traitDeltas: { selfAwareness: 1 },
          },
        ],
      },
      {
        id: "agbc-2",
        selfText:
          "Have you ever had feelings for someone of the same gender that felt like more than admiration?",
        observerText:
          "Have you ever had feelings for someone of the same gender that felt like more than admiration?",
        options: [
          {
            id: "a",
            text: "No — not that I can identify",
            score: 0,
            traitDeltas: { selfAwareness: 0 },
          },
          {
            id: "b",
            text: "Maybe once or twice — I wasn't sure what to make of it",
            score: 2,
            traitDeltas: { selfAwareness: 1 },
          },
          {
            id: "c",
            text: "Yes — more than once",
            score: 3,
            traitDeltas: { selfAwareness: 1 },
          },
          {
            id: "d",
            text: "Yes — frequently",
            score: 4,
            traitDeltas: { selfAwareness: 2 },
          },
        ],
      },
      {
        id: "agbc-3",
        selfText:
          "When you see an attractive person of the same gender, what usually happens?",
        observerText:
          "When you see an attractive person of the same gender, what usually happens?",
        options: [
          {
            id: "a",
            text: "I notice them but don't feel pulled in that way",
            score: 0,
            traitDeltas: {},
          },
          {
            id: "b",
            text: "I feel some curiosity or interest",
            score: 2,
            traitDeltas: { selfAwareness: 1 },
          },
          {
            id: "c",
            text: "I feel genuinely attracted to them",
            score: 3,
            traitDeltas: { selfAwareness: 1 },
          },
          {
            id: "d",
            text: "I feel very attracted — and sometimes wonder what that means",
            score: 4,
            traitDeltas: { selfAwareness: 2 },
          },
        ],
      },
      {
        id: "agbc-4",
        selfText:
          "Have you ever felt uncomfortable with how much you notice or think about people of the same gender?",
        observerText:
          "Have you ever felt uncomfortable with how much you notice or think about people of the same gender?",
        options: [
          {
            id: "a",
            text: "No — not really",
            score: 0,
            traitDeltas: {},
          },
          {
            id: "b",
            text: "A little — I've pushed the thought away before",
            score: 2,
            traitDeltas: { selfAwareness: 1 },
          },
          {
            id: "c",
            text: "Yes — I've actively tried not to think about it",
            score: 3,
            traitDeltas: { selfAwareness: 2, emotionalAvailability: -1 },
          },
        ],
      },
      {
        id: "agbc-5",
        selfText:
          "Has a label like 'bisexual,' 'gay,' or 'queer' ever felt like it might apply to you?",
        observerText:
          "Has a label like 'bisexual,' 'gay,' or 'queer' ever felt like it might apply to you?",
        options: [
          {
            id: "a",
            text: "No — I've never seriously considered it",
            score: 0,
            traitDeltas: {},
          },
          {
            id: "b",
            text: "It's crossed my mind but I wasn't sure",
            score: 2,
            traitDeltas: { selfAwareness: 1 },
          },
          {
            id: "c",
            text: "Yes — I've thought about it seriously",
            score: 3,
            traitDeltas: { selfAwareness: 2 },
          },
          {
            id: "d",
            text: "Yes — and it feels accurate, though I haven't said it out loud",
            score: 4,
            traitDeltas: { selfAwareness: 2, emotionalAvailability: 1 },
          },
        ],
      },
    ],
    results: [
      {
        level: "probably_not",
        label: "Probably Straight",
        description:
          "Based on your answers, your attractions seem to point mostly toward people of a different gender. This quiz can't confirm your identity — only you can. But nothing here suggests same-gender attraction as a significant pattern.",
        nextSteps: [
          "If you ever feel curious, it's okay to explore without it meaning anything definitive",
          "Your identity is yours to define on your own timeline",
        ],
      },
      {
        level: "maybe",
        label: "Maybe Worth Exploring",
        description:
          "There are small signs of same-gender attraction or curiosity in your answers, but nothing conclusive. Attraction is fluid for many people — this doesn't define your identity.",
        nextSteps: [
          "Give yourself permission to explore these feelings without pressure to label them",
          "Talking to someone you trust or a therapist can help you think through this",
        ],
      },
      {
        level: "worth_exploring",
        label: "Worth Exploring",
        description:
          "Your answers suggest some real patterns of same-gender attraction or curiosity. This doesn't mean you're definitely gay or bi — attraction is complex and only you can define what these feelings mean.",
        nextSteps: [
          "Journaling about these feelings without pressure to label them can be helpful",
          "Consider speaking with a queer-affirming therapist if you want more clarity",
        ],
      },
      {
        level: "strong_signs",
        label: "Strong Signs",
        description:
          "Your answers show consistent patterns of same-gender attraction. This strongly suggests there is something real worth acknowledging — though what label, if any, fits you is entirely your decision.",
        nextSteps: [
          "You don't have to decide anything right now — but you deserve space to explore this honestly",
          "Connecting with queer communities — even just online — can feel grounding",
        ],
      },
      {
        level: "only_you_can_define",
        label: "Only You Can Define This",
        description:
          "This quiz cannot define your identity. What it can say is that your answers suggest strong patterns of same-gender attraction. Only you can decide what that means and what label, if any, feels right.",
        nextSteps: [
          "Your identity doesn't need a label to be valid",
          "Reach out to LGBTQ+ resources or a supportive person if you want to talk this through",
        ],
      },
    ],
    disclaimer:
      "This test cannot define your identity. It can only help you reflect on patterns in attraction and curiosity. Only you can define who you are.",
  },

  // 7. Does My Friend Like Me?
  {
    slug: "does-my-friend-like-me",
    title: "Does My Friend Like Me?",
    category: "friendship",
    description:
      "Wondering if a friend actually values your friendship or just tolerates you? This quiz helps you read the signals more clearly.",
    hasObserverMode: false,
    isIdentityQuiz: false,
    estimatedMinutes: 5,
    tags: ["friendship", "social", "one-sided"],
    traitWeights: {
      socialPerception: 3,
      boundaryStrength: 2,
      pleasingTendency: 2,
    },
    questions: [
      {
        id: "dmfl-1",
        selfText: "Does this friend reach out to you first sometimes?",
        observerText: "Does this friend reach out to you first sometimes?",
        options: [
          {
            id: "a",
            text: "Yes — they initiate pretty often",
            score: 0,
            traitDeltas: { socialPerception: 2 },
          },
          {
            id: "b",
            text: "Sometimes — but I initiate more",
            score: 1,
            traitDeltas: { socialPerception: 0 },
          },
          {
            id: "c",
            text: "Rarely — I almost always reach out first",
            score: 3,
            traitDeltas: { socialPerception: -1, pleasingTendency: 1 },
          },
          {
            id: "d",
            text: "Never — they only respond when I reach out",
            score: 4,
            traitDeltas: { socialPerception: -2, pleasingTendency: 2 },
          },
        ],
      },
      {
        id: "dmfl-2",
        selfText: "When you need support, does this friend show up for you?",
        observerText: "When you need support, does this friend show up for you?",
        options: [
          {
            id: "a",
            text: "Yes — they check in and offer help",
            score: 0,
            traitDeltas: { socialPerception: 2 },
          },
          {
            id: "b",
            text: "Sometimes — depends on the situation",
            score: 1,
            traitDeltas: {},
          },
          {
            id: "c",
            text: "Rarely — they often seem unavailable",
            score: 3,
            traitDeltas: { socialPerception: -1 },
          },
          {
            id: "d",
            text: "No — they've been absent when I needed them most",
            score: 4,
            traitDeltas: { socialPerception: -2 },
          },
        ],
      },
      {
        id: "dmfl-3",
        selfText:
          "Does this friend remember things you've told them — like your stresses, goals, or updates?",
        observerText:
          "Does this friend remember things you've told them — like your stresses, goals, or updates?",
        options: [
          {
            id: "a",
            text: "Yes — they often follow up on things I've shared",
            score: 0,
            traitDeltas: { socialPerception: 2 },
          },
          {
            id: "b",
            text: "Sometimes — not always, but it happens",
            score: 1,
            traitDeltas: {},
          },
          {
            id: "c",
            text: "Rarely — they seem to forget quickly",
            score: 2,
            traitDeltas: { socialPerception: -1 },
          },
          {
            id: "d",
            text: "No — it feels like they don't really pay attention",
            score: 3,
            traitDeltas: { socialPerception: -2 },
          },
        ],
      },
      {
        id: "dmfl-4",
        selfText: "Does this friend ever make plans with you proactively?",
        observerText: "Does this friend ever make plans with you proactively?",
        options: [
          {
            id: "a",
            text: "Yes — they suggest things we should do together",
            score: 0,
            traitDeltas: { socialPerception: 2 },
          },
          {
            id: "b",
            text: "Occasionally — when I remind them",
            score: 1,
            traitDeltas: {},
          },
          {
            id: "c",
            text: "Rarely — I'm usually the one suggesting things",
            score: 3,
            traitDeltas: { socialPerception: -1, pleasingTendency: 1 },
          },
          {
            id: "d",
            text: "Never — I make all the plans",
            score: 4,
            traitDeltas: { socialPerception: -2, pleasingTendency: 2 },
          },
        ],
      },
      {
        id: "dmfl-5",
        selfText:
          "When you share something important or exciting, how does this friend react?",
        observerText:
          "When you share something important or exciting, how does this friend react?",
        options: [
          {
            id: "a",
            text: "They engage genuinely and seem happy for me",
            score: 0,
            traitDeltas: { socialPerception: 2 },
          },
          {
            id: "b",
            text: "They respond but don't seem very invested",
            score: 2,
            traitDeltas: { socialPerception: -1 },
          },
          {
            id: "c",
            text: "They often redirect back to themselves",
            score: 3,
            traitDeltas: { socialPerception: -1 },
          },
          {
            id: "d",
            text: "They barely acknowledge it",
            score: 4,
            traitDeltas: { socialPerception: -2 },
          },
        ],
      },
    ],
    results: [
      {
        level: 1,
        label: "Yes — They Genuinely Like You",
        description:
          "Based on your answers, this friend shows real investment in you and the friendship. The signs of mutual care and attention are there.",
        nextSteps: [
          "Let yourself trust this friendship and invest back",
          "If something still feels off, it may be worth a direct conversation",
        ],
      },
      {
        level: 2,
        label: "Probably, But It Could Be More Mutual",
        description:
          "Your friend probably likes you, but the friendship may be a little uneven. They may just not be the most expressive or initiating type — but it's worth noticing.",
        nextSteps: [
          "Notice whether they show up more in some ways than others",
          "Name what you need from the friendship and see how they respond",
        ],
      },
      {
        level: 3,
        label: "Mixed — Hard to Say",
        description:
          "There are some signs that this friend values you, but also some signals that suggest they may not be as invested as you are. It's unclear without more context.",
        nextSteps: [
          "Pay attention to patterns over time, not just individual moments",
          "Consider asking them directly how they're feeling about the friendship",
        ],
      },
      {
        level: 4,
        label: "Some Concern Here",
        description:
          "Your answers suggest this friendship may be one-sided. They might like you in a general sense, but their actions don't reflect that you're a priority to them.",
        nextSteps: [
          "Consider pulling back your effort and see if they reach out",
          "Ask yourself if this friendship is giving you what you need",
        ],
      },
      {
        level: 5,
        label: "This May Be One-Sided",
        description:
          "Based on your answers, this friendship looks very one-sided. That doesn't mean they dislike you — but they may not be invested the way you are.",
        nextSteps: [
          "Have an honest conversation or consider directing your energy toward more mutual friendships",
          "You deserve friends who show up for you",
        ],
      },
    ],
    disclaimer:
      "This quiz is based on your perception and answers, not actual proof of what your friend thinks or feels.",
  },

  // 8. Is This a Situationship?
  {
    slug: "is-this-a-situationship",
    title: "Is This a Situationship?",
    category: "dating",
    description:
      "Are you and someone else more than 'just friends' but less than actually together? This quiz helps you figure out what dynamic you're actually in.",
    hasObserverMode: false,
    isIdentityQuiz: false,
    estimatedMinutes: 5,
    tags: ["dating", "situationship", "relationships", "undefined"],
    traitWeights: {
      attachmentSecurity: 3,
      communicationDirectness: 2,
      boundaryStrength: 2,
      pleasingTendency: 2,
    },
    questions: [
      {
        id: "itas-1",
        selfText: "Have you and this person defined what you are to each other?",
        observerText: "Have you and this person defined what you are to each other?",
        options: [
          {
            id: "a",
            text: "Yes — we've had a clear conversation about it",
            score: 0,
            traitDeltas: { communicationDirectness: 2, attachmentSecurity: 1 },
          },
          {
            id: "b",
            text: "Sort of — but not clearly",
            score: 2,
            traitDeltas: { communicationDirectness: -1 },
          },
          {
            id: "c",
            text: "No — and when I bring it up it gets avoided",
            score: 3,
            traitDeltas: { communicationDirectness: -2, attachmentSecurity: -1 },
          },
          {
            id: "d",
            text: "No — and neither of us is bringing it up",
            score: 3,
            traitDeltas: { communicationDirectness: -2, conflictAvoidance: 2 },
          },
        ],
      },
      {
        id: "itas-2",
        selfText: "Do you act like a couple but without any official commitment?",
        observerText: "Do you act like a couple but without any official commitment?",
        options: [
          {
            id: "a",
            text: "No — we're genuinely just friends",
            score: 0,
            traitDeltas: {},
          },
          {
            id: "b",
            text: "A little — but I think we're on the same page",
            score: 1,
            traitDeltas: {},
          },
          {
            id: "c",
            text: "Yes — we basically act like partners but without the label",
            score: 4,
            traitDeltas: { attachmentSecurity: -2, communicationDirectness: -1 },
          },
        ],
      },
      {
        id: "itas-3",
        selfText:
          "How do they respond when you try to bring up what this is or where it's going?",
        observerText:
          "How do they respond when you try to bring up what this is or where it's going?",
        options: [
          {
            id: "a",
            text: "We talk about it openly",
            score: 0,
            traitDeltas: { communicationDirectness: 2 },
          },
          {
            id: "b",
            text: "They get vague or change the subject",
            score: 3,
            traitDeltas: { attachmentSecurity: -2 },
          },
          {
            id: "c",
            text: "They get defensive or make me feel needy for asking",
            score: 4,
            traitDeltas: { attachmentSecurity: -3, boundaryStrength: -1 },
          },
          {
            id: "d",
            text: "I haven't brought it up yet",
            score: 2,
            traitDeltas: { communicationDirectness: -2, conflictAvoidance: 2 },
          },
        ],
      },
      {
        id: "itas-4",
        selfText: "Do you see each other consistently, or does it come in waves?",
        observerText: "Do you see each other consistently, or does it come in waves?",
        options: [
          {
            id: "a",
            text: "Consistently — we're reliably present for each other",
            score: 0,
            traitDeltas: { attachmentSecurity: 1 },
          },
          {
            id: "b",
            text: "Pretty consistently but not quite regularly",
            score: 1,
            traitDeltas: {},
          },
          {
            id: "c",
            text: "It comes and goes — sometimes intense, sometimes I barely hear from them",
            score: 4,
            traitDeltas: { attachmentSecurity: -3 },
          },
        ],
      },
      {
        id: "itas-5",
        selfText:
          "Do you feel like you can't ask for more without risking losing them?",
        observerText:
          "Do you feel like you can't ask for more without risking losing them?",
        options: [
          {
            id: "a",
            text: "No — I feel secure asking for what I need",
            score: 0,
            traitDeltas: { boundaryStrength: 2, attachmentSecurity: 1 },
          },
          {
            id: "b",
            text: "A little — but I think they'd respect it",
            score: 1,
            traitDeltas: {},
          },
          {
            id: "c",
            text: "Yes — I'm afraid that asking for a label will push them away",
            score: 4,
            traitDeltas: { attachmentSecurity: -3, pleasingTendency: 2, boundaryStrength: -2 },
          },
        ],
      },
    ],
    results: [
      {
        level: 1,
        label: "This Looks Like a Real Connection",
        description:
          "Based on your answers, this doesn't look like a situationship. You have some clarity, consistency, and mutual communication about what this is.",
        nextSteps: [
          "Keep the communication open as things develop",
          "If something still feels unclear, it's okay to name that directly",
        ],
      },
      {
        level: 2,
        label: "Mildly Undefined",
        description:
          "Things are a little unclear, but not necessarily a situationship. You may just be in an early stage of figuring things out. The next conversation will tell you a lot.",
        nextSteps: [
          "If you want more clarity, ask for it — the reaction will tell you more than the answer",
          "Notice whether the vagueness feels comfortable or uncomfortable to you",
        ],
      },
      {
        level: 3,
        label: "Signs of a Situationship",
        description:
          "There are real signs here of a situationship — acting like a couple without any defined commitment, or avoiding clarity when it comes up. That's a pattern worth naming.",
        nextSteps: [
          "Ask yourself what you actually want from this",
          "Have a direct conversation about what you're both looking for",
        ],
      },
      {
        level: 4,
        label: "This Is Probably a Situationship",
        description:
          "Your answers strongly suggest this is a situationship. You may be doing relationship-level things without relationship-level security or commitment. That's worth taking seriously.",
        nextSteps: [
          "Decide what you actually want and communicate it clearly",
          "Notice how they respond — and whether that's good enough for you",
        ],
      },
      {
        level: 5,
        label: "Classic Situationship",
        description:
          "This looks like a textbook situationship — inconsistent access, undefined status, and fear of asking for more. You deserve to know where you stand.",
        nextSteps: [
          "Have the conversation or reconsider your investment in this dynamic",
          "Your security shouldn't depend on someone's ambiguity",
        ],
      },
    ],
    disclaimer:
      "This quiz reflects patterns based on your answers, not the other person's actual intentions.",
  },

  // 9. Are We Compatible?
  {
    slug: "are-we-compatible",
    title: "Are We Compatible?",
    category: "compatibility",
    description:
      "Compatibility isn't just about having things in common — it's about how you work together when things get hard. This quiz helps you reflect on the deeper patterns of your dynamic.",
    hasObserverMode: false,
    isIdentityQuiz: false,
    estimatedMinutes: 5,
    tags: ["compatibility", "relationships", "dating", "friendships"],
    traitWeights: {
      communicationDirectness: 2,
      attachmentSecurity: 2,
      emotionalAvailability: 2,
      conflictAvoidance: 2,
    },
    questions: [
      {
        id: "awc-1",
        selfText: "When you two disagree, how does it usually go?",
        observerText: "When you two disagree, how does it usually go?",
        options: [
          {
            id: "a",
            text: "We talk it through and usually find middle ground",
            score: 0,
            traitDeltas: { communicationDirectness: 2, attachmentSecurity: 1 },
          },
          {
            id: "b",
            text: "One of us usually backs down — sometimes it's me, sometimes them",
            score: 1,
            traitDeltas: { conflictAvoidance: 1 },
          },
          {
            id: "c",
            text: "It often turns into a bigger fight than it needs to be",
            score: 3,
            traitDeltas: { communicationDirectness: -1, attachmentSecurity: -1 },
          },
          {
            id: "d",
            text: "We avoid the topic entirely",
            score: 3,
            traitDeltas: { conflictAvoidance: 3, communicationDirectness: -2 },
          },
        ],
      },
      {
        id: "awc-2",
        selfText: "Do you feel emotionally safe being honest with this person?",
        observerText: "Do you feel emotionally safe being honest with this person?",
        options: [
          {
            id: "a",
            text: "Yes — I can say how I feel without fear",
            score: 0,
            traitDeltas: { attachmentSecurity: 2, emotionalAvailability: 2 },
          },
          {
            id: "b",
            text: "Mostly — some things feel safer than others",
            score: 1,
            traitDeltas: { attachmentSecurity: 1 },
          },
          {
            id: "c",
            text: "Not really — I often hold back to avoid their reaction",
            score: 3,
            traitDeltas: { attachmentSecurity: -2, pleasingTendency: 2 },
          },
          {
            id: "d",
            text: "No — I feel like I have to manage what I say",
            score: 4,
            traitDeltas: { attachmentSecurity: -3, boundaryStrength: -1 },
          },
        ],
      },
      {
        id: "awc-3",
        selfText: "Do your core values align on things that actually matter to you?",
        observerText: "Do your core values align on things that actually matter to you?",
        options: [
          {
            id: "a",
            text: "Yes — we're aligned on what matters most",
            score: 0,
            traitDeltas: { attachmentSecurity: 2 },
          },
          {
            id: "b",
            text: "On most things — we have some differences",
            score: 1,
            traitDeltas: {},
          },
          {
            id: "c",
            text: "On a few things — but we're pretty different overall",
            score: 2,
            traitDeltas: {},
          },
          {
            id: "d",
            text: "Not really — our values feel pretty mismatched",
            score: 4,
            traitDeltas: { attachmentSecurity: -1 },
          },
        ],
      },
      {
        id: "awc-4",
        selfText: "Do you feel like yourself around this person?",
        observerText: "Do you feel like yourself around this person?",
        options: [
          {
            id: "a",
            text: "Yes — I feel comfortable and natural",
            score: 0,
            traitDeltas: { attachmentSecurity: 2, emotionalAvailability: 2 },
          },
          {
            id: "b",
            text: "Mostly — but I hold back certain parts of myself",
            score: 1,
            traitDeltas: { pleasingTendency: 1 },
          },
          {
            id: "c",
            text: "Not really — I perform a version of myself",
            score: 3,
            traitDeltas: { pleasingTendency: 2, attachmentSecurity: -2 },
          },
        ],
      },
      {
        id: "awc-5",
        selfText: "Do you both put in similar effort in this relationship or friendship?",
        observerText: "Do you both put in similar effort in this relationship or friendship?",
        options: [
          {
            id: "a",
            text: "Yes — it feels mutual",
            score: 0,
            traitDeltas: { attachmentSecurity: 2 },
          },
          {
            id: "b",
            text: "Sometimes — it ebbs and flows",
            score: 1,
            traitDeltas: {},
          },
          {
            id: "c",
            text: "I tend to put in more",
            score: 3,
            traitDeltas: { pleasingTendency: 2, boundaryStrength: -1 },
          },
          {
            id: "d",
            text: "They put in much more than me",
            score: 2,
            traitDeltas: { emotionalAvailability: -1 },
          },
        ],
      },
    ],
    results: [
      {
        level: 1,
        label: "Strong Compatibility",
        description:
          "Based on your answers, this looks like a genuinely compatible dynamic. You communicate well, feel safe with each other, and put in mutual effort. That foundation is rare.",
        nextSteps: [
          "Continue investing in communication even when things are going well",
          "Name what you appreciate about the dynamic to the other person",
        ],
      },
      {
        level: 2,
        label: "Good Compatibility With Some Areas to Grow",
        description:
          "This looks like a generally compatible connection, but there are a few areas that might need some attention — particularly around safety and communication.",
        nextSteps: [
          "Identify the one area that feels most limiting and address it directly",
          "Compatibility grows when both people commit to working on it",
        ],
      },
      {
        level: 3,
        label: "Some Compatibility — Work Required",
        description:
          "You have some compatible elements, but there are real friction points that could become bigger over time. Compatible people can still struggle if they don't communicate well.",
        nextSteps: [
          "Name what's working and what isn't — honestly",
          "Decide together if you both want to put in the work",
        ],
      },
      {
        level: 4,
        label: "Low Compatibility",
        description:
          "Your answers suggest some significant compatibility challenges — particularly around emotional safety, communication, and values alignment. This doesn't make it impossible, but it requires real work from both sides.",
        nextSteps: [
          "Be honest about whether this dynamic feels sustainable",
          "Compatibility gaps can sometimes be bridged, but both people have to want to",
        ],
      },
      {
        level: 5,
        label: "Very Low Compatibility",
        description:
          "Based on your answers, this dynamic shows strong signs of incompatibility across multiple areas. That doesn't mean this person is bad — it may just mean you're not a good match.",
        nextSteps: [
          "Think carefully about whether this is the right connection for you",
          "Don't confuse chemistry or attachment with compatibility",
        ],
      },
    ],
    disclaimer:
      "Compatibility is complex. This quiz reflects one snapshot of a dynamic — not a complete picture of any relationship.",
  },

  // 10. Am I Overreacting?
  {
    slug: "am-i-overreacting",
    title: "Am I Overreacting?",
    observerTitle: "Are They Overreacting?",
    category: "conflict",
    description:
      "When something bothers you, it's hard to know if your reaction is proportionate. This quiz helps you reflect on whether your response fits the situation — or whether there's more going on.",
    hasObserverMode: true,
    isIdentityQuiz: false,
    estimatedMinutes: 5,
    tags: ["conflict", "emotions", "self-awareness", "overreacting"],
    startPageTraits: ["Emotional intensity", "Context", "Self-trust", "Communication", "Conflict style"],
    traitWeights: {
      selfAwareness: 3,
      emotionalAvailability: 2,
      defensiveness: 2,
      conflictAvoidance: 1,
    },
    questions: [
      {
        id: "aio-1",
        selfText: "How big does this situation feel to you right now?",
        observerText: "How big does this situation seem to feel to them right now?",
        options: [
          {
            id: "a",
            text: "Small — but it's still bothering me",
            score: 1,
            traitDeltas: { selfAwareness: 1 },
          },
          {
            id: "b",
            text: "Medium — it matters, but I can see it's not everything",
            score: 0,
            traitDeltas: { selfAwareness: 2 },
          },
          {
            id: "c",
            text: "Big — it feels like a lot right now",
            score: 2,
            traitDeltas: { emotionalAvailability: -1 },
          },
          {
            id: "d",
            text: "Enormous — I can barely think about anything else",
            score: 4,
            traitDeltas: { emotionalAvailability: -3, selfAwareness: -1 },
          },
        ],
      },
      {
        id: "aio-2",
        selfText:
          "Have similar things bothered you with other people in the past?",
        observerText:
          "Have similar things bothered them with other people in the past?",
        options: [
          {
            id: "a",
            text: "No — this feels like a one-time thing",
            score: 0,
            traitDeltas: { selfAwareness: 1 },
          },
          {
            id: "b",
            text: "Maybe — I can see some pattern but this feels different",
            score: 2,
            traitDeltas: { selfAwareness: 1 },
          },
          {
            id: "c",
            text: "Yes — this hits a nerve I've felt before",
            score: 3,
            traitDeltas: { selfAwareness: -1, emotionalAvailability: -1 },
          },
        ],
      },
      {
        id: "aio-3",
        selfText:
          "Is it possible the other person didn't intend to hurt you this way?",
        observerText:
          "Is it possible the other person didn't intend to hurt them this way?",
        options: [
          {
            id: "a",
            text: "Yes — I can see how it might have been unintentional",
            score: 1,
            traitDeltas: { selfAwareness: 2, empathy: 1 },
          },
          {
            id: "b",
            text: "Maybe — but the impact was still real",
            score: 0,
            traitDeltas: { selfAwareness: 1 },
          },
          {
            id: "c",
            text: "Unlikely — I think it was intentional",
            score: 2,
            traitDeltas: { defensiveness: 1 },
          },
          {
            id: "d",
            text: "No — it was clearly deliberate",
            score: 3,
            traitDeltas: { defensiveness: 2, selfAwareness: -1 },
          },
        ],
      },
      {
        id: "aio-4",
        selfText: "Would most people you trust agree that this is a serious issue?",
        observerText: "Would most people who know them agree that this is a serious issue?",
        options: [
          {
            id: "a",
            text: "Yes — I think they'd agree it's significant",
            score: 0,
            traitDeltas: { selfAwareness: 1 },
          },
          {
            id: "b",
            text: "Some would, some might think I'm making too much of it",
            score: 2,
            traitDeltas: { selfAwareness: 0 },
          },
          {
            id: "c",
            text: "Probably not — they'd likely say I'm overthinking it",
            score: 3,
            traitDeltas: { selfAwareness: -1, emotionalAvailability: -1 },
          },
        ],
      },
      {
        id: "aio-5",
        selfText:
          "Has this person done this same thing before, or is this the first time?",
        observerText:
          "Has this person done this same thing before, or is this the first time?",
        options: [
          {
            id: "a",
            text: "First time — it came out of nowhere",
            score: 0,
            traitDeltas: { selfAwareness: 1 },
          },
          {
            id: "b",
            text: "It's happened once before",
            score: 1,
            traitDeltas: {},
          },
          {
            id: "c",
            text: "It's a pattern — this isn't new",
            score: 0,
            traitDeltas: { socialPerception: 1 },
          },
        ],
      },
    ],
    results: [
      {
        level: 1,
        label: "Probably Not Overreacting",
        description:
          "Your reaction seems proportionate. You're showing self-awareness and keeping things in perspective — even when they're legitimately bothering you.",
        nextSteps: [
          "Trust your own read of the situation",
          "Name what you need directly to the other person",
        ],
      },
      {
        level: 2,
        label: "Slightly Heightened, But Understandable",
        description:
          "Your reaction is a little intense relative to the situation, but it's understandable. There may be some history or sensitivity that's making this feel bigger.",
        nextSteps: [
          "Give yourself some time before responding",
          "Ask: is this about this moment, or does something deeper feel threatened?",
        ],
      },
      {
        level: 3,
        label: "Mixed — Hard to Tell",
        description:
          "It's genuinely hard to say. Your reaction may be proportionate — or it may be amplified by past experiences or patterns. More reflection will help clarify which.",
        nextSteps: [
          "Talk it through with someone who isn't involved",
          "Notice whether your intensity decreases after some time passes",
        ],
      },
      {
        level: 4,
        label: "Possibly Overreacting",
        description:
          "Based on your answers, your reaction may be more intense than the situation warrants. That doesn't mean your feelings aren't real — but something beyond this situation might be fueling them.",
        nextSteps: [
          "Pause before escalating the situation",
          "Ask: what would I advise a friend feeling this way?",
        ],
      },
      {
        level: 5,
        label: "Strong Signs of Overreaction",
        description:
          "Your answers suggest the reaction is significantly bigger than the situation. This often happens when something hits a deeper wound or pattern. That's worth taking seriously.",
        nextSteps: [
          "Step back before acting on this feeling",
          "Consider what this situation is really about for you",
        ],
      },
    ],
    disclaimer:
      "This quiz is for reflection only. Your feelings are always valid, even if your reaction may need adjustment.",
  },

  // 11. Should I Confront Them?
  {
    slug: "should-i-confront-them",
    title: "Should I Confront Them?",
    category: "conflict",
    description:
      "You've been bothered by something someone did. This quiz helps you figure out whether a direct conversation is the right move — and how ready you are to have it.",
    hasObserverMode: false,
    isIdentityQuiz: false,
    estimatedMinutes: 5,
    tags: ["conflict", "communication", "confrontation", "boundaries"],
    traitWeights: {
      communicationDirectness: 3,
      conflictAvoidance: 2,
      boundaryStrength: 2,
      emotionalAvailability: 1,
    },
    questions: [
      {
        id: "sict-1",
        selfText:
          "How much is this issue affecting your peace of mind right now?",
        observerText:
          "How much is this issue affecting your peace of mind right now?",
        options: [
          {
            id: "a",
            text: "A lot — I keep thinking about it",
            score: 0,
            traitDeltas: { communicationDirectness: 1 },
          },
          {
            id: "b",
            text: "Some — it's in the back of my mind",
            score: 1,
            traitDeltas: {},
          },
          {
            id: "c",
            text: "Not much — but it feels like it should be addressed",
            score: 1,
            traitDeltas: {},
          },
          {
            id: "d",
            text: "Barely — it's more of a principle",
            score: 2,
            traitDeltas: { conflictAvoidance: 1 },
          },
        ],
      },
      {
        id: "sict-2",
        selfText:
          "Is this person someone you'll continue to have a relationship with?",
        observerText:
          "Is this person someone you'll continue to have a relationship with?",
        options: [
          {
            id: "a",
            text: "Yes — they're someone I regularly see or care about",
            score: 0,
            traitDeltas: { communicationDirectness: 1 },
          },
          {
            id: "b",
            text: "Probably — we see each other occasionally",
            score: 0,
            traitDeltas: {},
          },
          {
            id: "c",
            text: "Unlikely — we rarely interact",
            score: 2,
            traitDeltas: {},
          },
          {
            id: "d",
            text: "No — I don't plan to keep this person in my life",
            score: 3,
            traitDeltas: {},
          },
        ],
      },
      {
        id: "sict-3",
        selfText: "Are you able to bring this up calmly without escalating it?",
        observerText: "Are you able to bring this up calmly without escalating it?",
        options: [
          {
            id: "a",
            text: "Yes — I've thought it through and I'm ready",
            score: 0,
            traitDeltas: { communicationDirectness: 2, emotionalAvailability: 1 },
          },
          {
            id: "b",
            text: "I think so — but I'm nervous",
            score: 0,
            traitDeltas: { communicationDirectness: 1 },
          },
          {
            id: "c",
            text: "Not right now — I'm still too upset",
            score: 2,
            traitDeltas: { conflictAvoidance: 1, emotionalAvailability: -1 },
          },
          {
            id: "d",
            text: "Probably not — it would likely turn into a fight",
            score: 3,
            traitDeltas: { conflictAvoidance: 2, emotionalAvailability: -2 },
          },
        ],
      },
      {
        id: "sict-4",
        selfText: "Do you know clearly what you want to say or ask for?",
        observerText: "Do you know clearly what you want to say or ask for?",
        options: [
          {
            id: "a",
            text: "Yes — I know exactly what I need to say",
            score: 0,
            traitDeltas: { communicationDirectness: 2 },
          },
          {
            id: "b",
            text: "Mostly — I have a general idea",
            score: 0,
            traitDeltas: { communicationDirectness: 1 },
          },
          {
            id: "c",
            text: "Sort of — but I'm not sure how to frame it",
            score: 1,
            traitDeltas: {},
          },
          {
            id: "d",
            text: "Not really — I just know I'm upset",
            score: 3,
            traitDeltas: { conflictAvoidance: 1, communicationDirectness: -2 },
          },
        ],
      },
      {
        id: "sict-5",
        selfText:
          "What's the most likely outcome if you don't say anything at all?",
        observerText:
          "What's the most likely outcome if you don't say anything at all?",
        options: [
          {
            id: "a",
            text: "The issue resolves itself — it's honestly probably fine",
            score: 3,
            traitDeltas: {},
          },
          {
            id: "b",
            text: "It fades — but something is lost between us",
            score: 1,
            traitDeltas: { communicationDirectness: 1 },
          },
          {
            id: "c",
            text: "I'll keep feeling bad about it",
            score: 0,
            traitDeltas: { communicationDirectness: 2 },
          },
          {
            id: "d",
            text: "It will fester and probably explode later",
            score: 0,
            traitDeltas: { communicationDirectness: 2, conflictAvoidance: -1 },
          },
        ],
      },
    ],
    results: [
      {
        level: 1,
        label: "Yes — Say Something",
        description:
          "Based on your answers, confronting this issue makes sense. You're calm enough to do it well, clear about what you want to say, and this is a relationship worth addressing it in.",
        nextSteps: [
          "Pick a calm moment and bring it up directly and honestly",
          "Focus on your experience, not accusations: 'I felt X when Y happened'",
        ],
      },
      {
        level: 2,
        label: "Probably Worth Saying",
        description:
          "The signs lean toward having the conversation. It matters to you, and avoiding it may lead to resentment. Get a little clearer on what you want to say first.",
        nextSteps: [
          "Write out what you want to say before you say it",
          "Give yourself 24 hours and then see if it still feels important",
        ],
      },
      {
        level: 3,
        label: "Wait and Reflect First",
        description:
          "Not quite the right moment. You might be too emotionally activated right now, or you may not have full clarity on what you need. Wait until you can approach it calmly.",
        nextSteps: [
          "Give it a day or two before you say anything",
          "Get clear on what you actually want from the conversation",
        ],
      },
      {
        level: 4,
        label: "Probably Not Worth It Right Now",
        description:
          "Based on your answers, the timing or context suggests this may not be the right moment — or the right thing — to bring up. It's okay to let some things go.",
        nextSteps: [
          "Ask yourself: will this matter in a week?",
          "Focus energy on relationships where direct communication is reciprocated",
        ],
      },
      {
        level: 5,
        label: "Let It Go",
        description:
          "Based on your answers, the confrontation likely won't produce the outcome you're hoping for. Not every issue needs a conversation — especially if the relationship is temporary or the stakes are low.",
        nextSteps: [
          "Identify what you needed that wasn't met — that's the real thing to address",
          "Find another outlet to process the frustration",
        ],
      },
    ],
    disclaimer:
      "This quiz is for reflection. Only you can decide whether to have a conversation.",
  },

  // 12. Is This Friendship One-Sided?
  {
    slug: "friendship-one-sided",
    title: "Is This Friendship One-Sided?",
    category: "friendship",
    description:
      "Friendships should feel mutual. This quiz helps you identify whether the emotional labor, effort, and investment in a friendship is balanced — or whether it's mostly coming from you.",
    hasObserverMode: false,
    isIdentityQuiz: false,
    estimatedMinutes: 5,
    tags: ["friendship", "one-sided", "effort", "boundaries"],
    traitWeights: {
      boundaryStrength: 3,
      pleasingTendency: 3,
      socialPerception: 2,
      selfAwareness: 1,
    },
    questions: [
      {
        id: "ifos-1",
        selfText: "Who usually initiates plans or conversations in this friendship?",
        observerText: "Who usually initiates plans or conversations in this friendship?",
        options: [
          {
            id: "a",
            text: "It's pretty even — we both initiate",
            score: 0,
            traitDeltas: { socialPerception: 2 },
          },
          {
            id: "b",
            text: "Mostly me, but they do reach out sometimes",
            score: 1,
            traitDeltas: {},
          },
          {
            id: "c",
            text: "Almost always me",
            score: 3,
            traitDeltas: { pleasingTendency: 2, socialPerception: -1 },
          },
          {
            id: "d",
            text: "Always me — they've never initiated",
            score: 4,
            traitDeltas: { pleasingTendency: 3, boundaryStrength: -2 },
          },
        ],
      },
      {
        id: "ifos-2",
        selfText:
          "If you stopped reaching out, do you think they would eventually reach out to you?",
        observerText:
          "If you stopped reaching out, do you think they would eventually reach out to you?",
        options: [
          {
            id: "a",
            text: "Yes — they'd definitely notice",
            score: 0,
            traitDeltas: { socialPerception: 2 },
          },
          {
            id: "b",
            text: "Probably — after a while",
            score: 1,
            traitDeltas: {},
          },
          {
            id: "c",
            text: "Maybe — but it would take a long time",
            score: 2,
            traitDeltas: {},
          },
          {
            id: "d",
            text: "Probably not — I don't think they'd notice",
            score: 4,
            traitDeltas: { socialPerception: -2, pleasingTendency: 1 },
          },
        ],
      },
      {
        id: "ifos-3",
        selfText: "Does this friend invest in your emotional wellbeing?",
        observerText: "Does this friend invest in your emotional wellbeing?",
        options: [
          {
            id: "a",
            text: "Yes — they check in, remember what I'm going through",
            score: 0,
            traitDeltas: { socialPerception: 2 },
          },
          {
            id: "b",
            text: "Sometimes — when I bring it up",
            score: 1,
            traitDeltas: {},
          },
          {
            id: "c",
            text: "Rarely — I mostly support them",
            score: 3,
            traitDeltas: { pleasingTendency: 2, boundaryStrength: -1 },
          },
          {
            id: "d",
            text: "No — the emotional support only flows one way",
            score: 4,
            traitDeltas: { pleasingTendency: 3, boundaryStrength: -2 },
          },
        ],
      },
      {
        id: "ifos-4",
        selfText:
          "When you have a problem or need to talk, does this friend make time for you?",
        observerText:
          "When you have a problem or need to talk, does this friend make time for you?",
        options: [
          {
            id: "a",
            text: "Yes — they make themselves available",
            score: 0,
            traitDeltas: { socialPerception: 2 },
          },
          {
            id: "b",
            text: "Usually — they try even when they're busy",
            score: 0,
            traitDeltas: { socialPerception: 1 },
          },
          {
            id: "c",
            text: "Sometimes — depends on what they have going on",
            score: 2,
            traitDeltas: {},
          },
          {
            id: "d",
            text: "Rarely — I wait until they have time for me",
            score: 4,
            traitDeltas: { boundaryStrength: -2, pleasingTendency: 2 },
          },
        ],
      },
      {
        id: "ifos-5",
        selfText:
          "Be honest — do you think this friendship would survive if you put in less effort?",
        observerText:
          "Be honest — do you think this friendship would survive if you put in less effort?",
        options: [
          {
            id: "a",
            text: "Yes — they'd keep it going too",
            score: 0,
            traitDeltas: { socialPerception: 2, boundaryStrength: 1 },
          },
          {
            id: "b",
            text: "Probably — with some adjustment",
            score: 1,
            traitDeltas: {},
          },
          {
            id: "c",
            text: "I'm not sure — I'm afraid to find out",
            score: 3,
            traitDeltas: { pleasingTendency: 2, boundaryStrength: -1 },
          },
          {
            id: "d",
            text: "No — I think it would just fade",
            score: 4,
            traitDeltas: { pleasingTendency: 3, boundaryStrength: -2, socialPerception: -1 },
          },
        ],
      },
    ],
    results: [
      {
        level: 1,
        label: "This Friendship Seems Mutual",
        description:
          "Based on your answers, this friendship appears to be balanced in effort and care. Both of you seem to show up for each other in meaningful ways.",
        nextSteps: [
          "Continue investing in this friendship — it sounds like a good one",
          "Appreciate what you've built together",
        ],
      },
      {
        level: 2,
        label: "Mostly Mutual With Some Imbalance",
        description:
          "This friendship is mostly healthy, but there are some signs that you put in a bit more than they do. That may be personality — or it may be worth gently checking in.",
        nextSteps: [
          "Try initiating slightly less and see what happens",
          "Notice if the imbalance is consistent or context-dependent",
        ],
      },
      {
        level: 3,
        label: "Some Signs of One-Sidedness",
        description:
          "Your answers suggest there's a noticeable imbalance in this friendship. You may be carrying more of the emotional weight than is healthy for you.",
        nextSteps: [
          "Experiment with pulling back your effort and observing how they respond",
          "Have a direct (but kind) conversation about what you need from this friendship",
        ],
      },
      {
        level: 4,
        label: "Likely One-Sided",
        description:
          "This looks like a one-sided friendship. You're putting in significantly more effort, emotional investment, and care than they are. That isn't sustainable.",
        nextSteps: [
          "Decide if you're okay with this dynamic as-is",
          "Consider having a direct conversation or adjusting how much you invest",
        ],
      },
      {
        level: 5,
        label: "Strong Signs of One-Sidedness",
        description:
          "Based on your answers, this friendship is heavily one-sided. You may be keeping it alive entirely on your own. That's worth taking seriously.",
        nextSteps: [
          "Let yourself grieve what this friendship isn't giving you",
          "Redirect your energy toward connections that are more mutual",
        ],
      },
    ],
    disclaimer:
      "This quiz reflects your perception of the friendship, not an objective measurement.",
  },
];

export function getQuizBySlug(slug: string): Quiz | undefined {
  return QUIZZES.find((q) => q.slug === slug);
}

export function getQuizzesByCategory(category: string): Quiz[] {
  return QUIZZES.filter((q) => q.category === category);
}

export const CATEGORY_INFO: Record<
  string,
  { label: string; description: string; emoji: string }
> = {
  bias: {
    label: "Bias & Awareness",
    description:
      "Explore unconscious bias, microaggressions, and racial blind spots.",
    emoji: "🔍",
  },
  identity: {
    label: "Identity & Attraction",
    description: "Reflect on attraction patterns and questions about identity.",
    emoji: "🌈",
  },
  compatibility: {
    label: "Compatibility",
    description:
      "Assess how well you connect with someone across values and communication.",
    emoji: "🤝",
  },
  friendship: {
    label: "Friendship",
    description: "Understand dynamics, one-sidedness, and red flags in friendships.",
    emoji: "👥",
  },
  dating: {
    label: "Dating & Relationships",
    description: "Navigate the unclear zones of attraction, situationships, and love.",
    emoji: "💬",
  },
  conflict: {
    label: "Conflict & Communication",
    description:
      "Identify patterns around conflict, overreacting, and confrontation.",
    emoji: "⚡",
  },
  social: {
    label: "Social Behavior",
    description: "Reflect on how you come across and navigate social spaces.",
    emoji: "🪞",
  },
  values: {
    label: "Values & Integrity",
    description: "Explore honesty, accountability, and moral consistency.",
    emoji: "⚖️",
  },
  family: {
    label: "Family & Home",
    description: "Navigate family dynamics, toxic patterns, and home conflicts.",
    emoji: "🏠",
  },
  work: {
    label: "Work & School",
    description: "Assess group dynamics, fairness, and professional patterns.",
    emoji: "📋",
  },
};
