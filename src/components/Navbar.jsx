import { useState } from "react";
import styles from "../styles/Navbar.module.css";
import BarcodeScannerModal from "./BarcodeScannerModal";

const lines = [1, 2, 3, 4, 5, 6, 7];

const Navbar = ({selectedline,setSelectedLine,scannedCode,setScannedCode}) => {
  
const [scannerOpen, setScannerOpen] = useState(false);
    const handleLineSelect = (item) => {
        setSelectedLine(item)
    }
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
                <button key={item} onClick={() => handleLineSelect(item)} className={selectedline == item ? styles.active : styles.lineButton}>
                  {item}
                </button>
              ))}
            </div>

            <button onClick={() => setScannerOpen(true)} className={styles.addLineButton}>
              + 
            </button>
              <BarcodeScannerModal selectedline={selectedline} scannedCode={scannedCode} setScannedCode={setScannedCode}
        open={scannerOpen}
        onClose={() => setScannerOpen(false)}
        onScan={(value) => {
          console.log("Scanned barcode:", value);
          // later: look up line by barcode, or add it to state, etc.
        }}
      />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Navbar;