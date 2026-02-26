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
        const response = await axios.get(`http://localhost:5137/api/KitchenLog/${line}`);
        return response.data;
    }
    catch (error) {
        console.error("Error fetching active entries:", error);
        throw error;
    }
}

module.exports = {
    createLineEntry,
    getActiveEntries
}
