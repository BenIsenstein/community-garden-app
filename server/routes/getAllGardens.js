const express = require('express')
const {findGardenByName, listGardens} = require('../models/db')
let router = express.Router()

router.get('/', async (req, res) => {
  let allGardensArray = await listGardens()

  res.json({gardenList: allGardensArray})
})

router.get('/individual-garden', async (req, res) => {
  let gardenName = req.query.name
  console.log ("garden name is", gardenName)
  let gardenResult = await findGardenByName(gardenName)
  console.log ("garden result is", gardenResult)
  res.json({garden: gardenResult})
})

module.exports = router
