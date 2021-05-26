const express = require('express')
const {Garden, addGarden, findGardenByName, findGardenByAddress, listGardens} = require('../models/db')
let router = express.Router()


// add a garden
router.post('/add', async (req, res) => {
  let body = req.body
  
  console.log('req.body: ', body)

  let newGarden = new Garden({
    name: body.nameData,
    address: body.addressData,
    coordinates: body.coordinatesData,
    postalCode: body.postalCodeData,
    plotSize: body.plotSizeData,
    numberOfPlots: body.numberOfPlotsData,
    quadrant: body.quadrantData,
    coverPhoto: body.coverPhotoData,
    established: body.establishedData,
    members: {},
    vacancy: body.vacancyData, 
    website: body.websiteData,
    email: body.emailData,
    description: body.descriptionData,
    wheelchairAccessible: body.accessibilityData
  })  

  console.log('newGarden: ', newGarden)

  //await addGarden(newGarden)

  res.json({successMessage: 'Message received.'})
})


// get all gardens
router.get('/get/', async (req, res) => {
  let allGardensArray = await listGardens()

  res.json({gardenList: allGardensArray})
})

// get one garden by name
router.get('/get/:name', async (req, res) => {
  let gardenName = req.params.name
  let gardenResult = await findGardenByName(gardenName)
  
  res.json({garden: gardenResult})
})

// check if garden name is available
router.post('/check-is-name-free', async (req, res) => {
  let reqName = req.body.nameData
  let isNameFree = await checkIsNameFree(reqName)
  console.log('isNameFree: ', isNameFree)

  res.json({result: isNameFree})
})

// check is garden address is available
router.post('/check-is-address-free', async (req, res) => {
  let reqAddress = req.body.addressData
  let isAddressFree = await checkIsAddressFree(reqAddress)
  console.log('isAddressFree: ', isAddressFree)

  res.json({result: isAddressFree})
})



// functions
async function checkIsNameFree(desiredName) {
  let searchResult = await findGardenByName(desiredName)
  return searchResult?.name !== desiredName
}

async function checkIsAddressFree(desiredAddress) {
  let searchResult = await findGardenByAddress(desiredAddress)
  return !desiredAddress 
    ? true 
    : searchResult?.address !== desiredAddress 
}

module.exports = router
