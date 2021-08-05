import { useEffect, useReducer, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { ReactComponent as Video } from "../../images/logo/yt.svg";
import { ReactComponent as Article } from "../../images/logo/Article.svg";
import { ReactComponent as Download } from "../../images/logo/Download.svg";
import { ReactComponent as Lifetime } from "../../images/logo/lifetime.svg";
import { ReactComponent as Mobile } from "../../images/logo/Mobile.svg";
import { ReactComponent as Certificate } from "../../images/logo/certificate.svg";
import "./CourseCard.scss";
import { addToCart } from "../../app/actions/cartAction";
import axios from "axios";
import { ClipLoader } from "react-spinners";
import { Link } from "react-router-dom";

const CourseCard = ({ data }) => {
  const { _id, imageURL, author, currPrice, title, orgPrice, courseIncludes } =
    data;
  const [show, setShow] = useState(false);
  const [status, setstatus] = useState(false);
  const [loading, setloading] = useState(false);
  const dispatch = useDispatch();
  const isLogin = useSelector((state) => state.auth.isAuthenticated);
  const isProfessor = useSelector((state) =>
    state.auth.usertype === "P" ? true : false
  );

  useEffect(() => {
    const scrollHandler = () =>
      window.scrollY > 250 ? setShow(true) : setShow(false);
    window.addEventListener("scroll", scrollHandler);
    return () => window.removeEventListener("scroll", scrollHandler);
  }, []);

  const clickHandler = async () => {
    const course = {
      _id,
      imageURL,
      //    docURL,
      title,
      author,
      currPrice,
    };
    setloading(true);

    const response = await axios.post(
      "http://localhost:5000/api/users/cart/cartstatus",
      {
        title: title,
      }
    );

    setloading(false);

    if (response.data) {
      await setstatus(true);
    } else {
      dispatch(addToCart(course));
      setstatus(true);
    }
  };

  return (
    <div className={`courseCard ${show ? "show" : ""}`}>
      <img src={imageURL} alt={title} className="courseCard__image" />
      <div className="courseCard__priceInfo">
        {/* <div className="courseCard__price">
          <span className="courseCard__currPrice">&#36;{currPrice}</span>
          <span className="courseCard__orgPrice">&#36;{orgPrice}</span>
        </div> */}
        {isProfessor && !status && isLogin && (
          <button className="courseCard__cart" onClick={clickHandler}>
            {!status && !loading ? (
              "Subscribe"
            ) : (
              <div className="course__loader">
                <ClipLoader size={20} color="#3c3b37" />
              </div>
            )}
          </button>
        )}
        {isProfessor && !isLogin && (
          <Link to="/login">
            <button className="courseCard__cart">Subscribe</button>
          </Link>
        )}
        {status && (
          <Link to="/cart">
            <button className="courseCard__cart">Go to cart</button>
          </Link>
        )}
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
