import axios from 'axios';

const API_URL = 'http://localhost:8088/api/v1/posts';

export const getEntries = async () => {
    try {
        const response = await axios.get(API_URL);
        return response.data;
    } catch (error) {
        console.error('Error fetching entries', error);
        throw error;
    }
};

export const createEntry = async (entry) => {
    try {
        const response = await axios.post(API_URL, entry);
        return response.data;
    } catch (error) {
        console.error('Error creating entry', error);
        throw error;
    }
};

export const updateEntry = async (id, updatedEntry) => {
    try {
        const response = await axios.put(`${API_URL}/${id}`, updatedEntry);
        return response.data;
    } catch (error) {
        console.error('Error updating entry', error);
        throw error;
    }
};

export const deleteEntry = async (id) => {
    try {
        await axios.delete(`${API_URL}/${id}`);
    } catch (error) {
        console.error('Error deleting entry', error);
        throw error;
    }
};
