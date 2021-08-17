import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";
import { ADD_ALL } from "../../app/actions/types";

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
      params: {
        selectedUser: {
          selectedUser,
        },
      },
    });
    dispatch({
      type: ADD_ALL,
      payload: 0,
    });
    history.push("/cart");
    setLoading(false);
  }
  return (
    <tr>
      <td>
        <input
          type="radio"
          class="userc"
          name="usercheck"
          value={props.email}
        ></input>
        <label for="userc"> {props.email} </label>
      </td>
      <td> {props.name} </td>
    </tr>
  );
}

export default UserList;
