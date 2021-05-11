import React from "react";
import { useDispatch } from "react-redux";
import "./CheckoutProduct.css";
import { removeFromCart } from "../../app/actions/cartAction";

function CheckoutProduct({ imageURL, title, author, currPrice }) {
  const dispatch = useDispatch();

  const removeCart = () => {
    dispatch(removeFromCart(title));
  };

  return (
    <div className="checkoutProduct">
      <img className="checkoutProduct__image" src={imageURL} alt={title} />
      <div className="checkoutProduct__info">
        <p className="checkoutProduct__title">{title}</p>
        <p className="checkoutProduct__author">By {author}</p>
      </div>
      <div className="checkoutProduct__right">
        <p>₹{currPrice}</p>
        <button className="remove__button" onClick={removeCart}>
          Remove
        </button>
      </div>
    </div>
  );
}

export default CheckoutProduct;
