import React, { useState } from 'react';
import EntryList from '../components/EntryList';
import EntryForm from '../components/EntryForm';

const HomePage = () => {
    const [editingEntry, setEditingEntry] = useState(null);

    const handleSave = () => {
        setEditingEntry(null); // скрыть форму после сохранения
    };

    return (
        <div>
            <h1>Diary Entries</h1>
            <button onClick={() => setEditingEntry({})}>Create New Entry</button>

            {editingEntry ? (
                <EntryForm
                    entryId={editingEntry.id}
                    existingTitle={editingEntry.title}
                    existingContent={editingEntry.content}
                    onSave={handleSave}
                />
            ) : (
                <EntryList onEdit={setEditingEntry} />
            )}
        </div>
    );
};

export default HomePage;
