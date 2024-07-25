import React from "react";
import { Navbar, Nav, Container, Form, Button } from 'react-bootstrap';

const NavBar = () => {
    return (
        <Navbar bg="light" expand="lg" className="navbar">
            <Container>
                <Navbar.Brand href="/">Team 25</Navbar.Brand>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="mx-auto">
                        <Nav.Link href="/">Home</Nav.Link>
                        <Nav.Link href="/menu">Menu</Nav.Link>
                        <Nav.Link href="/locations">Locations</Nav.Link>
                        <Nav.Link href="/about">About</Nav.Link>
                        <Nav.Link href="#profile">Profile</Nav.Link>
                    </Nav>
                    
                </Navbar.Collapse>
            </Container>
        </Navbar>
    );
}

export default NavBar;
