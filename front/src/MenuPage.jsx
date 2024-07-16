import React from "react";
import { useState, useEffect } from "react";
import MenuItem from "./MenuItem";
import Category from "./Category";
import { getMenu } from "./api";

// Main container of the Restaurants Menu Page
// Including category selection and displaying menu items
const MenuPage = () => {
    const [menuData, setMenuData] = useState({})
    const [currentCategory, setCurrentCategory] = useState("")

    // display all the categories list
        //fetch data of selected categories
            // Render those categories menu items

    useEffect(() => {
        getMenu({setMenu: setMenuData})
    }, [])

    let menuElements = []

    if (currentCategory) { //active category
        for (const menuItem of menuData[currentCategory]) {
            menuElements.push(MenuItem({itemName: menuItem.name}))
        }
    } else { //no active category, display categories
        for (const category of Object.keys(menuData)) {
            menuElements.push(Category({categoryName: category, setCurrentCategory: setCurrentCategory}))
        }
    }

    return(
        <div>
            <h1>Our Menu</h1>
            {menuElements}
        </div>
    )
}

export default MenuPage;