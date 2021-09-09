import React, { useState } from "react";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./Subtotal.css";

import { ClipLoader } from "react-spinners";

import { Link } from "react-router-dom";
import Subscribe from "../Subscribe/Subscribe.jsx";

function Subtotal({ cart }) {
  toast.configure();
  const [loading, setLoading] = useState(false);
  /*   const history = useHistory();
  const dispatch = useDispatch();

  const api_host = process.env.REACT_APP_API_HOST; */
  /*   async function handleToken(token) {
    const status = "success";
    // if (response.data.status === "success") {
    if (status === "success") {
      await axios.get(`http://${api_host}:5000/api/mycourses/add`);
      await dispatch({
        type: ADD_ALL,
        payload: 0,
      });
      history.push("/mycourses");
    } else {
      toast("Something went wrong, Please try again", {
        type: "error",
      });
    }
  } */

  const getBasketTotal = (basket) =>
    basket?.reduce((amount, item) => item.currPrice + amount, 0);

  return (
    <div className="subtotal">
      {/* <p>Total:</p> */}
      {/* <h1>₹{getBasketTotal(cart) || 0}</h1> */}

      {getBasketTotal(cart) > 0 ? (
        <Subscribe />
      ) : (
        <Link to="/">
          <button className="checkOutButton">Add Courses</button>
        </Link>
      )}
      {loading && (
        <div className="course__loader">
          <ClipLoader loading={loading} size={60} color="#3c3b37" />
        </div>
      )}
    </div>
  );
}

export default Subtotal;
