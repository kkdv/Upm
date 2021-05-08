const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const courses = require("./routes/courses");
const users = require("./routes/users");

const app = express();

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

//DB config
const db = require("./config/keys").mongoURL;

//CORS POLICY
app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept, Authorization"
  );
  res.setHeader("Access-Control-Allow-Methods", "GET, POST, PATCH, DELETE,PUT");
  next();
});

// Connect to mongodb
mongoose
  .connect(db, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log("mongodb connected"))
  .catch((err) => console.log(err));

app.use("/api", courses);
app.use("/api/users/", users);

const port = process.env.PORT || 5000;

app.listen(port);
