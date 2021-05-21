const express = require("express")
const router = express.Router()
const passport = require("passport")
const { findUserByName, addUser } = require("../models/db")

router.post(
  "/",
  passport.authenticate("local", {
    successRedirect: "/loggedon",
    failureRedirect: "/",
    failureFlash: true
  }),
  (req, res) => {
    console.log("Authenticated")
    console.log("user object", req.user)
  }
)

router.get("/logout", function (req, res) {
  req.logout()
  res.redirect("/")
})

module.exports = router
