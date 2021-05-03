const express = require("express");
const router = express.Router();
const Users = require("../models/Users");
const Courses = require("../models/Courses");

router.post("/", function (req, res) {
  const { name, email, password } = req.body;

  const newUser = new Users({
    name,
    email,
    password,
    cart: [],
  });

  newUser.save();

  res.json(newUser);
});

router.get("/", (req, res) => {
  Courses.find({}).then((course) => res.json(course));
});

module.exports = router;
