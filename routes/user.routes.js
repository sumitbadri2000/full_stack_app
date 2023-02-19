const express = require("express");
const { UserModel } = require("../model/user.model");
const UserRouter = express.Router();
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
UserRouter.post("/register", async (req, res) => {
  const { name, email, pass, age } = req.body;
  try {
    bcrypt.hash(pass, 5, async (err, password) => {
      if (err) {
        res.send(err.message);
      } else {
        const user = new UserModel({ name, email, pass: password, age });
        await user.save();
        res.send({ msg: "new user" });
      }
    });
  } catch (error) {
    res.send({ msg: "something wrong", error: error.message });
  }
});
UserRouter.post("/login", async (req, res) => {
  const { email, pass } = req.body;
  try {
    const user = await UserModel.find({ email });
    if (user.length > 0) {
      bcrypt.compare(pass, user[0].pass, (err, result) => {
        if (result) {
          const token = jwt.sign({ userID: user[0]._id }, "masai");
          res.send({ msg: "login user", token: token });
        } else {
          res.send({ msg: "wrong" });
        }
      });
    } else {
      res.send("wrong");
    }
  } catch (error) {
    res.send({ msg: "something wrong", error: error.message });
  }
});

module.exports = { UserRouter };
