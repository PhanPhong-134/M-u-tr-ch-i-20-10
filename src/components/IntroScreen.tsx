import { useEffect } from 'react';

interface IntroScreenProps {
  onStartGame: () => void;
  hasStartedBefore: boolean;
}

export function IntroScreen({ onStartGame, hasStartedBefore }: IntroScreenProps) {
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        if (document.activeElement instanceof HTMLElement) {
          document.activeElement.blur();
        }
        onStartGame();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [onStartGame]);

  return (
    <div
      id="intro-screen"
      className="relative z-10 max-w-[1360px] mx-auto px-6 py-4 flex flex-col justify-center min-h-screen"
    >
      <div className="bg-white/85 backdrop-blur-md rounded-3xl p-5 md:p-7 shadow-2xl shadow-rose-200/70 border-2 border-rose-200/90 relative overflow-hidden">
        {/* Decorative top corner emblem */}
        <div
          className="absolute -right-14 -top-14 w-56 h-56 text-rose-100 pointer-events-none select-none opacity-50"
          aria-hidden="true"
        >
          <svg viewBox="0 0 200 200" fill="currentColor">
            <path d="M100 0 C120 40 160 40 180 60 C200 80 200 120 180 140 C160 160 120 160 100 200 C80 160 40 160 20 140 C0 120 0 80 20 60 C40 40 80 40 100 0 Z" />
          </svg>
        </div>

        {/* PART 1: PHẦN MỞ ĐẦU (HERO INTRO) */}
        <div className="relative z-10 text-center max-w-3xl mx-auto mb-5">
          <div className="inline-flex flex-wrap items-center justify-center gap-2 px-4 py-1 rounded-full bg-rose-100/90 border border-rose-200 text-rose-700 text-xs font-bold uppercase tracking-wider mb-2.5">
            <span aria-hidden="true">🌸</span>
            <span>Món Quà Nho Nhỏ Nhân Dịp 20/10 · Tập Thể Lớp 11A2</span>
          </div>

          <h1 className="text-2xl md:text-4xl font-extrabold text-slate-800 font-heading tracking-tight leading-tight mb-2">
            Hái Hoa Đố Vui Nhận Quà{' '}
            <span className="text-rose-500">Ngày Phụ Nữ Việt Nam 20/10</span>
          </h1>

          <p className="text-sm md:text-base text-slate-600 leading-relaxed font-medium">
            Chào mừng các bạn nữ xinh đẹp và tài năng của đại gia đình{' '}
            <strong className="text-rose-600 font-bold">11A2</strong>! Nhân ngày Phụ Nữ Việt Nam
            20/10, các bạn nam trong lớp đã chuẩn bị một vườn hoa gồm{' '}
            <strong className="text-slate-800">11 bông hoa may mắn</strong> ẩn chứa những câu đố
            thú vị cùng các phần quà ăn vặt ngọt ngào dành riêng cho phái đẹp.
          </p>
        </div>

        {/* PART 2: PHẦN LUẬT CHƠI (GAME RULES) */}
        <div className="relative z-10 mb-5">
          <div className="flex items-center justify-center gap-2.5 mb-3.5">
            <span className="h-px w-12 bg-rose-200" aria-hidden="true" />
            <h2 className="text-base md:text-lg font-extrabold text-rose-600 uppercase tracking-wider font-heading flex items-center gap-2">
              <span aria-hidden="true">📜</span> Thể Lệ &amp; Luật Chơi
            </h2>
            <span className="h-px w-12 bg-rose-200" aria-hidden="true" />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {/* Rule 1 */}
            <div className="bg-gradient-to-b from-rose-50/80 to-white rounded-2xl p-4 border border-rose-200/80 shadow-sm flex flex-col justify-between">
              <div>
                <div className="flex items-center gap-3 mb-2">
                  <div className="w-9 h-9 rounded-xl bg-rose-500 text-white font-black font-heading text-base flex items-center justify-center shadow-sm shadow-rose-200 shrink-0">
                    01
                  </div>
                  <h3 className="text-base md:text-lg font-bold text-slate-800 font-heading leading-snug">
                    Hái Hoa Mở Câu Đố
                  </h3>
                </div>
                <p className="text-sm text-slate-600 leading-relaxed">
                  Mỗi lượt chơi, bạn nữ chọn <strong className="text-slate-800">1 bông hoa bất kỳ</strong> từ{' '}
                  <strong className="text-rose-600">Hoa 1 đến Hoa 11</strong> trên màn chiếu để mở câu hỏi
                  tương ứng.
                </p>
              </div>
              <div className="mt-3 pt-2.5 border-t border-rose-100 text-xs font-semibold text-rose-500 flex items-center gap-1.5">
                <span aria-hidden="true">🌷</span> 11 bông hoa · 11 phần quà bí mật
              </div>
            </div>

            {/* Rule 2: Lựa chọn 1 trong 4 đáp án */}
            <div className="bg-gradient-to-b from-amber-50/80 to-white rounded-2xl p-4 border border-amber-200/90 shadow-sm flex flex-col justify-between">
              <div>
                <div className="flex items-center gap-3 mb-2">
                  <div className="w-9 h-9 rounded-xl bg-amber-500 text-white font-black font-heading text-base flex items-center justify-center shadow-sm shadow-amber-200 shrink-0">
                    02
                  </div>
                  <h3 className="text-base md:text-lg font-bold text-slate-800 font-heading leading-snug">
                    Lựa Chọn 1 Trong 4 Đáp Án
                  </h3>
                </div>
                <p className="text-sm text-slate-600 leading-relaxed">
                  Mỗi câu hỏi có 4 phương án <strong className="text-slate-800">A, B, C, D</strong>. Bạn nữ{' '}
                  <strong className="text-amber-700">lựa chọn 1 trong 4 đáp án</strong> chính xác nhất để mở
                  hộp quà 20/10. Nếu chọn sai vẫn được chọn lại!
                </p>
              </div>
              <div className="mt-3 pt-2.5 border-t border-amber-100 text-xs font-semibold text-amber-700 flex items-center gap-1.5">
                <span aria-hidden="true">🎯</span> Trả lời đúng nhận quà ngay lập tức
              </div>
            </div>

            {/* Rule 3: Quyền tìm trợ giúp từ các bạn nam xung quanh */}
            <div className="bg-gradient-to-b from-emerald-50/80 to-white rounded-2xl p-4 border border-emerald-200/90 shadow-sm flex flex-col justify-between">
              <div>
                <div className="flex items-center gap-3 mb-2">
                  <div className="w-9 h-9 rounded-xl bg-emerald-500 text-white font-black font-heading text-base flex items-center justify-center shadow-sm shadow-emerald-200 shrink-0">
                    03
                  </div>
                  <h3 className="text-base md:text-lg font-bold text-slate-800 font-heading leading-snug">
                    Quyền Trợ Giúp Từ Bạn Nam
                  </h3>
                </div>
                <p className="text-sm text-slate-600 leading-relaxed">
                  Đặc quyền ngày 20/10: <strong className="text-emerald-700">Các bạn nữ có quyền tìm trợ giúp từ những bạn nam xung quanh</strong> để cùng thảo luận và tìm ra đáp án đúng!
                </p>
              </div>
              <div className="mt-3 pt-2.5 border-t border-emerald-100 text-xs font-semibold text-emerald-700 flex items-center gap-1.5">
                <span aria-hidden="true">🤝</span> Nam sinh 11A2 luôn sẵn sàng hỗ trợ
              </div>
            </div>
          </div>
        </div>

        {/* PART 3: PRIMARY START CTA */}
        <div className="relative z-10 flex flex-col items-center justify-center gap-1.5">
          <button
            type="button"
            data-start="true"
            onClick={(e) => {
              e.currentTarget.blur();
              onStartGame();
            }}
            className="px-8 py-3.5 rounded-2xl bg-gradient-to-r from-rose-500 to-pink-500 hover:from-rose-600 hover:to-pink-600 text-white font-extrabold text-base md:text-lg font-heading shadow-xl shadow-rose-300/80 hover:scale-103 active:scale-98 transition-all duration-200 flex items-center gap-2.5 cursor-pointer"
          >
            <span>{hasStartedBefore ? 'Quay Lại Vườn Hoa 11A2' : 'Bắt Đầu Hái Hoa Ngay'}</span>
            <span aria-hidden="true">🌸</span>
          </button>
          <span className="text-xs text-slate-400 font-medium">
            Nhấn nút hoặc bấm phím Enter / Space để vào màn hình chính
          </span>
        </div>
      </div>
    </div>
  );
}
