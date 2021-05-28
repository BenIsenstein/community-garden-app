const express = require("express")
const { findUserByName, addUser, User } = require("../models/db")
const bcrypt = require("bcrypt")
const passport = require("passport")
const router = express.Router()

// ----------------------------------- SIGNUP -----------------------------------

router.post("/signup", async (req, res) => {
  // console.log("req: ", req)
  console.log("req.body.password: ", req.body.password)
  console.log("req.body.confirmPassword: ", req.body.confirmPassword)
  let username = req.body.username
  let email = req.body.email
  let hashedPassword = await bcrypt.hash(req.body.password, 10)
  let confirmPassword = req.body.confirmPassword
  let howLongGardening = req.body.howLongGardening
  let plantCheckbox = req.body.plantCheckbox[0]
  let postalCode = req.body.postalCode
  let gardenMembership = req.body.gardenMembership

  let newUser = new User({
    username: username,
    email: email,
    password: hashedPassword,
    howLongGardening: howLongGardening,
    currentPlants: plantCheckbox,
    postalCode: postalCode,
    gardenMembership: gardenMembership,
    dateSignedUp: new Date()
  })

  await addUser(newUser)
  console.log("New user has been added: ", newUser)
  res.send({}) // What do I need to return? (user record, id, etc.)
})


// ----------------------------------- LOGIN -----------------------------------


// router.post("/login", (req, res) => {
//   if (req.isAuthenticated()) {
//     console.log("***req.isAuthenticated!")
//   }
// })

router.post(
  "/login",
  // check if someone is already logged in
  (req, res, next) => {
    // if (req.user) {
    //   console.log("hi")
    // }
    // else 

    // move to authentication middleware if no one is logged in
    if (!req.isAuthenticated()) {
      console.log("about to log in")
      next()
    } 
    // if someone is already logged in, send back {isAlreadyLoggedIn: true}
    else {
      // res.cookie("user", 17)
      // console.log('Already logged in (line 18)')
      res.json({isAlreadyLoggedIn: true})
    }
  },
  // authentication middleware. sends a status code 401 if auth fails
  passport.authenticate("local"),
  // if authentication passes, the next function has access to req.user
  (req, res) => {
    res.json({username: req.user.username})
  }
  
  // if (req.isAuthenticated) {
  //   res.json({isUserLoggedIn: true})}
  )
  // console.log(req.user)






// ----------------------------------- LOGOUT -----------------------------------


router.get("/logout", function (req, res) {
  console.log("req authenticated: ", req.isAuthenticated())
  console.log('req.user: ', req.user)

  req.isAuthenticated() ? req.logOut() : console.log("already logged out")

  let message = req.isAuthenticated()
    ? `user ${req.user?.username} is logged in still :(`
    : `${req.user?.username} logged out!`

  console.log("message: ", message)
  res.json({isLoggedOut: true})
})

// ----------------------------------- GET USER -----------------------------------

// ------------------------------------ UPDATE USER---------------------------------

// Update a user by name
router.put('/edit/:id', async (req, res) => {
  let userToUpdate = req.body
  try {
    let data = await User.findByIdAndUpdate(req.params.id, userToUpdate);
    console.log("Updated User", data)
    res.redirect('/home');
  }
  catch(err) {
    console.log(err)
    if (err.code === 11000) {
      res.status(409).send('User ' + userToUpdate.name + ' already exists');      
    }
    else {
      res.sendStatus(500)
    }
  }
})


module.exports = router