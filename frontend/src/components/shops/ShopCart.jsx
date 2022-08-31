import React, { useState } from "react";
import { DeleteProduct } from "../../Api/Api";

const ShopCart = ({ shopItems, addToCart, allProducts }) => {
  const [count, setCount] = useState(0);
  const increment = () => {
    setCount(count + 1);
  };
  const role = localStorage.getItem("role");
  const token = localStorage.getItem("jwtoken");

  const deleteProd = async (id) => {
    await DeleteProduct(id);
    window.location.reload();
  };
  return (
    <>
      {shopItems.map((shopItems, index) => {
        return (
          <div className="box">
            <div className="product mtop">
              <div className="img">
                <img src={shopItems.photo} alt="" />
                <div className="product-like">
                  <label>{count}</label> <br />
                  <i className="fa-regular fa-heart" onClick={increment}></i>
                </div>
              </div>
              <div className="product-details">
                <h3>{shopItems.name}</h3>
                <p
                  style={{ fontSize: ".9rem", color: "gray", padding: ".4rem" }}
                >
                  {shopItems.description}
                </p>
                <div className="price">
                  <h4>${shopItems.price}.00 </h4>
                  <div>
                    {token && role === "seller" && (
                      <>
                        <button>
                          <i class="fa-solid fa-pen-to-square"></i>
                        </button>
                        <button onClick={()=>{deleteProd(shopItems._id);}}>
                          <i class="fa-solid fa-trash-can"></i>
                        </button>
                      </>
                    )}
                    {!role && !token ? (
                      ""
                    ) : (
                      <button onClick={() => addToCart(shopItems)}>
                        <i className="fa fa-plus"></i>
                      </button>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        );
      })}
    </>
  );
};

export default ShopCart;
