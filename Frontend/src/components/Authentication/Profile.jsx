import React, { useEffect, useState } from "react";
import email from "../../images/logo/email.svg";
import password from "../../images/logo/password.svg";
import user from "../../images/logo/user.svg";
import { useHistory } from "react-router-dom";
import "./Login1.css";
import { useDispatch, useSelector } from "react-redux";
import { saveuserprofile } from "../../app/actions/authAction";
import { REMOVE_FORM_ERRORS } from "../../app/actions/types";

function Profile() {
  const username = useSelector((state) => state.auth.user.name);
  const usertype = useSelector((state) => state.auth.usertype);
  const useremail = useSelector((state) => state.auth.user.email);
  const userepwd = useSelector((state) => state.auth.user.password);

  //console.log("type=" + usertype);

  const [formEmail, setformEmail] = useState(useremail);
  const [formPassword, setformPassword] = useState(userepwd);
  const [formName, setformName] = useState(username);
  const [formUsertype, setformUserType] = useState(usertype);

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

    dispatch(saveuserprofile(userData, history));
  };

  return (
    <form className="form" onSubmit={submitHandler}>
      <div className="form__header"> Profile </div>
      <div className="form__content">
        <div className="form__input">
          <img className="form__icon" src={user} alt="user" />
          <input
            name="name"
            placeholder="Enter your name"
            type="text"
            onChange={changeHandler}
            required
            value={formName}
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
            value={usertype}
          >
            <option value="">Choose User type</option>
            <option value="I" disabled>
              Instructor
            </option>
            <option value="S" disabled>
              {" "}
              Student{" "}
            </option>
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
            disabled
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
            Save
          </button>
        </div>
      </div>
      <div className="form__footer"></div>
    </form>
  );
}
export default Profile;
