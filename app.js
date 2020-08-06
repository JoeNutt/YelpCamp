var express = require("express"),
  app = express(),
  bodyParser = require("body-parser"),
  mongoose = require("mongoose"),
  Campground = require("./models/campground"),
  Comment = require("./models/comment.js"),
  seedDB = require("./seeds");
seedDB();
mongoose
  .connect("mongodb://localhost:27017/yelp_camp", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("Connected to DB!"))
  .catch((error) => console.log(error.message));
app.set("view engine", "ejs");
app.get("/", function (req, res) {
  res.render("landing");
});

// ====================
// COMMENTS ROUTES
// ====================

app.listen(3000, () => {
  console.log("App listening on port 3000!");
});
