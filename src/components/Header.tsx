import { ProgressStats } from '../data/quizLogic';

interface HeaderProps {
  progress: ProgressStats;
  onShowIntroClick: () => void;
  onResetClick: () => void;
}

export function Header({ progress, onShowIntroClick, onResetClick }: HeaderProps) {
  return (
    <header className="bg-white/80 backdrop-blur-md rounded-2xl p-5 shadow-lg shadow-rose-100/70 border border-rose-200/80 mb-5 flex flex-col items-start justify-between gap-4">
      <div className="flex items-center gap-4">
        <div
          className="w-14 h-14 rounded-2xl bg-gradient-to-tr from-rose-500 to-pink-400 flex items-center justify-center text-white shadow-md shadow-rose-300/60 text-2xl font-bold shrink-0"
          aria-hidden="true"
        >
          🌸
        </div>
        <div>
          <div className="flex flex-wrap items-center gap-2">
            <span className="px-2.5 py-0.5 rounded-full text-xs font-semibold bg-rose-100 text-rose-700 tracking-wide uppercase whitespace-nowrap">
              Món quà nho nhỏ nhân dịp 20/10
            </span>
            <span className="text-xs text-rose-400 font-medium whitespace-nowrap">| Màn chiếu lớp học</span>
          </div>
          <h1 className="text-2xl md:text-3xl font-extrabold text-slate-800 tracking-tight font-heading mt-0.5">
            Chúc Mừng Ngày Phụ Nữ Việt Nam 20/10{' '}
            <span className="text-rose-500">· Tập Thể Lớp 11A2</span>
          </h1>
        </div>
      </div>

      {/* Action & Progress badges */}
      <div className="flex flex-wrap items-center gap-3">
        <div className="bg-gradient-to-r from-rose-50 to-pink-50 border border-rose-200 px-4 py-2 rounded-xl flex items-center gap-3 shadow-sm">
          <div className="flex flex-col text-right">
            <span className="text-xs text-slate-500 font-medium">Tiến độ hái hoa</span>
            <span
              className="text-base font-bold text-rose-600 tabular-nums"
              id="progress-text"
              data-testid="progress-text"
            >
              {progress.progressText}
            </span>
          </div>
          <div
            className="w-10 h-10 rounded-xl bg-white border border-rose-200 flex items-center justify-center text-rose-500 font-bold shadow-inner tabular-nums"
            id="progress-percent"
            data-testid="progress-percent"
          >
            {progress.percentText}
          </div>
        </div>

        <button
          type="button"
          onClick={onShowIntroClick}
          className="px-4 py-2.5 bg-rose-50 hover:bg-rose-100 text-rose-700 border border-rose-200 hover:border-rose-300 rounded-xl font-semibold text-sm transition-all duration-200 flex items-center gap-2 shadow-sm active:scale-95 cursor-pointer"
        >
          <span aria-hidden="true">📜</span>
          Mở đầu &amp; Luật chơi
        </button>

        <button
          type="button"
          onClick={onResetClick}
          className="px-4 py-2.5 bg-white hover:bg-rose-50 text-slate-700 hover:text-rose-600 border border-slate-200 hover:border-rose-300 rounded-xl font-semibold text-sm transition-all duration-200 flex items-center gap-2 shadow-sm active:scale-95 cursor-pointer"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-4 w-4"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            aria-hidden="true"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"
            />
          </svg>
          Làm mới trò chơi
        </button>
      </div>
    </header>
  );
}
