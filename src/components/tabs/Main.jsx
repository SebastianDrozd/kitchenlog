// Main.jsx
import styles from "../../styles/tabs/Main.module.css";

const Main = () => {
  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <div>
          <h2 className={styles.title}>Line Setup</h2>
          <p className={styles.subtitle}>Enter crew + run times and record output.</p>
        </div>
      </div>

      <div className={styles.grid}>
        <div className={styles.field}>
          <label className={styles.label} htmlFor="stdcrew">Standard Crew</label>
          <select className={styles.control} id="stdcrew" defaultValue="1">
            <option value="1">1</option>
            <option value="2">2</option>
            <option value="3">3</option>
            <option value="4">4</option>
          </select>
        </div>

        <div className={styles.field}>
          <label className={styles.label} htmlFor="starttime">Line Start Time</label>
          <input className={styles.control2} type="time" id="starttime" name="starttime" />
        </div>

        <div className={styles.field}>
          <label className={styles.label} htmlFor="endtime">Line End Time</label>
          <input className={styles.control2} type="time" id="endtime" name="endtime" />
        </div>

        <div className={styles.field}>
          <label className={styles.label} htmlFor="sticks">Sticks Stuffed</label>
          <input className={styles.control} type="number" id="sticks" name="sticks" placeholder="0" min="0" />
        </div>
        <div className={styles.field}>
          <label className={styles.label} htmlFor="sticks">Weight Of Stick</label>
          <input className={styles.control} type="number" id="sticks" name="sticks" placeholder="0" min="0" />
        </div>

        <div className={styles.statCard}>
          <div className={styles.statLabel}>Pounds Stuffed</div>
          <div className={styles.statValue}>1000 <span className={styles.statUnit}>lbs</span></div>
        </div>
      </div>
    </div>
  );
};

export default Main;