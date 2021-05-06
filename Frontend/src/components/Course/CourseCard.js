import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { addToCart } from "../../features/cartSlice";
import { ReactComponent as Video } from "../../images/logo/yt.svg";
import { ReactComponent as Article } from "../../images/logo/Article.svg";
import { ReactComponent as Download } from "../../images/logo/Download.svg";
import { ReactComponent as Lifetime } from "../../images/logo/lifetime.svg";
import { ReactComponent as Mobile } from "../../images/logo/Mobile.svg";
import { ReactComponent as Certificate } from "../../images/logo/certificate.svg";
import "./CourseCard.scss";

const CourseCard = ({ data }) => {
  const {
    id,
    imageURL,
    author,
    currPrice,
    title,
    orgPrice,
    courseIncludes,
  } = data;
  const [show, setShow] = useState(false);
  const dispatch = useDispatch();
  useEffect(() => {
    const scrollHandler = () =>
      window.scrollY > 250 ? setShow(true) : setShow(false);
    window.addEventListener("scroll", scrollHandler);
    return () => window.removeEventListener("scroll", scrollHandler);
  }, []);

  const clickHandler = () => {
    const data = {
      id,
      imageURL,
      title,
      author,
      currPrice,
      orgPrice,
      courseIncludes,
    };
    dispatch(addToCart(data));
  };
  return (
    <div className={`courseCard ${show ? "show" : ""}`}>
      <img src={imageURL} alt={title} className="courseCard__image" />
      <div className="courseCard__priceInfo">
        <div className="courseCard__price">
          <span className="courseCard__currPrice">&#8377;{currPrice}</span>
          <span className="courseCard__orgPrice">&#8377;{orgPrice}</span>
        </div>
        <button className="courseCard__cart" onClick={clickHandler}>
          Add to cart
        </button>
        <button className="courseCard__buy">Buy now</button>
        <small>30-Day Money-Back Guarantee</small>
      </div>

      <div className="courseCard__includes">
        <h4>This course includes: </h4>
        <ul>
          {courseIncludes && (
            <div>
              <li>
                <Video /> <span>{courseIncludes[0].title}</span>
              </li>
              <li>
                <Article /> <span>{courseIncludes[1].title}</span>
              </li>
              <li>
                <Download /> <span>{courseIncludes[2].title}</span>
              </li>
              <li>
                <Lifetime /> <span>{courseIncludes[3].title}</span>
              </li>
              <li>
                <Mobile /> <span>{courseIncludes[4].title}</span>
              </li>
              <li>
                <Certificate /> <span>{courseIncludes[5].title}</span>
              </li>
            </div>
          )}
        </ul>
      </div>
    </div>
  );
};

export default CourseCard;
