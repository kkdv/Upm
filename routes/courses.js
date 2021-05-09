const express = require("express");
const router = express.Router();
const Courses = require("../models/Courses");

router.get("/courses", async (req, res) => {
  const courses = await Courses.find();

  res.status(200).json({
    success: true,
    courses,
  });
});

router.get("/course/:id", async (req, res) => {
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
});

router.get("/course/find/:keyword", async (req, res) => {
  const keyword = req.params.keyword;
  const response = await Courses.find({
    $or: [
      { title: { $regex: keyword, $options: "$i" } },
      { category: { $regex: keyword, $options: "$i" } },
      { description: { $regex: keyword, $options: "$i" } },
      { author: { $regex: keyword, $options: "$i" } },
    ],
  });

  if (!response) {
    return res.status(404).json({
      success: false,
      message: "Sorry, we couldn't find any results.",
    });
  }

  res.status(200).json({
    success: true,
    response,
  });
});

module.exports = router;
