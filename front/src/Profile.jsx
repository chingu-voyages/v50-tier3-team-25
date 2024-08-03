import React, { useState } from "react";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Button from "react-bootstrap/Button";
import { InputGroup, Form } from "react-bootstrap";
import { addCredits } from "./api";

const Profile = ({ auth, credits, setView, updateCredits, setInformation }) => {
    const dbPassword = import.meta.env.VITE_SECRET_KEY;
    const [creditsToAdd, setCreditsToAdd] = useState("");

    const handleAddCredits = async (e) => {
        e.preventDefault();
        try {
            await addCredits({ auth, creditsToAdd, dbPassword, setInformation });
            updateCredits();
        } catch (error) {
            console.error("Failed to add credits:", error);
        }
    };

    return (
        <div className="modal-overlay">
            <div className="modal-content">
                <Container>
                    <Row>
                        <Col>
                            <h2>Profile</h2>
                        </Col>
                    </Row>
                    <Row>
                        <Col>
                            {"Username: " + auth.username}
                        </Col>
                    </Row>
                    <Row>
                        <Col>
                            {"Credits: $" + credits}
                        </Col>
                    </Row>
                    <Col>
                        <InputGroup className="mb-3">
                            <InputGroup.Text id="basic-addon1">$</InputGroup.Text>
                            <Form.Control
                                aria-label="addCredits"
                                aria-describedby="basic-addon1"
                                value={creditsToAdd}
                                onChange={(e) => setCreditsToAdd(e.target.value)}
                            />
                            <Button onClick={handleAddCredits}>Add Credits</Button>
                        </InputGroup>
                    </Col>
                    <Row>
                        <Col>
                            <Button onClick={() => { setView(false) }}>OK</Button>
                        </Col>
                    </Row>
                </Container>
            </div>
        </div>
    )
}

export default Profile;
