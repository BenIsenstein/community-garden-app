//db setup

const mongoose = require('mongoose');
const dotenv = require('dotenv').config();

mongoose.connect(
  process.env.MONGODB_URL,
  { useUnifiedTopology: true, useNewUrlParser: true },
  )
  .then(function(){
    console.log('Connected to DB...')
  })
  .catch(function(err){
    console.log(err)
  })


// Garden model and functions

const gardenSchema = new mongoose.Schema({
  name: String,
  address: String,
  quadrant: String,
  coverPhoto: String,
  surfaceArea: String,
  vacancy: Boolean
})

// NOTE syntax to add methods: gardenSchema.methods.methodX = function () {} 

const Garden = mongoose.model('Garden', gardenSchema)

const addGarden = async (newGarden) => {
  let result = await newGarden.save()
  return result.name + ' succesfully added to database!'
}

const deleteGardenByName = async (name) => {
  let result = await Garden.deleteOne({name: name})
  return result.name + ' successfully deleted from database!'
}

const findGardenByName = async (name) => {
  let result = await Garden.findOne({name: name})
  return result
}

const findGardenByAddress = async (address) => {
  let result = await Garden.findOne({address: address})
  return result
}

const listGardens = async () => {
  let result = await Garden.find({})
  return result //returns an array
}

// Account model and functions


// General db functions

const closeDb = async () => {
  let result = await db.close({force: true})
  return result
}

const searchByNameFragment = async (model, nameFragment) => {   
  let matchNameFragment = new RegExp(`.*${nameFragment}.*`, 'i')
  let list = await model.find({name: matchNameFragment})
  return list
}

module.exports = {
  closeDb,
  searchByNameFragment,
  Garden,
  addGarden,
  listGardens,
  deleteGardenByName,
  findGardenByAddress,
  findGardenByName
}
