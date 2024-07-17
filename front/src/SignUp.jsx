import axios from "axios";
import React, {useState} from "react";


const SignUp = () => {
    const [message, setMessage] = useState('')
    const [formData, setFormData] = useState({
        userName: '',
        email: '',
        passWord: '',
    })
        };

        const handleSubmit = async (e) => {
            e.preventdefault();
            const {email, userName, passWord} = formData
                try {
                    const response = await axios.post('/createUser',{
                        username: userName,
                        email: email,
                        password: passWord
                    });

                    if(response.status === 201) {
                        setMessage("User Created Successfully.")
                        setFormData({
                            userName: '',
                            email: '',
                            passWord: ''
                        })
                    }

                } catch (error) {
                    console.error("Cant create account:", error);
                };


        
    return(
        <div>
            <Form>
            <Form.Group className="mb-3" controlId="formBasicEmail">
                <Form.Label>Email address</Form.Label>
                <Form.Control type="email" placeholder="Enter email" />
                <Form.Text className="text-muted">
                We'll never share your email with anyone else.
                </Form.Text>
            </Form.Group>

            <Form.Group className="mb-3" controlId="formBasicPassword">
                <Form.Label>Password</Form.Label>
                <Form.Control type="password" placeholder="Password" />
            </Form.Group>
            <Form.Group className="mb-3" controlId="formBasicCheckbox">
                <Form.Check type="checkbox" label="Check me out" />
            </Form.Group>
            <Button variant="primary" type="submit" oncli>
                Submit
            </Button>
            </Form>

        </div>
    )

}

export default SignUp;