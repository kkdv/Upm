const Courses = require("../models/Courses");
const data = require("./data.json");
const mongoose = require("mongoose");
const db = require("../config/keys").mongoURL;

mongoose
  .connect(db, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log("mongodb connected"))
  .catch((err) => console.log(err));

const seedCourses = async () => {
  try {
    await Courses.insertMany(data);
    console.log("All Courses Inserted Successfully :)");
    process.exit();
  } catch (error) {
    console.log(error.message);
    process.exit();
  }
};

seedCourses();
