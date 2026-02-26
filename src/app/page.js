"use client";
import Image from "next/image";
import styles from "./page.module.css";
import ProductionCard from "@/components/ProductionCard";
import { useState } from "react";
import MainContent from "@/components/MainContent";
import Navbar from "@/components/Navbar";
import { getData } from "../../data";

import useSWR from "swr";
import { useQuery } from "@tanstack/react-query";





export default function Home() {
  const [selectedEntry, setSelectedEntry] = useState(null);
  const [selectedline, setSelectedLine] = useState(1);
  const [scannedCode, setScannedCode] = useState(null);

  const {isPending,isError,data} =useQuery({
  queryKey : ["productionData",selectedline],
  queryFn : () => getData(selectedline)
  })


  return (
    <div className={styles.container}>
      <div className={styles.navbar}>
        <Navbar selectedline={selectedline} setSelectedLine={setSelectedLine} scannedCode={scannedCode} setScannedCode={setScannedCode} />
      </div>
      <div className={styles.sidebar}>
        {data?.map((item) => (<ProductionCard key={item.productionEntry} data={item} setSelectedEntry={setSelectedEntry} />))}
      </div>
      <div className={styles.mainContent}>
        <MainContent data={selectedEntry} scannedCode={scannedCode} />
      </div>
    </div>
  );
}
