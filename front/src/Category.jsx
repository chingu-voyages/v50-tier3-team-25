import React from "react";
import { v4 as uuidv4 } from "uuid";
import Container from "react-bootstrap/Container";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";

// These components displays all available category sections 
// Also Selections of a category
// Render all categories and handle user clicks
const Category = ({categoryName, setCurrentCategory}) => {

    return(
        <Col className="col-12 col-md-6 p-1" key={uuidv4()} onClick={() => { setCurrentCategory(categoryName) }}>
            <Container className="border">
                <Row>
                    <Col>
                        {categoryName}
                    </Col>
                </Row>
            </Container>
        </Col>
    )
}

export default Category;