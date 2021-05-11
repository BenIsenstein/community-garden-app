var createError = require("http-errors");
var express = require("express");
// var path = require("path");
// const showError = require("../client/src/components/Signup");

var cookieParser = require("cookie-parser");
var logger = require("morgan");

// IMPORT ROUTES
var superheroRouter = require("./routes/superhero");

var app = express();

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

// USE ROUTES
// app.use("/superhero", superheroRouter);

// serve the react application
app.use(express.static("../client/build"));

// ***** My stuff

app.get("/loggedon", (req, res) => {
  res.send("TEST???");
});
app.get("/blah", (req, res) => {
  res.send("TEST???");
});

app.post("/signup", (req, res) => {
  console.log("req: ", req);
  console.log("req.body.password: ", req.body.password);
  console.log("req.body.confirmPassword: ", req.body.confirmPassword);
  // res.redirect("/loggedon");
  // if (req.body.username === "") {
  //   res.send({
  //     success: false,
  //     // message: "Username is required",
  //     showError(username, 'Username is required');
  //   })
  // } else {
  //   showSuccess(username);
  // }
  if (req.body.username === "") {
    res.send({
      success: false,
      message: "Username is required",
    });
  } else if (req.body.password.length < 5) {
    res.send({
      success: false,
      message: "Bad password",
    });
  } else if (req.body.password != req.body.confirmPassword) {
    res.send({
      success: false,
      message: "Passwords must match",
    });
  } else {
    res.send({
      success: true,
    });
  }
});

// ***** End of my stuff

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
// app.use(function (err, req, res, next) {
//   // set locals, only providing error in development
//   res.locals.message = err.message;
//   res.locals.error = req.app.get("env") === "development" ? err : {};

//   // render the error page
//   res.status(err.status || 500);
//   res.render("error");
// });

module.exports = app;
