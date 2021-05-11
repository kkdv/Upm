const express = require("express");
const passport = require("passport");
const router = express.Router();
const Users = require("../models/Users");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const key = require("../config/keys");
const validateRegisterInput = require("../validation/register");
const validateLoginInput = require("../validation/login");

router.post("/signup", async (req, res) => {
  const { errors, isValid } = validateRegisterInput(req.body);

  // Check Validation
  if (!isValid) {
    return res.status(400).json(errors);
  }

  const { name, email, password } = req.body;

  Users.findOne({ email: email }).then((user) => {
    if (user) {
      return res.status(400).json({ email: "Email already exists!" });
    } else {
      const newUser = new Users({
        name,
        email,
        password,
        cart: [],
      });

      bcrypt.genSalt(10, (err, salt) => {
        bcrypt.hash(newUser.password, salt, (err, hash) => {
          if (err) throw err;
          newUser.password = hash;
          newUser
            .save()
            .then((user) => res.json(user))
            .catch((err) => console.log(err));
        });
      });
    }
  });
});

router.post("/login", async (req, res) => {
  const { errors, isValid } = validateLoginInput(req.body);
  const { email, password } = req.body;

  // Check Validation
  if (!isValid) {
    return res.status(400).json(errors);
  }

  Users.findOne({ email }).then((user) => {
    if (!user) {
      return res.status(404).json({ email: "User not found!" });
    }

    bcrypt.compare(password, user.password).then((isMatch) => {
      if (isMatch) {
        // create JWT Payload
        const payload = { id: user.id, name: user.name };

        // Sign Token
        jwt.sign(payload, key.secretKey, { expiresIn: 3600 }, (err, token) => {
          res.json({
            success: true,
            token: "Bearer " + token,
          });
        });
      } else {
        return res.status(400).json({ password: "Password incorrect!" });
      }
    });
  });
});

module.exports = router;
