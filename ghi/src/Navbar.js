import React, { useContext, useState, useEffect } from 'react';
import AuthContext from './AuthContext';
import { Link, useNavigate } from "react-router-dom";
import './Navbar.css';
import { Navbar, Nav, Container } from 'react-bootstrap';

function NavbarComponent() {
  const {isLoggedIn, username, handleLogout} = useContext(AuthContext);
  const [currentTime, setCurrentTime] = useState(new Date().toLocaleTimeString('en-US', { hour12: false }));
  const navigate = useNavigate();

  const logOutAndRedirect = () => {
    handleLogout();
    navigate('/');
  }

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date().toLocaleTimeString('en-US', { hour12: false }));
    }, 1000);

    return () => {
      clearInterval(timer);
    };
  }, []);

  return (
      <Navbar collapseOnSelect expand="lg" variant="light" style={{ backgroundColor: '#008B8B', color: 'white' }}>
      <Container fluid>
        <Navbar.Brand as={Link} to="/">CODECONNECT</Navbar.Brand>
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse id="responsive-navbar-nav">
          <Nav className="me-auto">
            <Nav.Link as={Link} to="/">HOME</Nav.Link>
            <Nav.Link as={Link} to={`/profile/${username}/`}>PROFILE</Nav.Link>
            <Nav.Link as={Link} to="/posts">POSTS</Nav.Link>
            <Nav.Link as={Link} to="/projects">PROJECTS</Nav.Link>
            <Nav.Link as={Link} to="/followlists">FOLLOWING</Nav.Link>
            {/* <Nav.Link as={Link} to="/messages">MESSAGES</Nav.Link> */}
          </Nav>
          <Navbar.Text className="navbar-text" style={{
              color: 'yellow',
              margin: 'auto',
              fontSize: '25px',
              backgroundColor: 'darkblue',
              padding: '10px',
              borderRadius: '30px'
            }}>{currentTime}</Navbar.Text>
          <Nav>
            {!isLoggedIn ? (
              <>
                <Nav.Link as={Link} to="/login">LOGIN</Nav.Link>
                <Nav.Link as={Link} to="/register">REGISTER</Nav.Link>
              </>
            ) : (
              <>
                <Navbar.Text style={{ color: 'white', marginRight: '10px' }}>Hello, {username.toUpperCase()}!</Navbar.Text>
                <Nav.Link onClick={logOutAndRedirect}>LOGOUT</Nav.Link>
              </>
            )}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default NavbarComponent;