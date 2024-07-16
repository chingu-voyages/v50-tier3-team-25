import React from "react";

// These components displays all available category sections 
// Also Selections of a category
// Render all categories and handle user clicks
const Category = ({categoryName, setCurrentCategory}) => {

    return(
        <div onClick={() => { setCurrentCategory(categoryName) }}>
            {categoryName}
        </div>
    )
}

export default Category;