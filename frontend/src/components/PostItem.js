import React from 'react';

const PostItem = ({ entry, onEdit, onDelete }) => {
    return (
        <div className="entry-item">
            <h3>{entry.title}</h3>
            {entry.imageUrl && <img src={entry.imageUrl} alt={entry.title} style={{ maxWidth: '100px', borderRadius: '4px' }} />}
            <p>{entry.content}</p>
            <button onClick={() => onEdit(entry)}>Edit</button>
            <button onClick={() => onDelete(entry.id)}>Delete</button>
        </div>
    );
};

export default PostItem;
