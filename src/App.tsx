import { useState, useCallback, useRef, useEffect } from 'react';
import confetti from 'canvas-confetti';
import { GIFTS_LIST, WISHES_LIST, OptionKey, GiftItem, QuizQuestion } from './data/quizData';
import {
  calculateProgress,
  isAnswerCorrect,
  pickRandomUnopenedFlowerIndex,
  createShuffledQuestions,
  createShuffledGiftPool,
  drawGiftForAnswer,
} from './data/quizLogic';
import { AmbientPetals } from './components/AmbientPetals';
import { IntroScreen } from './components/IntroScreen';
import { Header } from './components/Header';
import { FlowerGarden } from './components/FlowerGarden';
import { QuestionPanel, FeedbackState } from './components/QuestionPanel';
import { GiftModal } from './components/GiftModal';
import { ResetModal } from './components/ResetModal';

function shouldAutostart(): boolean {
  if (typeof window === 'undefined') return false;
  const params = new URLSearchParams(window.location.search);
  return params.get('autostart') === '1';
}

export default function App() {
  const [showIntro, setShowIntro] = useState<boolean>(() => !shouldAutostart());
  const [hasStartedBefore, setHasStartedBefore] = useState<boolean>(() => shouldAutostart());
  const [sessionQuestions, setSessionQuestions] = useState<QuizQuestion[]>(() => createShuffledQuestions());
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState<number | null>(null);
  const [completedQuestions, setCompletedQuestions] = useState<Set<number>>(() => new Set());
  const [sessionGiftPool, setSessionGiftPool] = useState<GiftItem[]>(() => createShuffledGiftPool());
  const [awardedGiftsByQuestion, setAwardedGiftsByQuestion] = useState<Record<number, { gift: GiftItem; wish: string }>>({});
  const [isQuestionLocked, setIsQuestionLocked] = useState<boolean>(false);
  const [selectedOption, setSelectedOption] = useState<OptionKey | null>(null);
  const [shakingOption, setShakingOption] = useState<OptionKey | null>(null);
  const [wrongOptions, setWrongOptions] = useState<Set<OptionKey>>(() => new Set());
  const [feedbackState, setFeedbackState] = useState<FeedbackState>({ type: 'default' });

  const [isGiftModalOpen, setIsGiftModalOpen] = useState<boolean>(false);
  const [currentGift, setCurrentGift] = useState<GiftItem>(GIFTS_LIST[0]);
  const [currentWish, setCurrentWish] = useState<string>(WISHES_LIST[0]);
  const [isResetModalOpen, setIsResetModalOpen] = useState<boolean>(false);

  const timersRef = useRef<number[]>([]);

  useEffect(() => {
    document.body.dataset.state = showIntro ? 'title' : 'playing';
  }, [showIntro]);

  const clearTimers = useCallback(() => {
    timersRef.current.forEach((id) => window.clearTimeout(id));
    timersRef.current = [];
  }, []);

  useEffect(() => {
    return () => clearTimers();
  }, [clearTimers]);

  const handleStartGame = useCallback(() => {
    document.body.dataset.state = 'playing';
    setShowIntro(false);
    setHasStartedBefore(true);
  }, []);

  const triggerConfetti = useCallback(() => {
    try {
      confetti({
        particleCount: 80,
        spread: 70,
        origin: { y: 0.6 },
      });
      const t = window.setTimeout(() => {
        confetti({
          particleCount: 50,
          angle: 60,
          spread: 55,
          origin: { x: 0 },
        });
        confetti({
          particleCount: 50,
          angle: 120,
          spread: 55,
          origin: { x: 1 },
        });
      }, 250);
      timersRef.current.push(t);
    } catch {
      // Ignore confetti errors in headless environments
    }
  }, []);

  const handleSelectQuestion = useCallback(
    (index: number | null, nextCompletedSet?: ReadonlySet<number>) => {
      clearTimers();
      const activeSet = nextCompletedSet ?? completedQuestions;
      setCurrentQuestionIndex(index);
      setIsQuestionLocked(false);
      setSelectedOption(null);
      setShakingOption(null);
      setWrongOptions(new Set());
      if (index === null) {
        setFeedbackState({ type: 'default' });
      } else {
        setFeedbackState(
          activeSet.has(index) ? { type: 'completed' } : { type: 'default' }
        );
      }
    },
    [clearTimers, completedQuestions]
  );

  const handlePickRandomFlower = useCallback(() => {
    const randomIndex = pickRandomUnopenedFlowerIndex(completedQuestions, sessionQuestions.length);
    if (randomIndex !== -1) {
      handleSelectQuestion(randomIndex);
    }
  }, [completedQuestions, handleSelectQuestion, sessionQuestions.length]);

  const handleSelectAnswer = useCallback(
    (letter: OptionKey) => {
      if (
        currentQuestionIndex === null ||
        isQuestionLocked ||
        completedQuestions.has(currentQuestionIndex)
      ) {
        return;
      }

      if (isAnswerCorrect(currentQuestionIndex, letter, sessionQuestions)) {
        setIsQuestionLocked(true);
        setSelectedOption(letter);
        setFeedbackState({ type: 'correct' });

        triggerConfetti();

        const drawOrder = completedQuestions.size;
        const existingAward = awardedGiftsByQuestion[currentQuestionIndex];
        const { gift, wish } = existingAward ?? drawGiftForAnswer(sessionGiftPool, drawOrder);

        setAwardedGiftsByQuestion((prev) => ({
          ...prev,
          [currentQuestionIndex]: { gift, wish },
        }));

        setCompletedQuestions((prev) => {
          const updated = new Set(prev);
          updated.add(currentQuestionIndex);
          return updated;
        });

        setCurrentGift(gift);
        setCurrentWish(wish);

        const modalTimer = window.setTimeout(() => {
          setIsGiftModalOpen(true);
          setIsQuestionLocked(false);
        }, 700);
        timersRef.current.push(modalTimer);
      } else {
        setWrongOptions((prev) => {
          const updated = new Set(prev);
          updated.add(letter);
          return updated;
        });
        setShakingOption(letter);
        setFeedbackState({ type: 'wrong' });

        const shakeTimer = window.setTimeout(() => {
          setShakingOption((current) => (current === letter ? null : current));
        }, 600);
        timersRef.current.push(shakeTimer);
      }
    },
    [
      awardedGiftsByQuestion,
      completedQuestions,
      currentQuestionIndex,
      isQuestionLocked,
      sessionGiftPool,
      sessionQuestions,
      triggerConfetti,
    ]
  );

  const handleCloseGiftModal = useCallback(() => {
    setIsGiftModalOpen(false);
    // Return to the hidden standby state so the next student can pick any flower without spoiling the next question
    handleSelectQuestion(null, completedQuestions);
  }, [completedQuestions, handleSelectQuestion]);

  const handleConfirmReset = useCallback(() => {
    clearTimers();
    const emptySet = new Set<number>();
    setCompletedQuestions(emptySet);
    setSessionQuestions(createShuffledQuestions());
    setSessionGiftPool(createShuffledGiftPool());
    setAwardedGiftsByQuestion({});
    setIsGiftModalOpen(false);
    setIsResetModalOpen(false);
    handleSelectQuestion(null, emptySet);
  }, [clearTimers, handleSelectQuestion]);

  const progress = calculateProgress(completedQuestions, sessionQuestions.length);
  const currentQuestion =
    currentQuestionIndex !== null ? sessionQuestions[currentQuestionIndex] : null;
  const isCurrentCompleted =
    currentQuestionIndex !== null ? completedQuestions.has(currentQuestionIndex) : false;
  const allCompleted = completedQuestions.size >= sessionQuestions.length;

  return (
    <div className="text-slate-800 relative selection:bg-rose-200 min-h-screen">
      <AmbientPetals />

      {showIntro ? (
        <IntroScreen
          onStartGame={handleStartGame}
          hasStartedBefore={hasStartedBefore}
        />
      ) : (
        <div className="relative z-10 max-w-[1560px] mx-auto px-6 py-5 flex flex-col min-h-screen">
          <Header
            progress={progress}
            onShowIntroClick={() => setShowIntro(true)}
            onResetClick={() => setIsResetModalOpen(true)}
          />

          <main className="grid grid-cols-1 lg:grid-cols-12 gap-6 flex-1 items-stretch">
            <FlowerGarden
              questions={sessionQuestions}
              currentQuestionIndex={currentQuestionIndex}
              completedQuestions={completedQuestions}
              onSelectQuestion={(idx) => handleSelectQuestion(idx)}
            />

            <QuestionPanel
              flowerNumber={currentQuestionIndex !== null ? currentQuestionIndex + 1 : null}
              question={currentQuestion}
              isCompleted={isCurrentCompleted}
              allCompleted={allCompleted}
              awardedGift={
                currentQuestionIndex !== null
                  ? awardedGiftsByQuestion[currentQuestionIndex]?.gift
                  : undefined
              }
              selectedOption={selectedOption}
              shakingOption={shakingOption}
              wrongOptions={wrongOptions}
              feedbackState={feedbackState}
              onSelectAnswer={handleSelectAnswer}
              onPickRandomFlower={handlePickRandomFlower}
              onHideQuestion={() => handleSelectQuestion(null)}
            />
          </main>
        </div>
      )}

      <GiftModal
        isOpen={isGiftModalOpen}
        gift={currentGift}
        wish={currentWish}
        onClose={handleCloseGiftModal}
      />

      <ResetModal
        isOpen={isResetModalOpen}
        onConfirm={handleConfirmReset}
        onCancel={() => setIsResetModalOpen(false)}
      />
    </div>
  );
}
