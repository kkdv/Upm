import React, { useState } from "react";
// import StripeCheckout from "react-stripe-checkout";
// import { toast, ToastContainer } from "react-toastify";
// import "react-toastify/dist/ReactToastify.css";
import "./Subtotal.css";
import { useHistory } from "react-router";
import { ClipLoader } from "react-spinners";
import { useSelector } from "react-redux";

function Subtotal({ cart }) {
  // toast.configure();

  // async function handleToken(token) {
  //   setLoading(true);
  //   const response = await axios.post("http://localhost:5000/api/checkout", {
  //     token: token,
  //     product: cart,
  //     amount: getBasketTotal(cart),
  //   });
  //   setLoading(false);
  //   if (response.data.status === "success") {
  //     await dispatch({
  //       type: ADD_ALLCOURSES,
  //       item: cart,
  //     });
  //     await dispatch({
  //       type: REMOVE_ALL,
  //     });
  //     history.push("/mycourses");
  //   } else {
  //     toast("Something went wrong, Please try again", {
  //       type: "error",
  //     });
  //   }
  // }

  const getBasketTotal = (basket) =>
    basket?.reduce((amount, item) => item.currPrice + amount, 0);

  return (
    <div className="subtotal">
      <p>Total:</p>
      <h1>₹{getBasketTotal(cart) || 0}</h1>
      {/* <StripeCheckout
        stripeKey="pk_test_51Ik2o1SC4PUMUVRnJmttcc7VqoegdemrDUDlEF5ReXtrAymYlGmfPNw1StRHj5uEO4tyy00YQk516lO54QBp9g9v00mQDM0U3A"
        token={handleToken}
        amount={getBasketTotal(cart) * 100}
        name="Developer X"
        currency="INR"
        email={userEmail}
        description="Safe & Secure Payment"
        image=""
      >
        <button className="checkOutButton">Checkout</button>
      </StripeCheckout> */}
      {/* {loading && (
        <div className="course__loader">
          <ClipLoader loading={loading} size={60} color="#3c3b37" />
        </div>
      )}
      <ToastContainer /> */}
    </div>
  );
}

export default Subtotal;
