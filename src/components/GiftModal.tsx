import { GiftItem } from '../data/quizData';

interface GiftModalProps {
  isOpen: boolean;
  gift: GiftItem;
  wish: string;
  onClose: () => void;
}

export function GiftModal({ isOpen, gift, wish, onClose }: GiftModalProps) {
  if (!isOpen) return null;

  return (
    <div
      id="gift-modal"
      role="dialog"
      aria-modal="true"
      aria-labelledby="gift-modal-title"
      className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-sm flex items-center justify-center p-4"
    >
      <div className="bg-gradient-to-b from-white via-rose-50/30 to-pink-50 rounded-3xl max-w-lg w-full p-8 shadow-2xl border-2 border-rose-200 relative modal-enter text-center overflow-hidden">
        {/* Modal Close Button */}
        <button
          type="button"
          onClick={onClose}
          aria-label="Đóng hộp quà"
          className="absolute top-4 right-4 w-9 h-9 rounded-full bg-white/80 hover:bg-rose-100 text-slate-500 hover:text-rose-600 flex items-center justify-center font-bold text-lg transition-all cursor-pointer shadow-sm"
        >
          <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2.5} aria-hidden="true">
            <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>

        {/* Decorative ribbon icon */}
        <div
          className="w-24 h-24 mx-auto mb-3 bg-gradient-to-tr from-rose-500 to-pink-400 rounded-3xl shadow-xl shadow-rose-300 flex items-center justify-center text-5xl gift-bounce border-2 border-white"
          aria-hidden="true"
        >
          🎁
        </div>

        <span className="inline-block px-3.5 py-1 rounded-full bg-amber-100 text-amber-800 font-bold text-xs uppercase tracking-wider mb-2 border border-amber-300">
          ✨ Chúc Mừng Bạn Nữ 11A2 ✨
        </span>
        <h3
          id="gift-modal-title"
          className="text-2xl md:text-3xl font-extrabold text-slate-800 font-heading tracking-tight mb-2"
        >
          MỞ HỘP QUÀ 20/10
        </h3>

        <p className="text-sm text-emerald-600 font-semibold flex items-center justify-center gap-1.5 mb-5 bg-emerald-50 py-1.5 px-4 rounded-full border border-emerald-200 max-w-max mx-auto">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-4 w-4"
            viewBox="0 0 20 20"
            fill="currentColor"
            aria-hidden="true"
          >
            <path
              fillRule="evenodd"
              d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
              clipRule="evenodd"
            />
          </svg>
          Trả lời hoàn toàn chính xác!
        </p>

        {/* Mystery Reward Box */}
        <div className="bg-white rounded-2xl p-5 border-2 border-dashed border-rose-300 shadow-inner mb-5">
          <div className="text-xs font-semibold text-rose-400 uppercase tracking-wider mb-1">
            Phần quà may mắn dành tặng bạn
          </div>
          <div
            className="text-2xl md:text-3xl font-black text-rose-600 font-heading my-1 flex items-center justify-center gap-2"
            id="reward-item"
          >
            {gift.name}
          </div>
          <div className="text-xs text-slate-500 italic mt-1" id="reward-note">
            {gift.note}
          </div>
        </div>

        {/* Sweet 20/10 Wish */}
        <div
          className="bg-rose-100/60 rounded-xl p-4 mb-6 border border-rose-200 text-slate-700 italic text-sm leading-relaxed"
          id="wish-text"
        >
          &ldquo;{wish}&rdquo;
        </div>

        {/* Action buttons */}
        <div className="flex items-center justify-center gap-3">
          <button
            type="button"
            onClick={onClose}
            className="w-full py-3.5 px-6 rounded-xl bg-gradient-to-r from-rose-500 to-pink-500 hover:from-rose-600 hover:to-pink-600 text-white font-bold text-base shadow-lg shadow-rose-300 transition-all duration-200 active:scale-95 cursor-pointer"
          >
            Nhận Quà &amp; Tiếp Tục Hái Hoa 🌸
          </button>
        </div>
      </div>
    </div>
  );
}
