import React, { useEffect, useState } from "react";
import { Container, Col, Row, Card, Button, Form } from "react-bootstrap";
import { getCart } from "./utility";
import { v4 as uuidv4 } from "uuid";
import { Link, useHref } from "react-router-dom";


const Checkout = () => {
    const [cart, setCart] = useState([]);

    useEffect(() => {
        setCart(getCart());
    }, []);

    // item names

    // subtoal
    // taxes
    //total

    return(
                <Container>
                    <Row className="">
                        <Row className=" mb-5 mt-2">
                            <Col>
                                <Link variant="primary" onClick={''}> Return To Cart</Link>
                            </Col>
                        </Row>
                        <Col>
                            <h6>Billing information</h6>
                            <Form onSubmit={""}>
                                <Form.Group className="mb-3" controlId="formBasicUsername">
                                    <Form.Label>Name</Form.Label>
                                    <Form.Control 
                                        type="text" 
                                        placeholder="Enter Name" 
                                        name="userName"
                                        value={""}
                                        onChange={''}
                                    />
                                </Form.Group>

                                <Form.Group className="mb-3" controlId="formBasicEmail">
                                    <Form.Label>Add</Form.Label>
                                    <Form.Control 
                                        type="email" 
                                        placeholder="Enter email" 
                                        name="email"
                                        value={""}
                                        onChange={""}
                                    />
                                </Form.Group>

                                <Form.Group className="mb-3" controlId="formBasicPassword">
                                    <Form.Label>Password</Form.Label>
                                    <Form.Control 
                                        type="password" 
                                        placeholder="Password" 
                                        name="passWord"
                                        value={""}
                                        onChange={""}
                                    />
                                </Form.Group>
                            </Form>
                        </Col>
                        
                        <Col>
                            <Card>
                                <Card.Body>
                                    <h6>Order Summary</h6>
                                    {Object.keys(cart).map((id) => {
                                    let item = cart[id]

                                    return (<ul 
                                        key={uuidv4()}
                                    >
                                        <li>{item.name} - x{item.quantity} - ${item.price * item.quantity}</li>

                                    </ul>)})}
                                    
                                </Card.Body>
                            </Card>
                            
                        </Col>
                        
                        <Row>
                            <Col>
                                <Button variant="primary" onClick={''}> Purchase</Button>
                            </Col>
                        </Row>
                        
                        
                    </Row >
                </Container>
    )
}

export default Checkout;