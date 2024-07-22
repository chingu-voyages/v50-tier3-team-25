import React, { useEffect, useState } from "react";
import { Container, Col, Row, Card, Button } from "react-bootstrap";
import { getCart } from "./utility";
import { v4 as uuidv4 } from "uuid";

const OrderSummary = () => {
    const [cart, setCart] = useState([]);

    useEffect(() => {
        setCart(getCart());
    }, []);

    return(
        
        <div className="modal-overlay">
            <div className="modal-content">
                <Container>
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
                            <Col>
                                <Button> Checkout</Button>
                            </Col>
                        </Card.Body>
                    </Card>
                </Container>
            </div>
        </div>
    )
}

export default OrderSummary;