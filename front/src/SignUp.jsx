import axios from "axios";
import React, { useState } from "react";
import { Form, Button } from 'react-bootstrap';

const SignUp = () => {
    const [message, setMessage] = useState('');
    const [formData, setFormData] = useState({
        userName: '',
        email: '',
        passWord: '',
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prevState => ({
            ...prevState,
            [name]: value
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const { email, userName, passWord } = formData;
        try {
            const response = await axios.post('/createUser', {
                username: userName,
                email: email,
                password: passWord
            });

            if (response.status === 201) {
                setMessage("User Created Successfully.");
                setFormData({
                    userName: '',
                    email: '',
                    passWord: ''
                });
            }

        } catch (error) {
            console.error("Can't create account:", error);
            setMessage("Error creating account.");
        }
    };

    return (
        <div>
            <Form onSubmit={handleSubmit}>
                <Form.Group className="mb-3" controlId="formBasicUsername">
                    <Form.Label>Username</Form.Label>
                    <Form.Control 
                        type="text" 
                        placeholder="Enter username" 
                        name="userName"
                        value={formData.userName}
                        onChange={handleChange}
                    />
                </Form.Group>

                <Form.Group className="mb-3" controlId="formBasicEmail">
                    <Form.Label>Email address</Form.Label>
                    <Form.Control 
                        type="email" 
                        placeholder="Enter email" 
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
                        name="passWord"
                        value={formData.passWord}
                        onChange={handleChange}
                    />
                </Form.Group>

                <Button variant="primary" type="submit">
                    Submit
                </Button>
            </Form>
            {message && <p>{message}</p>}
        </div>
    );
}

export default SignUp;
