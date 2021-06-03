const express = require('express')
const {Garden, addGarden, findGardenByName, findGardenByAddress, listGardens} = require('../models/db')
let router = express.Router()


// add a garden  
router.post('/add', async (req, res) => {
  try {
    let body = req.body

    body.members = {}
    body.messages = [] 

    await addGarden(new Garden(body))
    res.json({successMessage: 'Added!'})
  }
  catch(err) {
    console.log("Error adding a garden:", err)
  }
})

// update garden by id
router.put('/edit/:id', async (req, res) => {
  let gardenToUpdate = req.body
  
  try {
    await Garden.findByIdAndUpdate(req.params.id, gardenToUpdate, {new: true});
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
  try {
    let gardenObject = await Garden.findById(req.params.id)

    if (!gardenObject.messages) {gardenObject.messages = []}

    gardenObject.messages.push(req.body)

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
    res.json({messages: gardenObject.messages})
  }
  catch(err) {
    console.log(err)
  }
})

// get all gardens 
router.get('/get', async (req, res) => {
  try { res.json({ gardenList: await listGardens() }) }
  
  catch(err) {console.log('error getting all gardens:', err)}
})

// create task
router.post('/task/:id', async (req, res) => {
  let newTask = req.body

  try {
    let gardenObject = await Garden.findById(req.params.id)

    if (!gardenObject.tasks) {gardenObject.tasks = []}

    gardenObject.tasks.push(newTask)

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
    
    if (!gardenObject.tasks) {gardenObject.tasks = []} 

    res.json({allTasks: gardenObject.tasks}) 
  }
  catch(err) {
    console.log(`error getting all tasks for garden with _id ${req.params.id}: `, err)
  }
})

// edit a task
router.put('/editTask/:id', async (req, res) => {
  let taskToEdit = req.body
  
  try {
    let currentGarden = await Garden.findById(req.params.id)

    currentGarden.tasks = currentGarden.tasks.map((task) => 
      (task.id === taskToEdit.id) ? taskToEdit : task
    )
    
    await currentGarden.save()
    res.json({successMessage: 'success!'})
  }
  catch(err) {
    console.log(err)
    if (err.code === 11000) {
      res.status(409).json({message: 'Task ' + taskToEdit.name + ' already exists'});      
    }
    else {
      res.status(500).json({message: '500 error.'})
    }
  }
})

// delete task
router.delete('/deleteTask/:id', async (req, res)  => {
  try {
    let currentGarden = await Garden.findById(req.params.id)

    currentGarden.tasks = currentGarden.tasks.filter(task => task.id !== req.body.taskId)

    await currentGarden.save()
    res.json({successMessage: 'Delete was succesful!'})
  }
  catch(err) {
    console.log(err)

    if (err.code === 11000) {
      res.status(409).json({message: 'Task ' + taskToUpdate.name + ' already deleted'});      
    }
    else {
      res.status(500).json({message: '500 error.'})
    }
  }
})

 
// get one garden by name
router.get('/get/:name', async (req, res) => {
  try { res.json({ garden: await findGardenByName(req.params.name) }) }

  catch(err) {console.log('ERROR get garden by name:', err)}
})

// check if garden name is available
router.post('/check-is-name-free', async (req, res) => {
  let reqName = req.body.nameData
  let reqId = req.body.idData

  try {
    let isNameFree = await checkIsNameFree(reqName, reqId)
    res.json({result: isNameFree})
  }
  catch(err) {
    console.log("error check-is-name-free router", err)
  }
})

// check if garden address is available
router.post('/check-is-address-free', async (req, res) => {
  let reqAddress = req.body.addressData
  let reqId = req.body.idData

  try {
    let isAddressFree = await checkIsAddressFree(reqAddress, reqId)
    res.json({result: isAddressFree})
  }
  catch(err) {
    console.log("error check-is-address-free router", err)
  }
})



// functions
async function checkIsNameFree(desiredName, reqId) {
  try {
    let searchResult = await findGardenByName(desiredName)
    
    return !reqId 
      ? searchResult?.name !== desiredName
      : (searchResult?.name !== desiredName) || (searchResult?._id.toString() === reqId)
  }
  catch(err) {
    console.log("error checkIsNameFree function:", err)
  }
}

async function checkIsAddressFree(desiredAddress, reqId) {
  try {
    let searchResult = await findGardenByAddress(desiredAddress)

    return !desiredAddress 
      ? true 
      : !reqId 
        ? searchResult?.address !== desiredAddress 
        : (searchResult?.address !== desiredAddress) || (searchResult?._id.toString() === reqId)
  }  
  catch(err) {
    console.log("error checkIsAddressFree function:", err)
  }
}

module.exports = router
