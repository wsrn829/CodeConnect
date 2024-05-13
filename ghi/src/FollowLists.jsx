import React, { useEffect, useState, useContext } from 'react';
import AuthContext from './AuthContext';
import { Link } from 'react-router-dom';

const FollowLists = () => {
    const { isLoggedIn, token, username } = useContext(AuthContext);
    const [following, setFollowing] = useState([]);
    const [followers, setFollowers] = useState([]);

    useEffect(() => {
        const fetchFollowing = async () => {
            try {
                const res = await fetch('http://localhost:8000/network/following_list/', {
                    headers: {
                        'Authorization': `Token ${token}`
                    }
                });
                const data = await res.json();
                if (Array.isArray(data)) {
                    setFollowing(data);
                } else {
                    console.error('Following data is not an array:', data);
                }
            } catch (err) {
                console.error(err);
            }
        };

        const fetchFollowers = async () => {
            try {
                const res = await fetch('http://localhost:8000/network/followers_list/', {
                    headers: {
                        'Authorization': `Token ${token}`
                    }
                });
                const data = await res.json();
                if (Array.isArray(data)) {
                    setFollowers(data);
                } else {
                    console.error('Followers data is not an array:', data);
                }
            } catch (err) {
                console.error(err);
            }
        };

        fetchFollowing();
        fetchFollowers();
    }, [token]);

    return (
            <div style={{ backgroundColor: '#f0f0f0', padding: '10px', display: 'flex', justifyContent: 'space-between' }}>
                <div style={{ width: '45%' }}>
                    <h2 style={{ color: '#333' }}>Following</h2>
                    <ul style={{ listStyle: 'none', padding: 0 }}>
                        {following.map(user => (
                            <li key={user.id} style={{ marginBottom: '10px' }}>
                                <Link to={`/profile/${user.username}`} style={{ color: '#007bff', textDecoration: 'none' }}>
                                    {user.username}
                                </Link>
                            </li>
                        ))}
                    </ul>
                </div>

                <div style={{ width: '45%' }}>
                    <h2 style={{ color: '#333' }}>Followers</h2>
                    <ul style={{ listStyle: 'none', padding: 0 }}>
                        {followers.map(user => (
                            <li key={user.id} style={{ marginBottom: '10px' }}>
                                <Link to={`/profile/${user.username}`} style={{ color: '#007bff', textDecoration: 'none' }}>
                                    {user.username}
                                </Link>
                            </li>
                        ))}
                    </ul>
                </div>
            </div>
        );
};

export default FollowLists;