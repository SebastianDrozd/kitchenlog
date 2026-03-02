import { AlarmClock, CircleCheck } from "lucide-react";
import styles from "../styles/ProductionCard.module.css";

const ProductionCard = ({ data, setSelectedEntry }) => {
  const isComplete = !!data?.EndTime;

  const formatTime = (t) => (t ? String(t).slice(0, 5) : null);

  return (
    <button
      type="button"
      className={`${styles.card} ${isComplete ? styles.complete : styles.running}`}
      onClick={() => setSelectedEntry(data)}
    >
      <div className={styles.top}>
        <div className={styles.headerLeft}>
          <span className={styles.statusIcon}>
            {isComplete ? <CircleCheck size={18} /> : <AlarmClock size={18} />}
          </span>

          <div className={styles.titleWrap}>
            <div className={styles.title}>
              <span className={styles.entry}>{data?.ProductionEntry}</span>
              <span className={styles.sep}>•</span>
              <span className={styles.code}>{data?.FormulaCode}</span>
            </div>
            <div className={styles.subTitle}>
              {isComplete ? "Completed" : "In progress"}
            </div>
          </div>
        </div>

        <span className={styles.chev}>›</span>
      </div>

      <div className={styles.descBlock}>
        {data?.Description1 && <div className={styles.desc}>{data.Description1}</div>}
        {data?.Description2 && <div className={styles.descMuted}>{data.Description2}</div>}
      </div>

      <div className={styles.metaRow}>
        <div className={styles.pill}>
          <span className={styles.pillLabel}>Start</span>
          <span className={styles.pillValue}>{formatTime(data?.StartTime) ?? "—"}</span>
        </div>

        <div className={styles.pill}>
          <span className={styles.pillLabel}>End</span>
          <span className={styles.pillValue}>{formatTime(data?.EndTime) ?? "—"}</span>
        </div>
      </div>
    </button>
  );
};

export default ProductionCard;