import axios from "axios";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import "./Cart.scss";
import CheckoutProduct from "./CheckoutProduct.jsx";
import Subtotal from "./Subtotal.jsx";

const Cart = () => {
  const [cart, setcart] = useState();
  const cartNumber = useSelector((state) => state.cart.basketItem);

  useEffect(() => {
    async function fetchData() {
      const response = await axios.get(
        "http://localhost:5000/api/users/cart/get"
      );
      //console.log("Cart=>" + JSON.stringify(response, null, "\t"));
      await setcart(response.data);
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
