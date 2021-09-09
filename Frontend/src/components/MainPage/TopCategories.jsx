import { useState } from "react";

import CategoryCard from "./CategoryCard";
import "./TopCategories.css";

import category_data from "../../data/category.js";

//const descriptionSubstring = (string) => string.length > 255 ? string.slice(0, 255) + "..." : string;

function TopCategories() {
  const [catoption, setOption] = useState("All");

  function handleChange(event) {
    setOption(event.target.value);
  }

  return (
    <div id="categories" className="topCategories">
      <div className="categoryHeading">
        <p>Course Listing for</p>
        <select id="categorylist" onChange={handleChange}>
          <option value="All">All</option>

          {category_data.map((item, index) => (
            <option key={index} value={item.category}>
              {item.category}
            </option>
          ))}
        </select>
      </div>
      <div className="categories">
        {category_data
          .filter((cat) => cat.category === catoption || catoption === "All")
          .map((item, index) => (
            <CategoryCard
              key={item.id}
              imgSrc={item.imageURL}
              title={item.category}
            />
          ))}
      </div>
    </div>
  );
}
export default TopCategories;
