import "./Category.scss";
import category_data from "../../../data/category";
import CategoryList from "./CategoryList";

const descriptionSubstring = (string) =>
  string.length > 255 ? string.slice(0, 255) + "..." : string;

const Category = () => {
  const { category, title, description, imageURL } = category_data[0];
  return (
    <div>
      <div className="category">
        <div className="category__info">
          <select>
            {category_data.map((item, index) => {
              <CategoryList
                desc={descriptionSubstring(item.description)}
                title={item.title}
              />;
            })}
          </select>
        </div>
      </div>
    </div>
  );
};

export default Category;
