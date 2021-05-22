import { useState } from "react";
import { useHistory } from "react-router";
import { ReactComponent as Search } from "../images/logo/search.svg";
import "./Banner.scss";

const Banner = () => {
  const [input, setInput] = useState();
  const history = useHistory();
  const submitHandler = (e) => {
    e.preventDefault();
    if (input) {
      history.push({
        pathname: `/search`,
        search: `?src=ukw&q=${input}`,
        state: { detail: input },
      });
    } else {
      history.push("/");
    }
  };
  return (
    <div className="banner">
      <div className="banner__modal">
        <h1>Search for video</h1>
        <p>
          Search for medical content
        </p>
        <form className="banner__form" onSubmit={submitHandler}>
          <input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="What do you want to learn?"
          />
          <button type="submit">
            <Search />
          </button>
        </form>
      </div>
    </div>
  );
};

export default Banner;
