import { Link } from "react-router-dom"

import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

import MenuItem from "./MenuItem";

const Title = () => {
  return (
    <h1 className="text-center">
      Team 25 Restaurant
    </h1>
  )
}

function Hero() {
  return (
    <Container className="py-2">
      <Row>
        <Col className="border hero rounded bg-light text-center p-5">
          INSERT HERO IMAGE HERE
        </Col>
      </Row>
    </Container>
  )
}

function StoreFinder() {
  return (
    <Container className="py-2">
      <Row>
        <Col className="border rounded bg-light text-center p-5">
          <Link to={"/locations"}>FIND A LOCATION NEAR YOU</Link>
        </Col>
      </Row>
    </Container>
  )
}

function Featured() {
  return (
    <Container className="py-2">
      <Row>
          {MenuItem({ 
            itemName: "Featured Example",
            id: "example",
            description: "An example featured menu item.",
            image: "",
            price: 99.99,
            rating: 5,
          })}
          {MenuItem({ 
            itemName: "Featured Example",
            id: "example",
            description: "An example featured menu item.",
            image: "",
            price: 99.99,
            rating: 5,
          })}
      </Row>
    </Container>
  )
}

function PopularDishes() {
  return (
    <Container className="py-2">
      <Row>
          {MenuItem({ 
            itemName: "Popular Example",
            id: "example",
            description: "An example popular menu item.",
            image: "",
            price: 99.99,
            rating: 5,
          })}
          {MenuItem({ 
            itemName: "Popular Example",
            id: "example",
            description: "An example popular menu item.",
            image: "",
            price: 99.99,
            rating: 5,
          })}
      </Row>
    </Container>
  )
}

function App() {
  return (
    <div className="h-100 p-5 text-center">
      <Title />
      <Hero/>
      <StoreFinder/>
      <Featured/>
      <PopularDishes/>
    </div>
  )
}


export default App
