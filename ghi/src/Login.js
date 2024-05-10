import React, { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import AuthContext from './AuthContext';

function Login() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();
  const { handleLogin } = useContext(AuthContext); // Get handleLogin from the AuthContext


  const handleLoginClick = async (event) => {
    event.preventDefault(); // Prevent form from causing a page refresh

    try {
      // Perform login operation here (e.g., API call)
      const response = await fetch('http://localhost:8000/api/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          username: username,
          password: password,
        }),
      });

      if (response.ok) {
        // If login is successful, redirect to home page
        handleLogin(username);
        navigate('/');
      } else {
        throw new Error('Login failed');
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };

  return (
    <div className="container">
    <div className="row justify-content-center">
      <div className="col-12 col-md-6">
        <div className="shadow p-4 mt-4" style={{ backgroundColor: '#f2f2f2' }}>
          <h2 className="text-center">Login</h2>
          <form onSubmit={handleLoginClick} id="login-form">
            <div className="form-floating mb-3">
              <input type="text" value={username} onChange={(e) => setUsername(e.target.value)} className="form-control" id="username" placeholder="Username" />
              <label htmlFor="username">Username...</label>
            </div>
            <div className="form-floating mb-3">
              <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} className="form-control" id="password" placeholder="Password" />
              <label htmlFor="password">Password...</label>
            </div>
            <button className="btn btn-primary">Submit</button>
          </form>
        </div>
      </div>
    </div>
  </div>
  );
}

export default Login;