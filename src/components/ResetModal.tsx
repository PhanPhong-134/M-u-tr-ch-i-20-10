interface ResetModalProps {
  isOpen: boolean;
  onConfirm: () => void;
  onCancel: () => void;
}

export function ResetModal({ isOpen, onConfirm, onCancel }: ResetModalProps) {
  if (!isOpen) return null;

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="reset-modal-title"
      className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-sm flex items-center justify-center p-4"
    >
      <div className="bg-white rounded-3xl max-w-md w-full p-7 shadow-2xl border-2 border-rose-200 relative modal-enter text-center">
        <div
          className="w-16 h-16 mx-auto mb-3 bg-rose-100 text-rose-500 rounded-2xl flex items-center justify-center text-3xl"
          aria-hidden="true"
        >
          🌸
        </div>
        <h3
          id="reset-modal-title"
          className="text-xl font-extrabold text-slate-800 font-heading mb-2"
        >
          Làm mới lại vườn hoa?
        </h3>
        <p className="text-sm text-slate-600 mb-6 leading-relaxed">
          Bạn có chắc chắn muốn làm mới lại vườn hoa 11A2 và bắt đầu lại trò chơi từ đầu không?
        </p>
        <div className="flex items-center justify-center gap-3">
          <button
            type="button"
            onClick={onCancel}
            className="flex-1 py-3 px-4 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 font-semibold text-sm transition-colors cursor-pointer"
          >
            Hủy bỏ
          </button>
          <button
            type="button"
            onClick={onConfirm}
            className="flex-1 py-3 px-4 rounded-xl bg-gradient-to-r from-rose-500 to-pink-500 hover:from-rose-600 hover:to-pink-600 text-white font-bold text-sm shadow-md shadow-rose-200 transition-all cursor-pointer"
          >
            Đồng ý làm mới
          </button>
        </div>
      </div>
    </div>
  );
}
