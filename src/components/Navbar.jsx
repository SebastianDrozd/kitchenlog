import { useEffect, useRef, useState } from "react";
import styles from "../styles/Navbar.module.css";
import BarcodeScannerModal from "./BarcodeScannerModal";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { CreateSetup, DownloadKitchenLogExport, GetSetupForLine, updateSetupForLine } from "@/api/KitchenLog";
import toast from "react-hot-toast";
const lines = [1, 2, 3, 4, 5, 6, 7];

const Navbar = ({ selectedline, setSelectedLine, scannedCode, setScannedCode }) => {
  const [scannerOpen, setScannerOpen] = useState(false);
  const queryClient = useQueryClient();
  // Export popover state + form
  const [exportOpen, setExportOpen] = useState(false);
  const [exportRange, setExportRange] = useState({
    startDate: "",
    endDate: "",
  });

  const exportWrapRef = useRef(null);

  const updateExport = (key) => (e) => {
    setExportRange((prev) => ({ ...prev, [key]: e.target.value }));
  };
  const { isLoading, data: setupData } = useQuery({
    queryKey: ["setupData", selectedline],
    queryFn: () => GetSetupForLine(selectedline),

  })

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
  useEffect(() => {
    const onDown = (e) => {
      if (!exportOpen) return;
      if (exportWrapRef.current && !exportWrapRef.current.contains(e.target)) {
        setExportOpen(false);
      }
    };
    window.addEventListener("mousedown", onDown);
    return () => window.removeEventListener("mousedown", onDown);
  }, [exportOpen]);
  useEffect(() => {
    if (setupData) {
      setSetupForm({
        crew: setupData[0]?.StandardCrew ?? "",
        setupStart: setupData[0]?.LineStart ?? "",
        setupEnd: setupData[0]?.LineFinish ?? "",
        notes: setupData[0]?.Notes ?? ""
      })
    }
  }, [setupData])

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

  const saveMutation = useMutation({
    mutationFn: (data) => CreateSetup(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["setupData", selectedline] }),
        toast.success("Setup created successfully")
    }
  })

  const updateMutation = useMutation({
    mutationFn: (data) => updateSetupForLine(selectedline, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["setupData", selectedline] }),
        toast.success("Setup updated successfully")
    }
  })

  const handleSetupSave = () => {
    if (!selectedline) return;

    const dataToSave = {
      Line: selectedline,
      StandardCrew: Number(setupForm.crew),
      LineStart: setupForm.setupStart,
      LineFinish: setupForm.setupEnd,
      Notes: setupForm.notes
    }
    console.log("Data to save for setup", dataToSave)
    if (setupData) {
      updateMutation.mutate(dataToSave)
    } else {
      saveMutation.mutate(dataToSave)
    }
  };


  const handleBarCodeScan = (value) => {
    console.log("Scanned barcode:", value);
  }
  const handleExport = async () => {
  const { startDate, endDate } = exportRange;

  if (!startDate || !endDate) {
    toast.error("Select a start and end date");
    return;
  }

  if (startDate > endDate) {
    toast.error("Start date must be before end date");
    return;
  }

  try {
  
    await DownloadKitchenLogExport(startDate, endDate);
    toast.success("Download started");
  } catch (err) {
    console.error(err);
    toast.error("Export failed");
  }
};
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
              {/* Export dropdown anchored under this */}
              <div className={styles.exportWrap} ref={exportWrapRef}>
                <button
                  type="button"
                  className={styles.exportButton}
                  onClick={() => setExportOpen((v) => !v)}
                >
                  Export
                </button>

                {exportOpen && (
                  <div className={styles.exportPopover}>
                    <div className={styles.exportTitle}>
                     
                    </div>

                    <div className={styles.exportGrid}>
                      <div className={styles.exportField}>
                        <label className={styles.exportLabel}>Start Date</label>
                        <input
                          className={styles.exportInput}
                          type="date"
                          value={exportRange.startDate}
                          onChange={updateExport("startDate")}
                        />
                      </div>

                      <div className={styles.exportField}>
                        <label className={styles.exportLabel}>End Date</label>
                        <input
                          className={styles.exportInput}
                          type="date"
                          value={exportRange.endDate}
                          onChange={updateExport("endDate")}
                        />
                      </div>
                    </div>

                    <div className={styles.exportActions}>
                      <button
                        type="button"
                        className={styles.exportSecondary}
                        onClick={() => setExportOpen(false)}
                      >
                        Cancel
                      </button>

                      <button
                        type="button"
                        className={styles.exportPrimary}
                        onClick={handleExport}
                        disabled={!selectedline}
                        title={!selectedline ? "Select a line first" : ""}
                      >
                        Download Excel
                      </button>
                    </div>
                  </div>
                )}
              </div>
            </div>

            <BarcodeScannerModal
              selectedline={selectedline}
              scannedCode={scannedCode}
              setScannedCode={setScannedCode}
              open={scannerOpen}
              onClose={() => setScannerOpen(false)}
              onScan={handleBarCodeScan}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Navbar;