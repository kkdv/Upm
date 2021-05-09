import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useHistory } from "react-router-dom";
import { loginUser } from "../../app/actions/authAction";
import email from "../../images/logo/email.svg";
import password from "../../images/logo/password.svg";
import "./login.css";

function Login() {
  const [formEmail, setformEmail] = useState("");
  const [formPassword, setformPassword] = useState("");
  const dispatch = useDispatch();
  const history = useHistory();

  const EmailError = useSelector((state) => state.auth.errors.email);
  const passwordError = useSelector((state) => state.auth.errors.password);

  const changeHandler = (event) => {
    const name = event.target.name;
    if (name === "email") {
      setformEmail(event.target.value);
    } else {
      setformPassword(event.target.value);
    }
  };
  const submitHandler = (event) => {
    event.preventDefault();
    const userData = {
      email: formEmail,
      password: formPassword,
    };

    dispatch(loginUser(userData, history));
  };

  return (
    <form className="form" onSubmit={submitHandler}>
      <div className="form__header">Login To Your Udemy Account!</div>
      <div className="form__content">
        <div className="form__input">
          <img className="form__icon" src={email} alt="email"></img>
          <input
            name="email"
            placeholder="Example@gmail.com"
            type="Email"
            onChange={changeHandler}
            required
          />
        </div>
        {EmailError && (
          <div className="error">
            <p>{EmailError}</p>
          </div>
        )}
        <div className="form__input">
          <img className="form__icon" src={password} alt="password"></img>
          <input
            name="password"
            placeholder="Password"
            type="password"
            onChange={changeHandler}
            required
          />
        </div>
        {passwordError && (
          <div className="error">
            <p>{passwordError}</p>
          </div>
        )}
        <div className="form__button">
          <button type="submit">Log In</button>
          <span>or </span>
          <a>Forgot your password?</a>
        </div>
      </div>
      <div className="form__footer">
        <div>
          Don't have an account?
          <Link className="form__link" to="/signup">
            Sign up
          </Link>
        </div>
        <a className="form__link">Log in with your organization</a>
      </div>
    </form>
  );
}

export default Login;
