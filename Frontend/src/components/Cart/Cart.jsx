import axios from "axios";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import "./Cart.scss";
import CheckoutProduct from "./CheckoutProduct.jsx";
import Subtotal from "./Subtotal.jsx";

const Cart = () => {
  const [cart, setcart] = useState();
  const cartNumber = useSelector((state) => state.cart.basketItem);
  const history = useHistory();
  const api_host = process.env.REACT_APP_API_HOST;
  useEffect(() => {
    async function fetchData() {
      try {
        const response = await axios.get(
          `https://${api_host}/api/users/cart/get`
        );
        await setcart(response.data);
      } catch (err) {
        console.log("Error FetchData:" + err.response.data);
        if (err.response.status === 404 || err.response.status === 401) {
          history.push("/logout");
        }
      }
      //console.log("Cart=>" + JSON.stringify(response, null, "\t"));
    }
    fetchData();
  }, [cartNumber]);

  return (
    <div className="cart">
      <div className="cart__top">
        <h3> Cart </h3>
      </div>
      <div className="cart__info">
        <div className="cart__items">
          <p className="cart__itemsnumber">
            {cart && cart.length}
            Courses in Cart
          </p>
          {cart &&
            cart.map((item) => (
              <CheckoutProduct
                key={item._id}
                imageURL={item.imageURL}
                title={item.title}
                author={item.author}
                currPrice={item.currPrice}
              />
            ))}
        </div>
        <Subtotal cart={cart} />
      </div>
      <div className="cart__checkout"> </div>
    </div>
  );
};

export default Cart;
