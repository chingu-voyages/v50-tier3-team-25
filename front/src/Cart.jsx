import React from "react";
import { useState, useEffect } from "react";

import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Button from "react-bootstrap/Button";

import { addToCart, getCart, removeFromCart } from "./utility";
import { useHref } from "react-router-dom";
import { v4 as uuidv4 } from "uuid";

const CartItem = ( {id, name, price, quantity, setCart} ) => {

    return (
        <Row>
            <Col className="col-8">
                <ul key={uuidv4()}>
                    <li>{name} - x{quantity} - ${(price * quantity).toFixed(2)}</li>
                </ul>            
            </Col>
            <Col className="col-4">
                <Button onClick={() => {
                    setCart(removeFromCart(id)) //remove self
                }}>Remove</Button>
            </Col>
        </Row>
    )
}

const Cart = ( {viewCart, setViewCart} ) => {
    const [cart, setCart] = useState({})

    useEffect( () => { 
        setCart(getCart())
    }, []) //initial load, no deps

    useEffect( () => { 
        setCart(getCart())
    }, [viewCart]) //reload whenever the cart is viewed again

    let cartElements = []
    for (const key of Object.keys(cart)) {
        const item = cart[key]

        cartElements.push( CartItem({
            id: item.id,
            name: item.name,
            price: item.price,
            quantity: item.quantity,
            setCart,
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
                        <Col>
                            <Button href="/checkout" onClick={() => { useHref("/checkout") }}>Check Out</Button>
                        </Col>
                    </Row>
                </Container>
            </div>
        </div>
    )
}

export default Cart;