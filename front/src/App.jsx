import { Link } from "react-router-dom"
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import "./css/app.css";

import MenuItem from "./MenuItem";

const Title = () => {
  return (
    <h1 className="text-center title">
      Nom Nom Nexus
    </h1>
  )
}

function HeroWithStoreFinder() {
  return (
    <Container className="hero-container position-relative mb-4">
      <Row className="justify-content-center">
        <Col xs={12} md={10} lg={8} className="p-0">
          <div className="hero-image-wrapper">
            <img 
              src="./src/assets/FoodHeroImage.jpg"
              alt="Delicious spread of our most popular dishes"
              className="img-fluid rounded"
            />
            <div className="store-finder-overlay d-flex justify-content-center align-items-center">
              <Link to={"/locations"} className="btn btn-primary btn-lg">FIND A LOCATION NEAR YOU</Link>
            </div>
          </div>
        </Col>
      </Row>
    </Container>
  )
}

function Hero() {
  return (
    <Container className="">
      <Row>
        <Col className="rounded">
          <img 
            src="./src/assets/FoodHeroImage.jpg"
            alt="Delicious spread of our most popular dishes" 
            className="img-fluid rounded"
          />
        </Col>
      </Row>
    </Container>
  )
}

function StoreFinder() {
  return (
    <Container className="py-4">
      <Row>
        <Col className="store-finder rounded p-5">
          <Link to={"/locations"} className="btn btn-primary">FIND A LOCATION NEAR YOU</Link>
        </Col>
      </Row>
    </Container>
  )
}

function Featured() {
  return (
    <Container className="py-4">
      <h2 className="mb-4">Featured Dishes</h2>
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
    <Container className="py-4">
      <h2 className="mb-4">Popular Dishes</h2>
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
    <div className="app-container">
      <Title />
      <HeroWithStoreFinder/>
      <Featured/>
      <PopularDishes/>
    </div>
  )
}

export default App