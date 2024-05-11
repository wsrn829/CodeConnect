import React, { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom'; // Import useNavigate
import AuthContext from './AuthContext';
import 'bootstrap/dist/css/bootstrap.min.css';

function ProfileForm({ username }) {
    const { isLoggedIn, token } = useContext(AuthContext);
    const [bio, setBio] = useState('');
    const [favoriteLanguage, setFavoriteLanguage] = useState('');
    const [githubProfile, setGithubProfile] = useState('');
    const navigate = useNavigate(); // Initialize useNavigate

    const handleSubmit = async (event) => {
        event.preventDefault();

        if (!isLoggedIn) {
            alert('Please log in to update your profile.');
            return;
        }

        const profile = {
            bio: bio,
            favorite_language: favoriteLanguage,
            github_profile: githubProfile,
        };

        try {
            console.log(token);
            console.log(isLoggedIn);
            const response = await fetch(`http://localhost:8000/profiles/profile/create/`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Token ${token}`
                },
                body: JSON.stringify(profile)
            });
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            const data = await response.json();
            console.log(data);

            // Navigate to the profiles/:username/ page
            navigate(`/profile/${username}/`);
        } catch (error) {
            console.error(error);
        }
    };

    return (
        <div className="container">
            <div className="row justify-content-center">
                <div className="col-12 col-md-6">
                    <div className="shadow p-4 mt-4" style={{ backgroundColor: '#f2f2f2' }}>
                        <h2 className="text-center">Profile Form</h2>
                        <form onSubmit={handleSubmit} id="profile-form">
                            <div className="form-floating mb-3">
                                <input type="text" value={bio} onChange={e => setBio(e.target.value)} className="form-control" id="bio" placeholder="Bio" />
                                <label htmlFor="bio">Bio...</label>
                            </div>
                            <div className="form-floating mb-3">
                                <input type="text" value={favoriteLanguage} onChange={e => setFavoriteLanguage(e.target.value)} className="form-control" id="favoriteLanguage" placeholder="Favorite Language" />
                                <label htmlFor="favoriteLanguage">Favorite Language...</label>
                            </div>
                            <div className="form-floating mb-3">
                                <input type="text" value={githubProfile} onChange={e => setGithubProfile(e.target.value)} className="form-control" id="githubProfile" placeholder="GitHub Profile" />
                                <label htmlFor="githubProfile">GitHub Profile...</label>
                            </div>
                            <button className="btn btn-primary">Submit</button>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default ProfileForm;