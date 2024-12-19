import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import EntryForm from '../components/EntryForm';
import { getEntries } from '../api/diaryApi';

const EditPage = () => {
    const { id } = useParams();
    const [entry, setEntry] = useState(null);

    useEffect(() => {
        const fetchEntry = async () => {
            const entries = await getEntries();
            const currentEntry = entries.find((e) => e.id === parseInt(id));
            setEntry(currentEntry);
        };

        fetchEntry();
    }, [id]);

    return entry ? (
        <EntryForm entryId={entry.id} existingTitle={entry.title} existingContent={entry.content} />
    ) : (
        <p>Loading...</p>
    );
};

export default EditPage;
