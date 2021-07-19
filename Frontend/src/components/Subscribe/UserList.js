import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";
import {
  ADD_ALL,
  ADD_COURSES_FAIL,
  ADD_FILTERD_COURSES_SUCCESS,
} from "../../app/actions/types";
import { Link, useLocation } from "react-router-dom";
import "./UserList.css";

import { useHistory } from "react-router";
//onClick={() => history.push(`/course/${props.id}`)}

function UserList(props) {
  const history = useHistory();
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);

  async function selectUser(selectedUser) {
    setLoading(true);
    await axios.get("http://localhost:5000/api/mycourses/add", {
      params: { selectedUser: { selectedUser } },
    });
    dispatch({
      type: ADD_ALL,
      payload: 0,
    });
    history.push("/cart");
    setLoading(false);
  }
  return (
    <div className="userlist__info">
      <tr>
        <td>
          <input
            type="radio"
            class="userc"
            id="v"
            name="usercheck"
            value={props.email}
          ></input>
          <label for="v"> {props.email}</label>
        </td>
        <td>{props.name}</td>
      </tr>
    </div>
  );
}

export default UserList;
