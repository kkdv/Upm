const express = require("express");
const router = express.Router();
const Users = require("../models/Users");
const Courses = require("../models/Courses");
const passport = require("passport");
const util = require("util");
const { error } = require("console");
const { DefaultDeserializer } = require("v8");
const { nextTick } = require("process");

router.get(
  "/get",
  passport.authenticate("jwt", {
    session: false,
  }),
  async (req, res) => {
    const user = req.user;
    //console.log("called /get, user=" + user);
    res.status(200).json(user.myCourses);
  }
);

router.get(
  "/add",
  passport.authenticate("jwt", {
    session: false,
  }),
  async (req, res) => {
    const student_email = JSON.parse(req.query.selectedUser).selectedUser;

    // get student record by email of selected user
    const student_user = await Users.findOne({
      email: student_email,
    });

    //loop thrrough the cart
    for (idx = 0; idx < req.user.cart.length; idx++) {
      /* console.log(
        " : idx=" + idx + " cart=" + JSON.stringify(req.user.cart, null, "\t")
      ); */
      //Look up student user->myCourses to contain the same courses in cart
      const res2 = await Users.findOne({
        email: student_email,
        "myCourses._id": req.user.cart[idx]._id,
      });
      if (!res2) {
        student_user.myCourses.push(req.user.cart[idx]);
        /* console.log(
          "inserting current_user_cart to student myCourses=" +
            JSON.stringify(student_user.myCourses, null, "\t")
        ); */
      } else {
        //console.log("duplicate found, res2=" + res2);
      }
    } //exit for loop
    //console.log("done, saving to student_user myCourses=" + student_user);
    //save to student_user myCourses
    student_user.save();

    //clear cart of the current user (professor)
    req.user.cart = [];
    req.user.save();

    //return json
    res.json(true);
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

router.post(
  "/start",
  passport.authenticate("jwt", {
    session: false,
  }),
  async (req, res) => {
    const user = req.user;
    const x_c = [];
    //console.log("payd =>" + JSON.stringify(req.body, null, "\t"));

    const id = req.body.payd;

    //console.log(" id=" + JSON.stringify(id, null, "\t") + "\n");

    Courses.findById(id, function (er, crs) {
      //console.log("course er =>" + JSON.stringify(er, null, "\t"));
      //console.log("course crs =>" + JSON.stringify(crs,null, "\t"));
      res.status(200).json(crs);
    });
  }
);
module.exports = router;
