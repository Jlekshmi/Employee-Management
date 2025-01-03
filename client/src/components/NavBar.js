import React from 'react';
import { Navbar, Nav, Container } from 'react-bootstrap';
import { Link, useLocation } from 'react-router-dom';

const NavigationBar = () => {
  const location = useLocation();

  return (
    <Navbar className="navbar navbar-expand-lg navbar-light">
      <Container className="navbar-nav">
        <Navbar.Toggle aria-controls="navbarNav" />
        <Navbar.Collapse id="navbarNav">
          <Nav className="nav-item">
            <Nav.Link 
              className={`nav-link ${location.pathname === '/employees' ? 'active' : ''}`} 
              as={Link} 
              to="/"
            >
              Home
            </Nav.Link>
            <Nav.Link 
              className={`nav-link ${location.pathname === '/employees/create' ? 'active' : ''}`} 
              as={Link} 
              to="/employees/create"
            >
              Create Employee
            </Nav.Link>
            <Nav.Link 
              className={`nav-link ${location.pathname === '/employees/upcoming-retirement' ? 'active' : ''}`} 
              as={Link} 
              to="/employees/upcoming-retirement"
            >
              Upcoming Retirements
            </Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default NavigationBar;
