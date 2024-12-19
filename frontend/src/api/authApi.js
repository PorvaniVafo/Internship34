import axios from 'axios';

const API_URL = 'http://localhost:8088/api/v1/auth/';  // Укажите ваш URL API

export const registerUser = async (email, password) => {
    try {
        const response = await axios.post(`${API_URL}/register`, { email, password });
        return response.data;
    } catch (error) {
        throw error.response ? error.response.data : error;
    }
};

export const loginUser = async (email, password) => {
    try {
        const response = await axios.post(`${API_URL}/login`, { email, password });
        return response.data;
    } catch (error) {
        throw error.response ? error.response.data : error;
    }
};

export const sendResetPasswordEmail = async (email) => {
    try {
        const response = await axios.post(`${API_URL}/forgot-password`, { email });
        return response.data;
    } catch (error) {
        throw error.response ? error.response.data : error;
    }
};

export const resetPassword = async (newPassword, token) => {
    try {
        const response = await axios.post(`${API_URL}/reset-password`, { newPassword, token });
        return response.data;
    } catch (error) {
        throw error.response ? error.response.data : error;
    }
};
