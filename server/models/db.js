//db setup

const mongoose = require("mongoose")
const dotenv = require("dotenv").config()
const dbServer = "mongodb://localhost:27017"
const databaseName = "project-2-C6-local"
const dbUrl = dbServer + "/" + databaseName
const mongoAtlasUrl = process.env.MONGODB_URL

// mongoose.connect(dbUrl, { useNewUrlParser: true, useUnifiedTopology: true });
mongoose
  .connect(mongoAtlasUrl, {
    useUnifiedTopology: true,
    useNewUrlParser: true
  })
  .then(function () {
    console.log("Connected to DB...")
  })
  .catch(function (err) {
    console.log(err)
  })

const db = mongoose.connection
db.on("error", (err) => console.error("MongoDB connection error!", err))
db.once("open", () => console.log("MongoDB is now connected! @ ", mongoAtlasUrl))

// Garden model and functions

const gardenSchema = new mongoose.Schema({
  name: String,
  address: String,
  coordinates: Object,
  quadrant: String,
  coverPhoto: {},
  surfaceArea: String,
  vacancy: Boolean
})

// NOTE syntax to add methods: gardenSchema.methods.methodX = function () {}

const Garden = mongoose.model("Garden", gardenSchema)

const addGarden = async (newGarden) => {
  let result = await newGarden.save()
  return result.name + " succesfully added to database!"
}

const deleteGardenByName = async (name) => {
  let result = await Garden.deleteOne({ name: name })
  return result.name + " successfully deleted from database!"
}

const findGardenByName = async (name) => {
  let caseInsensitiveName = new RegExp(`${name}`, "i")
  let result = await Garden.findOne({ name: caseInsensitiveName })
  return result
}

const findGardenByAddress = async (address) => {
  let result = await Garden.findOne({ address: address })
  return result
}

const listGardens = async () => {
  let result = await Garden.find({})
  return result //returns an array
}

// User model and functions
const userSchema = new mongoose.Schema({
  username: String,
  password: String,
  howLongGardening: String,
  currentPlants: Array,
  postalCode: String,
  memberOfGarden: Boolean,
  dateSignedUp: Date
})

userSchema.methods.validPassword = function (pwd) {
  return this.password === pwd
}

const User = mongoose.model("User", userSchema)

const findUserByName = async (name) => {
  let result = await User.findOne({ username: name })
  return result
}

const addUser = async (newUser) => {
  let result = await newUser.save()
  return result.username + " succesfully added to database!"
}

// General db functions

const closeDb = async () => {
  let result = await db.close({ force: true })
  return result
}

const searchByFragment = async (model, fragment, attribute) => {
  let matchFragment = new RegExp(`.*${fragment}.*`, "i")
  let list = await model.find({ [attribute]: matchFragment })
  return list
}

module.exports = {
  closeDb,
  searchByFragment,
  Garden,
  User,
  addGarden,
  listGardens,
  deleteGardenByName,
  findGardenByAddress,
  findGardenByName,
  findUserByName,
  addUser
}
