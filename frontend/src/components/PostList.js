import React from 'react';

const PostList = ({ posts, onEdit, onDelete }) => {
    return (
        <div>
            {posts.map((post) => (
                <div key={post.id} className="post-item">
                    <h3>{post.title}</h3>
                    <p>{post.content}</p>
                    <img src={post.imageUrl} alt="Post" style={{ maxWidth: '100%' }} />
                    <button onClick={() => onEdit(post)}>Edit</button>
                    <button onClick={() => onDelete(post.id)}>Delete</button>
                </div>
            ))}
        </div>
    );
};

export default PostList;
