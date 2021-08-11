import axios from "axios";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useHistory } from "react-router-dom";
import { logoutUser } from "../../app/actions/authAction";
import { ADD_ALL } from "../../app/actions/types";
import { ReactComponent as CartSvg } from "../../images/logo/cart.svg";
import { ReactComponent as Search } from "../../images/logo/search.svg";
import LMSLogo from "../../images/logo/lms/lms.jpg";
import "./Header.scss";

const Header = () => {
  const [data, setData] = useState(null);
  const history = useHistory();
  const dispatch = useDispatch();
  const isLogin = useSelector((state) => state.auth.isAuthenticated);
  const user = useSelector((state) => state.auth.user);
  const cartCount = useSelector((state) => state.cart.basketItem);
  const isadmin = user.name === "admin" ? true : false;

  useEffect(() => {
    async function fetchData() {
      const response = await axios.get(
        "http://localhost:5000/api/users/cart/cartcount"
      );

      await dispatch({
        type: ADD_ALL,
        payload: response.data,
      });
    }
    fetchData();
  }, [dispatch, isLogin]);

  const submitHandler = (e) => {
    e.preventDefault();
    if (data) {
      history.push({
        pathname: `/search`,
        search: `?src=ukw&q=${data}`,
        state: {
          detail: data,
        },
      });
    } else {
      history.push("/");
    }
  };

  const logoutHandler = () => {
    dispatch({
      type: ADD_ALL,
      payload: 0,
    });
    dispatch(logoutUser());
  };

  return (
    <header className="header">
      <Link to="/">
        <img src={LMSLogo} alt="logo" className="header__logo" />
      </Link>
      <div className="header__search">
        <a href="#categories"> Categories </a>
        <form className="header__searchbar" onSubmit={submitHandler}>
          <input
            onChange={(event) => setData(event.target.value)}
            placeholder="Search for content"
          />
          <button type="submit">
            <Search />
          </button>
        </form>
        {isLogin && <p> Welcome {user.name} </p>}
        {isLogin && (
          <Link className="mycourses" to="/mycourses">
            <p> My Courses </p>
          </Link>
        )}
      </div>
      <div className="header__right">
        {isLogin && (
          <Link to="/cart">
            <div className="header__cart">
              <CartSvg className="header__cartLogo" />
              {cartCount > 0 && (
                <span className="header__quantity"> {cartCount} </span>
              )}
            </div>
          </Link>
        )}
        {!isLogin && (
          <Link to="/login">
            <button className="header__btn header__login"> Log in </button>
          </Link>
        )}
        {!isLogin && (
          <Link to="/signup">
            <button className="header__btn header__signup"> Sign up </button>
          </Link>
        )}
        {isLogin && (
          <Link to="/">
            <button
              className="header__btn header__signup"
              onClick={logoutHandler}
            >
              Log Out
            </button>
          </Link>
        )}
        {isLogin && isadmin && (
          <Link to="/fileupload">
            <button className="header__btn header__signup"> Upload</button>
          </Link>
        )}
      </div>
    </header>
  );
};

export default Header;
