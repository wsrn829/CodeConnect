import React, { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import AuthContext from './AuthContext';

const PostForm = () => {
    const { isLoggedIn, username, token } = useContext(AuthContext);
    const [content, setContent] = useState('');
    const navigate = useNavigate();

    const handleSubmit = async (event) => {
        event.preventDefault();

        if (!isLoggedIn) {
          alert('Please log in to update your profile.');
          return;
        }

        try {
            const response = await fetch(`http://localhost:8000/network/create_post/`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Token ${token}`
                },
                body: JSON.stringify({ content }),
            });

            if (response.status === 201) {
                alert('Post created successfully.');
                setContent('');
                navigate('/posts');
            }
        } catch (error) {
            console.error('Error creating post:', error);
        }
    };


    return (
      <form onSubmit={handleSubmit} className="mb-3">
        <div className="mb-3">
          <label htmlFor="content" className="form-label">Content:</label>
          <textarea
              className="form-control"
              id="content"
              value={content}
              onChange={e => setContent(e.target.value)}
          />
          </div>
        <button type="submit" className="btn btn-primary">Create Post</button>
      </form>
    );
};

export default PostForm;