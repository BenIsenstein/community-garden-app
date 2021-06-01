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

// log message history when someone post to message board
router.post('/messages/:id', async (req, res) => {
  let newMessage = req.body
  console.log('new message req.body: ', req.body)
  try {
    let gardenObject = await Garden.findById(req.params.id)
    console.log("gardenObject: ", gardenObject)

    if (!gardenObject.messages) {gardenObject.messages = []}
    gardenObject.messages.push(newMessage)
    console.log('Messages array after new message: ', gardenObject.messages)

    await gardenObject.save()
    res.json({message: "post saved!"})
  }
  catch(err) {
    console.log(err)}
})


// get all messages in a garden's history
router.get('/messages/:id', async (req, res) => {
  try {
    let gardenObject = await Garden.findById(req.params.id)
    console.log("garden message history: ", gardenObject.messages)

    res.json({messages: gardenObject.messages})
  }
  catch(err) {
    console.log(err)}
})

// get all gardens
router.get('/get', async (req, res) => {
  let allGardensArray = await listGardens()

  res.json({gardenList: allGardensArray})
})

// create task
router.post('/task/:id', async (req, res) => {
  let newTask = req.body
  console.log('new task req.body: ', req.body)

  try {
    let gardenObject = await Garden.findById(req.params.id)
    console.log("gardenObject: ", gardenObject?.name)

    if (!gardenObject.tasks) {gardenObject.tasks = []}
    gardenObject.tasks.push(newTask)
    console.log('Tasks array after new message: ', gardenObject.tasks)

    await gardenObject.save()
    res.json({successMessage: "task saved!"})
  }
  catch(err) {
    console.log(err)}
})

// get all tasks
router.get('/alltasks/:id', async (req, res) => {
  try {
    let gardenObject = await Garden.findById(req.params.id)
    console.log('getting all tasks. gardenObject: ', gardenObject)
    if (!gardenObject.tasks) {gardenObject.tasks = []} 
    res.json({allTasks: gardenObject.tasks}) 
  }
  catch(err) {
    console.log(`error getting all tasks for garden with _id ${req.params.id}: `, err)
  }
})

// edit/update a task
router.put('/editTask/:id', async (req, res) => {
  let taskToUpdate = req.body
  console.log('Task to update req body: ', taskToUpdate)
  try {
    let currentGarden = await Garden.findById(req.params.id);
    console.log("Current garden", currentGarden)
    currentGarden.tasks = currentGarden.tasks.map((task) => 
       (task.id === taskToUpdate.id) ? taskToUpdate : task
    )
    console.log("What is the currentGarden.tasks",currentGarden.tasks)
    await currentGarden.save()
    console.log("Task list after updating", currentGarden.tasks)
    res.json({successMessage: 'success!'})
  }
  catch(err) {
    console.log(err)
    if (err.code === 11000) {
      res.status(409).json({message: 'Task ' +taskToUpdate.name + ' already exists'});      
    }
    else {
      res.status(500).json({message: '500 error.'})
    }
  }
})

// delete task
router.delete('/deleteTask/:id', async (req, res)  => {
  let deletedTaskId = req.body.taskId
  console.log('req body taskId: ', deletedTaskId)
  try {
    let currentGarden = await Garden.findById(req.params.id);
    currentGarden.tasks = currentGarden.tasks.filter(task => task.id !== deletedTaskId)
    await currentGarden.save()
    res.json({successMessage: 'Delete was succesful!'})
      }
    catch(err) {
      console.log(err)
      if (err.code === 11000) {
        res.status(409).json({message: 'Task ' +taskToUpdate.name + ' already deleted'});      
      }
      else {
        res.status(500).json({message: '500 error.'})
      }
  }
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
