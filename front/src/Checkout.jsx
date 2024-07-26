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


    const subtotal = Object.keys(cart).reduce((acc, id)  => {
    let item = cart[id];
    return acc + item.price * item.quantity;
    }, 0);

    // taxes
    const taxRate = 0.08
    //
    const taxes = subtotal * taxRate
    //total
    const total =  subtotal + taxes
    

    return(
                <Container>
                    <Row className="">
                        <Row className=" mb-3 mt-2">
                            <Col>
                                <Link variant="primary" to={"/menu"} > Return To Menu</Link>
                            </Col>
                        </Row>
                        <Col>
                            <h6>Billing information</h6>
                            <Form onSubmit={""}>
                                <Form.Group controlId="formBasicUsername">
                                    <Form.Label></Form.Label>
                                    <Form.Control 
                                        type="text" 
                                        placeholder="Enter Name" 
                                        name="userName"
                                        value={""}
                                        onChange={''}
                                    />
                                </Form.Group>

                                <Form.Group controlId="formBasicEmail">
                                    <Form.Label></Form.Label>
                                    <Form.Control 
                                        type="address" 
                                        placeholder="Address" 
                                        name="address"
                                        value={""}
                                        onChange={""}
                                    />
                                </Form.Group>

                                <Form.Group controlId="formBasicPassword">
                                    <Form.Label></Form.Label>
                                    <Form.Control 
                                        type="text" 
                                        placeholder="City" 
                                        name="city"
                                        value={""}
                                        onChange={""}
                                    />
                                </Form.Group>

                                <Form.Group controlId="formBasicPassword">
                                    <Form.Label></Form.Label>
                                    <Form.Control 
                                        type="text" 
                                        placeholder="State" 
                                        name="state"
                                        value={""}
                                        onChange={""}
                                    />
                                </Form.Group>
                                <Form.Group className="mb-3" controlId="formBasicPassword">
                                    <Form.Label></Form.Label>
                                    <Form.Control 
                                        type="text" 
                                        placeholder="ZipCode" 
                                        name="state"
                                        value={""}
                                        onChange={""}
                                    />
                                </Form.Group>

                            
                            </Form>
                        </Col>
                        
                        <Col>
                            <Card>
                                <Card.Body>
                                    <h6 className="mb-3">Order Summary</h6>
                                    {Object.keys(cart).map((id) => {
                                    let item = cart[id]

                                    return (<div 
                                        key={uuidv4()}
                                        style={{liststyle: 'none'}}
                                        className="list-unstyled"
                                    >   
                                        <li className="list-unstyled pr-5"></li>
                                        <span>{item.name}</span>
                                        <span> - x{item.quantity} - </span>
                                        <span> ${item.price * item.quantity}</span>
                                    </div>)})}
                                        <hr></hr>
                                        <p>Subtotal: ${subtotal.toFixed(2)} </p>
                                        <p>Taxes:  ${taxes.toFixed(2)} </p>
                                        <p >Total: ${total.toFixed(2)} </p>
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