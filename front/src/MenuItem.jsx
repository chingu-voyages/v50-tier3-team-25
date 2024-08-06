import React from "react";
import Container from "react-bootstrap/Container";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import Button from "react-bootstrap/Button";
import Image from "react-bootstrap/Image";
import { v4 as uuidv4 } from "uuid";

import { addToCart } from "./utility";

// Display menu items of the selected category 
// include functionality to add items to the cart
const MenuItem = ({itemName, id, description, image, price, rating}) => {

    // example menu data:

    // name: "Joe's KC BBQ", … }​​​
    // country: "Kansas City, KS"
    // dsc: "Joe's KC Ribs, Brisket & Burnt Ends"
    // id: "ribs-brisket-and-burnt-ends"
    // img: "https://goldbelly.imgix.net/uploads/showcase_media_asset/image/79619/joes-kc-ribs-brisket-and-burnt-ends.6710e994980e485e6441b794717ad6fb.jpg?ixlib=react-9.0.2&auto=format&ar=1%3A1"
    // latitude: 39.08532
    // longitude: -94.688505
    // name: "Joe's KC BBQ"
    // price: 110.99
    // rate: 4

    return(
        <Col className="col-12 p-1" key={uuidv4()}>
            <Container className="p-2 border rounded-edge">
                <Row>
                    <Col>
                        <Image src={image} fluid rounded className="menu-image" />
                    </Col>
                </Row>
                <Row>
                    <Col>
                        Name: {itemName}
                    </Col>
                </Row>
                <Row>
                    <Col>
                        Description: {description}
                    </Col>
                </Row>
                <Row>
                    <Col>
                        Price: ${price}
                    </Col>
                    <Col>
                        Rating: {rating} / 5
                    </Col>
                </Row>
                <Row>
                    <Col className="d-flex justify-content-end">
                        <Button onClick={() => {
                            addToCart(id, itemName, price)
                        }} >Add To Cart</Button>
                    </Col>
                </Row>
            </Container>
        </Col>
    )
};

export default MenuItem