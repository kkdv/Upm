const Courses = require("../models/Courses");

exports.getCourses = (req, res) => {
  Courses.find({}).then((course) => res.json(course));
};
