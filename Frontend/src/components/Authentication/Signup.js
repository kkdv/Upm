import React from "react";
import { Input, Button, Title } from "./Input";
import email from "../../images/logo/email.svg";
import password from "../../images/logo/password.svg";
import user from "../../images/logo/user.svg";
import { Link } from "react-router-dom";
import "./login.css";

function Signup() {
  return (
    <div className="form">
      <Title title="Login To Your Udemy Account!" />
      <div className="form__content">
        <Input
          name="name"
          type="text"
          placeholder="Enter your name"
          icon={user}
        />
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
          value="Sign Up"
          info="By signing up, you agree to our"
          data="Terms of Use and Privacy Policy."
        />
      </div>
      <div className="form__footer">
        <div>
          Already have an account?
          <Link className="form__link" to="/login">
            Login
          </Link>
        </div>
      </div>
    </div>

    // <div class="loginbox-v4 modal-content-wrapper">
    //   <Title title="Sign Up For Learing Today" />
    //   <div class="loginbox-v4__content">
    //     <Input name="name" type="text" placeholder="Name" />
    //     <Input name="email" type="Email" placeholder="@Gmail.com" />
    //     <Input name="password" type="Password" placeholder="Password" />
    //     <Button
    //       name="submit"
    //       type="submit"
    //       value="Sign In"
    //       info="Already Have Account"
    //       data="Login"
    //     />
    //   </div>
    //   <div class="loginbox-v4__secondary-text"></div>
    //   <div class="loginbox-v4__separator"></div>
    // </div>
  );
}

export default Signup;
