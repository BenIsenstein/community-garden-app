const express = require('express')
const {listGardens} = require('../models/db')
let router = express.Router()

router.get('/', async (req, res) => {
  let allGardensArray = await listGardens()

  res.json({gardenList: allGardensArray})
})


module.exports = router
