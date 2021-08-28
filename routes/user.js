const User = require("../models/user");
const express = require("express");
const router = new express.Router();

router.post("/createuser", async (req, res) => {
  try {
    const user = new User({
      name: req.body.name,
      email: req.body.email,
      password: req.body.password,
    });
    await user.save();
    res.status(201).send(user);
  } catch (err) {
    res.status(400).send(err);
  }
});

router.get("/users", async (req, res) => {
  const users = await User.find({});
  try {
    res.status(200).send(users);
  } catch (err) {
    res.status(400).send(err);
  }
});

router.get("/users/:id", async (req, res) => {
  try {
    const user = await User.find({ _id: req.params.id });
    if (user) {
      res.status(200).send(user);
    } else {
      return res.send("No user found");
    }
  } catch (err) {
    res.status(400).send(err);
    console.log(err);
  }
});

router.patch("/users/:id", async (req, res) => {
  try {
    const user = await User.findByIdAndUpdate(req.params.id, {
      name: req.body.name,
    });
    await user.save();
    res.send(user);
  } catch (err) {
    console.log(err);
    res.status(200).send(err);
  }
});

router.delete("/users/:id", async (req, res) => {
  try {
    const user = await User.findByIdAndDelete(req.params.id);
    res.send(user);
  } catch (err) {
    res.status(400).send(err);
  }
});

module.exports = router;
