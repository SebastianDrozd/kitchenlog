import { useState } from "react";
import styles from "../styles/MainContent.module.css"
import Main from "./tabs/Main";
import Cleaning from "./tabs/Cleaning";
import DownTime from "./tabs/DownTime";
const MainContent = ({ data,scannedCode }) => {
    const tabs = [
        "Main",
        "Cleaning",
        "Downtime"
    ]
    const [activeTab, setActiveTab] = useState("Main");
    
    return (
        <div className="main-content">
            {data ? (
                <div>
                    <h2>{data.description1}</h2>
                    <p>{data.description2}</p>
                    <div></div>
                    <div className={styles.buttonRow}>
                        {tabs.map((tab) => (<button onClick={() => setActiveTab(tab)} key={tab} className={styles.button}>{tab}</button>))}
                    </div>
                    <div className={styles.tabContent}>
                        {activeTab === "Main" && <Main/>}
                        {activeTab === "Cleaning" && <Cleaning/>}
                        {activeTab === "Downtime" && <DownTime/>}
                    </div>
                </div>)
                :
                <div className={styles.noContent}>
                  {scannedCode}
                </div>}
        </div>
    );
}

export default MainContent;