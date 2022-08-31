import React, { useEffect, useState } from "react";
import axios from "axios";
import "./Addproduct.css";
import { useHistory } from "react-router-dom";
import { AddNewProduct } from "../../Api/Api";
const Addproduct = ({ allProducts }) => {
  const history = useHistory();

  useEffect(() => {
    const role = localStorage.getItem("role");
    const token = localStorage.getItem("jwtoken");
    console.log(role, token);
    if (!token && role !== "seller") {
      history.push("/login");
    }
  }, []);

  const [products, setProducts] = useState({
    name: "",
    description: "",
    price: "",
  });
  const [photo, setPhoto] = useState();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProducts({
      ...products,
      [name]: value,
    });
  };
  //  upload images
  const uploadImage = async (pic) => {
    if (pic === undefined) {
      alert("Please use a valid image");
      return;
    }
    if (pic.type === "image/jpeg" || pic.type === "image/png") {
      const data = new FormData();
      data.append("file", pic);
      data.append("upload_preset", "web_project");
      data.append("cloud_name", "shanto78");
      const imgData = await axios.post(
        "https://api.cloudinary.com/v1_1/shanto78/image/upload",
        data
      );
      setPhoto(imgData.data.url.toString());
    } else {
      alert("Use a valid image.");
    }
  };
  const newProduct = {
    name: products.name,
    description: products.description,
    price: products.price,
    photo,
  };
  const productAdd = async () => {
    console.log(newProduct);
    const res = await AddNewProduct(newProduct);
    allProducts();
    if (res.status === 200) {
      history.push("/");
    }
    console.log(res);
  };
  return (
    <>
      <div className="add_product">
        <div
          style={{ width: "100%", display: "flex", justifyContent: "center" }}
        >
          <span
            style={{ fontSize: "1.4rem", fontWeight: "600", color: "#e94560" }}
          >
            Add your product
          </span>
        </div>
        <input
          type="text"
          placeholder="Proudct name"
          className="product_input"
          name="name"
          value={products.name}
          onChange={handleChange}
        />
        <textarea
          cols="30"
          rows="7"
          placeholder="Product description"
          className="proudct_dec_area"
          name="description"
          value={products.description}
          onChange={handleChange}
        />
        <div style={{ width: "100%", display: "flex", alignItems: "center" }}>
          <input
            type="text"
            placeholder="Proudct price"
            className="product_price_input"
            name="price"
            value={products.price}
            onChange={handleChange}
          />
          <input
            type="file"
            placeholder="Upload product image"
            className="product_file"
            onChange={(e) => {
              uploadImage(e.target.files[0]);
            }}
          />
        </div>
        <button onClick={productAdd} className="product_btn">
          Add product
        </button>
      </div>
    </>
  );
};

export default Addproduct;
