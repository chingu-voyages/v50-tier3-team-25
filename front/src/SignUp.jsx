import axios from "axios";
import React, {useState} from "react";


const SignUp = () => {

    const [formData, setFormData] = useState({
        username: '',
        email: '',
        password: '',
    })

    const CreateUser = async () => {
            await axios.post('/createUser')
                .then(response => 
                    {
                        setFormData(response.data)
                    })
                .catch(error => {
                    console.error("Cant create account:", error);
                });
            };
   
        };
        
    return(
        <section>Signup</section>
    )



export default SignUp;