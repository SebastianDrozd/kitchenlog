"use client";
import Image from "next/image";
import styles from "./page.module.css";
import ProductionCard from "@/components/ProductionCard";
import { useState } from "react";
import MainContent from "@/components/MainContent";
import Navbar from "@/components/Navbar";
import { getData } from "../../data";





export default function Home() {
  const [selectedEntry, setSelectedEntry] = useState(null);
  const [selectedline, setSelectedLine] = useState(1);
  const data = getData(selectedline)
  return (
    <div className={styles.container}>
      <div className={styles.navbar}>
        <Navbar selectedline={selectedline} setSelectedLine={setSelectedLine}/>
      </div>
      <div className={styles.sidebar}> 
        {data?.map((item) => (<ProductionCard key={item.productionEntry} data={item} setSelectedEntry={setSelectedEntry} />))}
      </div>
      <div className={styles.mainContent}>  
       <MainContent data={selectedEntry} />
      </div>
    </div> 
  );
}
       