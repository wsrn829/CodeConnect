import React, { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import AuthContext from './AuthContext';

function Register({ onRegister }) {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState(''); // Add this line
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const navigate = useNavigate();
  const { handleLogin } = useContext(AuthContext); // Get handleLogin from the AuthContext

  const handleRegisterClick = async (event) => {
    event.preventDefault(); // Prevent form from causing a page refresh

    if (password !== confirmPassword) {
      alert("Passwords don't match");
      return;
    }

    try {
      // Perform registration operation here (e.g., API call)
      const response = await fetch('http://localhost:8000/api/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          username: username,
          email: email,
          password: password,
          confirmation: confirmPassword,
        }),
      });

      if (response.ok) {
        // If registration is successful, redirect to login page
        handleLogin(username);
        navigate('/login');
      } else {
        throw new Error('Registration failed');
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
        <h2 className="text-center">Register</h2>
        <form onSubmit={handleRegisterClick} id="register-form">
          <div className="form-floating mb-3">
            <input type="text" value={username} onChange={(e) => setUsername(e.target.value)} className="form-control" id="username" placeholder="Username" />
            <label htmlFor="username">Username...</label>
          </div>
          <div className="form-floating mb-3">
            <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} className="form-control" id="email" placeholder="Email" />
            <label htmlFor="email">Email...</label>
          </div>
          <div className="form-floating mb-3">
            <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} className="form-control" id="password" placeholder="Password" />
            <label htmlFor="password">Password...</label>
          </div>
          <div className="form-floating mb-3">
            <input type="password" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} className="form-control" id="confirmPassword" placeholder="Confirm Password" />
            <label htmlFor="confirmPassword">Confirm Password...</label>
          </div>
          <button className="btn btn-primary">Register</button>
        </form>
      </div>
    </div>
  </div>
</div>
  );
}

export default Register;