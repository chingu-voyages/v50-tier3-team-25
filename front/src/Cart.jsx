import React from "react";
import { useState, useEffect } from "react";

import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Button from "react-bootstrap/Button";

import { addToCart, getCart, removeFromCart } from "./utility";

const CartItem = ( {id, name, price, quantity} ) => {

    return (
        <Row>
            <Col>
                {name}
            </Col>
            <Col>
                {"x" + quantity}
            </Col>
            <Col>
                {"$" + (price * quantity)}
            </Col>
        </Row>
    )
}

const Cart = ( {setViewCart} ) => {
    const [cart, setCart] = useState({})

    useEffect( () => {
        setCart(getCart())
    }, [])

    let cartElements = []
    for (const key of Object.keys(cart)) {
        const item = cart[key]

        cartElements.push( CartItem({
            id: item.id,
            name: item.name,
            price: item.price,
            quantity: item.quantity,
        }) )
    }

    return(
        <div className="modal-overlay">
            <div className="modal-content">
                <Container>
                    <Row>
                        <Col>
                            <h4>Cart</h4>
                        </Col>
                    </Row>
                    {cartElements}
                    <Row>
                        <Col>
                            <Button onClick={() => { setViewCart(false) }}>OK</Button>
                        </Col>
                    </Row>
                </Container>
            </div>
        </div>
    )
}

export default Cart;