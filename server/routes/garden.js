const express = require('express')
const {Garden, addGarden, findGardenByName, findGardenByAddress, listGardens} = require('../models/db')
let router = express.Router()


// add a garden
router.post('/add', async (req, res) => {
  let body = req.body
  body.members = {}
  body.messages = []
  
  console.log('req.body: ', body)

  let newGarden = new Garden(body)  

  console.log('newGarden: ', newGarden)

  await addGarden(newGarden)

  res.json({successMessage: 'Added!'})
})

// update garden by id
router.put('/edit/:id', async (req, res) => {
  let gardenToUpdate = req.body
  console.log('req body: ', gardenToUpdate)
  try {
    let data = await Garden.findByIdAndUpdate(req.params.id, gardenToUpdate, {new: true});
    console.log("Updated Garden", data)
    res.json({message: 'success!'})
  }
  catch(err) {
    console.log(err)
    if (err.code === 11000) {
      res.status(409).json({message: 'Garden ' + gardenToUpdate.name + ' already exists'});      
    }
    else {
      res.status(500).json({message: '500 error.'})
    }
  }
})

router.put('/messages/:id', async (req, res) => {
  let newMessage = req.body
  console.log('new message req.body: ', req.body)
  try {
    let gardenObject = await Garden.findById(req.params.id)
    console.log("gardenObject: ", gardenObject)
    gardenObject.messages.push(newMessage)
    await gardenObject.save()
    res.json({message: "gardenObject was saved"})
  }
  catch(err) {
    console.log(err)}
})


// get all gardens
router.get('/get', async (req, res) => {
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
  let reqId = req.body.idData
  let isNameFree = await checkIsNameFree(reqName, reqId)
  console.log('isNameFree: ', isNameFree)

  res.json({result: isNameFree})
})

// check if garden address is available
router.post('/check-is-address-free', async (req, res) => {
  let reqAddress = req.body.addressData
  let reqId = req.body.idData
  let isAddressFree = await checkIsAddressFree(reqAddress, reqId)
  console.log('isAddressFree: ', isAddressFree)

  res.json({result: isAddressFree})
})



// functions
async function checkIsNameFree(desiredName, reqId) {
  let searchResult = await findGardenByName(desiredName)
  return !reqId 
    ? searchResult?.name !== desiredName
    : (searchResult?.name !== desiredName) || (searchResult?._id.toString() === reqId)
}

async function checkIsAddressFree(desiredAddress, reqId) {
  let searchResult = await findGardenByAddress(desiredAddress)
  return !desiredAddress 
    ? true 
    : !reqId 
      ? searchResult?.address !== desiredAddress 
      : (searchResult?.address !== desiredAddress) || (searchResult?._id.toString() === reqId)
}

module.exports = router
