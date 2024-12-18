import React, { useState } from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";

const EntryForm = ({ onSubmit, initialData = {} }) => {
    const [title, setTitle] = useState(initialData.title || "");
    const [content, setContent] = useState(initialData.content || "");

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!title || !content) {
            alert("Title and content are required.");
            return;
        }
        onSubmit({ title, content });
    };

    return (
        <form onSubmit={handleSubmit}>
            <input
                type="text"
                placeholder="Entry Title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
            />
            <ReactQuill value={content} onChange={setContent} />
            <button type="submit">Save Entry</button>
        </form>
    );
};

export default EntryForm;
