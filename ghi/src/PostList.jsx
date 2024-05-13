import React, { useState, useEffect, useContext } from 'react';
import AuthContext from './AuthContext';
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';

const PostList = () => {
    const { token } = useContext(AuthContext);
    const [posts, setPosts] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchPosts = async () => {
            const response = await fetch(`http://localhost:8000/network/posts/`);
            const data = await response.json();
            setPosts(data);
        };

        fetchPosts();
    }, []);

    const handleCreatePost = () => {
        navigate('/posts/create');
    };

    return (
        <div className="container">
            <div className="d-flex justify-content-end mb-3">
                <button onClick={handleCreatePost} className="btn btn-primary">Create Post</button>
            </div>
            {posts.map((post) => (
                <div key={post.id} className="card mb-3 bg-light">
                    <div className="card-body">
                    <h2 className="card-title">
                        <Link to={`/profile/${post.user}`}>{post.user}</Link>
                    </h2>
                    <p className="card-text text-dark">{post.content}</p>
                    <div className="d-flex justify-content-end">
                        <small className="text-muted">Created at: {new Date(post.created_at).toLocaleString()}</small>
                    </div>
                    </div>
                </div>
            ))}
            </div>
        );
};

export default PostList;