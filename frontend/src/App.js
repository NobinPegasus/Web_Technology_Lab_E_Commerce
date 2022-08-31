import React, { useEffect, useState } from "react";
import "./App.css";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Header from "./common/header/Header";
import Pages from "./pages/Pages";
import Data from "./components/Data";
import Cart from "./common/Cart/Cart";
import AddproductPage from "./pages/AddproductPage";
import Sdata from "./components/shops/Sdata";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import { GetAllProducts } from "./Api/Api";
import Order from "./components/Order/Order";
import UserPage from "./pages/User";

function App() {
  const [shopItems, setShopItems] = useState([]);

  const allProducts = async () => {
    const res = await GetAllProducts();
    const { products } = res.data;
    setShopItems(products);
    console.log(products);
  };
  useEffect(() => {
    allProducts();
  }, []);
  const { productItems } = Data;
  // const { shopItems } = Sdata

  const [CartItem, setCartItem] = useState([]);

  const addToCart = (product) => {
    console.log(product)
    const productExit = CartItem.find((item) => item._id === product._id);
    if (productExit) {
      setCartItem(
        CartItem.map((item) =>
          item.id === product.id
            ? { ...productExit, qty: productExit.qty + 1 }
            : item
        )
      );
    } else {
      setCartItem([...CartItem, { ...product, qty: 1 }]);
    }
    console.log(CartItem)
  };

  const decreaseQty = (product) => {
    const productExit = CartItem.find((item) => item._id === product._id);
    if (productExit.qty === 1) {
      setCartItem(CartItem.filter((item) => item._id !== product._id));
    } else {
      setCartItem(
        CartItem.map((item) =>
          item._id === product._id
            ? { ...productExit, qty: productExit.qty - 1 }
            : item
        )
      );
    }
  };

  return (
    <>
      <Router>
        <Header CartItem={CartItem} />
        <Switch>
          <Route path="/" exact>
            <Pages
              productItems={productItems}
              addToCart={addToCart}
              shopItems={shopItems}
              allProducts={allProducts}
            />
          </Route>
          <Route path="/cart" exact>
            <Cart
              CartItem={CartItem}
              addToCart={addToCart}
              decreaseQty={decreaseQty}
            />
          </Route>
          <Route path="/login">
            <LoginPage />
          </Route>
          <Route path="/register">
            <RegisterPage />
          </Route>
          <Route path="/addproduct">
            <AddproductPage allProducts={allProducts} />
          </Route>
          <Route path="/order">
            <Order />
          </Route>
          <Route path="/user">
            <UserPage />
          </Route>
        </Switch>
        {/* <Footer /> */}
      </Router>
    </>
  );
}

export default App;
