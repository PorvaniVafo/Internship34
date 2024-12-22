import React, { useState, useEffect } from "react";
import { getPosts, deletePost } from "../api/diaryApi";
import PostImages from "../components/PostImages";

const DiaryPage = () => {
    const [posts, setPosts] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchPosts = async () => {
            setLoading(true);
            setError(null); // Reset error on reload
            try {
                const data = await getPosts();
                setPosts(data);
            } catch (error) {
                setError("Failed to fetch posts. Please try again later.");
            } finally {
                setLoading(false);
            }
        };

        fetchPosts();
    }, []);

    const handleDeletePost = async (id) => {
        if (window.confirm("Are you sure you want to delete this post?")) {
            try {
                await deletePost(id);
                setPosts((prevPosts) => prevPosts.filter((post) => post.id !== id));
            } catch (error) {
                alert("Failed to delete the post. Please try again.");
            }
        }
    };

    return (
        <div className="diary-page">
            <h1>My Posts</h1>
            {loading ? (
                <p>Loading...</p>
            ) : error ? (
                <p style={{ color: "red" }}>{error}</p>
            ) : posts.length === 0 ? (
                <p>No posts available. Create your first post!</p>
            ) : (
                <ul className="post-list">
                    {posts.map((post) => (
                        <li key={post.id} className="post-item">
                            <h3>{post.title}</h3>
                            <p>{post.content}</p>
                            {post.images && post.images.length > 0 && (
                                <PostImages images={post.images} />
                            )}
                            <button onClick={() => handleDeletePost(post.id)}>Delete</button>
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
};

export default DiaryPage;
