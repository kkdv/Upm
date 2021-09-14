import React from "react";
import "react-toastify/dist/ReactToastify.css";
import "./UserList.css";

function UserList(props) {
  /*
  const history = useHistory();
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);
  const api_host = process.env.REACT_APP_API_HOST;
   async function selectUser(selectedUser) {
    setLoading(true);
    await axios.get(`https://${api_host}:5443/api/mycourses/add`, {
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
  } */
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
