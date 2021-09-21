import React, { useState, useEffect } from "react";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useHistory } from "react-router";
//import { ClipLoader } from "react-spinners";
import { useDispatch } from "react-redux";
import axios from "axios";
import { ADD_ALL } from "../../app/actions/types";
import { useLocation } from "react-router-dom";
//import NewWindow from "react-new-window";

import UserList from "./UserList.jsx";
import "./UserList.css";
import "../Cart/Cart.scss";

import { List } from "react-content-loader";

function Subscribe() {
  toast.configure();
  const history = useHistory();
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);
  /*   const user = useSelector((state) => state.auth.user);
  const usertype = useSelector((state) => state.auth.usertype); */
  const [data, setData] = useState([]);

  const location = useLocation();
  const api_host = process.env.REACT_APP_API_HOST;
  async function selectUser(selectedUser) {
    setLoading(true);
    await axios.get(`https://${api_host}/api/mycourses/add`, {
      params: {
        selectedUser: {
          selectedUser,
        },
      },
    });
    await dispatch({
      type: ADD_ALL,
      payload: 0,
    });
    history.push("/");
    setLoading(false);
  }

  useEffect(() => {
    fetchData();
    async function fetchData() {
      setLoading(true);
      await axios
        .get(`https://${api_host}/api/users/userlist`)
        .then((response) => {
          setData(response.data.userlist);
          setData((state) => {
            //console.log("UserData-->" + JSON.stringify(response, null, "\t"));
            return state;
          });
        });
      setLoading(false);
    }
  }, [location]);

  return (
    <table className="styled-table">
      <caption>List of Students</caption>
      <thead>
        <tr>
          <th> Email </th> <th> Name </th>
        </tr>
      </thead>
      <tbody>
        {!loading && data ? (
          data.map((us) => {
            return (
              <UserList
                key={us._id}
                _id={us._id}
                name={us.name}
                email={us.email}
                usertype={us.usertype === "S" ? "Student" : "Instructor"}
              />
            );
          })
        ) : (
          <List />
        )}
        <button
          className="checkOutButton"
          onClick={() =>
            selectUser(document.querySelector(".userc:checked").value)
          }
        >
          Assign
        </button>
      </tbody>
    </table>
  );
}

export default Subscribe;
