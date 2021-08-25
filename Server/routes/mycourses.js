const express = require("express");
const router = express.Router();
const Users = require("../models/Users");
const Courses = require("../models/Courses");
const passport = require("passport");
const util = require("util");
const got = require('got');
const {
    syncIndexes
} = require("../models/Users");

/* const {
    pipeline
} = require('stream');

const {
    error
} = require("console");
const {
    DefaultDeserializer
} = require("v8");
const {
    nextTick
} = require("process");
const {
    response
} = require("express"); */



router.get("/get",
    passport.authenticate("jwt", {
        session: false,
        failureRedirect: "/login",
    }),
    async (req, res) => {
        const user = req.user;
        //console.log("called /get, user=" + user);
        res.status(200).json(user.myCourses);
    }
);

router.get("/add",
    passport.authenticate("jwt", {
        session: false,
    }),
    async (req, res) => {
        const student_email = JSON.parse(req.query.selectedUser)
            .selectedUser;

        // get student record by email of selected user
        const student_user = await Users.findOne({
            email: student_email,
        });

        //loop thrrough the cart
        let usercart = null;
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
                // add additional fields for the instructor to track of student progress.
                const today = new Date();
                const date = today.getFullYear() + '/' + (today
                    .getMonth() + 1) + '/' + today.getDate();
                req.user.cart[idx] = {
                    ...req.user.cart[idx],
                    assignedBy: req.user.email,
                    assignedDate: date,
                    startDate: "",
                    endDate: "",
                    expirationDate: ""
                };

                //console.log("user.cart[idx]=" + JSON.stringify(req.user.cart[idx]));

                student_user.myCourses.push(
                    req.user.cart[idx]);
                usercart = null;

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

router.post("/remove",
    passport.authenticate("jwt", {
        session: false,
    }),
    async (req, res) => {
        const {
            title
        } = req.body;
        const user = req.user;

        await Users.updateOne({
                _id: user._id,
            }, {
                $pull: {
                    myCourses: {
                        title: title,
                    },
                },
            }, {
                safe: true,
                multi: true,
            },
            function (err, obj) {
                res.json(obj);
            }
        );
    }
);

router.get("/mycoursecount",
    passport.authenticate("jwt", {
        session: false
    }),
    async (req, res) => {
        const user = req.user;
        const length = user.myCourses.length;
        res.json(length);
    }
);

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

router.post("/getcourse_detail",
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

// Get Vimeo Thumbnail images
router.post("/geturl",
    passport.authenticate("jwt", {
        session: false,
    }),
    async (req, res) => {

        const url = req.body.url;
        // console.log("url =>" + JSON.stringify(req.body, null, "\t"));
        try {
            const response = await got(url);

            res.status(200).json(response.body);

        } catch (error) {
            //console.log("cerror=>" + JSON.stringify(error))
            res.status(500).json({
                error
            });
        }
    }
);
module.exports = router;
