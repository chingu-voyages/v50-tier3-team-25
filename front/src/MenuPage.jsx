import React, { useContext, useState, useEffect } from "react";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import { Link } from "react-router-dom";

import MenuItem from "./MenuItem";
import Category from "./Category";
import Cart from "./Cart";
import { getMenu } from "./api";
import { AuthContext } from "./authContext";
import "./css/menu.css";
import { formatString } from "./utility";

const MenuPage = () => {
  const [menuData, setMenuData] = useState({});
  const [currentCategory, setCurrentCategory] = useState("");
  const [viewCart, setViewCart] = useState(false);
  const { auth } = useContext(AuthContext);
  const { selectedLocation } = auth;

  let cartElement = viewCart ? <Cart viewCart={viewCart} setViewCart={setViewCart} /> : null;

  useEffect(() => {
    getMenu({ setMenu: setMenuData });
  }, []);

  let menuElements = [];
  let goBack = null;

  if (currentCategory) {
    menuElements = menuData[currentCategory].map((menuItem) => (
      <div key={menuItem.id} className="menu-item">
        <MenuItem
          itemName={menuItem.name}
          id={menuItem.id}
          description={menuItem.dsc}
          image={menuItem.img}
          price={menuItem.price}
          rating={menuItem.rate}
        />
      </div>
    ));
    goBack = (
      <a href="#" onClick={() => setCurrentCategory("")} className="cart-link">
        Back To Categories
      </a>
    );
  } else if (selectedLocation) {
    menuElements = (
      <div key={selectedLocation.id} className="menu-item">
        <MenuItem
          itemName={selectedLocation.itemName}
          id={selectedLocation.id}
          description={selectedLocation.description}
          image={selectedLocation.image}
          price={selectedLocation.price}
          rating={selectedLocation.rating}
        />
      </div>
    );
  } else {
    menuElements = Object.keys(menuData).map((category) => (
      <Link
        to={`/menu/${category}`}
        key={category}
        className="category-item"
        onClick={(e) => {
          e.preventDefault();
          setCurrentCategory(category);
        }}
      >
        <div className="category-content">
          <h2>{formatString(category)}</h2>
        </div>
      </Link>
    ));
  }

  return (
    <>
      {cartElement}
      <Container className="menu-container">
        <Row className="menu-header">
          <Col>
            <h1>Our Menu</h1>
            {goBack}
          </Col>
          <Col className="d-flex justify-content-end">
            <button onClick={() => setViewCart(true)} className="view-cart-button">
              View Cart
            </button>
          </Col>
        </Row>
        <Row className="menu-items">{menuElements}</Row>
      </Container>
    </>
  );
};

export default MenuPage;