import { Link } from "react-router-dom"
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import { useEffect, useState } from "react";
import "./css/app.css";
import { getMenu } from "./api";
import { randomListItem } from "./utility";
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

function Featured(props) {
  const best = props.best

  const defaultItem = {
    name: "Featured Example",
    id: "example",
    dsc: "An example featured menu item.",
    img: "",
    price: 99.99,
    rate: 5,
  }

  let item1 = randomListItem(best)
  let item2 = randomListItem(best)

  if (!item1) {
    item1 = defaultItem
  }

  if (!item2) {
    item2 = defaultItem
  }

  return (
    <Container className="py-4">
      <h2 className="mb-4">Featured Dishes</h2>
      <Row>
        <Col>
          {MenuItem({
            itemName: item1.name,
            id: item1.id,
            description: item1.dsc,
            image: item1.img,
            price: item1.price,
            rating: item1.rate,
          })}
        </Col>
        <Col>
          {MenuItem({
            itemName: item2.name,
            id: item2.id,
            description: item2.dsc,
            image: item2.img,
            price: item2.price,
            rating: item2.rate,
          })}
        </Col>
      </Row>
    </Container>
  )
}

function PopularDishes(props) {
  const best = props.best

  const defaultItem = {
    name: "Popular Example",
    id: "example",
    dsc: "An example popular menu item.",
    img: "",
    price: 99.99,
    rate: 5,
  }

  let item1 = randomListItem(best)
  let item2 = randomListItem(best)

  if (!item1) {
    item1 = defaultItem
  }

  if (!item2) {
    item2 = defaultItem
  }
  
  return (
    <Container className="py-4">
      <h2 className="mb-4">Popular Dishes</h2>
      <Row>
        <Col>
          {MenuItem({
            itemName: item1.name,
            id: item1.id,
            description: item1.dsc,
            image: item1.img,
            price: item1.price,
            rating: item1.rate,
          })}
        </Col>
        <Col>
          {MenuItem({
            itemName: item2.name,
            id: item2.id,
            description: item2.dsc,
            image: item2.img,
            price: item2.price,
            rating: item2.rate,
          })}
        </Col>
      </Row>
    </Container>
  )
}

function App() {
  const [data, setMenuData] = useState({});

  useEffect(() => {
    getMenu({ setMenu: setMenuData });
  }, [])

  const bestList = data["best-foods"]

  return (
    <div className="app-container">
      <Title />
      <HeroWithStoreFinder/>
      <Featured best={bestList}/>
      <PopularDishes best={bestList}/>
    </div>
  )
}

export default App