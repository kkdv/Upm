import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useHistory } from "react-router-dom";
import { loginUser } from "../../app/actions/authAction";
import { REMOVE_FORM_ERRORS } from "../../app/actions/types";
import email from "../../images/logo/email.svg";
import password from "../../images/logo/password.svg";
import "./Login1.css";

function Login() {
  const [formEmail, setformEmail] = useState("");
  const [formPassword, setformPassword] = useState("");

  const dispatch = useDispatch();
  const history = useHistory();

  const EmailError = useSelector((state) => state.auth.errors.email);
  const passwordError = useSelector((state) => state.auth.errors.password);

  useEffect(() => {
    dispatch({
      type: REMOVE_FORM_ERRORS,
    });
  }, [dispatch]);

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
      <div className="form__header"> Login To Your LMS Account! </div>
      <div className="form__content">
        <div className="form__input">
          <img className="form__icon" src={email} alt="email" />
          <input
            name="email"
            placeholder="Enter your email address"
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
          <button type="submit"> Log In </button> <span> or </span>
          <Link> Forgot your password ? </Link>
        </div>
      </div>
      <div className="form__footer">
        <div>
          Don 't have an account?
          <Link className="form__link" to="/signup">
            Sign up
          </Link>
        </div>
        <Link className="form__link"> Log in with your organization </Link>
      </div>
    </form>
  );
}

export default Login;
