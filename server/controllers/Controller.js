const User = require("../models/User");
const { hashPassword, comparePassword } = require("../helpers/Helpers");
const { json } = require("express");
const jwt = require("jsonwebtoken");

const test = (req, res) => {
  res.json("test is working");
};

//register endPoint
const registerUser = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    //check if name is entered
    if (!name) {
      return res.json({
        error: "name is required",
      });
    }

    //check if password is entered and atleast 6 characters
    if (!password && password.length > 6) {
      return res.json({
        error: "password is required and alteast 6 characters",
      });
    }

    const exist = await User.findOne({ email });
    if (exist) {
      return res.json({
        error: "email already exit... try another one",
      });
    }

    //hash password
    const hashedPassword = await hashPassword(password);

    const user = await User.create({
      name,
      email,
      password: hashedPassword,
    });

    return res.json(user);
  } catch (error) {
    console.log(error);
  }
};

//Login endPoint
const loginUser = async (req, res) => {
  const { email, password } = req.body;

  const user = await User.findOne({ email });
  if (!user) {
    return res.json({
      error: "User Not Found",
    });
  }

  const match = await comparePassword(password, user.password);
  if (match) {
    jwt.sign(
      { email: user.email, id: user._id, name: user.name },
      process.env.JWT_SECRET,
      {},
      (err, token) => {
        if (err) throw err;
        res.cookie("token", token).json(user);
      }
    );
  }
  if (!match) {
    res.json({
      error: "passwrod do not match",
    });
  }
};

const getProfile = (req, res) => {
  const { token } = req.cookies;
  if (token) {
    jwt.verify(token, process.env.JWT_SECRET, {}, (err, user) => {
      if (err) throw err;
      res.json(user);
    });
  } else {
    res.json(null);
  }
};

module.exports = {
  test,
  registerUser,
  loginUser,
  getProfile,
};
