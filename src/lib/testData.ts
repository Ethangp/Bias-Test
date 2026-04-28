export type Category = 'european' | 'african' | 'good' | 'bad'

export interface Word {
  text: string
  category: Category
}

export const EUROPEAN_NAMES: Word[] = [
  { text: 'Adam', category: 'european' },
  { text: 'Chip', category: 'european' },
  { text: 'Harry', category: 'european' },
  { text: 'Josh', category: 'european' },
  { text: 'Roger', category: 'european' },
  { text: 'Alan', category: 'european' },
  { text: 'Frank', category: 'european' },
  { text: 'Ian', category: 'european' },
  { text: 'Justin', category: 'european' },
  { text: 'Matthew', category: 'european' },
]

export const AFRICAN_NAMES: Word[] = [
  { text: 'Alonzo', category: 'african' },
  { text: 'Jamel', category: 'african' },
  { text: 'Lerone', category: 'african' },
  { text: 'Percell', category: 'african' },
  { text: 'Theo', category: 'african' },
  { text: 'Alphonse', category: 'african' },
  { text: 'Jerome', category: 'african' },
  { text: 'Leroy', category: 'african' },
  { text: 'Rasaan', category: 'african' },
  { text: 'Torrance', category: 'african' },
]

export const GOOD_WORDS: Word[] = [
  { text: 'Joy', category: 'good' },
  { text: 'Love', category: 'good' },
  { text: 'Peace', category: 'good' },
  { text: 'Wonderful', category: 'good' },
  { text: 'Pleasure', category: 'good' },
  { text: 'Glorious', category: 'good' },
  { text: 'Laughter', category: 'good' },
  { text: 'Happy', category: 'good' },
]

export const BAD_WORDS: Word[] = [
  { text: 'Agony', category: 'bad' },
  { text: 'Terrible', category: 'bad' },
  { text: 'Horrible', category: 'bad' },
  { text: 'Nasty', category: 'bad' },
  { text: 'Evil', category: 'bad' },
  { text: 'Awful', category: 'bad' },
  { text: 'Failure', category: 'bad' },
  { text: 'Hurt', category: 'bad' },
]

export type BlockType =
  | 'namesOnly'        // Round 1: European vs African names
  | 'attributesOnly'  // Round 2: Good vs Bad words
  | 'combined1'       // Round 3: European+Good vs African+Bad
  | 'combined1Practice' // Practice for combined1
  | 'combined2'       // Round 5: European+Bad vs African+Good
  | 'combined2Practice' // Practice for combined2

export interface Block {
  id: BlockType
  title: string
  instructions: string
  leftLabel: string
  rightLabel: string
  words: Word[]
  correctKey: (word: Word) => 'e' | 'i'
  isPractice?: boolean
}

function shuffle<T>(arr: T[]): T[] {
  const a = [...arr]
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]]
  }
  return a
}

function pick<T>(arr: T[], n: number): T[] {
  return shuffle(arr).slice(0, n)
}

export function buildBlocks(): Block[] {
  return [
    {
      id: 'namesOnly',
      title: 'Round 1 of 5',
      instructions: 'Sort the names into the correct categories. Press E for the left category, I for the right.',
      leftLabel: 'European American Names',
      rightLabel: 'African American Names',
      words: shuffle([...pick(EUROPEAN_NAMES, 5), ...pick(AFRICAN_NAMES, 5)]),
      correctKey: (w) => w.category === 'european' ? 'e' : 'i',
      isPractice: true,
    },
    {
      id: 'attributesOnly',
      title: 'Round 2 of 5',
      instructions: 'Sort the words into Good or Bad. Press E for Good, I for Bad.',
      leftLabel: 'Good',
      rightLabel: 'Bad',
      words: shuffle([...pick(GOOD_WORDS, 5), ...pick(BAD_WORDS, 5)]),
      correctKey: (w) => w.category === 'good' ? 'e' : 'i',
      isPractice: true,
    },
    {
      id: 'combined1Practice',
      title: 'Round 3 of 5 (Practice)',
      instructions: 'Now the task combines both. Press E for European American Names OR Good words. Press I for African American Names OR Bad words.',
      leftLabel: 'European Names / Good',
      rightLabel: 'African Names / Bad',
      words: shuffle([...pick(EUROPEAN_NAMES, 4), ...pick(AFRICAN_NAMES, 4), ...pick(GOOD_WORDS, 4), ...pick(BAD_WORDS, 4)]),
      correctKey: (w) => (w.category === 'european' || w.category === 'good') ? 'e' : 'i',
      isPractice: true,
    },
    {
      id: 'combined1',
      title: 'Round 4 of 5',
      instructions: 'Same as before. Press E for European American Names OR Good words. Press I for African American Names OR Bad words.',
      leftLabel: 'European Names / Good',
      rightLabel: 'African Names / Bad',
      words: shuffle([...pick(EUROPEAN_NAMES, 6), ...pick(AFRICAN_NAMES, 6), ...pick(GOOD_WORDS, 6), ...pick(BAD_WORDS, 6)]),
      correctKey: (w) => (w.category === 'european' || w.category === 'good') ? 'e' : 'i',
    },
    {
      id: 'combined2',
      title: 'Round 5 of 5',
      instructions: 'Now the pairings are reversed. Press E for African American Names OR Good words. Press I for European American Names OR Bad words.',
      leftLabel: 'African Names / Good',
      rightLabel: 'European Names / Bad',
      words: shuffle([...pick(EUROPEAN_NAMES, 6), ...pick(AFRICAN_NAMES, 6), ...pick(GOOD_WORDS, 6), ...pick(BAD_WORDS, 6)]),
      correctKey: (w) => (w.category === 'african' || w.category === 'good') ? 'e' : 'i',
    },
  ]
}

export interface TrialResult {
  word: string
  category: Category
  block: BlockType
  responseTimeMs: number
  correct: boolean
}

/**
 * Compute a simplified D-score (IAT effect size).
 * Positive score = faster for combined1 (European+Good / African+Bad)
 * Negative score = faster for combined2 (African+Good / European+Bad)
 */
export function computeDScore(trials: TrialResult[]): { dScore: number; interpretation: string } {
  const block3 = trials.filter((t) => t.block === 'combined1' && t.correct)
  const block5 = trials.filter((t) => t.block === 'combined2' && t.correct)

  if (block3.length === 0 || block5.length === 0) {
    return { dScore: 0, interpretation: 'Insufficient data' }
  }

  const mean3 = block3.reduce((s, t) => s + t.responseTimeMs, 0) / block3.length
  const mean5 = block5.reduce((s, t) => s + t.responseTimeMs, 0) / block5.length

  const allRTs = [...block3, ...block5].map((t) => t.responseTimeMs)
  const meanAll = allRTs.reduce((s, r) => s + r, 0) / allRTs.length
  const sd = Math.sqrt(allRTs.reduce((s, r) => s + Math.pow(r - meanAll, 2), 0) / allRTs.length)

  const dScore = sd === 0 ? 0 : (mean5 - mean3) / sd

  let interpretation = ''
  if (dScore > 0.65) interpretation = 'Strong preference for European American names paired with Good'
  else if (dScore > 0.35) interpretation = 'Moderate preference for European American names paired with Good'
  else if (dScore > 0.15) interpretation = 'Slight preference for European American names paired with Good'
  else if (dScore > -0.15) interpretation = 'Little to no automatic preference detected'
  else if (dScore > -0.35) interpretation = 'Slight preference for African American names paired with Good'
  else if (dScore > -0.65) interpretation = 'Moderate preference for African American names paired with Good'
  else interpretation = 'Strong preference for African American names paired with Good'

  return { dScore: Math.round(dScore * 100) / 100, interpretation }
}
