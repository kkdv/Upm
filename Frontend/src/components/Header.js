import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useHistory } from "react-router-dom";
import { logoutUser } from "../app/actions/authAction";
import { ReactComponent as CartSvg } from "../images/logo/cart.svg";
import { ReactComponent as Search } from "../images/logo/search.svg";
import UdemyLogo from "../images/logo/udemy.svg";
import "./Header.scss";

const Header = () => {
  const [data, setData] = useState(null);
  const history = useHistory();
  const dispatch = useDispatch();
  const isLogin = useSelector((state) => state.auth.isAuthenticated);

  const submitHandler = (e) => {
    e.preventDefault();
    if (data) {
      history.push({
        pathname: `/search`,
        search: `?src=ukw&q=${data}`,
        state: { detail: data },
      });
    } else {
      history.push("/");
    }
  };

  const logoutHandler = () => {
    dispatch(logoutUser());
  };

  return (
    <header className="header">
      <Link to="/">
        <img src={UdemyLogo} alt="logo" className="header__logo" />
      </Link>
      <div className="header__search">
        <p>Categories</p>
        <form className="header__searchbar" onSubmit={submitHandler}>
          <input
            onChange={(event) => setData(event.target.value)}
            placeholder="Search for anything"
          />
          <button type="submit">
            <Search />
          </button>
        </form>
        <p>Udemy for Buisness</p>
        <p>Teach on Udemy</p>
      </div>
      <div className="header__right">
        <div className="header__cart">
          <CartSvg className="header__cartLogo" />
          <span className="header__quantity">0</span>
        </div>
        {!isLogin && (
          <Link to="/login">
            <button className="header__btn header__login">Log in</button>
          </Link>
        )}
        {!isLogin && (
          <Link to="/signup">
            <button className="header__btn header__signup">Sign up</button>
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
      </div>
    </header>
  );
};

export default Header;
