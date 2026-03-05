import { useEffect } from "react";
import styles from "../styles/ConfirmDeleteModal.module.css";

export default function ConfirmDeleteModal({
  open,
  title = "Delete entry?",
  message = "This will permanently delete this production entry. This action cannot be undone.",
  confirmText = "Delete",
  cancelText = "Cancel",
  danger = true,
  loading = false,
  onConfirm,
  onCancel,
}) {
  useEffect(() => {
    if (!open) return;

    const onKeyDown = (e) => {
      if (e.key === "Escape") onCancel?.();
      if (e.key === "Enter") onConfirm?.();
    };

    document.addEventListener("keydown", onKeyDown);
    document.body.style.overflow = "hidden";

    return () => {
      document.removeEventListener("keydown", onKeyDown);
      document.body.style.overflow = "";
    };
  }, [open, onCancel, onConfirm]);

  if (!open) return null;

  return (
    <div className={styles.backdrop} role="dialog" aria-modal="true" aria-label={title}>
      <div className={styles.modal}>
        <div className={styles.header}>
          <div className={`${styles.icon} ${danger ? styles.dangerIcon : ""}`}>
            {/* warning icon */}
            <svg viewBox="0 0 24 24" aria-hidden="true">
              <path d="M12 2 1 21h22L12 2zm0 7c.55 0 1 .45 1 1v5a1 1 0 1 1-2 0v-5c0-.55.45-1 1-1zm0 10a1.25 1.25 0 1 0 0-2.5A1.25 1.25 0 0 0 12 19z" />
            </svg>
          </div>

          <div className={styles.headerText}>
            <div className={styles.title}>{title}</div>
            <div className={styles.message}>{message}</div>
          </div>
        </div>

        <div className={styles.actions}>
          <button
            type="button"
            className={styles.cancelBtn}
            onClick={onCancel}
            disabled={loading}
          >
            {cancelText}
          </button>

          <button
            type="button"
            className={`${styles.confirmBtn} ${danger ? styles.dangerBtn : ""}`}
            onClick={onConfirm}
            disabled={loading}
          >
            {loading ? <span className={styles.btnSpinner} aria-hidden="true" /> : null}
            {loading ? "Deleting…" : confirmText}
          </button>
        </div>

        {/* click outside to close */}
        <button
          type="button"
         
          onClick={onCancel}
          aria-label="Close dialog"
        />
      </div>
    </div>
  );
}

