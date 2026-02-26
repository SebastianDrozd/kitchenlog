import { useEffect, useRef, useState } from "react";
import { BrowserMultiFormatReader } from "@zxing/browser";
import styles from "../styles/BarcodeScannerModal.module.css";
import { QueryClient, useMutation } from "@tanstack/react-query";
import { createLineEntry } from "@/api/KitchenLog";

export default function BarcodeScannerModal({ open, onClose, onScan , scannedCode, setScannedCode,selectedline}) {
     const queryClient = new QueryClient();
    const mutation = useMutation({
        mutationFn : (data) => createLineEntry(data),
        onSuccess: () => {

        } 
    });
  const videoRef = useRef(null);
  const readerRef = useRef(null);
  const [error, setError] = useState("");

  useEffect(() => {
   

    if (!open) return;
    let stopped = false;
    const start = async () => {
      setError("");
      try {
        readerRef.current = new BrowserMultiFormatReader();
        // Start decoding from camera continuously.
        // `facingMode: "environment"` asks for the back camera on phones.
        // (Camera access requires HTTPS or localhost.)
        await readerRef.current.decodeFromConstraints(
          { video: { facingMode: "environment" } },
          videoRef.current,
          (result, err) => {
            if (stopped) return;

            if (result) {
              // result.getText() is the barcode value
              const data = {
                Entry : result.getText(),
                Line : selectedline,
                Timestamp : new Date().toISOString()
              }
                mutation.mutate(data)
              setScannedCode(result.getText());
              onScan(result.getText());
              onClose();
            }
            // ignore "not found" decode errors while scanning
          }
        );
      } catch (e) {
        setError(
          e?.name === "NotAllowedError"
            ? "Camera permission denied."
            : "Could not start camera scanner."
        );
      }
    };

    start();

    return () => {
      stopped = true;
      try {
        readerRef.current?.reset(); // stops camera + decoding
      } catch {}
    };
  }, [open, onClose, onScan]);

  if (!open) return null;

  return (
    <div className={styles.backdrop} onMouseDown={onClose}>
      <div className={styles.modal} onMouseDown={(e) => e.stopPropagation()}>
        <div className={styles.header}>
          <div>
            <div className={styles.title}>Scan Line Barcode</div>
            <div className={styles.sub}>Point the camera at the barcode.</div>
          </div>
          <button className={styles.close} onClick={onClose} type="button">
            ×
          </button>
        </div>

        <div className={styles.videoWrap}>
          <video ref={videoRef} className={styles.video} muted playsInline />
          <div className={styles.overlay} />
          <div className={styles.hint}>Align barcode inside the box</div>
        </div>

        {error && <div className={styles.error}>{error}</div>}

        <div className={styles.actions}>
          <button className={styles.secondary} onClick={onClose} type="button">
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
}