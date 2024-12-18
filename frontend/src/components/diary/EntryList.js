import React from "react";

const EntryList = ({ entries, onEdit, onDelete }) => {
    return (
        <div>
            {entries.map((entry) => (
                <div key={entry.id}>
                    <h3>{entry.title}</h3>
                    <button onClick={() => onEdit(entry)}>Edit</button>
                    <button onClick={() => onDelete(entry.id)}>Delete</button>
                </div>
            ))}
        </div>
    );
};

export default EntryList;
