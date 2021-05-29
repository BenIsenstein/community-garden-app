const express = require('express')
const { toDoData, addtoDoData, deletetoDoData}  = require('../models/db')
let router = express.Router()


//Get a task


// add a task

router.get('/garden-page', async (req, res) => {
    //let optionName = req.params.optionName
    try {
        let time = await timeline.findTimeByName(optionName)
        res.send(time)
    }
    catch (error) {
        console.log(error)
        res.status(404).send(`Time period ${optionName} not found.`)
    }
})

// delete a task


module.exports = router