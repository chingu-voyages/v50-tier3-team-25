import React from "react";
import { Container, Button } from "react-bootstrap";
import NavBar from "./NavBar";

function Buttons() {
    //MADDIE: moved these out for now since they were a little awkwardly placed, should be integrated into the navbar
    return (
        <div className="ml-auto d-flex">
            <Button variant="dark" className="me-2">Dark</Button>
            <Button variant="dark">Login</Button>
        </div>
    )
}

const Header = () => {
    return (
        <NavBar/>
    );
}

export default Header;
