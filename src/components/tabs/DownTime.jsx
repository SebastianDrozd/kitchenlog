import styles from "../../styles/tabs/DownTime.module.css";
import { useMemo, useState } from "react";

const DownTime = () => {
  const [downTimeEntries, setDownTimeEntries] = useState([]);
  const [showForm, setShowForm] = useState(false);

  // helpers for <input type="datetime-local" />
  const toLocalInputValue = (date = new Date()) => {
    const pad = (n) => String(n).padStart(2, "0");
    const yyyy = date.getFullYear();
    const mm = pad(date.getMonth() + 1);
    const dd = pad(date.getDate());
    const hh = pad(date.getHours());
    const min = pad(date.getMinutes());
    return `${yyyy}-${mm}-${dd}T${hh}:${min}`;
  };

  const [newDownTimeEntry, setNewDownTimeEntry] = useState({
    reason: "maintenance",
    description: "",
    shutdownTime: toLocalInputValue(new Date()),
    startupTime: "",
  });

  const openForm = () => setShowForm(true);

  const closeForm = () => {
    setShowForm(false);
    setNewDownTimeEntry({
      reason: "maintenance",
      description: "",
      shutdownTime: toLocalInputValue(new Date()),
      startupTime: "",
    });
  };

  const addDownTimeEntry = () => {
    const shutdown = newDownTimeEntry.shutdownTime
      ? new Date(newDownTimeEntry.shutdownTime).toISOString()
      : null;

    const startup = newDownTimeEntry.startupTime
      ? new Date(newDownTimeEntry.startupTime).toISOString()
      : null;

    const entry = {
      id: crypto?.randomUUID?.() ?? String(Date.now()),
      reason: newDownTimeEntry.reason,
      description: newDownTimeEntry.description.trim(),
      shutdownTime: shutdown,
      startupTime: startup,
      createdAt: new Date().toISOString(),
    };

    setDownTimeEntries((prev) => [entry, ...prev]);
    closeForm();
  };

  const handleChange = (key) => (e) => {
    setNewDownTimeEntry((prev) => ({ ...prev, [key]: e.target.value }));
  };

  const hasEntries = downTimeEntries.length > 0;

  const formatDT = (iso) =>
    iso
      ? new Date(iso).toLocaleString([], {
          month: "2-digit",
          day: "2-digit",
          year: "numeric",
          hour: "2-digit",
          minute: "2-digit",
        })
      : "—";

  const calcMinutes = (startIso, endIso) => {
    if (!startIso || !endIso) return null;
    const a = new Date(startIso).getTime();
    const b = new Date(endIso).getTime();
    if (Number.isNaN(a) || Number.isNaN(b)) return null;
    const diff = Math.round((b - a) / 60000);
    return diff >= 0 ? diff : null;
  };

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <div>
          <h2 className={styles.title}>Down Time</h2>
          <p className={styles.subtitle}>
            Log downtime events with reason, shutdown/startup time, and notes.
          </p>
        </div>

        {!showForm && (
          <button type="button" className={styles.primaryBtn} onClick={openForm}>
            + Add downtime
          </button>
        )}
      </div>

      {/* List */}
      {hasEntries && !showForm && (
        <div className={styles.list}>
          {downTimeEntries.map((e) => {
            const minutes = calcMinutes(e.shutdownTime, e.startupTime);
            return (
              <div key={e.id} className={styles.entryCard}>
                <div className={styles.entryTop}>
                  <span className={`${styles.badge} ${styles[e.reason] || ""}`}>
                    {e.reason}
                  </span>

                  <span className={styles.time}>
                    Logged: {formatDT(e.createdAt)}
                  </span>
                </div>

                <div className={styles.timeGrid}>
                  <div className={styles.timeBlock}>
                    <div className={styles.timeLabel}>Shutdown</div>
                    <div className={styles.timeValue}>{formatDT(e.shutdownTime)}</div>
                  </div>

                  <div className={styles.timeBlock}>
                    <div className={styles.timeLabel}>Startup</div>
                    <div className={styles.timeValue}>{formatDT(e.startupTime)}</div>
                  </div>

                  <div className={styles.timeBlock}>
                    <div className={styles.timeLabel}>Duration</div>
                    <div className={styles.timeValue}>
                      {minutes === null ? "—" : `${minutes} min`}
                    </div>
                  </div>
                </div>

                {e.description ? (
                  <div className={styles.entryDesc}>{e.description}</div>
                ) : (
                  <div className={styles.entryDescMuted}>No description</div>
                )}
              </div>
            );
          })}
        </div>
      )}

      {/* Form */}
      {showForm && (
        <div className={styles.formCard}>
          <div className={styles.formHeader}>
            <div className={styles.formTitle}>New downtime event</div>
            <button
              type="button"
              className={styles.secondaryBtn}
              onClick={closeForm}
            >
              Cancel
            </button>
          </div>

          <div className={styles.formGrid}>
            <div className={styles.field}>
              <label className={styles.label} htmlFor="downtimeReason">
                Reason
              </label>
              <select
                className={styles.control}
                id="downtimeReason"
                value={newDownTimeEntry.reason}
                onChange={handleChange("reason")}
              >
                <option value="maintenance">Maintenance</option>
                <option value="breakdown">Breakdown</option>
                <option value="other">Other</option>
              </select>
            </div>

            <div className={styles.field}>
              <label className={styles.label} htmlFor="shutdownTime">
                Shutdown time
              </label>
              <input
                id="shutdownTime"
                className={styles.control2}
                type="datetime-local"
                value={newDownTimeEntry.shutdownTime}
                onChange={handleChange("shutdownTime")}
              />
            </div>

            <div className={styles.field}>
              <label className={styles.label} htmlFor="startupTime">
                Startup time
              </label>
              <input
                id="startupTime"
                className={styles.control2}
                type="datetime-local"
                value={newDownTimeEntry.startupTime}
                onChange={handleChange("startupTime")}
              />
            </div>
          </div>

          <div className={styles.field}>
            <label className={styles.label} htmlFor="downtimeDescription">
              Description
            </label>
            <textarea
              id="downtimeDescription"
              className={styles.textarea}
              rows="4"
              value={newDownTimeEntry.description}
              placeholder="Describe what happened, what was done, who was notified, etc."
              onChange={handleChange("description")}
            />
          </div>

          <div className={styles.actions}>
            <button
              type="button"
              className={styles.secondaryBtn}
              onClick={closeForm}
            >
              Cancel
            </button>

            <button
              type="button"
              className={styles.primaryBtn}
              onClick={addDownTimeEntry}
              disabled={!newDownTimeEntry.shutdownTime}
              title={!newDownTimeEntry.shutdownTime ? "Shutdown time required" : ""}
            >
              Add entry
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default DownTime;