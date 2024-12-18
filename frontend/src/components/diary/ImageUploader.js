import React, { useState } from "react";

const ImageUploader = ({ onUpload }) => {
    const [loading, setLoading] = useState(false);

    const handleFileChange = (e) => {
        const file = e.target.files[0];
        if (!file.type.startsWith("image/")) {
            alert("Invalid file type");
            return;
        }
        setLoading(true);
        // Имитируем загрузку
        setTimeout(() => {
            onUpload(URL.createObjectURL(file));
            setLoading(false);
        }, 2000);
    };

    return (
        <div>
            <input type="file" onChange={handleFileChange} />
            {loading && <p>Uploading...</p>}
        </div>
    );
};

export default ImageUploader;
