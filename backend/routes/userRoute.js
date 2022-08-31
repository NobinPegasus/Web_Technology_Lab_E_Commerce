const express = require("express");
const router = express.Router();

const {
  SignupUser,
  LoginUser,
  UpdateUser,
  DeleteUser,
  AllUsers,
  SingleUser,
  getRole,
  SetBankAccount
} = require("../controller/userController");

const { auth } = require("../middleware/verifyToken");


router.post("/signup", SignupUser);
router.post("/login", LoginUser);
router.put("/updateuser/:id",UpdateUser);
router.delete("/deleteuser/:id", DeleteUser);
router.get("/allusers", AllUsers);
router.get("/singleuser/:id",SingleUser);
router.get("/getRole",auth,getRole);
router.post("/setBankAccount",auth,SetBankAccount);

module.exports = router;
