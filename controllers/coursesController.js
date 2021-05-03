const Courses = require("../models/Courses");

exports.getCourses = async (req, res) => {
  const courses = await Courses.find();

  res.status(200).json({
    success: true,
    courses,
  });
};

exports.getSingalCourse = async (req, res) => {
  const course = await Courses.findById(req.params.id);

  if (!course) {
    return res.status(404).json({
      success: false,
      message: "Course not found!",
    });
  }

  res.status(200).json({
    success: true,
    course,
  });
};
