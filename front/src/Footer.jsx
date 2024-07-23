import React from "react";
import { Card, Row, Col } from "react-bootstrap";


const Footer = () => {
    return (
        <Card className="text-center">
            <Card.Footer className="text-center py-5">
                <Row>
                    <Col className="">
                        <a href="https://github.com/chingu-voyages/v50-tier3-team-25" target="_blank" rel="noopener noreferrer">
                        Github Repository
                        </a>
                    </Col>
                    <Col className="">
                        <a href="" target="_blank" rel="noopener noreferrer">
                        Privacy Policy
                        </a>
                    </Col>
                    <Col className="">
                        <a href="" target="_blank" rel="noopener noreferrer">
                        Contact Us
                        </a>
                    </Col>
                </Row>
            </Card.Footer>
        </Card>
    );
};

export default Footer;