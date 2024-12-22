import React, { useState } from "react";
import { uploadImages } from "../api/diaryApi";

const ImageUploader = ({ postId, onUploadSuccess }) => {
    const [files, setFiles] = useState(null);
    const [error, setError] = useState("");

    const handleFileChange = (e) => {
        setFiles([...e.target.files]);
    };

    const handleUpload = async () => {
        if (!files || files.length === 0) {
            setError("Please select at least one file to upload.");
            return;
        }

        setError("");
        try {
            const response = await uploadImages(postId, files);
            onUploadSuccess(response);
        } catch (err) {
            setError("Failed to upload images. Please try again.");
        }
    };

    return (
        <div>
            <input
                type="file"
                multiple
                accept="image/*"
                onChange={handleFileChange}
            />
            <button onClick={handleUpload}>Upload Images</button>
            {error && <p style={{ color: "red" }}>{error}</p>}
        </div>
    );
};

export default ImageUploader;
