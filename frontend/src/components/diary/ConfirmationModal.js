import React, { useState } from "react";
import EntryForm from "./EntryForm";
import EntryList from "./EntryList";

const ConfirmationModal = () => {
    const [entries, setEntries] = useState([]);
    const [currentEntry, setCurrentEntry] = useState(null);

    const handleAddEntry = (entry) => {
        if (entries.some((e) => e.title === entry.title)) {
            alert("Duplicate title is not allowed.");
            return;
        }
        setEntries([...entries, entry]);
    };

    const handleEditEntry = (index) => {
        setCurrentEntry({ ...entries[index], index });
    };

    const handleUpdateEntry = (entry) => {
        setEntries((prev) =>
            prev.map((e, i) => (i === entry.index ? { ...entry } : e))
        );
        setCurrentEntry(null);
    };

    const handleDeleteEntry = (index) => {
        if (window.confirm("Are you sure you want to delete this entry?")) {
            setEntries(entries.filter((_, i) => i !== index));
        }
    };

    return (
        <div>
            <h1>Entry Management</h1>
            <EntryForm
                onSubmit={currentEntry ? handleUpdateEntry : handleAddEntry}
                initialData={currentEntry}
            />
            <EntryList
                entries={entries}
                onEdit={handleEditEntry}
                onDelete={handleDeleteEntry}
            />
        </div>
    );
};

export default ConfirmationModal;
