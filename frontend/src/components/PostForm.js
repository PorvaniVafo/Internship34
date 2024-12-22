import React, { useState } from 'react';

const PostForm = ({ post, onSave, onClose }) => {
    const [title, setTitle] = useState(post?.title || '');
    const [content, setContent] = useState(post?.content || '');
    const [imageUrl, setImageUrl] = useState(post?.imageUrl || '');

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!title || !content) {
            alert('Both title and content are required.');
            return;
        }
        onSave({ ...post, title, content, imageUrl });
        onClose();
    };

    return (
        <form onSubmit={handleSubmit}>
            <h2>{post?.id ? 'Edit Post' : 'New Post'}</h2>
            <input
                type="text"
                placeholder="Title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                required
            />
            <textarea
                placeholder="Content"
                value={content}
                onChange={(e) => setContent(e.target.value)}
                required
            />
            <input
                type="url"
                placeholder="Image URL"
                value={imageUrl}
                onChange={(e) => setImageUrl(e.target.value)}
            />
            <button type="submit">{post?.id ? 'Update' : 'Create'}</button>
            <button type="button" onClick={onClose}>
                Cancel
            </button>
        </form>
    );
};

export default PostForm;
