import React, { useState } from "react";

const CreateEntryPage = () => {
    const [entry, setEntry] = useState("");

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log("New Entry: ", entry);
        // Here, you would typically send this to your backend API
        setEntry("");
    };

    return (
        <form onSubmit={handleSubmit}>
            <h1>Create a New Entry</h1>
            <textarea
                placeholder="Write your entry..."
                value={entry}
                onChange={(e) => setEntry(e.target.value)}
            />
            <button type="submit">Submit Entry</button>
        </form>
    );
};

export default CreateEntryPage;
