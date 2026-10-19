import { QUESTIONS, GIFTS_LIST, WISHES_LIST } from './quizData.ts';
import type { OptionKey, GiftItem, QuizQuestion } from './quizData.ts';

export interface ProgressStats {
  completedCount: number;
  totalCount: number;
  percent: number;
  progressText: string;
  percentText: string;
}

/**
 * Calculates progress statistics for the flower garden quiz.
 */
export function calculateProgress(completedIndices: ReadonlySet<number>, totalCount: number = QUESTIONS.length): ProgressStats {
  const completedCount = completedIndices.size;
  const percent = totalCount > 0 ? Math.round((completedCount / totalCount) * 100) : 0;
  return {
    completedCount,
    totalCount,
    percent,
    progressText: `Đã mở: ${completedCount}/${totalCount} phần quà`,
    percentText: `${percent}%`,
  };
}

/**
 * Checks whether the selected option key is the correct answer for a given question object or index.
 */
export function isAnswerCorrect(questionIndex: number, selectedOption: OptionKey, questionList: readonly QuizQuestion[] = QUESTIONS): boolean {
  const question = questionList[questionIndex];
  if (!question) return false;
  return question.correct === selectedOption;
}

/**
 * Finds the first unopened flower index (0-based), or returns -1 if all flowers are completed.
 */
export function getNextUnopenedFlowerIndex(completedIndices: ReadonlySet<number>, totalCount: number = QUESTIONS.length): number {
  for (let i = 0; i < totalCount; i++) {
    if (!completedIndices.has(i)) {
      return i;
    }
  }
  return -1;
}

/**
 * Picks a random unopened flower index (0-based), or returns -1 if all flowers are completed.
 */
export function pickRandomUnopenedFlowerIndex(
  completedIndices: ReadonlySet<number>,
  totalCount: number = QUESTIONS.length,
  rng: () => number = Math.random
): number {
  const unopened: number[] = [];
  for (let i = 0; i < totalCount; i++) {
    if (!completedIndices.has(i)) {
      unopened.push(i);
    }
  }
  if (unopened.length === 0) return -1;
  const idx = Math.min(unopened.length - 1, Math.max(0, Math.floor(rng() * unopened.length)));
  return unopened[idx];
}

/**
 * Creates a shuffled copy of the 11 questions so nobody knows in advance which flower contains which question.
 */
export function createShuffledQuestions(rng: () => number = Math.random): QuizQuestion[] {
  const copy = [...QUESTIONS];
  for (let i = copy.length - 1; i > 0; i--) {
    const j = Math.floor(rng() * (i + 1));
    const temp = copy[i];
    copy[i] = copy[j];
    copy[j] = temp;
  }
  return copy;
}

/**
 * Builds the exact gift pool where each snack has 1 slot and Milo has 3 slots (total 10 slots).
 */
export function buildBaseGiftPool(): GiftItem[] {
  const pool: GiftItem[] = [];
  for (const item of GIFTS_LIST) {
    for (let i = 0; i < item.questionCount; i++) {
      pool.push(item);
    }
  }
  return pool;
}

/**
 * Creates a shuffled gift queue for a game session so each of the 7 single-question gifts
 * is awarded at most once and 1 hộp sữa Milo is awarded for 3 questions.
 */
export function createShuffledGiftPool(rng: () => number = Math.random): GiftItem[] {
  const pool = buildBaseGiftPool();
  for (let i = pool.length - 1; i > 0; i--) {
    const j = Math.floor(rng() * (i + 1));
    const temp = pool[i];
    pool[i] = pool[j];
    pool[j] = temp;
  }
  return pool;
}

/**
 * Draws the gift for the N-th answered question (0-based drawOrder) from the session gift pool,
 * paired with a random 20/10 wish.
 */
export function drawGiftForAnswer(
  sessionPool: readonly GiftItem[],
  drawOrder: number,
  wishRand: number = Math.random()
): {
  gift: GiftItem;
  wish: string;
} {
  const miloFallback = GIFTS_LIST.find((g) => g.id === 'sua-milo') ?? GIFTS_LIST[GIFTS_LIST.length - 1];
  const gift = drawOrder >= 0 && drawOrder < sessionPool.length ? sessionPool[drawOrder] : miloFallback;
  const safeWishIdx = Math.min(WISHES_LIST.length - 1, Math.max(0, Math.floor(wishRand * WISHES_LIST.length)));
  return {
    gift,
    wish: WISHES_LIST[safeWishIdx],
  };
}

/**
 * Picks a gift and a 20/10 wish using provided random numbers (0 <= r < 1).
 */
export function pickRewardAndWish(giftRand: number = Math.random(), wishRand: number = Math.random()): {
  gift: GiftItem;
  wish: string;
} {
  const basePool = buildBaseGiftPool();
  const safeGiftIdx = Math.min(basePool.length - 1, Math.max(0, Math.floor(giftRand * basePool.length)));
  const safeWishIdx = Math.min(WISHES_LIST.length - 1, Math.max(0, Math.floor(wishRand * WISHES_LIST.length)));
  return {
    gift: basePool[safeGiftIdx],
    wish: WISHES_LIST[safeWishIdx],
  };
}
