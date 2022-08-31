import React from "react"
import Footer from "../common/footer/Footer"
import Home from "../components/MainPage/Home"
import Shop from "../components/shops/Shop"
import Wrapper from "../components/wrapper/Wrapper"


const Pages = ({
  productItems,
  addToCart,
  CartItem,
  shopItems,
  allProducts,
}) => {
  return (
    <>
      <Home CartItem={CartItem} />
      <Shop
        shopItems={shopItems}
        addToCart={addToCart}
        allProducts={allProducts}
      />
      <Wrapper />
      <Footer />
    </>
  );
};

export default Pages
