const express = require("express");
const router = express.Router();
const { findAccountByName, addAccount } = require("../models/db");

router.get("/loggedon", (req, res) => {
  res.send("TEST???");
});

router.post("/", (req, res) => {
  console.log("req: ", req);
  console.log("req.body.password: ", req.body.password);
  console.log("req.body.confirmPassword: ", req.body.confirmPassword);
  let username = req.body.username;
  let password = req.body.password;
  let confirmPassword = req.body.confirmPassword;
  let isPassSafe = validatePass(password);
  // let isNameFree = await validateName(reqUsername);
  // if (
  //   username != "" &&
  //   isPassSafe &&
  //   isNameFree &&
  //   password != confirmPassword
  // )
  // if (req.body.username === "") {
  //   res.json({
  //     success: false,
  //     message: "Username is required",
  //   });
  // } else if (req.body.password.length < 5) {
  //   res.json({
  //     success: false,
  //     message: "Bad password",
  //   });
  // } else if (req.body.password != req.body.confirmPassword) {
  //   res.json({
  //     success: false,
  //     message: "Passwords must match",
  //   });
  // } else {
  //   res.json({
  //     success: true,
  //   });
  // }

  async function validateName(username) {
    let accountExists = await findAccountByName(username);
    return !accountExists;
  }

  function validatePass(password) {
    return (
      /.{6,}$/.test(password) &&
      /[A-Z]+/.test(password) &&
      /[a-z]+/.test(password) &&
      /[0-9]+/.test(password)
    );
  }
});

module.exports = router;
