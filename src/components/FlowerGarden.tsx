import { QuizQuestion } from '../data/quizData';

interface FlowerGardenProps {
  questions: QuizQuestion[];
  currentQuestionIndex: number | null;
  completedQuestions: ReadonlySet<number>;
  onSelectQuestion: (index: number) => void;
}

export function FlowerGarden({
  questions,
  currentQuestionIndex,
  completedQuestions,
  onSelectQuestion,
}: FlowerGardenProps) {
  return (
    <section
      aria-label="Vườn Hoa 11A2"
      className="lg:col-span-5 bg-white/80 backdrop-blur-md rounded-2xl p-6 shadow-xl shadow-rose-100/80 border border-rose-200/80 flex flex-col justify-between"
    >
      <div>
        <div className="flex items-center justify-between border-b border-rose-100 pb-4 mb-5 gap-3">
          <div>
            <h2 className="text-xl font-bold text-slate-800 flex items-center gap-2 font-heading">
              <span aria-hidden="true">🌷</span> Vườn Hoa 11A2
            </h2>
            <p className="text-xs text-slate-500 mt-0.5">
              Chọn một bông hoa may mắn để mở câu đố và nhận quà
            </p>
          </div>
          <span className="text-xs px-3 py-1 rounded-2xl bg-amber-50 text-amber-700 border border-amber-200 font-medium shrink-0">
            11 Bông hoa may mắn
          </span>
        </div>

        {/* 11 Flowers Grid */}
        <div className="grid grid-cols-3 sm:grid-cols-4 gap-3.5" id="flower-grid">
          {questions.map((q, index) => {
            const isCompleted = completedQuestions.has(index);
            const isActive = index === currentQuestionIndex;
            const flowerNumber = index + 1;

            if (isCompleted) {
              return (
                <button
                  key={q.id}
                  type="button"
                  onClick={() => onSelectQuestion(index)}
                  aria-label={`Hoa ${flowerNumber} - Đã mở`}
                  className="group p-3.5 rounded-2xl flex flex-col items-center justify-center transition-all duration-300 border cursor-pointer select-none relative bg-pink-50 border-emerald-300 text-emerald-800 shadow-sm opacity-90"
                >
                  <div className="mb-1 text-emerald-600 flex items-center justify-center" aria-hidden="true">
                    <svg className="w-5 h-5" viewBox="0 0 20 20" fill="currentColor">
                      <path
                        fillRule="evenodd"
                        d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                        clipRule="evenodd"
                      />
                    </svg>
                  </div>
                  <span className="text-[10px] text-slate-500 font-semibold uppercase">
                    Đã mở
                  </span>
                  <span className="text-lg font-bold font-heading line-through opacity-70 tabular-nums">
                    Hoa {flowerNumber}
                  </span>
                </button>
              );
            }

            if (isActive) {
              return (
                <button
                  key={q.id}
                  type="button"
                  onClick={() => onSelectQuestion(index)}
                  aria-label={`Hoa ${flowerNumber} - Đang xem`}
                  aria-current="true"
                  className="group p-3.5 rounded-2xl flex flex-col items-center justify-center transition-all duration-300 border-2 cursor-pointer select-none relative active-flower text-amber-900 shadow-xl"
                >
                  <div
                    className="text-2xl mb-1 animate-spin"
                    style={{ animationDuration: '9s' }}
                    aria-hidden="true"
                  >
                    🌼
                  </div>
                  <span className="text-xs font-bold text-amber-700 uppercase tracking-wider">
                    Đang xem
                  </span>
                  <span className="text-2xl font-black font-heading text-rose-600 tabular-nums">
                    {flowerNumber}
                  </span>
                </button>
              );
            }

            return (
              <button
                key={q.id}
                type="button"
                onClick={() => onSelectQuestion(index)}
                aria-label={`Hoa ${flowerNumber} - Chưa mở`}
                className="group p-3.5 rounded-2xl flex flex-col items-center justify-center transition-all duration-300 border cursor-pointer select-none relative bg-gradient-to-br from-rose-500 to-pink-500 text-white shadow-md shadow-rose-300 hover:scale-105 hover:from-rose-600 hover:to-pink-600 border-rose-300"
              >
                <div
                  className="text-2xl mb-1 group-hover:rotate-12 transition-transform"
                  aria-hidden="true"
                >
                  🌸
                </div>
                <span className="text-xs font-semibold uppercase tracking-wider">
                  Hoa
                </span>
                <span className="text-xl font-black font-heading leading-tight tabular-nums">
                  {flowerNumber}
                </span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Legend Footer */}
      <div className="mt-6 pt-4 border-t border-rose-100/80">
        <div className="text-xs font-semibold text-slate-500 uppercase tracking-wider mb-2">
          Trạng thái bông hoa:
        </div>
        <div className="grid grid-cols-3 gap-2 text-xs">
          <div className="flex items-center gap-2 bg-rose-50/70 p-2 rounded-lg border border-rose-100">
            <span className="w-3.5 h-3.5 rounded-full bg-rose-500 shadow-sm shadow-rose-300 shrink-0" />
            <span className="text-slate-600 font-medium">Chưa mở</span>
          </div>
          <div className="flex items-center gap-2 bg-amber-50/70 p-2 rounded-lg border border-amber-200">
            <span className="w-3.5 h-3.5 rounded-full bg-amber-400 ring-2 ring-amber-300 shrink-0" />
            <span className="text-amber-800 font-medium">Đang chọn</span>
          </div>
          <div className="flex items-center gap-2 bg-emerald-50/70 p-2 rounded-lg border border-emerald-100">
            <span
              className="w-3.5 h-3.5 rounded-full bg-emerald-500 flex items-center justify-center text-white shrink-0"
              aria-hidden="true"
            >
              <svg className="w-2.5 h-2.5" viewBox="0 0 20 20" fill="currentColor">
                <path
                  fillRule="evenodd"
                  d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                  clipRule="evenodd"
                />
              </svg>
            </span>
            <span className="text-emerald-700 font-medium">Đã nhận quà</span>
          </div>
        </div>
      </div>
    </section>
  );
}
