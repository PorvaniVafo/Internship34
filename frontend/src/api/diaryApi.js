import axios from 'axios';

const API_URL = 'http://localhost:3000/api/v1/posts';

export const getPosts = async () => {
    try {
        const response = await axios.get(API_URL, {
            headers: {
                Authorization: `Bearer ${localStorage.getItem('accessToken')}`,
            },
        });
        return response.data;
    } catch (error) {
        console.error('Error fetching posts:', error);
        throw error;
    }
};

export const createPost = async (post) => {
    try {
        const response = await axios.post(API_URL, post, {
            headers: {
                Authorization: `Bearer ${localStorage.getItem('accessToken')}`,
            },
        });
        return response.data;
    } catch (error) {
        console.error('Error creating post:', error);
        throw error;
    }
};

export const updatePost = async (id, updatedPost) => {
    try {
        const response = await axios.put(`${API_URL}/${id}`, updatedPost, {
            headers: {
                Authorization: `Bearer ${localStorage.getItem('accessToken')}`,
            },
        });
        return response.data;
    } catch (error) {
        console.error('Error updating post:', error);
        throw error;
    }
};

export const deletePost = async (id) => {
    try {
        await axios.delete(`${API_URL}/${id}`, {
            headers: {
                Authorization: `Bearer ${localStorage.getItem('accessToken')}`,
            },
        });
    } catch (error) {
        console.error('Error deleting post:', error);
        throw error;
    }
};

export const uploadImages = async (postId, images) => {
    const formData = new FormData();
    images.forEach((image) => formData.append('images', image));

    try {
        const response = await axios.post(`${API_URL}/${postId}/images`, formData, {
            headers: {
                Authorization: `Bearer ${localStorage.getItem('accessToken')}`,
                'Content-Type': 'multipart/form-data',
            },
        });
        return response.data;
    } catch (error) {
        console.error('Error uploading images:', error);
        throw error;
    }
};

export const deleteImage = async (postId, imageId) => {
    try {
        await axios.delete(`${API_URL}/${postId}/images/${imageId}`, {
            headers: {
                Authorization: `Bearer ${localStorage.getItem('accessToken')}`,
            },
        });
    } catch (error) {
        console.error('Error deleting image:', error);
        throw error;
    }
};
