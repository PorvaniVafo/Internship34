import React, { useEffect, useState } from 'react';
import { getPosts, createPost, updatePost, deletePost } from '../api/diaryApi';
import PostForm from '../components/PostForm';
import PostList from '../components/PostList';

const DiaryPage = () => {
    const [posts, setPosts] = useState([]);
    const [currentPost, setCurrentPost] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchPosts = async () => {
            setLoading(true);
            setError(null);
            try {
                const data = await getPosts();
                setPosts(data);
            } catch (err) {
                setError('Failed to fetch posts. Please try again later.');
                console.error('Error fetching posts:', err);
            } finally {
                setLoading(false);
            }
        };
        fetchPosts();
    }, []);

    const handleSave = async (post) => {
        setLoading(true);
        setError(null);
        try {
            if (post.id) {
                const updatedPost = await updatePost(post.id, post);
                setPosts(posts.map((p) => (p.id === post.id ? updatedPost : p)));
            } else {
                const newPost = await createPost(post);
                setPosts([...posts, newPost]);
            }
            setCurrentPost(null);
        } catch (err) {
            setError('Failed to save post. Please try again.');
            console.error('Error saving post:', err);
        } finally {
            setLoading(false);
        }
    };

    const handleDelete = async (id) => {
        if (window.confirm('Are you sure you want to delete this post?')) {
            setLoading(true);
            setError(null);
            try {
                await deletePost(id);
                setPosts(posts.filter((post) => post.id !== id));
            } catch (err) {
                setError('Failed to delete post. Please try again.');
                console.error('Error deleting post:', err);
            } finally {
                setLoading(false);
            }
        }
    };

    return (
        <div className="diary-page">
            <h1>My Posts</h1>
            {error && <p className="error-message">{error}</p>}
            {loading ? (
                <p>Loading...</p>
            ) : (
                <>
                    <button className="new-post-button" onClick={() => setCurrentPost({})}>
                        New Post
                    </button>
                    <PostList posts={posts} onEdit={setCurrentPost} onDelete={handleDelete} />
                </>
            )}
            {currentPost && (
                <PostForm
                    post={currentPost}
                    onSave={handleSave}
                    onClose={() => setCurrentPost(null)}
                />
            )}
        </div>
    );
};

export default DiaryPage;
