import React from "react";
import { Container, Button } from "react-bootstrap";
import NavBar from "./NavBar";

const Header = () => {
    return (
        <Container>
                <div className="ml-auto d-flex">
                    <Button variant="dark" className="me-2">Dark</Button>
                    <Button variant="dark">Login</Button>
                </div>

        </Container>
    );
}

export default Header;
