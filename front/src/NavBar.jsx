import React, { useState, useEffect, useContext } from "react";
import { Navbar, Nav, Container, Button } from "react-bootstrap";
import Profile from "./Profile";
import Login from "./Login";
import "./css/navbar.css";

import { AuthContext } from "../src/authContext";
import { clearLocalStorage } from "./utility";

const NavBar = () => {
  const { auth } = useContext(AuthContext);

  const [view, setView] = useState(false);
  const [loginView, setLoginView] = useState(false);

  const [userName, setUserName] = useState("");
  const [passWord, setPassword] = useState("");
  const [message, setMessage] = useState("");

  const [loggedIn, setLoggedIn] = useState(false);

  const form = {
    userName,
    setUserName,
    passWord,
    setPassword,
    message,
    setMessage,
  };


  useEffect(() => {
    if (auth.username) {
      setLoggedIn(true);
    } else {
      setLoggedIn(false);
    }
  }, [view, auth.username]);

  const handleLogout = () => {
    auth.setUsername(null);
    clearLocalStorage();
    setView(false);
    setLoginView(false);

    setUserName("");
    setPassword("");
    setMessage("");
  };

  return (
    <>
      {view && <Profile setView={setView}/>}
      {loginView && (
        <div className="modal-overlay">
          <div className="modal-content">
            <Login form={form} setView={setView} setLoginView={setLoginView} />
            <Button
              onClick={() => {
                setLoginView(false);
              }}
              className="btn-secondary">
              Close
            </Button>
          </div>
        </div>
      )}
      <Navbar expand="lg" className="navbar-custom">
        <Container>
          <Navbar.Brand href="/" className="navbar-brand">
            Nom Nom Nexus
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="mx-auto">
              <Nav.Link href="/" className="nav-link">
                Home
              </Nav.Link>
              <Nav.Link href="/menu" className="nav-link">
                Menu
              </Nav.Link>
              <Nav.Link href="/locations" className="nav-link">
                Locations
              </Nav.Link>
            </Nav>
            {loggedIn && (
              <Nav.Link
                className="nav-link profile-link"
                href="#"
                onClick={() => {
                  setView(true);
                }}>
                Profile
              </Nav.Link>
            )}
            {loggedIn ? (
              <Button className="btn-secondary" onClick={handleLogout}>
                Logout
              </Button>
            ) : (
              <Button
                className="btn-primary"
                onClick={() => {
                  setLoginView(true);
                }}>
                Log In
              </Button>
            )}
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </>
  );
};

export default NavBar;
