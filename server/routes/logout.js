const express = require("express")
const router = express.Router()

router.get("/", function (req, res) {
  console.log("req authenticated: ", req.isAuthenticated())
  console.log('req.user: ', req.user)
  req.isAuthenticated() ? req.logOut() : console.log("already logged out")
  let message = req.isAuthenticated()
    ? `user ${req.user?.username} is logged in still :(`
    : "logged out!"
  console.log("message: ", message)
  res.redirect("/")
})

module.exports = router