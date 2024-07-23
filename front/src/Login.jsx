import React, { useState } from "react";
import axios from 'axios';
import { Form, Button, Card, Container} from "react-bootstrap";
import { Link } from "react-router-dom";
import SignUp from "./SignUp";

const Login = () => {
    const [userName, setUserName] = useState('');
    const [passWord, setPassword] = useState('');
    const [message, setMessage] = useState('');

    const handleChange = (e) => {
        const { name, value } = e.target;
        if (name === 'userName') {
            setUserName(value);
        } else if (name === 'passWord') {
            setPassword(value);
        }
    };

    const LoginUser = async (e) => {
        e.preventDefault();
        try {
            const params = new URLSearchParams();
            params.append('username', userName);
            params.append('password', passWord);

            const response = await axios.post('/login', params);

            if (response.status === 200) {
                setMessage("Login Successful");
            }

        } catch (error) {
            if (error.response && error.response.status === 401) {
                setMessage("Unauthorized");
            }
        }
    };

    return (
        <Container className="d-flex justify-content-center align-items-center vh-100">
            <Card className="w-100" style={{ maxWidth: '400px'}}>
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
                        <Link to='/signup' className="btn btn-link" onClick={() => { useHref("/signup") }}>
                            Don't have an account? Sign Up
                        </Link>
                    </p>
                    
                </Card.Body>
            </Card>
        </Container>
    );
};

export default Login;
