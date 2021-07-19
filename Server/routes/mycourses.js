const express = require("express");
const router = express.Router();
const Users = require("../models/Users");
const Courses = require("../models/Courses");
const passport = require("passport");

router.get(
  "/get",
  passport.authenticate("jwt", {
    session: false,
  }),
  async (req, res) => {
    const user = req.user;
    res.status(200).json(user.myCourses);
  }
);

router.get(
  "/add",
  passport.authenticate("jwt", {
    session: false,
  }),
  async (req, res) => {
    const student_user = req.user.cart;

    const email = JSON.parse(req.query.selectedUser).selectedUser;

    console.log("cart=>" + req.user.cart);

    //clear cart of the curernt user (professor)
    req.user.cart = [];
    req.user.save();

    console.log("cart=>" + req.user.cart);

    Users.findOne({
      email: email,
    }).then((user) => {
      /* console.log("router.get/add-->" + JSON.stringify(
                user, null,
                "\t")); */
      user.myCourses.push(...student_user);

      user.save();
      res.json(user);
    });
  }
);

router.post(
  "/remove",
  passport.authenticate("jwt", {
    session: false,
  }),
  async (req, res) => {
    const { title } = req.body;
    const user = req.user;

    await Users.updateOne(
      {
        _id: user._id,
      },
      {
        $pull: {
          myCourses: {
            title: title,
          },
        },
      },
      {
        safe: true,
        multi: true,
      },
      function (err, obj) {
        res.json(obj);
      }
    );
  }
);

// router.get(
//   "/cartcount",
//   passport.authenticate("jwt", { session: false }),
//   async (req, res) => {
//     const user = req.user;
//     const length = user.cart.length;
//     res.json(length);
//   }
// );

// router.post(
//   "/cartstatus",
//   passport.authenticate("jwt", { session: false }),
//   async (req, res) => {
//     const email = req.user.email;
//     const { title } = req.body;

//     Users.findOne(
//       { email: email, cart: { $elemMatch: { title: title } } },
//       function (err, user) {
//         if (err) {
//           return done(err);
//         }
//         if (user) {
//           res.json(true);
//         } else {
//           res.json(false);
//         }
//       }
//     );
//   }
// );

// Start course
router.post(
  "/start",
  passport.authenticate("jwt", {
    session: false,
  }),
  async (req, res) => {
    const { title, id } = req.body;
    const user = req.user;
    //console.log("course start=>" + JSON.stringify(req.body) + " id=" + id);
    const courses = await Courses.findById(id).then((course) => {
      res.status(200).json({
        success: true,
        course,
      });
    });
  }
);

module.exports = router;