import React, { useState } from "react";
import StripeCheckout from "react-stripe-checkout";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./Subtotal.css";
import { useHistory } from "react-router";
import { ClipLoader } from "react-spinners";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { ADD_ALL } from "../../app/actions/types";
import { Link } from "react-router-dom";

function Subtotal({ cart }) {
  toast.configure();
  const history = useHistory();
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);
  const user = useSelector((state) => state.auth.user);

  async function handleToken(token) {
    setLoading(true);
    const response = await axios.post("http://localhost:5000/api/payment", {
      token: token,
      product: cart,
      amount: getBasketTotal(cart),
    });
    setLoading(false);
    if (response.data.status === "success") {
      await axios.get("http://localhost:5000/api/mycourses/add");
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
  }

  const getBasketTotal = (basket) =>
    basket?.reduce((amount, item) => item.currPrice + amount, 0);

  return (
    <div className="subtotal">
      <p>Total:</p>
      <h1>₹{getBasketTotal(cart) || 0}</h1>
      {getBasketTotal(cart) > 0 ? (
        <StripeCheckout
          stripeKey="pk_test_51Ik2o1SC4PUMUVRnJmttcc7VqoegdemrDUDlEF5ReXtrAymYlGmfPNw1StRHj5uEO4tyy00YQk516lO54QBp9g9v00mQDM0U3A"
          token={getBasketTotal(cart) > 0 ? handleToken : null}
          amount={getBasketTotal(cart) * 100}
          name="Udemy"
          currency="INR"
          email={user.email}
          description="Safe & Secure Payment"
        >
          <button className="checkOutButton">Checkout</button>
        </StripeCheckout>
      ) : (
        <Link to="/">
          <button className="checkOutButton">Keep shopping</button>
        </Link>
      )}
      {loading && (
        <div className="course__loader">
          <ClipLoader loading={loading} size={60} color="#3c3b37" />
        </div>
      )}
      <ToastContainer />
    </div>
  );
}

export default Subtotal;
