// API для загрузки изображения
export const uploadImage = async (entryId, file) => {
    const formData = new FormData();
    formData.append('image', file);

    try {
        const response = await fetch(`/api/entries/${entryId}/upload-image`, {
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

// API для удаления изображения
export const deleteImage = async (entryId) => {
    try {
        const response = await fetch(`/api/entries/${entryId}/delete-image`, {
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
