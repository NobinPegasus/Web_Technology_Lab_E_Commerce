const express = require("express");
const router = express.Router();

const {
  CreateOrder,
  AllOrder,
  SingleOrder,
  DeleteOrder,
} = require("../controller/orderController");
const { auth } = require("../middleware/verifyToken");

router.post("/createorder", auth, CreateOrder);
router.get("/allorder", AllOrder);
router.get("/singleorder/:id", auth, SingleOrder);
router.delete("/deleteorder/:id", DeleteOrder);

module.exports = router;
