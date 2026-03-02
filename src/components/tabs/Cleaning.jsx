import SignatureField from "../SignatureField";
import styles from "../../styles/tabs/Cleaning.module.css"
import { useEffect, useState } from "react";
import { useMutation, useQuery } from "@tanstack/react-query";
import { createCleaningEntry, getCleaningEntryForLine } from "@/api/KitchenLog";
const Cleaning = ({ data, selectedline }) => {
    const [cleaned, setCleaned] = useState("no");
    const [signatureDataUrl, setSignatureDataUrl] = useState("");
    const [cleaningReason, setCleaningReason] = useState("");

    const {isLoading,isError,data : cleaningData} = useQuery({
        queryKey: ["cleaningData", selectedline],
        queryFn: () => getCleaningEntryForLine(selectedline)
    })

    const handleCleaningChange = (e) => {
        setCleaned(e.target.value);
    }

    const handleSaveSignature = () => {
       const cleaningData = {
        Line : selectedline,
        Reason: cleaningReason,
        SignatureDataUrl: signatureDataUrl
       }
        saveMutation.mutate(cleaningData);
    }
    const saveMutation = useMutation({
        mutationFn: (cleaningData) => createCleaningEntry(cleaningData),
        onSuccess: () => {
            console.log("Cleaning entry created successfully");
        },
        onError: (error) => {
            console.error("Error creating cleaning entry:", error);
        }
    });

    useEffect(() => {
        
        if (cleaningData && cleaningData.length > 0) {
            setCleaned("yes")
            setCleaningReason(cleaningData[0].Reason || "");
        }
        else{
            setCleaned("no")
            setCleaningReason("");
        }
    },[cleaningData])
    console.log("cleaning data", cleaningData)
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
                    <select onChange={handleCleaningChange} className={styles.control} id="cleaningTasks" name="cleaningTasks" value={cleaned}>
                        <option value="no">No</option>
                        <option value="yes">Yes</option>
                    </select>
                </div>
                {cleaned === "yes" ? (
                    <>
                        <div className={styles.field}>  
                            <label className={styles.label} htmlFor="cleaningDetails">Cleaning Details</label>
                            <textarea value={cleaningReason} onChange={(e) =>setCleaningReason(e.target.value)} className={styles.textarea} id="cleaningDetails" name="cleaningDetails" rows="4" placeholder="Describe the cleaning tasks performed..."></textarea>
                        </div>
                        
                    </>
                ) : ""}
            </div>
        </div>
    )
}

export default Cleaning;