const express = require("express")
const { findUserByName, addUser, User } = require("../models/db")
const router = express.Router()

// async function validateName(username) {
//   let accountExists = await findUserByName(username)
//   return !accountExists
// }

// function validatePass(password) {
//   return (
//     /.{6,}$/.test(password) &&
//     /[A-Z]+/.test(password) &&
//     /[a-z]+/.test(password) &&
//     /[0-9]+/.test(password)
//   )
// }

router.post("/", async (req, res) => {
  // console.log("req: ", req)
  // console.log("req.body.password: ", req.body.password)
  // console.log("req.body.confirmPassword: ", req.body.confirmPassword)
  let username = req.body.username
  let email = req.body.email
  let password = req.body.password
  // let confirmPassword = req.body.confirmPassword
  // let isPassSafe = validatePass(password)
  let howLongGardening = req.body.howLongGardening
  let plantCheckbox = req.body.plantCheckbox[0]
  let postalCode = req.body.postalCode

  await User.findOne({ username: username }, (err, foundUser) => {
    if (err) {
      console.log("Error finding user?", err)
      res.send(err)
    } else {
      if (foundUser) {
        console.log(`Sorry, the name "${username}" already exists :(`)
        res.send("That user already exists :(")
      } else {
        console.log(`Yay, the name "${username}" isn't claimed yet!`)
        let newUser = new User({
          username: username,
          email: email,
          password: password,
          howLongGardening: howLongGardening,
          currentPlants: plantCheckbox,
          postalCode: postalCode,
          memberOfGarden: false,
          dateSignedUp: new Date()
        })
        addUser(newUser)
        console.log("New user has been added: ", newUser)
        res.send({}) // What do I need to return? (user record, id, etc.)
      }
    }
  })
})

module.exports = router
