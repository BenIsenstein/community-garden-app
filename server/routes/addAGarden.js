const express = require('express')
const {Garden, addGarden, findGardenByName, findGardenByAddress} = require('../models/db')
let router = express.Router()

router.post('/', async (req, res) => {
  console.log('add a garden was POSTed to!')
  let reqName = req.body.nameData
  let reqAddress = req.body.addressData
  let reqQuadrant = req.body.quadrantData
  let reqCoverPhoto = req.body.coverPhotoData
  let reqSurfaceArea = req.body.surfaceAreaData
  let reqVacancy = req.body.vacancyData

  let isAddressFree = await validateAddress(reqAddress)
  let isNameFree = await validateName(reqName)


  if (isAddressFree && isNameFree) {
    let newGarden = new Garden({
      name: reqName,
      address: reqAddress,
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

  async function validateAddress(gardenAddress) {
    let addressExists = await findGardenByAddress(gardenAddress)
    return !addressExists 
  }

  async function validateName(gardenName) {
      let gardenExists = await findGardenByName(gardenName)
      return !gardenExists
  }
})




module.exports = router
