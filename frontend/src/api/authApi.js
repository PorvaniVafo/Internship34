import axios from 'axios';

const API_URL = 'http://localhost:3000/api/v1/auth';

const handleError = (error) => {
    const message = error.response?.data?.message || 'An unexpected error occurred.';
    throw new Error(message);
};

export const registerUser = async (username, email, password) => {
    try {
        const response = await axios.post(`${API_URL}/register`, { username, email, password });
        return response.data;
    } catch (error) {
        handleError(error);
    }
};

export const loginUser = async (username, password) => {
    try {
        const response = await axios.post(`${API_URL}/login`, { username, password });
        return response.data;
    } catch (error) {
        handleError(error);
    }
};

export const verifyEmail = async (token) => {
    try {
        const response = await axios.get(`${API_URL}/verify-email`, { params: { token } });
        return response.data;
    } catch (error) {
        handleError(error);
    }
};

export const requestPasswordReset = async (email) => {
    try {
        const response = await axios.post(`${API_URL}/reset-password-request`, { email });
        return response.data;
    } catch (error) {
        handleError(error);
    }
};

export const resetPassword = async (token, newPassword) => {
    try {
        const response = await axios.post(`${API_URL}/reset-password`, null, {
            params: { token, newPassword },
        });
        return response.data;
    } catch (error) {
        handleError(error);
    }
};
