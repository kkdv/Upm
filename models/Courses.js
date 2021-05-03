const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const CoursesSchema = new Schema({
  category: {
    type: "String",
    required: true,
  },
  imageURL: {
    type: "String",
    required: true,
  },
  title: {
    type: "String",
    required: true,
  },
  description: {
    type: "String",
    required: true,
  },
  author: {
    type: "String",
    required: true,
  },
  stars: {
    type: "Number",
    required: true,
  },
  ratings: {
    type: ["Number"],
    required: true,
  },
  currPrice: {
    type: "Number",
    required: true,
  },
  orgPrice: {
    type: ["Number"],
    required: true,
  },
  bestSeller: {
    type: "Boolean",
    required: true,
  },
  noOfStudents: {
    type: ["Number"],
    required: true,
  },
  language: {
    type: "String",
    required: true,
  },
  learn: {
    type: ["String"],
    required: true,
  },
  courseIncludes: {
    type: ["Mixed"],
    required: true,
  },
  audience: {
    type: ["String"],
    required: true,
  },
});

module.exports = mongoose.model("Courses", CoursesSchema);
