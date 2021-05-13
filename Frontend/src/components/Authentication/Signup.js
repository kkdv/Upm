import React, { useEffect, useState } from "react";
import email from "../../images/logo/email.svg";
import password from "../../images/logo/password.svg";
import user from "../../images/logo/user.svg";
import { Link, useHistory } from "react-router-dom";
import "./login.css";
import { useDispatch, useSelector } from "react-redux";
import { registeruser } from "../../app/actions/authAction";
import { REMOVE_FORM_ERRORS } from "../../app/actions/types";

function Signup() {
  const [formEmail, setformEmail] = useState("");
  const [formPassword, setformPassword] = useState("");
  const [formName, setformName] = useState("");
  const dispatch = useDispatch();
  const history = useHistory();

  const nameError = useSelector((state) => state.auth.errors.name);
  const EmailError = useSelector((state) => state.auth.errors.email);
  const passwordError = useSelector((state) => state.auth.errors.password);

  useEffect(() => {
    dispatch({ type: REMOVE_FORM_ERRORS });
  }, [dispatch]);

  const changeHandler = (event) => {
    const name = event.target.name;
    if (name === "email") {
      setformEmail(event.target.value);
    } else if (name === "password") {
      setformPassword(event.target.value);
    } else {
      setformName(event.target.value);
    }
  };

  const submitHandler = (event) => {
    event.preventDefault();
    const userData = {
      name: formName,
      email: formEmail,
      password: formPassword,
    };

    dispatch(registeruser(userData, history));
  };

  return (
    <form className="form" onSubmit={submitHandler}>
      <div className="form__header">Sign Up and Start Learning!</div>
      <div className="form__content">
        <div className="form__input">
          <img className="form__icon" src={user} alt="user"></img>
          <input
            name="name"
            placeholder="Enter your name"
            type="text"
            onChange={changeHandler}
            required
          />
        </div>
        {nameError && (
          <div className="error">
            <p>{nameError}</p>
          </div>
        )}
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
          <button type="submit" name="submit">
            Sign Up
          </button>
          <span>By signing up, you agree to our </span>
          <a>Terms of Use and Privacy Policy.</a>
        </div>
      </div>
      <div className="form__footer">
        <div>
          Already have an account?
          <Link className="form__link" to="/login">
            Login
          </Link>
        </div>
      </div>
    </form>
  );
}

export default Signup;
