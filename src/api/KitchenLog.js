const {default : axios} = require('axios');


const createLineEntry = async (entryData) => {
    try {
        console.log("creating line entry with data", entryData)
        const response = await axios.post(`https://192.168.5.2:7135/api/KitchenLog`, entryData);
        console.log("this is repsonse", response)
        return response.data;
    } catch (error) {
        console.error("Error creating line entry:", error);
        throw error;
    }
}

const getActiveEntries = async (line) => {
    try {
        console.log("fetching active entries for line", line)
        const response = await axios.get(`https://192.168.5.2:7135/api/KitchenLog/${line}`);
        return response.data;
    }
    catch (error) {
        console.error("Error fetching active entries:", error);
        throw error;
    }
}

const updateLineEntry = async (entryId, updateData) => {
    try {
        console.log("updating line entry with id", entryId, "and data", updateData)
        const response = await axios.put(`https://192.168.5.2:7135/api/KitchenLog/${entryId}`, updateData);
        return response.data;
    } catch (error) {
        console.error("Error updating line entry:", error);
        throw error;
    
    }
}

const createDownTimeEntry = async (entryData) => {
    try {
        console.log("creating downtime entry with data", entryData)
        const response = await axios.post(`https://192.168.5.2:7135/api/KitchenLog/downtime`, entryData);
        console.log("this is repsonse", response)
        return response.data;
    } catch (error) {
        console.error("Error creating downtime entry:", error);
        throw error;
    }
}

const getDownTimeEntries = async (lineId) => {
    try {
        console.log("fetching downtime entries for line", lineId)
        const response = await axios.get(`https://192.168.5.2:7135/api/KitchenLog/downtime/${lineId}`);
        console.log("this is downtime entries response", response.data)
        return response.data;
    }
    catch (error) {
        console.error("Error fetching downtime entries:", error);
        throw error;
    }
}

const CreateSetup = async (setupData) => {
    try{
        console.log("creating setup with data", setupData)
        const response = await axios.post(`https://192.168.5.2:7135/api/KitchenLog/setup`, setupData);
        console.log("this is setup response", response)
        return response.data;

    }catch(error){
        console.error("Error creating setup:", error);
        throw error;
    }
}

const GetSetupForLine = async (lineId) => {
    try{
        console.log("fetching setup for line", lineId)
        const response = await axios.get(`https://192.168.5.2:7135/api/KitchenLog/setup/${lineId}`);
        console.log("this is setup response", response.data)
        return response.data;
    }catch(error){
        console.error("Error fetching setup for line:", error);
        throw error;
    }
}

const updateSetupForLine = async (lineId, setupData) => {
    try{
        console.log("updating setup for line", lineId, "with data", setupData)
        const response = await axios.put(`https://192.168.5.2:7135/api/KitchenLog/setup/${lineId}`, setupData);
        console.log("this is update setup response", response.data)
        return response.data;
    }catch(error){
        console.error("Error updating setup for line:", error);
        throw error;
    }
}

const createCleaningEntry = async (cleaningData) => {
    try{
        console.log("creating cleaning entry with data", cleaningData)
        const response = await axios.post(`https://192.168.5.2:7135/api/KitchenLog/cleaning`, cleaningData);
        console.log("this is cleaning response", response)
        return response.data;
    }catch(error){
        console.error("Error creating cleaning entry:", error);
        throw error;
    }
}

const getCleaningEntryForLine = async (lineId) => {
    try{
        console.log("fetching cleaning entry for line", lineId)
        const response = await axios.get(`https://192.168.5.2:7135/api/KitchenLog/cleaning/${lineId}`);
        console.log("this is cleaning entry response", response.data)
        return response.data;
    }catch(error){
        console.error("Error fetching cleaning entry for line:", error);
        throw error;
    }
}

const DeleteLineEntry = async (entryId) => {
    try {
        console.log("deleting line entry with id", entryId)
        const response = await axios.delete(`https://192.168.5.2:7135/api/KitchenLog/${entryId}`);
        console.log("this is delete response", response.data)
        return response.data;
    } catch (error) {
        console.error("Error deleting line entry:", error);
        throw error;
    }
}

const DownloadKitchenLogExport = async (startDate, endDate) => {
  const url = `https://192.168.5.2:7135/api/KitchenLog/export?startDate=${startDate}&endDate=${endDate}`;

  const response = await axios.get(url, {
    responseType: "blob", // IMPORTANT
    // withCredentials: true, // enable if your API auth uses cookies
  });

  // Try to get filename from Content-Disposition
  const disposition = response.headers["content-disposition"];
  let fileName = `KitchenLog_${startDate}_${endDate}.xlsx`;

  if (disposition && disposition.includes("filename=")) {
    fileName = disposition.split("filename=")[1].replaceAll('"', "").trim();
  }

  // Create a download link from the blob
  const blobUrl = window.URL.createObjectURL(response.data);
  const a = document.createElement("a");
  a.href = blobUrl;
  a.download = fileName;
  document.body.appendChild(a);
  a.click();
  a.remove();

  window.URL.revokeObjectURL(blobUrl);
};

module.exports = {
    createLineEntry,
    getActiveEntries,
    updateLineEntry,
    createDownTimeEntry,
    getDownTimeEntries,
    CreateSetup,
    GetSetupForLine,
    updateSetupForLine,
    createCleaningEntry,
    getCleaningEntryForLine,
    DeleteLineEntry,
    DownloadKitchenLogExport
}
