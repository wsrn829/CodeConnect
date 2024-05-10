import React, { useContext, useState, useEffect } from 'react';
import AuthContext from './AuthContext';
import { Link, useNavigate } from "react-router-dom";
import './Navbar.css';
import { Navbar, Nav, NavDropdown, Container } from 'react-bootstrap';

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
        <Navbar.Brand as={Link} to="/">WHEELWORLD</Navbar.Brand>
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse id="responsive-navbar-nav">
          <Nav className="me-auto">
            <Nav.Link as={Link} to="/">HOME</Nav.Link>
            <NavDropdown title="INVENTORY" id="collasible-nav-dropdown">
              <NavDropdown.Item as={Link} to="/manufacturers/create">Add Manufacturer</NavDropdown.Item>
              <NavDropdown.Item as={Link} to="/manufacturers">Manufacturers</NavDropdown.Item>
              <NavDropdown.Divider />
              <NavDropdown.Item as={Link} to="/models/create">Add Car Model</NavDropdown.Item>
              <NavDropdown.Item as={Link} to="/models">Car Models</NavDropdown.Item>
              <NavDropdown.Divider />
              <NavDropdown.Item as={Link} to="/automobiles/create">Add Automobile</NavDropdown.Item>
              <NavDropdown.Item as={Link} to="/automobiles">Automobiles</NavDropdown.Item>
            </NavDropdown>
            <NavDropdown title="SERVICES" id="collasible-nav-dropdown">
              <NavDropdown.Item as={Link} to="/technicians/create">Add Technician</NavDropdown.Item>
              <NavDropdown.Item as={Link} to="/technicians">Technicians</NavDropdown.Item>
              <NavDropdown.Divider />
              <NavDropdown.Item as={Link} to="/appointments/create">Add Service Appointment</NavDropdown.Item>
              <NavDropdown.Item as={Link} to="/appointments">Service Appointments</NavDropdown.Item>
              <NavDropdown.Item as={Link} to="/appointments/history">Service History</NavDropdown.Item>
            </NavDropdown>
            <NavDropdown title="SALES" id="collasible-nav-dropdown">
              <NavDropdown.Item as={Link} to="/salespeople/create">Add Salesperson</NavDropdown.Item>
              <NavDropdown.Item as={Link} to="/salespeople">Salespeople</NavDropdown.Item>
              <NavDropdown.Divider />
              <NavDropdown.Item as={Link} to="/customers/create">Add Customer</NavDropdown.Item>
              <NavDropdown.Item as={Link} to="/customers">Customers</NavDropdown.Item>
              <NavDropdown.Divider />
              <NavDropdown.Item as={Link} to="/sales/create">Add Sale</NavDropdown.Item>
              <NavDropdown.Item as={Link} to="/sales/">Sales</NavDropdown.Item>
              <NavDropdown.Item as={Link} to="/sales/history">Salesperson History</NavDropdown.Item>
            </NavDropdown>
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