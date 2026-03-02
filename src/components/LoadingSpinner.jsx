import styles from "../styles/LoadingSpinner.module.css";

export default function LoadingSpinner({
  label = "Loading…",
  fullScreen = false,
  size = "md", // "sm" | "md" | "lg"
}) {
  const sizeClass =
    size === "sm" ? styles.sm : size === "lg" ? styles.lg : styles.md;

  return (
    <div className={`${styles.wrap} ${fullScreen ? styles.fullScreen : ""}`}>
      <div className={styles.card}>
        <div className={`${styles.spinner} ${sizeClass}`} aria-hidden="true" />
        {label ? <div className={styles.label}>{label}</div> : null}
      </div>
    </div>
  );
}