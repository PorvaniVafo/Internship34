export const uploadImage = async (entryId, file) => {
    const formData = new FormData();
    formData.append('image', file);

    try {
        const response = await fetch(`http://localhost:8088/api/v1/posts/{{postId}}/images?`, {
            method: 'POST',
            body: formData,
        });
        if (!response.ok) {
            throw new Error('Failed to upload image');
        }
        return await response.json();
    } catch (err) {
        throw new Error(err.message);
    }
};

export const deleteImage = async (entryId) => {
    try {
        const response = await fetch(`http://localhost:8088/api/v1/posts/{{postId}}/images/{{imageId}}`, {
            method: 'DELETE',
        });
        if (!response.ok) {
            throw new Error('Failed to delete image');
        }
        return await response.json();
    } catch (err) {
        throw new Error(err.message);
    }
};
