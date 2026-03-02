// Main.jsx
import { useEffect, useState } from "react";
import styles from "../../styles/tabs/Main.module.css";
import { QueryClient, useMutation, useQueryClient } from "@tanstack/react-query";
import { updateLineEntry } from "@/api/KitchenLog";
import toast from "react-hot-toast";
const Main = ({ data }) => {
  const queryClient = useQueryClient()
 const [form, setForm] = useState({
  standardCrew: 1,
  startTime: "",
  endTime: "",
  sticksStuffed: "",
  weightOfStick: "",
});

  const handleSave = () => {
    const dataToSave = {
  StandardCrew: Number(form.standardCrew),
  StartTime: form.startTime,
  EndTime: form.endTime || null,
  SticksStuffed: form.sticksStuffed ? Number(form.sticksStuffed) : null,
  WeightOfStick: form.weightOfStick ? Number(form.weightOfStick) : null,
};
    console.log("Saving data", dataToSave);
    saveMutation.mutate(dataToSave);
  };

  const saveMutation = useMutation({
    mutationFn: (info) => updateLineEntry(data.Id, info),
    onSuccess: () => {
        toast.success("Line updated successfully");
      console.log("Data saved successfully");
      queryClient.invalidateQueries({ queryKey: ["productionData"] });
    },
  });
  useEffect(() => {
    if (!data) return;

    setForm({
      standardCrew: data.StandardCrew ?? 1,
      startTime: data.StartTime ?? "",
      endTime: data.EndTime ?? "",
      sticksStuffed: data.SticksStuffed ?? 0,
      weightOfStick: data.WeightOfStick ?? 0,
    });
  }, [data]);
 const update = (key) => (e) => {
  const value = e.target.value;
  setForm((prev) => ({ ...prev, [key]: value }));
};
  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <div>
          <h2 className={styles.title}>Line Setup</h2>
          <p className={styles.subtitle}>
            Enter crew + run times and record output.
          </p>
        </div>
        <div>
          <button onClick={handleSave} className={styles.saveButton}>
            Save
          </button>
        </div>
      </div>

      <div className={styles.grid}>
        <div className={styles.field}>
          <label className={styles.label} htmlFor="stdcrew">
            Standard Crew
          </label>
          <select
            value={form.standardCrew}
            onChange={update("standardCrew")}
            className={styles.control}
            id="stdcrew"
            defaultValue="1"
          >
            <option value="1">1</option>
            <option value="2">2</option>
            <option value="3">3</option>
            <option value="4">4</option>
          </select>
        </div>

        <div className={styles.field}>
          <label className={styles.label} htmlFor="starttime">
            Line Start Time
          </label>
          <input
            value={form.startTime}
            onChange={update("startTime")}
            type="time"
            className={styles.control2}
          />
        </div>

        <div className={styles.field}>
          <label className={styles.label} htmlFor="endtime">
            Line End Time
          </label>
          <input
            value={form.endTime}
            onChange={update("endTime")}
            className={styles.control2}
            type="time"
            id="endtime"
            name="endtime"
          />
        </div>

        <div className={styles.field}>
          <label className={styles.label} htmlFor="sticks">
            Sticks Stuffed
          </label>
          <input
            value={form.sticksStuffed}
            onChange={update("sticksStuffed")}
            className={styles.control}
            type="number"
            id="sticks"
            name="sticks"
            min="0"
          />
        </div>
        <div className={styles.field}>
          <label className={styles.label} htmlFor="weight">
            Weight Of Stick
          </label>
          <input
            value={form.weightOfStick}
            onChange={update("weightOfStick")}
            className={styles.control}
            type="number"
            id="weight"
            name="weight"
            min="0"
          />
        </div>

        <div className={styles.statCard}>
          <div className={styles.statLabel}>Pounds Stuffed</div>
          <div className={styles.statValue}>
            {form.sticksStuffed && form.weightOfStick
              ? (form.sticksStuffed * form.weightOfStick) 
              : 0}{" "}
            <span className={styles.statUnit}>lbs</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Main;
