var createError = require("http-errors");
var express = require("express");
var path = require("path");

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
  console.log(req);
  // res.redirect("/loggedon");
  if (req.body.password.length < 3) {
    res.send({
      success: false,
      message: "Bad Password",
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
