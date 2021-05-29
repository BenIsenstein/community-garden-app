const express = require("express")
const { findUserByName, addUser, User } = require("../models/db")
const bcrypt = require("bcrypt")
const passport = require("passport")
const router = express.Router()

// ----------------------------------- SIGNUP -----------------------------------

router.post("/signup", 
  async (req, res) => {
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
  }
)


// ----------------------------------- LOGIN -----------------------------------

router.post("/login",
  // check if someone is already logged in
  (req, res, next) => {
    // if someone is already logged in, send back {isAlreadyLoggedIn: true}
    if (req.isAuthenticated()) {
      res.json({isAlreadyLoggedIn: true})
    } 
    // move to authentication middleware if no one is logged in
    else {
      console.log("about to log in")
      next() 
    }
  },
  // authentication middleware. sends a status code 401 if auth fails
  passport.authenticate("local"),
  // if authentication passes, the next function has access to req.user
  (req, res) => {
    res.json({username: req.user.username})
  }
)
 



// ----------------------------------- LOGOUT -----------------------------------

router.get("/logout", 
  function (req, res) {
    let username = req.user?.username || 'nobody'
    let logoutResult = undefined
    let isLoggedOutNow = undefined

    console.log("is someone currently logged in? ", req.isAuthenticated())

    // logout if someone was logged in, log to console if nobody was logged in
    if (req.isAuthenticated()) {
      req.logOut() 
    }
    else {
      console.log("/user/logout was fetched, but no one was logged in")
    }

    // set the value of logoutResult to be logged
    if (req.isAuthenticated()) {
      logoutResult = `user ${username} is logged in still :(`
    }
    else {
      logoutResult = `${username} is logged out!`
    }  

    console.log("logout result: ", logoutResult)

    // send response with boolean of logout success
    isLoggedOutNow = !req.isAuthenticated()
    res.json({isLoggedOutNow})
  }
)

// ----------------------------------- GET USER -----------------------------------

// ------------------------------------ UPDATE USER---------------------------------

// Update a user by id
router.put('/edit/:id', 
  async (req, res) => {
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
  }
)

// -------------------- check if user name is available --------------------

router.post('/check-is-name-free', 
  async (req, res) => {
    let reqName = req.body.nameData
    let isNameFree = await checkIsNameFree(reqName)
    console.log('isNameFree: ', isNameFree)

    res.json({result: isNameFree})
  }
)




// --------------------------- functions -------------------------------------
async function checkIsNameFree(desiredName) {
  let searchResult = await findUserByName(desiredName)
  return searchResult?.username !== desiredName
  
}



module.exports = router