const express = require('express')
const {listGardens} = require('../models/db')
let router = express.Router()

router.get('/', async (req, res) => {
  console.log('get all gardens GET has come in')
  let allGardensArray = await listGardens()

  res.json({gardenList: allGardensArray})
})


module.exports = router
