import { AlarmClock, CircleCheck } from "lucide-react";
import styles from "../styles/ProductionCard.module.css"
const ProductionCard = ({ data, setSelectedEntry }) => {
    console.log("Data is productionCard", data)
    return (
        <div className={styles.cardContainer} onClick={() => setSelectedEntry(data)}>
            <div className={styles.cardHeader}>
                {data.EndTime ? <CircleCheck color="green" /> : <AlarmClock color="orange" />}
                <h3> {data?.ProductionEntry} - {data?.FormulaCode}</h3>
            </div>
            <p className={styles.description}>{data?.Description1}</p>
            <p className={styles.description}>{data?.Description2}</p>
            <div className={styles.timeRow}>
                <div className={styles.timeCell}>
                    {data?.StartTime
                        ? data.StartTime.slice(0, 5)
                        : "Not started"}
                </div>

                <div className={styles.timeCell}>
                    {data?.EndTime
                        ? data.EndTime.slice(0, 5)
                        : "Not completed"}
                </div>
            </div>

        </div>
    );
}

export default ProductionCard;  