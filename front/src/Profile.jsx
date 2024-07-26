import React from "react";

import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Button from "react-bootstrap/Button";

const Profile = ({auth, setView}) => {
    
    return(
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
                            {"Credits: " }
                        </Col>
                    </Row>
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