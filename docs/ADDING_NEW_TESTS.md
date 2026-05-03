# Adding New Tests to Pattern Check

This guide explains how to add a new quiz to Pattern Check. The quiz system is designed so that adding a new quiz requires **only one file edit** — no core engine changes needed.

---

## Quick Start

1. Open `src/lib/quizzes.ts`
2. Add your quiz object to the `QUIZZES` array
3. Done — the quiz automatically appears on All Tests, gets a start page, runs through the quiz engine, and produces a result

---

## Step 1: Add Your Quiz to QUIZZES

Open `src/lib/quizzes.ts` and add a new object to the `QUIZZES` array. Use this structure:

```ts
{
  slug: "your-quiz-slug",            // URL-safe, hyphenated, unique
  title: "Your Quiz Title",
  observerTitle: "Their Version of the Title",  // optional
  category: "conflict",              // see categories below
  description: "Short description shown on the quiz card and start page.",
  observerDescription: "...",        // optional: shown when observer mode is selected
  hasObserverMode: true,             // true = users can answer about someone else
  isIdentityQuiz: false,             // true = uses identity result levels
  estimatedMinutes: 5,
  tags: ["tag1", "tag2"],
  startPageTraits: ["Accountability", "Empathy", "Self-awareness"],  // 3–6 traits
  traitWeights: {
    selfAwareness: 3,
    accountability: 2,
  },
  questions: [
    {
      id: "xyz-1",                   // unique within this quiz
      selfText: "Question text for self mode",
      observerText: "Question text for observer mode",
      helperText: "Optional clarifying note shown below the question",
      options: [
        { id: "a", text: "Option A", score: 0, traitDeltas: { accountability: 2 } },
        { id: "b", text: "Option B", score: 1, traitDeltas: { defensiveness: 1 } },
        { id: "c", text: "Option C", score: 2, traitDeltas: {} },
        { id: "d", text: "Option D", score: 4, traitDeltas: { defensiveness: 3 } },
      ],
    },
    // ... more questions
  ],
  results: [
    {
      level: 1,
      label: "Low Concern",
      description: "...",
      whatThisMeans: "...",               // optional but recommended
      whatThisDoesNotMean: "...",         // optional but recommended
      patterns: ["Pattern 1", "..."],     // optional
      nextSteps: ["Step 1", "Step 2"],
    },
    // levels 2, 3, 4, 5
  ],
  disclaimer: "This quiz is for reflection and pattern recognition, not diagnosis or proof.",
},
```

---

## Categories

Use one of these category keys:

| Key             | Label                    |
|----------------|--------------------------|
| `conflict`      | Conflict & Communication |
| `friendship`    | Friendship               |
| `bias`          | Bias & Awareness         |
| `identity`      | Identity & Attraction    |
| `dating`        | Dating & Relationships   |
| `compatibility` | Compatibility            |
| `social`        | Social Behavior          |
| `values`        | Values & Integrity       |
| `family`        | Family & Home            |
| `work`          | Work & School            |

---

## Trait Keys

Use these exact keys for `traitWeights` and `traitDeltas`:

```
selfAwareness
empathy
defensiveness
conflictAvoidance
boundaryStrength
pleasingTendency
socialPerception
biasAwareness
emotionalAvailability
attachmentSecurity
accountability
communicationDirectness
```

---

## Scoring

- Each option has a `score` value (typically 0–4).
- Scores are summed across all questions and divided by the max possible score.
- The result level (1–5) is determined by this percentage.
- `traitDeltas` accumulate across all answers and update the Pattern Profile when saved.

Scoring thresholds (percentage of max possible):
- Level 1: < 20%
- Level 2: 20–39%
- Level 3: 40–59%
- Level 4: 60–79%
- Level 5: 80%+

---

## Writing Safe Result Language

Pattern Check is a reflection tool, not a diagnostic service. Follow these rules:

### ❌ Do NOT write:
- "You are racist"
- "They are racist"
- "You are abusive"
- "Your partner is a narcissist"
- "You are gay / straight / bi"
- "This proves fault"
- "This is certain"

### ✅ DO write:
- "Your answers may suggest…"
- "This could point to a pattern worth reflecting on…"
- "Based on your answers, there may be signs of…"
- "This result is not proof of…"
- "Only you can define your own identity"
- "More context matters"
- "This does not mean you are always wrong"
- "This does not prove intent"

---

## Result Band Guidelines

Each quiz should have 5 result levels. For each level, include:

| Field              | Required | Notes                                          |
|-------------------|----------|------------------------------------------------|
| `level`            | Yes      | 1–5 (or identity strings for identity quizzes) |
| `label`            | Yes      | Short name for the result                      |
| `description`      | Yes      | 1–2 sentences, main result text                |
| `whatThisMeans`    | Recommended | 1–2 sentences clarifying the result         |
| `whatThisDoesNotMean` | Recommended | What to explicitly NOT assume              |
| `patterns`         | Recommended | 2–3 bullet points of pattern observations   |
| `nextSteps`        | Yes      | 2 actionable suggestions                       |

---

## Testing Your Quiz Locally

1. Add your quiz to `QUIZZES` in `src/lib/quizzes.ts`
2. Run `npm run dev`
3. Navigate to `/quizzes` — your quiz should appear in its category
4. Click your quiz — verify the start page shows:
   - Title, description, correct question count, time estimate
   - Trait chips (startPageTraits)
   - Mode selection (if hasObserverMode: true)
5. Start the quiz — verify all questions render correctly
6. Complete the quiz — verify the result page shows your result bands
7. Save to Profile — verify the profile updates with trait scores

---

## Questions Per Quiz

- **Minimum:** 6 questions
- **Recommended:** 8–10 questions
- Make sure `estimatedMinutes` roughly matches (about 1 min per 2 questions)

---

## Identity Quizzes

For quizzes like "Am I Gay, Bi, or Just Curious?", set `isIdentityQuiz: true`.

Identity quizzes use different result levels:
```
probably_not
maybe
worth_exploring
strong_signs
only_you_can_define
```

Always include this language in identity quiz results:
- "Only you can define your identity."
- "This result reflects patterns in attraction and comfort, not a final label."
- "These questions can help you explore, not conclude."

---

## Coming Soon Quizzes

To mark a quiz as not yet fully implemented:

```ts
comingSoon: true,
```

The quiz will still appear on All Tests with a "Coming Soon" badge. Users can still view the start page but cannot start the quiz (the engine will show a message).

---

## Adding Pattern Check Recommendations

The profile recommends quizzes based on trait scores. If you want your quiz to be recommended when certain traits are triggered, make sure your `traitWeights` include the relevant traits.

The recommendation logic lives in `src/lib/storage.ts` → `getRecommendedQuizSlugs`.

---

## File Checklist for a New Quiz

- [ ] Added to `QUIZZES` array in `src/lib/quizzes.ts`
- [ ] Slug is unique and URL-safe
- [ ] Category key is valid
- [ ] At least 6 questions
- [ ] All 5 result levels defined
- [ ] `startPageTraits` includes 3–6 traits
- [ ] No hard labels in result language
- [ ] `whatThisDoesNotMean` clarifies the limits of the result
- [ ] Tested locally in browser
