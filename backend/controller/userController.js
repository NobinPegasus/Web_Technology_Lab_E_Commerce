const User = require("../models/User");
const jwt = require("jsonwebtoken");
const bcryptjs = require("bcryptjs");

// signup user.....
const SignupUser = async (req, res) => {
  const { email, username, password, role} = req.body;
  console.log(req.body)
  try {
    if (!email || !username || !password || !role) {
      return res.status(400).json({ error: "Please fill all the fields.." });
    }
    const existUser = await User.findOne({ email });

    if (existUser) {
      return res.status(400).json({ error: "User already exist." });
    }

    const hashPassword = await bcryptjs.hash(password, 12);
    const user = new User({ email, username, password: hashPassword , role});

    await user.save();

    res.status(200).json(user);
  } catch (error) {
    console.log(error);
    res.status(400).json({ error: "Something wrong." });
  }
};

// login user..
const LoginUser = async (req, res) => {
  const { email, password } = req.body;
  try {
    if (!email || !password) {
      return res.status(400).json({ error: "Please provide credentials." });
    }

    const existUser = await User.findOne({ email });

    if (!existUser) {
      res.status(400).json({ error: "Invalid Credentials." });
    } else {
      const matchPassword = await bcryptjs.compare(
        password,
        existUser.password
      );

      if (matchPassword) {
        const token = jwt.sign({ _id: existUser._id }, process.env.JWT_SECRET, {
          expiresIn: "1d",
        });
        res.status(200).json({ token, existUser });
      } else {
        console.log("Create problems");
        res.status(400).json({ error: "Invalid Credentials." });
      }
    }
  } catch (error) {
    console.log(error);
    res.status(400).json({ error: "Something wrong...." });
  }
};

// update user..
const UpdateUser = async (req, res) => {
  const { username, password } = req.body;
  const hashPassword = await bcryptjs.hash(password, 12);
  try {
    const updatedUser = await User.findByIdAndUpdate(
      req.params.id,
      {
        $set: { username, password: hashPassword },
      },
      { new: true }
    );
    res.status(200).json(updatedUser);
  } catch (err) {
    res.status(500).json(err);
  }
};

// delete user...
const DeleteUser =  async (req, res) => {
  const { id } = req.params;
  try {
    await User.deleteOne({ _id: id });
    res.status(201).json("User deleted Successfully");
  } catch (error) {
    res.status(409).json(error);
  }
};

// allusers...
const AllUsers = async (req, res) => {
  try {
    const users = await User.find();
    // { _id: { $ne: req.user._id } } (need this for wihtout logged user)
    res.status(200).json({ users });
  } catch (error) {
    res.status(400).json({ error: error });
  }
};

// single users...
const SingleUser = async (req, res) => {
  const { id } = req.params;
  try {
    const user = await User.findOne({ _id: id });
    res.status(200).json({ user });
  } catch (error) {
    res.status(400).json(error);
    l;
  }
};

const getRole = async (req, res) => {
  const user = req.user;

  res.status(200).json({role: user.role});
}

const FetchUserData = async (req, res) => {
  const { id } = req.params;
  try {
    const user = await User.findOne({ _id: id });
    res.status(200).json({ user });
  } catch (error) {
    res.status(400).json(error);
    l;
  }
};


const SetBankAccount = async (req, res) => {
  const { account_no } = req.body;
  console.log(req.body)
  try {
    const user = req.user;
    await User.findByIdAndUpdate(
      user._id,
      {
        $set: { bankaccount: account_no },
      },
      { new: true }
    );
    console.log(user.id)
    res.status(200).json({ user });
  } catch (error) {
    res.status(400).json(error);
    l;
  }
};

module.exports = {
  SignupUser,
  LoginUser,
  UpdateUser,
  DeleteUser,
  AllUsers,
  SingleUser,
  getRole,
  SetBankAccount
};
