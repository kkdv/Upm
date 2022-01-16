import React, { useEffect, useState } from "react";
import email from "../../images/logo/email.svg";
import password from "../../images/logo/password.svg";
import user from "../../images/logo/user.svg";
import { Link, useHistory } from "react-router-dom";
import "./Login1.css";
import { useDispatch, useSelector } from "react-redux";
import { registeruser } from "../../app/actions/authAction";
import { REMOVE_FORM_ERRORS } from "../../app/actions/types";
import * as fn from "../Helpers/Helper";

function Signup() {
  const [formEmail, setformEmail] = useState("");
  const [formPassword, setformPassword] = useState("");
  const [formName, setformName] = useState("");
  const [formUsertype, setformUserType] = useState("");

  const dispatch = useDispatch();
  const history = useHistory();

  const nameError = useSelector((state) => state.auth.errors.name);
  const EmailError = useSelector((state) => state.auth.errors.email);
  const passwordError = useSelector((state) => state.auth.errors.password);
  //const usertypeError = useSelector((state) => state.auth.errors.usertype);

  useEffect(() => {
    dispatch({
      type: REMOVE_FORM_ERRORS,
    });
  }, [dispatch]);

  const changeHandler = (event) => {
    const name = event.target.name;
    if (name === "email") {
      setformEmail(event.target.value);
    } else if (name === "password") {
      setformPassword(event.target.value);
    } else if (name === "usertype") {
      setformUserType(event.target.value);
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
      usertype: formUsertype,
    };

    dispatch(registeruser(userData, history));

    // Product Analytics
    fn.pa("Sign Up Completed");
  };

  return (
    <form className="form" onSubmit={submitHandler}>
      <div className="form__header"> Sign Up </div>
      <div className="form__content">
        <div className="form__input">
          <img className="form__icon" src={user} alt="user" />
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
            <p> {nameError} </p>
          </div>
        )}
        <div className="form__select">
          <select
            className="form__select"
            name="usertype"
            id="usertype"
            placeholder="User Type"
            onChange={changeHandler}
            required
          >
            <option value="" disabled selected>
              Choose User type
            </option>
            <option value="I"> Instructor </option>
            <option value="S"> Student </option>
          </select>
        </div>
        <div className="form__input">
          <img className="form__icon" src={email} alt="email" />
          <input
            name="email"
            placeholder="example@email.com"
            type="Email"
            onChange={changeHandler}
            required
          />
        </div>
        {EmailError && (
          <div className="error">
            <p> {EmailError} </p>
          </div>
        )}
        <div className="form__input">
          <img className="form__icon" src={password} alt="password" />
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
            <p> {passwordError} </p>
          </div>
        )}
        <div className="form__button">
          <button type="submit" name="submit">
            Sign Up
          </button>
          <span> By signing up, you agree to our </span>
          <Link> Terms of Use and Privacy Policy. </Link>
        </div>
      </div>
      <div className="form__footer">
        <div>
          Already have an account ?
          <Link className="form__link" to="/login">
            Login
          </Link>
        </div>
      </div>
    </form>
  );
}
export default Signup;
