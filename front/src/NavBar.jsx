import React, { useState, useEffect } from "react";
import { Navbar, Nav, Container, Form, Button } from 'react-bootstrap';
import Profile from "./Profile";
import Login from "./Login";

import { useContext } from "react";
import { AuthContext } from "../src/authContext";

import { getUser } from "./api";

const NavBar = () => {
    // called before any function uses it
    const { auth } = useContext(AuthContext)

    const [view, setView] = useState(false)
    const [loginView, setLoginView] = useState(false)
    const [credits, setCredits] = useState(0)

    //login form stuff because React is Fucking Stupid
    const [userName, setUserName] = useState("");
    const [passWord, setPassword] = useState("");
    const [message, setMessage] = useState("");
    


    const form = {
        userName, setUserName,
        passWord, setPassword,
        message, setMessage,
    }

    function updateCredits() {
        getUser({ auth, setInformation: setCredits})
    }
    

    useEffect(() => {
        updateCredits()
    }, [view])


    // logout function
    const handleLogout = () => {
        auth.setUsername(null);
        localStorage.removeItem('username');
        setView(false)
        setLoginView(false)

        setUserName("");
        setPassword("");
        setMessage("");
      };

    return (
        // moved so the login and profile are rendered as JSX
        <>
            {view && <Profile auth={auth} credits={credits} setView={setView} updateCredits={updateCredits} se/>}
            {loginView && (
                <div className="modal-overlay">
                    <div className="modal-content">
                        <Login auth={auth} form={form} setView={setView} setLoginView={setLoginView} />
                        <Button onClick={() => { setLoginView(false) }}>OK</Button>
                    </div>
                </div>
            )}
            <Navbar bg="light" expand="lg" className="navbar">
                <Container>
                    <Navbar.Brand href="/">Nom Nom Nexus</Navbar.Brand>
                    <Navbar.Toggle aria-controls="basic-navbar-nav" />
                    <Navbar.Collapse id="basic-navbar-nav">
                        <Nav className="mx-auto">
                            <Nav.Link href="/">Home</Nav.Link>
                            <Nav.Link href="/menu">Menu</Nav.Link>
                            <Nav.Link href="/locations">Locations</Nav.Link>
                            <Nav.Link href="/about">About</Nav.Link>
                            <Nav.Link href="#" onClick={() => {
                                if (auth.username) {
                                    setView(true);
                                } else {
                                    setLoginView(true);
                                }
                            }}>Profile</Nav.Link>
                        </Nav>
                        <Nav.Link>
                            <Button className="button is-light" onClick={handleLogout}>
                                Logout
                            </Button>
                        </Nav.Link>
                    </Navbar.Collapse>
                </Container>
            </Navbar>
        </>
    );
}

export default NavBar;
