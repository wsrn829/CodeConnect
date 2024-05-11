import React, { useState, useEffect, useContext } from 'react';
import AuthContext from './AuthContext';
import { useNavigate } from 'react-router-dom';

function ProfilePage() {
  const { isLoggedIn, username, token } = useContext(AuthContext);
  const [profile, setProfile] = useState({
    bio: '',
    favorite_language: '',
    github_profile: '',
  });
  const [isEditing, setIsEditing] = useState(false);

  const navigate = useNavigate();

  useEffect(() => {
    const fetchProfile = async () => {
      if (isLoggedIn && username) {
        try {
          console.log(token);
          const response = await fetch(`http://localhost:8000/profiles/profile/${username}`, {
            headers: {
              'Authorization': `Token ${token}`
            }
          });
          if (response.ok) {
            const data = await response.json();
            setProfile(data);
          } else if (response.status === 404) {
            navigate('/profile/create');
          }
        } catch (error) {
          console.error('An error occurred while fetching the profile:', error);
        }
      }
    };
    fetchProfile();
  }, [isLoggedIn, username, navigate, token]);

  const handleEdit = () => {
    setIsEditing(true);
  };

  const handleCancel = () => {
    setIsEditing(false);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      const response = await fetch(`http://localhost:8000/profiles/profile/${username}/edit/`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Token ${token}`
        },
        body: JSON.stringify(profile)
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      // Fetch the updated profile
      const updatedProfileResponse = await fetch(`http://localhost:8000/profiles/profile/${username}`, {
        headers: {
          'Authorization': `Token ${token}`
        }
      });

      if (!updatedProfileResponse.ok) {
        throw new Error(`HTTP error! status: ${updatedProfileResponse.status}`);
      }

      const updatedProfile = await updatedProfileResponse.json();
      setProfile(updatedProfile);
      setIsEditing(false);
    } catch (error) {
      console.error('An error occurred while updating the profile:', error);
    }
  };

  if (!isLoggedIn) {
    return <p>Please log in to view this page.</p>;
  }

  if (isEditing) {
    return (
      <div className="container">
      <div className="row justify-content-center">
        <div className="col-12 col-md-6">
          <div className="shadow p-4 mt-4 rounded" style={{ backgroundColor: '#f2f2f2' }}>
            <h2 className="text-center mb-4">Edit {username}'s Profile</h2>
            <form onSubmit={handleSubmit}>
              <div className="mb-3">
                <label className="fw-bold">Bio:</label>
                <input type="text" className="form-control" value={profile.bio} onChange={e => setProfile({...profile, bio: e.target.value})} />
              </div>
              <div className="mb-3">
                <label className="fw-bold">Favorite Language:</label>
                <input type="text" className="form-control" value={profile.favorite_language} onChange={e => setProfile({...profile, favorite_language: e.target.value})} />
              </div>
              <div className="mb-3">
                <label className="fw-bold">GitHub Profile:</label>
                <input type="text" className="form-control" value={profile.github_profile} onChange={e => setProfile({...profile, github_profile: e.target.value})} />
              </div>
              <button type="submit" className="btn btn-primary">Save</button>
              <button type="button" className="btn btn-secondary" onClick={handleCancel}>Cancel</button>
            </form>
          </div>
        </div>
      </div>
    </div>
    );
  }

  return (
    <div className="container">
      <div className="row justify-content-center">
        <div className="col-12 col-md-6">
          <div className="shadow p-4 mt-4 rounded" style={{ backgroundColor: '#f2f2f2' }}>
            <h2 className="text-center mb-4">{username}'s Profile</h2>
            <div className="mb-3">
              <h4 className="fw-bold">Bio:</h4>
              <p className="fs-5">{profile.bio}</p>
            </div>
            <div className="mb-3">
              <h4 className="fw-bold">Favorite Language:</h4>
              <p className="fs-5">{profile.favorite_language}</p>
            </div>
            <div className="mb-3">
              <h4 className="fw-bold">GitHub Profile:</h4>
              <p className="fs-5">{profile.github_profile}</p>
            </div>
            {profile.profile_pic && <img className="img-fluid rounded-circle mb-3" src={profile.profile_pic} alt="Profile" />}
            <button type="submit" className="btn btn-primary" onClick={handleEdit}>Edit Profile</button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProfilePage;