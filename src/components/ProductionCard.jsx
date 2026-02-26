import { AlarmClock, CircleCheck } from "lucide-react";
import styles from "../styles/ProductionCard.module.css"
const ProductionCard = ({ data, setSelectedEntry }) => {
    console.log("Data is productionCard", data)
    return (
        <div className={styles.cardContainer} onClick={() => setSelectedEntry(data)}>
            <div className={styles.cardHeader}>
                {data.endTime ? <CircleCheck color="green" /> : <AlarmClock color="orange" />}
                <h3> {data?.productionEntry} - {data?.itemCode}</h3>
            </div>
            <p className={styles.description}>{data?.description1}</p>
            <p className={styles.description}>{data?.description2}</p>
            <div className={styles.timeRow}>
                <div className={styles.timeCell}>{new Date(data?.startTime).toLocaleTimeString()}</div>
                <div className={styles.timeCell}>{data?.endTime ? new Date(data?.endTime).toLocaleTimeString() : "Not completed"}</div>
            </div>

        </div>
    );
}

export default ProductionCard;  