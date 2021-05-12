// checks for duplicated username and validates password

const express = require("express");

const {
  createAccount,
  findAccountByName,
} = require("../model/database/accounts");

let router = express.Router();

// requirements for valid signup:
// username is available
// password has some level of safety
router.post("/signup", async (req, res) => {
  let reqUsername = req.body.username;
  let password = req.body.password;
  let isPassSafe = validatePass(password);
  let isNameFree = await validateName(reqUsername);

  if (isPassSafe && isNameFree) {
    let newGame = {
      player,
      allRooms,
    };

    await createAccount(reqUsername, password, newGame);
    //let newAccountId = await createAccount(reqUsername, password, newGame)
    //console.log('newAccountId: ', newAccountId)

    res.json({ successMessage: "Success! Main menu or play now?" });
  } else {
    let errorObject = {};

    if (!isPassSafe) errorObject.passwordError = "Password not strong enough!";

    if (!isNameFree) errorObject.usernameError = "Username taken!";

    res.status(400).json(errorObject);
  }
});

module.exports = router;
