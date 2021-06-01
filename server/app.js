const createError = require("http-errors")
const express = require("express")
const path = require("path")
const cookieParser = require("cookie-parser")
const logger = require("morgan")
const passport = require("passport")
const session = require("express-session")
const cors = require("cors")
const flash = require("connect-flash")
const initializePassport = require("./passport-config")
require("dotenv").config()

// IMPORT ROUTES
const gardenRouter = require("./routes/garden")
const userRouter = require("./routes/user")
//const todoRouter = require("./routes/todo")

const app = express()
app.use(cors())

// Initialize passport strategy
initializePassport(passport)

// Passport middleware
app.use(session({ secret: process.env.PASSPORT_SECRET, resave: true, saveUninitialized: true }))
app.use(passport.initialize())
app.use(passport.session())
app.use(flash())

// Configure Express app
app.use(logger("dev"))
app.use(express.json())
app.use(express.urlencoded({ extended: false }))
app.use(cookieParser())

// USE ROUTES
app.use("/api/garden", gardenRouter)
app.use("/api/user", userRouter)

// serve the react application
app.use(express.static("../client/build"))

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
  res.json({
    message: err.message,
    error: err
  })
})

module.exports = app
