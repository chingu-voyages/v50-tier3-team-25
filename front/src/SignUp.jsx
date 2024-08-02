import axios from "axios";
import React, { useState } from "react";
import { Form, Button, Card, Container } from "react-bootstrap";
import { Link } from "react-router-dom";

const SignUp = () => {
  const dbPassword = import.meta.env.VITE_SECRET_KEY;
  const baseURL = import.meta.env.VITE_BASEURL;

  const [message, setMessage] = useState("");
  const [formData, setFormData] = useState({
    username: "",
    fullName: "",
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { email, username, password, fullName } = formData;

    try {
        console.log(dbPassword)
      const response = await fetch(`${baseURL}/createUser`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          username: username,
          name: fullName,
          email: email,
          password: password,
          mongodbPassword: dbPassword,
        }),
      });

      if (response.status === 201) {
        setMessage("User Created Successfully.");
        setFormData({
          username: "",
          email: "",
          password: "",
          fullName: "",
        });
      }
    } catch (error) {
      console.error("Can't create account:", error);
      setMessage("Error creating account.");
    }
  };

  return (
    <Container className="d-flex justify-content-center align-items-center vh-100">
      <Card className="w-100" style={{ maxWidth: "400px" }}>
        <Card.Body>
          <h2 className="text-center mb-4">SignUp</h2>
          <Form onSubmit={handleSubmit}>
            <Form.Group className="mb-3" controlId="formBasicUsername">
              <Form.Label>Username</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter Username"
                name="username"
                value={formData.userName}
                onChange={handleChange}
              />
            </Form.Group>

            <Form.Group className="mb-3" controlId="formBasicName">
              <Form.Label>Name</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter Name"
                name="fullName"
                value={formData.firstName}
                onChange={handleChange}
              />
            </Form.Group>

            <Form.Group className="mb-3" controlId="formBasicEmail">
              <Form.Label>Email address</Form.Label>
              <Form.Control
                type="email"
                placeholder="Enter Email"
                name="email"
                value={formData.email}
                onChange={handleChange}
              />
            </Form.Group>

            <Form.Group className="mb-3" controlId="formBasicPassword">
              <Form.Label>Password</Form.Label>
              <Form.Control
                type="password"
                placeholder="Password"
                name="password"
                value={formData.passWord}
                onChange={handleChange}
              />
            </Form.Group>

            <Button variant="primary" type="submit">
              Submit
            </Button>
          </Form>
          {message && <p>{message}</p>}

          {/* <p className="text-center mt-3">
            <Link
              to="/login"
              className="btn btn-link"
              onClick={() => {}}>
              Already have an account? Login
            </Link>
          </p> */}
        </Card.Body>
      </Card>
    </Container>
  );
};

export default SignUp;
