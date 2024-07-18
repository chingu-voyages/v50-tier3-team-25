import React, { useEffect, useState } from "react";
import axios from 'axios';


const Login = () => {
    const [userName, setUserName] = useState('');
    const [passWord, setPassword] = useState('');
    const [message, setMessage] = useState('')
  
        
    const handleChange = (e) => {
        const {name, value} = e.target;
        if (name == userName) {
            setUserName(value);
        } else if (name == 'passWord') {
            setPassword(value)
        }    
    }

    const LoginUser = async (e) => {
        e.preventdefault();
        try {
            const params = new URLSearchParams()
            params.append('username', userName)
            params.append('password', passWord)

            const response = await axios.post('/login',{params});

            if(response.status === 200) {
                setMessage("Login Successful")
            }

        } catch (error) {
            if(error.response && error.response.status === 401 )
            setMessage("Unauthorized");
        }; 

    };
    return(
        <div>
              <Form onSubmit={LoginUser}>
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
                    Login
                </Button>
            </Form>
            {message && <p>{message}</p>}
        </div>
    )
};

export default Login;