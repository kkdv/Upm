import { useState } from "react";
import { Link, useHistory } from "react-router-dom";
import { ReactComponent as CartSvg } from "../images/logo/cart.svg";
import { ReactComponent as Search } from "../images/logo/search.svg";
import UdemyLogo from "../images/logo/udemy.svg";
import "./Header.scss";

const Header = () => {
  const [data, setData] = useState(null);
  const history = useHistory();
  const submitHandler = (e) => {
    e.preventDefault();
    if (data.trim()) {
      history.push({
        pathname: `/search`,
        search: `?src=ukw&q=${data}`,
        state: { detail: data },
      });
    } else {
      history.push("/");
    }
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
        <Link to="/login">
          <button className="header__btn header__login">Log in</button>
        </Link>
        <Link to="/signup">
          <button className="header__btn header__signup">Sign up</button>
        </Link>
      </div>
    </header>
  );
};

export default Header;
