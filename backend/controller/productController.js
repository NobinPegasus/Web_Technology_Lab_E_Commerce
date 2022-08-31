const Product = require("../models/Product");

const CreateProduct = async (req, res) => {
  console.log(req.body);
  const { name, description, price, photo } = req.body;
  try {
    const product = new Product(req.body);
    await product.save();
    console.log(product);
    res.status(200).json(product);
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
};
const AllProducts = async (req, res) => {
  console.log(req.user)
  try {
    const products = await Product.find();
    res.status(200).json({ products });
  } catch (error) {
    res.status(400).json({ error: error });
  }
};
const SingleProduct = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    res.status(200).json(product);
  } catch (err) {
    res.status(500).json(err);
  }
};
const DeleteProduct = async (req, res) => {
  try {
    await Product.findByIdAndDelete(req.params.id);
    res.status(200).json("Product has been deleted...");
  } catch (err) {
    res.status(500).json(err);
  }
};
const UpdateProduct = async (req, res) => {
  try {
    const updatedProduct = await Product.findByIdAndUpdate(
      req.params.id,
      {
        $set: req.body,
      },
      { new: true }
    );
    res.status(200).json(updatedProduct);
  } catch (err) {
    res.status(500).json(err);
  }
};
module.exports = {
  CreateProduct,
  AllProducts,
  SingleProduct,
  DeleteProduct,
  UpdateProduct,
};
