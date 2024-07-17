import React, { useEffect, useState } from "react";
import axios from 'axios';


const Login = () => {
    const [userName, setUserName] = useState('');
    const [passWord, setPassword] = useState('');
    const [message, setMessage] = useState('')
  
        
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
            if(response.status === 40 )
            setMessage("Unauthorized");
        };

    };
    return(
        <div>
            <h1>Login</h1>
            <form onSubmit={LoginUser}>

            </form>
        </div>
    )
};

export default Login;