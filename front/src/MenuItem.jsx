import React from "react";
import Card from "react-bootstrap/Card";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Button from "react-bootstrap/Button";
import { addToCart } from "./utility";

const MenuItem = ({itemName, id, description, image, price, rating}) => {
  return (
    <Card className="mb-3">
      <Row className="g-0">
        <Col md={4}>
          <Card.Img 
            src={image} 
            alt={itemName}
            className="img-fluid rounded-start menu-item-image"
            style={{ objectFit: 'cover', height: '100%' }}
          />
        </Col>
        <Col md={8}>
          <Card.Body>
            <Card.Title>{itemName}</Card.Title>
            <Card.Text>{description}</Card.Text>
            <Card.Text>
              <strong>Price:</strong> ${price} | <strong>Rating:</strong> {rating} / 5
            </Card.Text>
            <Button 
              onClick={() => addToCart(id, itemName, price)}
              variant="primary"
            >
              Add To Cart
            </Button>
          </Card.Body>
        </Col>
      </Row>
    </Card>
  );
};

export default MenuItem;