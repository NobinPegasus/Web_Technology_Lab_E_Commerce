import React, { useState } from "react";
import {useHistory} from "react-router-dom"
import "./style.css";
import { AddNewOrder } from "../../Api/Api";

const Cart = ({ CartItem, addToCart, decreaseQty }) => {
  const history = useHistory();
  const [address, setAdress] = useState();
  console.log(CartItem);
  const totalPrice = CartItem.reduce(
    (price, item) => price + item.qty * item.price,
    0
  );
  const products = CartItem.map((item) => (item._id));
  console.log(products);
  const OrderNow = async () => {
    console.log(CartItem, totalPrice, address);
    const res = await AddNewOrder({ products, totalPrice, address });
    if(res.status === 200){
      history.push("/order")
    }
    console.log(res);
  };
  return (
    <>
      <section className="cart-items">
        <div className="container d_flex">
          <div className="cart-details">
            {CartItem.length === 0 && (
              <h1 className="no-items product">No Items are add in Cart</h1>
            )}
            {CartItem.map((item) => {
              const productQty = item.price * item.qty;

              return (
                <div className="cart-list product d_flex" key={item.id}>
                  <div className="img">
                    <img src={item.photo} alt="" />
                  </div>
                  <div className="cart-details" style={{ padding: ".5rem" }}>
                    <h3>{item.name}</h3>
                    <h4>{item.description}</h4>
                    <h4>
                      ${item.price}.00 X {item.qty} =
                      <span>${productQty}.00</span>
                    </h4>
                  </div>
                  <div className="cart-items-function">
                    <div className="removeCart">
                      <button className="removeCart"></button>
                    </div>
                    <div className="cartControl d_flex">
                      <button
                        className="incCart"
                        onClick={() => addToCart(item)}
                      >
                        <i className="fa-solid fa-plus"></i>
                      </button>
                      <button
                        className="desCart"
                        onClick={() => decreaseQty(item)}
                      >
                        <i className="fa-solid fa-minus"></i>
                      </button>
                    </div>
                  </div>

                  <div className="cart-item-price"></div>
                </div>
              );
            })}
          </div>

          <div className="cart-total product">
            <h2>Cart Summary</h2>
            <div className=" d_flex">
              <h4>Total Price :</h4>
              <h3>${totalPrice}.00</h3>
            </div>
            {/* <input
              type="text"
              placeholder="write your address"
              className="order_input"
              value={address}
              onChange={(e) => setAdress(e.target.value)}
            /> */}
            <button onClick={OrderNow} className="order_btn">
              Order now
            </button>
          </div>
        </div>
      </section>
    </>
  );
};

export default Cart;
