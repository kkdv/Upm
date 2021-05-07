import React from "react";
import { Link } from "react-router-dom";
import { Title, Input, Button } from "./Input";
import email from "../../images/logo/email.svg";
import password from "../../images/logo/password.svg";
import "./login.css";

function Login() {
  return (
    <div className="form">
      <Title title="Login To Your Udemy Account!" />
      <div className="form__content">
        <Input
          name="email"
          type="Email"
          placeholder="Example@gmail.com"
          icon={email}
        />
        <Input
          name="password"
          type="Password"
          placeholder="Password"
          icon={password}
        />
        <Button
          name="submit"
          type="submit"
          value="Log In"
          info="or"
          data="Forgot your password?"
        />
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
    </div>
  );
}

export default Login;
