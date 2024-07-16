import React, { useEffect } from "react";
import axios from 'axios';


const Login = () => {
  
        
    const LoginUser = () => {
         axios.post(`/login`)
            .then(response => {
                console.log("Login Successful:", response.data)

            })
            .catch(error => { 
                console.log("Cant login:", error)
                
            })
    }}

    return(
        <section>Login </section>
    )


export default Login;