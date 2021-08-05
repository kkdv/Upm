const express = require("express");
const router = express.Router();
const Courses = require("../models/Courses");
const Users = require("../models/Users");
const DEBUG = true;


router.get("/startcourse/:id", async (req, res) => {
    console.log("called /startcourse:id" + req.params.id);
    const courses = await Courses.findById(req.params.id);

    if (!courses) {
        return res.status(404).json({
            success: false,
            message: "Course not found!",
        });
    }

    res.status(200).json({
        success: true,
        courses,
    });
    if (DEBUG) {
        console.log("courses=", courses);
    }
});

module.exports = router;
