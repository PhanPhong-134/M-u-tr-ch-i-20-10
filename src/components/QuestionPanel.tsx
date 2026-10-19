import { OptionKey, QuizQuestion, GiftItem } from '../data/quizData';

export type FeedbackState =
  | { type: 'default' }
  | { type: 'completed' }
  | { type: 'correct' }
  | { type: 'wrong' };

interface QuestionPanelProps {
  flowerNumber: number | null;
  question: QuizQuestion | null;
  isCompleted: boolean;
  allCompleted: boolean;
  awardedGift?: GiftItem;
  selectedOption: OptionKey | null;
  shakingOption: OptionKey | null;
  wrongOptions: ReadonlySet<OptionKey>;
  feedbackState: FeedbackState;
  onSelectAnswer: (letter: OptionKey) => void;
  onPickRandomFlower: () => void;
  onHideQuestion: () => void;
}

const OPTION_KEYS: OptionKey[] = ['A', 'B', 'C', 'D'];

export function QuestionPanel({
  flowerNumber,
  question,
  isCompleted,
  allCompleted,
  awardedGift,
  selectedOption,
  shakingOption,
  wrongOptions,
  feedbackState,
  onSelectAnswer,
  onPickRandomFlower,
  onHideQuestion,
}: QuestionPanelProps) {
  return (
    <section
      aria-label="Khung hiển thị câu hỏi"
      className="lg:col-span-7 bg-white/90 backdrop-blur-md rounded-2xl p-7 shadow-xl shadow-rose-100/80 border border-rose-200/80 flex flex-col justify-between relative overflow-hidden"
    >
      {/* Background decorative watermark */}
      <div
        className="absolute -right-12 -bottom-12 w-64 h-64 text-rose-100 pointer-events-none select-none opacity-40"
        aria-hidden="true"
      >
        <svg viewBox="0 0 200 200" fill="currentColor">
          <path d="M100 0 C120 40 160 40 180 60 C200 80 200 120 180 140 C160 160 120 160 100 200 C80 160 40 160 20 140 C0 120 0 80 20 60 C40 40 80 40 100 0 Z" />
        </svg>
      </div>

      {!question || flowerNumber === null ? (
        /* MYSTERY STANDBY STATE: Question is hidden until a flower is picked */
        <div
          id="mystery-standby"
          className="relative z-10 flex-1 flex flex-col items-center justify-center text-center py-8 px-4"
        >
          <div
            className="w-24 h-24 rounded-3xl bg-gradient-to-tr from-rose-500 to-pink-400 text-white shadow-xl shadow-rose-200 flex items-center justify-center text-5xl mb-5 gift-bounce"
            aria-hidden="true"
          >
            🌸
          </div>

          <span className="px-3.5 py-1 rounded-full bg-amber-50 text-amber-700 border border-amber-200 text-xs font-bold uppercase tracking-wider mb-3">
            🔒 Câu hỏi đang được giữ bí mật
          </span>

          <h3 className="text-2xl md:text-3xl font-extrabold text-slate-800 font-heading tracking-tight mb-2.5 max-w-lg">
            {allCompleted
              ? 'Chúc Mừng 11A2 Đã Mở Hết Tất Cả Hoa!'
              : 'Mời Bạn Nữ Chọn 1 Bông Hoa May Mắn!'}
          </h3>

          <p className="text-sm md:text-base text-slate-600 leading-relaxed max-w-md mb-7">
            {allCompleted ? (
              'Tất cả 11 bông hoa đã được mở quà. Bạn có thể bấm vào từng bông hoa để xem lại câu hỏi hoặc làm mới trò chơi.'
            ) : (
              <>
                Nội dung câu hỏi chỉ hiện ra sau khi bạn nữ chọn một bông hoa từ{' '}
                <strong className="text-rose-600">Hoa 1 đến Hoa 11</strong> ở cột bên trái, hoặc
                chọn ngẫu nhiên.
              </>
            )}
          </p>

          {!allCompleted && (
            <button
              type="button"
              id="btn-random-flower"
              onClick={onPickRandomFlower}
              className="px-6 py-3.5 rounded-2xl bg-gradient-to-r from-rose-500 to-pink-500 hover:from-rose-600 hover:to-pink-600 text-white font-bold text-sm md:text-base shadow-lg shadow-rose-200 hover:scale-103 active:scale-98 transition-all duration-200 flex items-center gap-2.5 cursor-pointer"
            >
              <span aria-hidden="true">🎲</span>
              <span>Chọn Ngẫu Nhiên 1 Bông Hoa</span>
            </button>
          )}
        </div>
      ) : (
        /* ACTIVE QUESTION CONTENT CONTAINER */
        <div id="question-container" className="relative z-10">
          {/* Header of card */}
          <div className="flex flex-wrap items-center justify-between gap-2 mb-4">
            <div className="flex items-center gap-2">
              <span
                className="px-3.5 py-1.5 rounded-xl bg-gradient-to-r from-rose-500 to-pink-500 text-white font-bold text-sm shadow-md shadow-rose-200"
                id="question-badge"
              >
                Hoa số {flowerNumber}
              </span>
              <span
                className="px-3 py-1 rounded-xl bg-slate-100 text-slate-600 text-xs font-semibold"
                id="subject-badge"
              >
                {question.subject}
              </span>
            </div>
            <div className="flex flex-wrap items-center gap-2">
              {!isCompleted && (
                <button
                  type="button"
                  onClick={onHideQuestion}
                  className="text-xs text-slate-600 hover:text-rose-600 font-semibold bg-slate-100 hover:bg-rose-50 px-3 py-1 rounded-full border border-slate-200 hover:border-rose-200 transition-colors flex items-center gap-1 cursor-pointer whitespace-nowrap"
                >
                  <span aria-hidden="true">🙈</span> Ẩn / Đổi hoa khác
                </button>
              )}
              <div className="text-xs text-emerald-700 font-semibold tracking-wide bg-emerald-50 px-3 py-1 rounded-full border border-emerald-200 flex items-center gap-1.5 whitespace-nowrap">
                <span aria-hidden="true">🤝</span> Quyền trợ giúp từ bạn nam
              </div>
              <div className="text-xs text-rose-500 font-semibold tracking-wide bg-rose-50 px-3 py-1 rounded-full border border-rose-100 flex items-center gap-1.5 whitespace-nowrap">
                <span aria-hidden="true">🎯</span> Chọn 1 trong 4 đáp án
              </div>
            </div>
          </div>

          {/* Question Body with high contrast and projector-ready size */}
          <div className="bg-gradient-to-b from-rose-50/40 to-white p-6 rounded-2xl border border-rose-100/90 shadow-sm mb-6 min-h-[140px] flex items-center">
            <h3
              className="text-xl md:text-2xl font-bold text-slate-800 leading-relaxed tracking-wide"
              id="question-text"
            >
              {question.question}
            </h3>
          </div>

          {/* 4 Options (2x2 Grid) */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4" id="options-grid">
            {OPTION_KEYS.map((letter) => {
              const isCorrectHighlight =
                (isCompleted && letter === question.correct) ||
                (selectedOption === letter && letter === question.correct);
              const isWrongHighlight = wrongOptions.has(letter) && !isCompleted;
              const isShaking = shakingOption === letter;

              let btnStyle =
                'bg-white hover:bg-rose-50/70 border-2 border-slate-200 hover:border-rose-300 text-slate-800 shadow-sm';
              let badgeStyle =
                'bg-rose-100 group-hover:bg-rose-500 group-hover:text-white text-rose-700';

              if (isCorrectHighlight) {
                btnStyle =
                  'bg-emerald-500 border-2 border-emerald-600 text-white shadow-lg shadow-emerald-200';
                badgeStyle = 'bg-white text-emerald-700';
              } else if (isWrongHighlight) {
                btnStyle =
                  'bg-rose-50 border-2 border-rose-500 text-rose-700 shadow-md';
                badgeStyle = 'bg-rose-200 text-rose-800';
              }

              return (
                <button
                  key={letter}
                  id={`opt-${letter}`}
                  type="button"
                  disabled={isCompleted}
                  onClick={() => onSelectAnswer(letter)}
                  className={`p-4 md:p-5 rounded-2xl text-left font-medium transition-all duration-200 flex items-start gap-3.5 group ${
                    isCompleted ? 'cursor-default' : 'cursor-pointer'
                  } ${btnStyle} ${isShaking ? 'shake-animation' : ''}`}
                >
                  <span
                    className={`w-8 h-8 rounded-xl font-bold flex items-center justify-center text-sm shrink-0 transition-colors ${badgeStyle}`}
                  >
                    {letter}
                  </span>
                  <span className="text-base md:text-lg font-semibold tracking-tight self-center leading-snug">
                    {question.options[letter]}
                  </span>
                </button>
              );
            })}
          </div>
        </div>
      )}

      {/* Hint or feedback bar */}
      <div
        id="feedback-bar"
        className="relative z-10 mt-6 pt-4 border-t border-slate-100 flex flex-wrap items-center justify-between gap-2 text-sm"
      >
        <div
          id="feedback-message"
          data-testid="feedback-message"
          className="text-slate-500 font-medium flex items-center gap-2"
        >
          {!question || flowerNumber === null ? (
            <>
              <span aria-hidden="true">🔒</span>
              <span>Câu hỏi được ẩn cho đến khi bạn nữ chọn bông hoa trên màn hình</span>
            </>
          ) : (
            <>
              {feedbackState.type === 'completed' && (
                <span className="text-emerald-600 font-bold flex items-center gap-1.5">
                  <svg className="w-4 h-4 shrink-0" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                    <path
                      fillRule="evenodd"
                      d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                      clipRule="evenodd"
                    />
                  </svg>
                  <span>
                    Câu hỏi này đã được hoàn thành &amp; bạn nữ đã nhận quà
                    {awardedGift ? ` (${awardedGift.name})` : ''}!
                  </span>
                </span>
              )}
              {feedbackState.type === 'correct' && (
                <span className="text-emerald-600 font-bold">
                  🎉 CHÍNH XÁC! Chúc mừng bạn nữ 11A2! Đang mở hộp quà...
                </span>
              )}
              {feedbackState.type === 'wrong' && (
                <span className="text-rose-600 font-bold">
                  ❌ Chưa chính xác rồi! Hãy suy nghĩ thêm hoặc nhờ các bạn nam xung quanh trợ giúp nhé!
                </span>
              )}
              {feedbackState.type === 'default' && (
                <>
                  <span aria-hidden="true">💡</span>
                  <span>Bấm vào một phương án A, B, C, D để giải đố và nhận quà</span>
                </>
              )}
            </>
          )}
        </div>
        <div className="text-xs text-slate-400">
          Hỗ trợ máy chiếu tỉ lệ 16:9 • Đầy đủ ký hiệu
        </div>
      </div>
    </section>
  );
}
