import React from 'react'

function Logout({ onLogout }) {
  const handleLogoutClick = () => {
    // Perform logout operation here (e.g., API call)

    // If logout is successful, call onLogout
    onLogout();
  };

  return (
    <li className="nav-item">
      <NavLink className="nav-link" to="/logout" style={{ color: 'white' }} onClick={handleLogoutClick}>LOGOUT</NavLink>
    </li>
  );
}

export default Logout;