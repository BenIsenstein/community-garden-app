const express = require("express")
const router = express.Router()
const passport = require("passport")

router.post("/",
  (req, res, next) => {
    if (!req.isAuthenticated()) {
      console.log('about to log in')
      next()
    }
    else {
      res.redirect('/home')
    }
  },
  passport.authenticate("local", {
    successRedirect: "/loggedon",
    failureRedirect: "/login",
    failureFlash: true
  })
)

router.get("/logout", function (req, res) {
  console.log("req authenticated: ", req.isAuthenticated())
  req.isAuthenticated() ? req.logOut() : console.log("already logged out")
  let message = req.isAuthenticated()
    ? `user ${req.user?.username} is logged in still :(`
    : "logged out!"
  console.log("message: ", message)
  res.redirect("/")
})

module.exports = router
