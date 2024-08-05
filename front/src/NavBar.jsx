import React, { useState, useEffect, useContext } from "react";
import { Navbar, Nav, Container, Button } from "react-bootstrap";
import Profile from "./Profile";
import Login from "./Login";
import "./css/navbar.css"

import { AuthContext } from "../src/authContext";

import { getUser } from "./api";

const NavBar = () => {
  // called before any function uses it
  const { auth } = useContext(AuthContext);

  const [view, setView] = useState(false);
  const [loginView, setLoginView] = useState(false);
  const [credits, setCredits] = useState(0);

  // login form stuff because React is Fucking Stupid
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

  async function updateCredits() {
    getUser({ auth, setInformation: setCredits });
  }

  useEffect(() => {
    updateCredits();

    if (auth.username) {
      setLoggedIn(true);
    } else {
      setLoggedIn(false);
    }
  }, [view, auth]);

  // logout function
  const handleLogout = () => {
    auth.setUsername(null);
    localStorage.removeItem("username");
    setView(false);
    setLoginView(false);

    setUserName("");
    setPassword("");
    setMessage("");
  };

  return (
    // moved so the login and profile are rendered as JSX
    <>
      {view && <Profile auth={auth} credits={credits} setView={setView} updateCredits={updateCredits} se />}
      {loginView && (
        <div className="modal-overlay">
          <div className="modal-content">
            <Login auth={auth} form={form} setView={setView} setLoginView={setLoginView} />
            <Button
              onClick={() => {
                setLoginView(false);
              }}>
              OK
            </Button>
          </div>
        </div>
      )}
      <Navbar expand="lg" className="navbar navMain">
        <Container>
          <Navbar.Brand href="/" className="textColor">Nom Nom Nexus</Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="mx-auto">
              <Nav.Link href="/" className="navLink">Home</Nav.Link>
              <Nav.Link href="/menu" className="navLink">Menu</Nav.Link>
              <Nav.Link href="/locations" className="navLink">Locations</Nav.Link>
              <Nav.Link href="/about" className="navLink">About</Nav.Link>
            </Nav>
            {loggedIn && (
              <Nav.Link className="profile-link"
                href="#"
                onClick={() => {
                  setView(true);
                }}>
                Profile
              </Nav.Link>
            )}
            {loggedIn && (
              <Nav.Link>
                <Button className="button is-light" onClick={handleLogout}>
                  Logout
                </Button>
              </Nav.Link>
            )}
            {!loggedIn && (
              <Button
                className="button is-light"
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
