const express = require('express')
const {Garden, addGarden, findGardenByName, findGardenByAddress} = require('../models/db')
let router = express.Router()

router.post('/', async (req, res) => {
  let reqName = req.body.nameData
  let reqAddress = req.body.addressData
  let reqCoordinates = req.body.coordinatesData
  let reqQuadrant = req.body.quadrantData
  let reqCoverPhoto = req.body.coverPhotoData
  let reqSurfaceArea = req.body.surfaceAreaData
  let reqVacancy = req.body.vacancyData

  let isAddressFree = await checkIsAddressFree(reqAddress)
  let isNameFree = await checkIsNameFree(reqName)

  if (isAddressFree && isNameFree) {
    let newGarden = new Garden({
      name: reqName,
      address: reqAddress,
      coordinates: reqCoordinates,
      quadrant: reqQuadrant,
      coverPhoto: reqCoverPhoto,
      surfaceArea: reqSurfaceArea,
      vacancy: reqVacancy 
    }) 

    await addGarden(newGarden)

    res.json({successMessage: 'Success! Your garden has been added.'})
  } 
  else {
    let errorObject = {}

    if (!isAddressFree) 
      errorObject.addressError = 'Address taken!'

    if (!isNameFree)
      errorObject.usernameError = 'Garden name taken!'

    res.status(400).json(errorObject)
  }

  async function checkIsAddressFree(gardenAddress) {
    let addressExists = await findGardenByAddress(gardenAddress)
    return !gardenAddress ? true : !addressExists 
  }

  async function checkIsNameFree(gardenName) {
    let gardenExists = await findGardenByName(gardenName)
    return !gardenExists
  }
})


router.post('/check-is-name-free', async (req, res) => {
  let reqName = req.body.nameData
  let isNameFree = await checkIsNameFree(reqName)

  res.json({result: isNameFree})


  async function checkIsNameFree(gardenName) {
    let gardenExists = await findGardenByName(gardenName)
    return !gardenExists
  }
})


router.post('/check-is-address-free', async (req, res) => {
  let reqAddress = req.body.addressData
  let isAddressFree = await checkIsAddressFree(reqAddress)

  res.json({result: isAddressFree})


  async function checkIsAddressFree(gardenAddress) {
    let gardenExists = await findGardenByAddress(gardenAddress)
    return !gardenAddress ? true : !addressExists 
  }
})



module.exports = router
