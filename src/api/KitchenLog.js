const {default : axios} = require('axios');


const createLineEntry = async (entryData) => {
    try {
        console.log("creating line entry with data", entryData)
        const response = await axios.post(`http://localhost:5137/api/KitchenLog`, entryData);
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
        const response = await axios.get(`http://localhost:5137/api/KitchenLog/${line}`);
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
        const response = await axios.put(`http://localhost:5137/api/KitchenLog/${entryId}`, updateData);
        return response.data;
    } catch (error) {
        console.error("Error updating line entry:", error);
        throw error;
    
    }
}

const createDownTimeEntry = async (entryData) => {
    try {
        console.log("creating downtime entry with data", entryData)
        const response = await axios.post(`http://localhost:5137/api/KitchenLog/downtime`, entryData);
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
        const response = await axios.get(`http://localhost:5137/api/KitchenLog/downtime/${lineId}`);
        console.log("this is downtime entries response", response.data)
        return response.data;
    }
    catch (error) {
        console.error("Error fetching downtime entries:", error);
        throw error;
    }
}

module.exports = {
    createLineEntry,
    getActiveEntries,
    updateLineEntry,
    createDownTimeEntry,
    getDownTimeEntries
}
