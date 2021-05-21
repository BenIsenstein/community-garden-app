const createError = require("http-errors")
const express = require("express")
const path = require("path")
const cookieParser = require("cookie-parser")
const logger = require("morgan")
const passport = require("passport")
const LocalStrategy = require("passport-local").Strategy
const session = require("express-session")
const bodyParser = require("body-parser")
const { User } = require("./models/db")
const cors = require("cors")
require("dotenv").config()
// IMPORT ROUTES
const getAllGardensRouter = require("./routes/getAllGardens")
const addAGardenRouter = require("./routes/addAGarden")
const signupRouter = require("./routes/signup")
const loginRouter = require("./routes/login")

const app = express()
app.use(cors())

// Configure Passport strategy
passport.use(
  new LocalStrategy(function (username, password, done) {
    User.findOne({ username: username }, function (err, user) {
      if (err) {
        return done(err)
      }
      if (!user) {
        return done(null, false, { message: "Incorrect username." })
      }
      if (!user.validPassword(password)) {
        return done(null, false, { message: "Incorrect password." })
      }
      return done(null, user)
    })
  })
)

passport.serializeUser(function (user, done) {
  done(null, user.id)
})

passport.deserializeUser(function (id, done) {
  User.findById(id, function (err, user) {
    done(err, user)
  })
})

// Configure Express app
app.use(logger("dev"))
app.use(express.json())
app.use(express.urlencoded({ extended: false }))
app.use(cookieParser())

// USE ROUTES
app.use("/api/get-all-gardens", getAllGardensRouter)
app.use("/api/add-a-garden", addAGardenRouter)
app.use("/api/signup", signupRouter)
app.use("/api/user", loginRouter)

// serve the react application
app.use(express.static("../client/build"))

// Passport middleware
app.use(session({ secret: "cats", resave: true, saveUninitialized: true }))
app.use(passport.initialize())
app.use(passport.session())

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404))
})

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message
  res.locals.error = req.app.get("env") === "development" ? err : {}

  // render the error page
  res.status(err.status || 500)
  // *** res.render (below) was replaced with res.json since we don't have a view engine specified
  // res.render("error")
  res.json({
    message: err.message,
    error: err
  })
})

module.exports = app
