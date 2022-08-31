const express = require("express");
const router = express.Router();

const {
  CreateProduct,
  AllProducts,
  SingleProduct,
  DeleteProduct,
  UpdateProduct,
} = require("../controller/productController");
const {auth} = require("../middleware/verifyToken")
router.post("/createproduct",auth, CreateProduct);
router.get("/allproduct",auth, AllProducts);
router.get("/singleproduct",auth,  SingleProduct);
router.delete("/deleteproduct/:id",auth, DeleteProduct);
router.put("/updateproduct",auth, UpdateProduct);

module.exports = router;
