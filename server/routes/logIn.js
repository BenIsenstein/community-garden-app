const express = require("express")
const router = express.Router()
const passport = require("passport")
const { findUserByName, User, addUser } = require("../models/db")

// ***** FIX PASSPORT STUFF
router.post(
  "/",
  // passport.authenticate("local", {
  //   successRedirect: "/loggedon",
  //   failureRedirect: "/",
  //   failureFlash: true
  // }),
  async (req, res) => {
    const username = req.body.username
    const password = req.body.password
    await User.findOne({ username: username }, (err, foundUser) => {
      if (err) {
        console.log("****LOGON ERROR: ", err)
        res.send(err)
      } else {
        if (foundUser) {
          console.log("*****LOGON FOUND USER: ", username)
          if (foundUser.password === password) {
            res.send("User was found and password matches!!!!")
          } else {
            res.send("User was found but password is incorrect :(")
          }
        } else {
          res.send("This username doesn't exist.")
        }
      }
    })
    console.log("Authenticated")
    console.log("user object", req.user)
  }
)

router.get("/logout", function (req, res) {
  req.logout()
  res.redirect("/")
})

module.exports = router
