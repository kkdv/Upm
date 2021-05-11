const express = require("express");
const router = express.Router();
const Users = require("../models/Users");
const passport = require("passport");

router.get(
  "/get",
  passport.authenticate("jwt", { session: false }),
  async (req, res) => {
    const user = req.user;
    res.status(200).json(user.cart);
  }
);

router.post(
  "/add",
  passport.authenticate("jwt", { session: false }),
  async (req, res) => {
    const { course } = req.body;
    const user = req.user;

    user.cart.push(course);
    user.save();
    res.json(user);
  }
);

router.post(
  "/remove",
  passport.authenticate("jwt", { session: false }),
  async (req, res) => {
    const { title } = req.body;
    const user = req.user;

    await Users.updateOne(
      { _id: user._id },
      { $pull: { cart: { title: title } } },
      { safe: true, multi: true },
      function (err, obj) {
        res.json(obj);
      }
    );
  }
);

router.get(
  "/cartcount",
  passport.authenticate("jwt", { session: false }),
  async (req, res) => {
    const user = req.user;
    const length = user.cart.length;
    res.json(length);
  }
);

router.post(
  "/cartstatus",
  passport.authenticate("jwt", { session: false }),
  async (req, res) => {
    const email = req.user.email;
    const { title } = req.body;

    Users.findOne(
      { email: email, cart: { $elemMatch: { title: title } } },
      function (err, user) {
        if (err) {
          return done(err);
        }
        if (user) {
          res.json(true);
        } else {
          res.json(false);
        }
      }
    );
  }
);

module.exports = router;
