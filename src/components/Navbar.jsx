import { useEffect, useRef, useState } from "react";
import styles from "../styles/Navbar.module.css";
import BarcodeScannerModal from "./BarcodeScannerModal";

const lines = [1, 2, 3, 4, 5, 6, 7];

const Navbar = ({ selectedline, setSelectedLine, scannedCode, setScannedCode }) => {
  const [scannerOpen, setScannerOpen] = useState(false);

  // Setup popover state + form
  const [setupOpen, setSetupOpen] = useState(false);
  const [setupForm, setSetupForm] = useState({
    crew: "",
    setupStart: "",
    setupEnd: "",
    notes: "",
  });

  const setupWrapRef = useRef(null);

  const handleLineSelect = (item) => {
    setSelectedLine(item);
    setSetupOpen(false); // optional: close when line changes
  };

  const updateSetup = (key) => (e) => {
    setSetupForm((prev) => ({ ...prev, [key]: e.target.value }));
  };

  const handleSetupSave = () => {
    // Replace with mutation later
    console.log("Saving setup:", { line: selectedline, ...setupForm });
    setSetupOpen(false);
  };

  // click-outside to close
  useEffect(() => {
    const onDown = (e) => {
      if (!setupOpen) return;
      if (setupWrapRef.current && !setupWrapRef.current.contains(e.target)) {
        setSetupOpen(false);
      }
    };
    window.addEventListener("mousedown", onDown);
    return () => window.removeEventListener("mousedown", onDown);
  }, [setupOpen]);

  return (
    <div className={styles.container}>
      <div className={styles.left}>
        <div className={styles.kicker}>Production</div>
        <h1 className={styles.title}>Kitchen Log</h1>
        <span className={styles.date}>{new Date().toDateString()}</span>
      </div>

      <div className={styles.rightSection}>
        <div className={styles.panel}>
          <div className={styles.lineRow}>
            <div className={styles.lineSelector}>
              {lines.map((item) => (
                <button
                  key={item}
                  onClick={() => handleLineSelect(item)}
                  className={selectedline == item ? styles.active : styles.lineButton}
                  type="button"
                >
                  {item}
                </button>
              ))}
            </div>

            <button
              onClick={() => setScannerOpen(true)}
              className={styles.addLineButton}
              type="button"
              title="Scan barcode"
            >
              +
            </button>

            {/* Setup dropdown anchored under this */}
            <div className={styles.setupWrap} ref={setupWrapRef}>
              <button
                type="button"
                className={styles.setupButton}
                onClick={() => setSetupOpen((v) => !v)}
              >
                Setup
              </button>

              {setupOpen && (
                <div className={styles.setupPopover}>
                  <div className={styles.setupTitle}>
                    Line {selectedline ?? "—"} Setup
                  </div>

                  <div className={styles.setupGrid}>
                    <div className={styles.setupField}>
                      <label className={styles.setupLabel}>Crew</label>
                      <input
                        className={styles.setupInput}
                        value={setupForm.crew}
                        onChange={updateSetup("crew")}
                        placeholder="e.g. 4"
                      />
                    </div>

                    <div className={styles.setupField}>
                      <label className={styles.setupLabel}>Setup Start</label>
                      <input
                        className={styles.setupInput}
                        type="time"
                        value={setupForm.setupStart}
                        onChange={updateSetup("setupStart")}
                      />
                    </div>

                    <div className={styles.setupField}>
                      <label className={styles.setupLabel}>Setup End</label>
                      <input
                        className={styles.setupInput}
                        type="time"
                        value={setupForm.setupEnd}
                        onChange={updateSetup("setupEnd")}
                      />
                    </div>

                    <div className={styles.setupFieldFull}>
                      <label className={styles.setupLabel}>Notes</label>
                      <input
                        className={styles.setupInput}
                        value={setupForm.notes}
                        onChange={updateSetup("notes")}
                        placeholder="Optional notes"
                      />
                    </div>
                  </div>

                  <div className={styles.setupActions}>
                    <button
                      type="button"
                      className={styles.setupSecondary}
                      onClick={() => setSetupOpen(false)}
                    >
                      Cancel
                    </button>
                    <button
                      type="button"
                      className={styles.setupPrimary}
                      onClick={handleSetupSave}
                      disabled={!selectedline}
                      title={!selectedline ? "Select a line first" : ""}
                    >
                      Save
                    </button>
                  </div>
                </div>
              )}
            </div>

            <BarcodeScannerModal
              selectedline={selectedline}
              scannedCode={scannedCode}
              setScannedCode={setScannedCode}
              open={scannerOpen}
              onClose={() => setScannerOpen(false)}
              onScan={(value) => {
                console.log("Scanned barcode:", value);
              }}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Navbar;