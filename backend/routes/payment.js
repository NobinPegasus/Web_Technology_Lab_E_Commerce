const fs = require("fs");
const { v4: uuid4 } = require("uuid");
const express = require("express");
const router = express.Router();
const Order = require("../models/Order");
const User = require("../models/User");
const path = require("path")

const { auth } = require("../middleware/verifyToken");

router.post("/pay/:id", async (req, res) => {
  const { from, to, amount } = req.body;
  // console.log(typeof amount);
  const id = req.params.id;
  let bank_data = JSON.parse(
    fs.readFileSync(`E:/web_project/backend/bank_data/data.json`).toString()
  );

  for (let i = 0; i < bank_data.length; i++)
    if (bank_data[i].account_no == from) {
      bank_data[i].balance -= amount;
      break;
    }
  for (let i = 0; i < bank_data.length; i++)
    if (bank_data[i].account_no == to) {
      bank_data[i].balance += amount;
      break;
    }
  fs.writeFileSync(
    `E:/web_project/backend/bank_data/data.json`,
    JSON.stringify(bank_data)
  );

  // write here the code for updating the state of the transaction of the product
  await Order.findByIdAndUpdate(
    id,
    {
      $set: { status: "success" },
    },
    { new: true }
  );
  res.status(200).json({
    message: `Transaction between ${from} to $${to} of amount ${amount} is completed`,
    token: uuid4(),
  });
});


router.get("/balance", auth, async (req, res, next) => {

  const user = req.user;

  if( !user ) {
    res.status(200).json({message: "asdasdasd"});
  }else {

    let bank_data = JSON.parse(
      fs.readFileSync(path.resolve(__dirname, "../bank_data/data.json")).toString()
    );

    let balance = -1;
    for (let i = 0; i < bank_data.length; i++)
      if (bank_data[i].account_no == user.bankaccount) 
        balance = bank_data[i].balance;

    console.log(user);

    res.status(200).json({
      token: uuid4(),
      balance,
    });
  }
});




router.get("")

module.exports = router;
