import test from 'node:test';
import assert from 'node:assert/strict';
import {
  calculateProgress,
  isAnswerCorrect,
  getNextUnopenedFlowerIndex,
  pickRandomUnopenedFlowerIndex,
  createShuffledQuestions,
  buildBaseGiftPool,
  createShuffledGiftPool,
  drawGiftForAnswer,
  pickRewardAndWish,
} from './quizLogic.ts';
import { QUESTIONS, GIFTS_LIST } from './quizData.ts';

test('calculateProgress computes accurate counts and percentages', () => {
  const emptySet = new Set<number>();
  const startStats = calculateProgress(emptySet, 11);
  assert.equal(startStats.completedCount, 0);
  assert.equal(startStats.totalCount, 11);
  assert.equal(startStats.percent, 0);
  assert.equal(startStats.progressText, 'Đã mở: 0/11 phần quà');
  assert.equal(startStats.percentText, '0%');

  const oneDone = new Set<number>([0]);
  const oneStats = calculateProgress(oneDone, 11);
  assert.equal(oneStats.completedCount, 1);
  assert.equal(oneStats.percent, 9);
  assert.equal(oneStats.progressText, 'Đã mở: 1/11 phần quà');
  assert.equal(oneStats.percentText, '9%');

  const allDone = new Set<number>([0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10]);
  const allStats = calculateProgress(allDone, 11);
  assert.equal(allStats.completedCount, 11);
  assert.equal(allStats.percent, 100);
  assert.equal(allStats.progressText, 'Đã mở: 11/11 phần quà');
  assert.equal(allStats.percentText, '100%');
});

test('isAnswerCorrect validates answers against the 11 curriculum questions', () => {
  assert.equal(QUESTIONS.length, 11);
  assert.equal(isAnswerCorrect(0, 'A'), true);
  assert.equal(isAnswerCorrect(0, 'B'), false);
  assert.equal(isAnswerCorrect(1, 'B'), true);
  assert.equal(isAnswerCorrect(2, 'C'), true);
  assert.equal(isAnswerCorrect(3, 'D'), true);
  assert.equal(isAnswerCorrect(99, 'A'), false);
});

test('getNextUnopenedFlowerIndex and pickRandomUnopenedFlowerIndex select unopened flowers accurately', () => {
  assert.equal(getNextUnopenedFlowerIndex(new Set([]), 11), 0);
  assert.equal(getNextUnopenedFlowerIndex(new Set([0]), 11), 1);
  assert.equal(
    getNextUnopenedFlowerIndex(new Set([0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10]), 11),
    -1
  );

  const almostAll = new Set([0, 1, 2, 3, 4, 6, 7, 8, 9, 10]);
  assert.equal(pickRandomUnopenedFlowerIndex(almostAll, 11, () => 0.5), 5);
  assert.equal(
    pickRandomUnopenedFlowerIndex(new Set([0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10]), 11),
    -1
  );
});

test('createShuffledQuestions preserves all 11 questions without duplicates', () => {
  const shuffled = createShuffledQuestions(() => 0.3);
  assert.equal(shuffled.length, 11);
  const ids = new Set(shuffled.map((q) => q.id));
  assert.equal(ids.size, 11);
});

test('gift pool has 8 distinct items, 7 items with 1 question each, and 1 hộp sữa Milo with 3 questions', () => {
  assert.equal(GIFTS_LIST.length, 8);
  const pool = buildBaseGiftPool();
  assert.equal(pool.length, 10);

  const countsById = new Map<string, number>();
  for (const item of pool) {
    countsById.set(item.id, (countsById.get(item.id) ?? 0) + 1);
  }

  assert.equal(countsById.get('marine-boy'), 1);
  assert.equal(countsById.get('xuc-xich'), 1);
  assert.equal(countsById.get('oreo'), 1);
  assert.equal(countsById.get('banh-gau'), 1);
  assert.equal(countsById.get('bim-bim-lay-to'), 1);
  assert.equal(countsById.get('bim-bim-swing-to'), 1);
  assert.equal(countsById.get('bim-bim-bi-do-to'), 1);
  assert.equal(countsById.get('sua-milo'), 3);

  const shuffled = createShuffledGiftPool(() => 0.42);
  assert.equal(shuffled.length, 10);
  const drawn = drawGiftForAnswer(shuffled, 0, 0.2);
  assert.ok(drawn.gift.name.length > 0);
  assert.ok(drawn.wish.length > 0);
});

test('pickRewardAndWish returns valid gift and wish for any random value', () => {
  const first = pickRewardAndWish(0, 0);
  assert.ok(first.gift.name.length > 0);
  assert.ok(first.wish.length > 0);

  const last = pickRewardAndWish(0.999, 0.999);
  assert.ok(last.gift.name.length > 0);
  assert.ok(last.wish.length > 0);
});
