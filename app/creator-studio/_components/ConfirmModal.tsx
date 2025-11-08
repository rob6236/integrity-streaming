"use client";

export default function ConfirmModal({
  open = false,
  title = "Confirm",
  message = "Are you sure?",
  confirmText = "OK",
  cancelText = "Cancel",
  onConfirm,
  onCancel,
}: {
  open?: boolean;
  title?: string;
  message?: string;
  confirmText?: string;
  cancelText?: string;
  onConfirm?: () => void;
  onCancel?: () => void;
}) {
  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      <div className="absolute inset-0 bg-black/60" onClick={onCancel} />
      <div className="relative z-10 w-[min(92vw,480px)] rounded-2xl border border-yellow-400 bg-[rgba(0,0,0,0.2)] p-4 text-white">
        <h3 className="text-lg font-bold mb-2">{title}</h3>
        <p className="mb-4 opacity-90">{message}</p>
        <div className="flex justify-end gap-2">
          <button
            type="button"
            className="px-3 py-2 rounded-xl border border-yellow-400"
            onClick={onCancel}
          >
            {cancelText}
          </button>
          <button
            type="button"
            className="px-3 py-2 rounded-xl border border-yellow-400"
            onClick={onConfirm}
          >
            {confirmText}
          </button>
        </div>
      </div>
    </div>
  );
}
