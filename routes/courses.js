const express = require("express");
const router = express.Router();
const {
  getCourses,
  getSingalCourse,
} = require("../controllers/coursesController");

router.route("/courses").get(getCourses);
router.route("/course/:id").get(getSingalCourse);

module.exports = router;
