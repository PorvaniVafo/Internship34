import React from 'react';

const ImageUpload = ({ onUpload, loading, error }) => {
    const handleFileChange = (event) => {
        const file = event.target.files[0];
        if (file) {
            onUpload(file);
        }
    };

    return (
        <div>
            <input type="file" accept="image/*" onChange={handleFileChange} />
            {loading && <p>Загрузка...</p>}
            {error && <p style={{ color: 'red' }}>{error}</p>}
        </div>
    );
};

export default ImageUpload;
