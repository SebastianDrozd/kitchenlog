import { useState } from "react";
import styles from "../styles/MainContent.module.css";
import Main from "./tabs/Main";
import Cleaning from "./tabs/Cleaning";
import DownTime from "./tabs/DownTime";
import LoadingSpinner from "./LoadingSpinner";
import ConfirmDeleteModal from "./ConfirmDeleteModal";


const MainContent = ({ data, scannedCode, selectedline, isLoading }) => {
  const tabs = ["Main", "Cleaning", "Downtime"];
  const [activeTab, setActiveTab] = useState("Main");

  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [deleting, setDeleting] = useState(false);


  const handleConfirmDelete = async () => {
    try {
      setDeleting(true);
      setShowDeleteModal(true)

      // TODO: call your delete mutation / API here
      // await deleteMutation.mutateAsync({ productionEntry: data.ProductionEntry });

      setShowDeleteModal(false);
    } finally {
      setDeleting(false);
    }
  };

  if (isLoading) {
    return <LoadingSpinner fullScreen label="Loading entry…" />;
  }

  return (
    <div className={styles.container}>
      <ConfirmDeleteModal
        open={showDeleteModal}
        title="Delete this entry?"
        message={`Are you sure you want to delete "${data?.Description1 ?? "this entry"}"? This cannot be undone.`}
        confirmText="Delete entry"
        cancelText="Cancel"
        danger
        loading={deleting}
        onCancel={() => setShowDeleteModal(false)}
        onConfirm={handleConfirmDelete}
      />

      {data ? (
        <div className={styles.content}>
          <div className={styles.header}>
            <div className={styles.headerText}>
              <h2 className={styles.title}>{data.Description1}</h2>
              <p className={styles.subtitle}>{data.Description2}</p>
            </div>
            <div>
              <button
                className={styles.deleteBtn}
                type="button"
                onClick={() => setShowDeleteModal(true)}
              >
                Delete Entry
              </button>
            </div>
          </div>

          <div className={styles.buttonRow} role="tablist" aria-label="Line tabs">
            {tabs.map((tab) => (
              <button
                key={tab}
                type="button"
                onClick={() => setActiveTab(tab)}
                className={`${styles.button} ${activeTab === tab ? styles.active : ""}`}
                role="tab"
                aria-selected={activeTab === tab}
              >
                {tab}
              </button>
            ))}
          </div>

          <div className={styles.tabContent}>
            {activeTab === "Main" && <Main data={data} />}
            {activeTab === "Cleaning" && <Cleaning data={data} selectedline={selectedline} />}
            {activeTab === "Downtime" && <DownTime data={data} selectedline={selectedline} />}
          </div>
        </div>
      ) : (
        <div className={styles.noContent}>
          <div className={styles.emptyCard}>
            <div className={styles.emptyTitle}>No entry selected</div>
            <div className={styles.emptySub}>
              Scan a barcode or choose a production entry from the sidebar.
            </div>
            {scannedCode ? (
              <div className={styles.scanned}>
                Last scanned: <span className={styles.scannedCode}>{scannedCode}</span>
              </div>
            ) : null}
          </div>
        </div>
      )}
    </div>
  );
};

export default MainContent;