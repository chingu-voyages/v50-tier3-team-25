import React, { useState, useEffect } from "react";
import { Navbar, Nav, Container, Form, Button } from 'react-bootstrap';
import Profile from "./Profile";
import Login from "./Login";

import { useContext } from "react";
import { AuthContext } from "../src/authContext";

import { getUser } from "./api";

const NavBar = () => {
    const [view, setView] = useState(false)
    const [loginView, setLoginView] = useState(false)

    //login form stuff because React is Fucking Stupid
    const [userName, setUserName] = useState("");
    const [passWord, setPassword] = useState("");
    const [message, setMessage] = useState("");

    const form = {
        userName, setUserName,
        passWord, setPassword,
        message, setMessage,
    }

    const [credits, setCredits] = useState(0)

    function updateCredits() {
        getUser({ auth, setInformation: setCredits})
    }

    useEffect(() => {
        updateCredits()
    }, [view])

    const { auth } = useContext(AuthContext)

    let profile = (<></>)
    if (view) {
        profile = Profile({auth, credits, setView, updateCredits})
    }

    let login = (<></>)
    if (loginView) {
        login = (
            <div className="modal-overlay">
                <div className="modal-content">
                    {Login({ auth, form, setView, setLoginView })}
                    <Button onClick={() => {setLoginView(false)}}>OK</Button>
                </div>
            </div>
        )
    }

    return (
        <>
            {profile}
            {login}
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
                                        setView(true)
                                    } else {
                                        setLoginView(true)
                                    }
                                }}>Profile</Nav.Link>
                        </Nav>
                        
                    </Navbar.Collapse>
                </Container>
            </Navbar>
        </>
    );
}

export default NavBar;
