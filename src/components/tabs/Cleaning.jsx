import SignatureField from "../SignatureField";
import styles from "../../styles/tabs/Cleaning.module.css"
import { useState } from "react";
const Cleaning = () => {
    const [cleaned, setCleaned] = useState("no");


    const handleCleaningChange = (e) => {
        setCleaned(e.target.value);
    }
    return (
        <div className={styles.container}>
            <div className={styles.header}>
                <div>
                    <h2 className={styles.title}>Cleaning Information</h2>
                    <p className={styles.subtitle}>Enter details about cleaning tasks and procedures.</p>
                </div>
            </div>
            <div className={styles.grid}>
                <div className={styles.field}>
                    <label className={styles.label} htmlFor="cleaningTasks">Has equipment been cleaned?</label>
                    <select onChange={handleCleaningChange} className={styles.control} id="cleaningTasks" defaultValue="no">
                        <option value="no">No</option>
                        <option value="yes">Yes</option>
                    </select>
                </div>
                {cleaned === "yes" ? (
                    <>
                        <div className={styles.field}>  
                            <label className={styles.label} htmlFor="cleaningDetails">Cleaning Details</label>
                            <textarea className={styles.textarea} id="cleaningDetails" name="cleaningDetails" rows="4" placeholder="Describe the cleaning tasks performed..."></textarea>
                        </div>
                        <div className={styles.field}>
                            <label className={styles.label} htmlFor="cleaningSignature">Supervisor Signature</label>
                            <SignatureField id="cleaningSignature" />
                        </div>
                    </>
                ) : ""}
            </div>
        </div>
    )
}

export default Cleaning;