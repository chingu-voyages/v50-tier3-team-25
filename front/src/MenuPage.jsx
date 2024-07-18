import React from "react";
import { useState, useEffect } from "react";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

import MenuItem from "./MenuItem";
import Category from "./Category";
import Cart from "./Cart";
import { getMenu } from "./api";

// Main container of the Restaurants Menu Page
// Including category selection and displaying menu items
const MenuPage = () => {
    const [menuData, setMenuData] = useState({})
    const [currentCategory, setCurrentCategory] = useState("")
    const [viewCart, setViewCart] = useState(false)

    // display all the categories list
        //fetch data of selected categories
            // Render those categories menu items

    let cart = Cart({setViewCart})

    if (!viewCart) {
        cart = (<></>)
    }

    useEffect(() => {
        getMenu({setMenu: setMenuData})
    }, [])

    let menuElements = []
    let goBack = (<></>)

    if (currentCategory) { //active category
        for (const menuItem of menuData[currentCategory]) {
            menuElements.push(MenuItem({
                itemName: menuItem.name,
                id: menuItem.id,
                description: menuItem.dsc,
                image: menuItem.img,
                price: menuItem.price,
                rating: menuItem.rate,
            }))
        }

        goBack = (
            <a href="#" onClick={ () => { setCurrentCategory("") } }> Back To Categories </a>
        )

    } else { //no active category, display categories
        for (const category of Object.keys(menuData)) {
            menuElements.push(Category({categoryName: category, setCurrentCategory: setCurrentCategory}))
        }
    }

    return(
        <>
            {cart}
            <Container>
                <Row>
                    <Col>
                        <h1>Our Menu</h1>
                        {goBack}
                    </Col>
                    <Col>
                        <a href="#" onClick={() => { setViewCart(true) }}>View Cart</a>
                    </Col>
                </Row>
                <Row>
                    {menuElements}
                </Row>
            </Container>
        </>
    )
}

export default MenuPage;