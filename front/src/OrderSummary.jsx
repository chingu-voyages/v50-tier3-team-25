import React, { useEffect, useState } from "react";
import { Container, Col, Row, Card, Button } from "react-bootstrap";
import { getCart } from "./utility";

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
                            {cart.map((item) => 
                            <ul 
                                key={item.id}
                            >
                                <li>{item.name} - x{item.quantity} - ${item.price * item.quantity}</li>

                            </ul>)
                            }
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