import { useRef, useState } from "react";
import SignatureCanvas from "react-signature-canvas";
import styles from "../styles/SignatureField.module.css";

export default function SignatureField() {
  const sigRef = useRef(null);
  const [open, setOpen] = useState(false);
  const [signatureDataUrl, setSignatureDataUrl] = useState("");

  const handleSave = () => {
    if (!sigRef.current || sigRef.current.isEmpty()) return;
    const dataUrl = sigRef.current.toDataURL("image/png");
    setSignatureDataUrl(dataUrl);
    setOpen(false);
  };

  const handleClear = () => sigRef.current?.clear();

  return (
    <div>
      <label className={styles.label}>Signature</label>

      <button
        type="button"
        className={styles.signBox}
        onClick={() => setOpen(true)}
      >
        {signatureDataUrl ? (
          <img className={styles.preview} src={signatureDataUrl} alt="Signature" />
        ) : (
          <span className={styles.placeholder}>Click to sign</span>
        )}
      </button>

      {open && (
        <div className={styles.backdrop} onMouseDown={() => setOpen(false)}>
          <div className={styles.modal} onMouseDown={(e) => e.stopPropagation()}>
            <div className={styles.modalHeader}>
              <h3>Sign</h3>
              <button type="button" className={styles.x} onClick={() => setOpen(false)}>×</button>
            </div>

            <div className={styles.padWrap}>
              <SignatureCanvas
                ref={sigRef}
                penColor="black"
                canvasProps={{ className: styles.pad }}
              />
            </div>

            <div className={styles.actions}>
              <button type="button" className={styles.secondary} onClick={handleClear}>
                Clear
              </button>
              <button type="button" className={styles.primary} onClick={handleSave}>
                Save
              </button>
            </div>
          </div>
        </div>
      )}

      {/* This is what you'd send to your backend */}
      <input type="hidden" name="signature" value={signatureDataUrl} />
    </div>
  );
}