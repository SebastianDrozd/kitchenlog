"use client";
import Image from "next/image";
import styles from "./page.module.css";
import ProductionCard from "@/components/ProductionCard";
import { useEffect, useState } from "react";
import MainContent from "@/components/MainContent";
import Navbar from "@/components/Navbar";
import { getData } from "../../data";
import { useQuery } from "@tanstack/react-query";
import { getActiveEntries } from "@/api/KitchenLog";





export default function Home() {
  const [selectedEntry, setSelectedEntry] = useState(null);
  const [selectedline, setSelectedLine] = useState(1);
  const [scannedCode, setScannedCode] = useState(null);

  const {isPending,isError,data} =useQuery({
  queryKey : ["productionData",selectedline],
  queryFn : () => getActiveEntries(selectedline)
  })

  useEffect(() => {
    if (data) {
      setSelectedEntry(data[0])
    }
  }, [selectedline,data])

console.log("this is data", data)
  return (
    <div className={styles.container}>
      <div className={styles.navbar}>
        <Navbar selectedline={selectedline} setSelectedLine={setSelectedLine} scannedCode={scannedCode} setScannedCode={setScannedCode} />
      </div>
      <div className={styles.sidebar}>
        {data?.map((item) => (<ProductionCard key={item.Id} data={item} setSelectedEntry={setSelectedEntry} />))}
      </div>
      <div className={styles.mainContent}>
        <MainContent data={selectedEntry} scannedCode={scannedCode} selectedline={selectedline} />
      </div>
    </div>
  );
}
