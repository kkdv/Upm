const express = require("express");
const router = express.Router();
const Users = require("../models/Users");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const key = require("../config/keys");

const util = require("util");
const validateRegisterInput = require("../validation/register");
const validateLoginInput = require("../validation/login");

router.post("/signup", async (req, res) => {
    const {
        errors,
        isValid
    } = validateRegisterInput(req.body);

    //console.log(req.body);

    // Check Validation
    if (!isValid) {
        return res.status(400).json(errors);
    }

    const {
        name,
        email,
        password,
        usertype
    } = req.body;

    Users.findOne({
        email: email,
    }).then((user) => {
        if (user) {
            return res.status(400).json({
                email: "Email already exists!",
            });
        } else {
            const newUser = new Users({
                name,
                email,
                password,
                cart: [],
                usertype,
            });

            bcrypt.genSalt(10, (err, salt) => {
                bcrypt.hash(newUser.password, salt,
                    (err, hash) => {
                        if (err) throw err;
                        newUser.password = hash;
                        newUser
                            .save()
                            .then((user) => {
                                const
                                    payload = {
                                        id: user
                                            .id,
                                        name: user
                                            .name,
                                        email: user
                                            .email,
                                        usertype: user
                                            .usertype,
                                    };

                                jwt.sign(
                                    payload,
                                    key
                                    .secretKey, {
                                        //expiresIn: 3600,
                                        expiresIn: 30,
                                    },
                                    (err,
                                        token
                                    ) => {
                                        res.json({
                                            success: true,
                                            token: "Bearer " +
                                                token,
                                        });
                                    }
                                );
                            })
                            .catch((err) =>
                                console.log(err)
                            );
                    });
            });
        }
    });
});

router.post("/login", async (req, res) => {
    const {
        errors,
        isValid
    } = validateLoginInput(req.body);
    const {
        email,
        password
    } = req.body;

    // Check Validation
    if (!isValid) {
        return res.status(400).json(errors);
    }

    Users.findOne({
        email,
    }).then((user) => {
        if (!user) {
            return res.status(404).json({
                email: "User not found!",
            });
        }

        bcrypt.compare(password, user.password).then((
            isMatch) => {
            if (isMatch) {
                // create JWT Payload
                const payload = {
                    id: user.id,
                    name: user.name,
                    email: user.email,
                    usertype: user.usertype,
                };

                // Sign Token
                jwt.sign(
                    payload,
                    key.secretKey, {
                        expiresIn: 3600,
                    },
                    (err, token) => {
                        res.json({
                            success: true,
                            token: "Bearer " +
                                token,
                        });
                    }
                );
            } else {
                return res.status(400).json({
                    password: "Password incorrect!",
                });
            }
        });
    });
});

router.get("/userlist", async (req, res) => {
    const userlist = await Users.find({
        usertype: "S",
        name: {
            $ne: "admin",
        },
    });
    //console.log("called userlist");

    res.status(200).json({
        success: true,
        userlist,
    });
});

router.get("/updateuser/:userid/:courseid", async (req, res) => {
    //console.log("userid=" + JSON.stringify(req.params.userid, null, "\t"));
    //console.log("courseid=" + JSON.stringify(req.params.courseid, null, "\t"));
    const id = req.params.userid;

    const res2 = await Users.findOne({
        _id: req.params.userid,
        // "myCourses._id": req.params.courseid,
    });

    if (!res2) {
        return res.status(404).json({
            id: "User not found!",
        });
    }
    const i = res2.myCourses.findIndex((obj) => obj._id == req
        .params.courseid);

    //console.log("res2=" + JSON.stringify(res2.myCourses[i], null, "\t"));
    const today = new Date();

    today.setDate(today.getDate());

    const date =
        today.getFullYear() + "/" + (today.getMonth() + 1) + "/" +
        today.getDate();

    if (res2.myCourses[i].startDate == '') {
        res2.myCourses[i].startDate = date;
    }

    res2.markModified("myCourses");

    const err = await res2.save().catch((err) => err);
    //console.log("err=" + JSON.stringify(err, null, "\t"));

    res.status(200).json(res2);
});

module.exports = router;
