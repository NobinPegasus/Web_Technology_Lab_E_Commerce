const Order = require("../models/Order");

const CreateOrder = async (req, res) => {
  console.log(req.user);
  console.log(req.body);
  const { products, totalPrice } = req.body;

  try {
    const newOrder = new Order({
      userId: req.user._id,
      products: [...products],
      amount: totalPrice,
    });
    await newOrder.save();
    res.status(200).json(newOrder);
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
};


const AllOrder = async (req, res) => {
  try {
    const orders = await Order.find();
    res.status(200).json(orders);
  } catch (err) {
    res.status(500).json(err);
  }
};
// user order...
const SingleOrder = async (req, res) => {
  try {
    const orders = await Order.find({ userId: req.params.id });
    console.log(orders);
    res.status(200).json(orders);
  } catch (err) {
    res.status(500).json(err);
  }
};

const DeleteOrder = async (req, res) => {
  try {
    await Order.findByIdAndDelete(req.params.id);
    res.status(200).json("Order has been deleted...");
  } catch (err) {
    res.status(500).json(err);
  }
};

module.exports = {
  CreateOrder,
  AllOrder,
  SingleOrder,
  DeleteOrder,
};
