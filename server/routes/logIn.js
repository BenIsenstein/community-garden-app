const express = require("express")
const router = express.Router()
const passport = require("passport")

router.post(
  "/",
  (req, res, next) => {
    if (!req.isAuthenticated()) {
      console.log("about to log in")
      next()
    } else {
      res.redirect("/home")
    }
  },
  passport.authenticate("local", {
    successRedirect: "/loggedon",
    failureRedirect: "/login",
    failureFlash: true
  })
)

module.exports = router
