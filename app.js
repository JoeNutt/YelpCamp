const express = require("express"),
  app = express(),
  bodyParser = require("body-parser"),
  mongoose = require("mongoose"),
  passport = require("passport"),
  flash = require("connect-flash"),
  LocalStrategy = require("passport-local"),
  methodOverride = require("method-override"),
  User = require("./models/user"),
  seedDB = require("./seeds");
app.use(flash())
//seedDB();
const commentRoutes = require("./routes/comments"),
  campgroundRoutes = require("./routes/campgrounds"),
  indexRoutes = require("./routes/index");

mongoose
  .connect("mongodb://localhost:27017/yelp_camp_v13", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("Connected to DB!"))
  .catch((error) => console.log(error.message));

app.set("view engine", "ejs");
app.use(bodyParser.urlencoded({
  extended: true
}));
// PASSPORT CONFIGURATION
app.use(
  require("express-session")({
    secret: "Once again Rusty wins cutest dog!",
    resave: false,
    saveUninitialized: false,
  })
);
app.use(express.static(__dirname + "/public"));
app.use(methodOverride("_method"));
app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

app.use(function (req, res, next) {
  res.locals.currentUser = req.user;
  res.locals.error = req.flash("error");
  res.locals.success = req.flash("success");
  next();
});

app.use("/", indexRoutes);
app.use("/campgrounds", campgroundRoutes);
app.use("/campgrounds/:id/comments", commentRoutes);

app.listen(3000, () => {
  console.log("App listening on port 3000!");
});