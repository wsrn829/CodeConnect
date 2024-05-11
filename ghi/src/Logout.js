import React, { useContext } from 'react';
import { NavLink } from 'react-router-dom';
import AuthContext from './AuthContext';

function Logout({ onLogout }) {
  const { setToken } = useContext(AuthContext);

  const handleLogoutClick = () => {
    // Perform logout operation here (e.g., API call)

    // If logout is successful, clear the token and call onLogout
    setToken(null);
    onLogout();
  };

  return (
    <li className="nav-item">
      <NavLink className="nav-link" to="/logout" style={{ color: 'white' }} onClick={handleLogoutClick}>LOGOUT</NavLink>
    </li>
  );
}

export default Logout;