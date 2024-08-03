import React, { useState, useContext } from "react";
import axios from "axios";
import { Form, Button, Card, Container } from "react-bootstrap";
import { Link } from "react-router-dom";
import SignUp from "./SignUp";

import { AuthContext } from "./authContext";
import { saveUsername } from "./api";

const Login = ({ auth, form, setView, setLoginView }) => {
  const userName = form.userName
  const setUserName = form.setUserName
  const passWord = form.passWord
  const setPassword = form.setPassword
  const message = form.message
  const setMessage = form.setMessage

  const dbPassword = import.meta.env.VITE_SECRET_KEY;
  const baseURL = import.meta.env.VITE_BASEURL;

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name === "userName") {
      setUserName(value);
    } else if (name === "passWord") {
      setPassword(value);
    }
  };

  const LoginUser = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(`${baseURL}/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          username: userName,
          password: passWord,
          mongodbPassword: dbPassword,
        }),
      });

      if (response.ok) {
        setMessage("Login Successful");
        saveUsername({auth, username: userName})
        setLoginView(false)
        setView(true)
      } else if (response.status === 401) {
        setMessage("Unauthorized");
      } else {
        throw new Error("Login failed");
      }
    } catch (error) {
      console.error("Error:", error);
      setMessage("An error occurred");
    }
  };

  return (
    <Container className="d-flex justify-content-center align-items-center vh-100">
      <Card className="w-100" style={{ maxWidth: "400px" }}>
        <Card.Body>
          <h2 className="text-center mb-4">Login</h2>
          <Form onSubmit={LoginUser}>
            <Form.Group className="mb-3" controlId="inputUsername">
              <Form.Label>Username</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter username"
                name="userName"
                value={userName}
                onChange={handleChange}
              />
            </Form.Group>

            <Form.Group className="mb-3" controlId="inputPassword">
              <Form.Label>Password</Form.Label>
              <Form.Control
                type="password"
                placeholder="Password"
                name="passWord"
                value={passWord}
                onChange={handleChange}
              />
            </Form.Group>

            <Button variant="primary" type="submit" className="w-100">
              Login
            </Button>
          </Form>
          {message && <p className="text-center mt-3">{message}</p>}
          <p className="text-center mt-3">
            <Link
              to="/signup"
              className="btn btn-link"
              onClick={() => {
                useHref("/signup");
              }}>
              Don't have an account? Sign Up
            </Link>
          </p>
        </Card.Body>
      </Card>
    </Container>
  );
};

export default Login;
