import React, { useState } from 'react';

const AuthContext = React.createContext();

export function AuthProvider({ children }) {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [token, setToken] = useState(null);
  const [username, setUsername] = useState('');

  const handleLogin = (username, token) => {
    console.log('handleLogin:', username, token);
    setIsLoggedIn(true);
    setUsername(username);
    setToken(token); // Save the token
    console.log("token in context after login", token); // Log the token from the context
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    setUsername('');
    setToken(null);
  };

  return (
    <AuthContext.Provider value={{ isLoggedIn, setIsLoggedIn, token, setToken, username, handleLogin, handleLogout }}>
      {children}
    </AuthContext.Provider>
  );
}

export default AuthContext;