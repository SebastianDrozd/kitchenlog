"use client";
import Image from "next/image";
import styles from "./page.module.css";
import ProductionCard from "@/components/ProductionCard";
import { useState } from "react";
import MainContent from "@/components/MainContent";

const data = [
  { productionEntry: "24947", itemCode: "38070" , description1 : "Boars Head Pork and Beef franks 4/1" , description2 : "Cooked WIP for FP - 28162", pounds : 5000 ,startTime : "2024-06-01T08:00:00Z", endTime : "2024-06-01T12:00:00Z" },
  { productionEntry: "24948", itemCode: "38070" , description1 : "Aldi Cocktails 4- 1" , description2 : "Cooked WIP for FP - 28162" ,pounds : 5000, startTime : "2024-06-01T08:00:00Z", endTime : "2024-06-01T12:00:00Z" },
  { productionEntry: "24949", itemCode: "38070" , description1 : "Brinkers Jalapeno Cheddar" , description2 : "Cooked WIP for FP - 28162" ,pounds : 5000 , startTime : "2024-06-01T08:00:00Z", endTime : null }, 
]


export default function Home() {
  const [selectedEntry, setSelectedEntry] = useState(null);
  return (
    <div className={styles.container}>
      <div className={styles.navbar}></div>
      <div className={styles.sidebar}> 
        {data.map((item) => (<ProductionCard key={item.productionEntry} data={item} setSelectedEntry={setSelectedEntry} />))}
      </div>
      <div className={styles.mainContent}>  
       <MainContent data={selectedEntry} />
      </div>
    </div> 
  );
}
       