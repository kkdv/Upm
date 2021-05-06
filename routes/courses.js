const express = require("express");
const router = express.Router();
const {
  getCourses,
  getSingalCourse,
  findCourses,
} = require("../controllers/coursesController");

router.route("/courses").get(getCourses);
router.route("/course/:id").get(getSingalCourse);
router.route("/course/find/:keyword").get(findCourses);

module.exports = router;
