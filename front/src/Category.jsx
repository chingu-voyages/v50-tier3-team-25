import React from "react";
import { v4 as uuidv4 } from "uuid";

// These components displays all available category sections
// Also Selections of a category
// Render all categories and handle user clicks
const Category = ({ categoryName, setCurrentCategory }) => {
  return (
    <div
      className="col-12 col-md-6 p-1"
      key={uuidv4()}
      onClick={() => {
        setCurrentCategory(categoryName);
      }}>
      {categoryName}
    </div>
  );
};

export default Category;
