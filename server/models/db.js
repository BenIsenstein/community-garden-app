//db setup

require("dotenv").config()
const mongoose = require("mongoose")
const mongoAtlasUrl = process.env.MONGODB_URL


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
  }
)

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
  vacancy: Boolean,
  postalCode: String,
  plotSize: String,
  established: Number,
  fee: String,
  numberOfPlots: Number,
  members: {},
  website: String,
  email: String,
  description: String,
  wheelchairAccessible: Boolean,
  messages: [{
    name: String,
    content: String,
    date: String
  }],
  tasks: [{
    id: String,
    name: String,
    completed: Boolean
  }]
})

// NOTE syntax to add methods: gardenSchema.methods.methodX = function () {}

const Garden = mongoose.model("Garden", gardenSchema)

const listGardens = async () => await Garden.find({})

const addGarden = async (newGarden) => await newGarden.save()

const deleteGardenByName = async (name) => await Garden.deleteOne({ name: name })

const findGardenByAddress = async (address) => await Garden.findOne({ address: address })

const findGardenByName = async (name) => await Garden.findOne({ name: new RegExp(`${name}`, "i") })

// User model and functions
const userSchema = new mongoose.Schema({
  username: { type: String, unique: true }, 
  password: String,
  email: String,
  howLongGardening: String,
  currentPlants: Array,
  postalCode: String,
  gardenMembership: String,
  dateSignedUp: Date
}, 
{
  usePushEach: true
})

userSchema.methods.validPassword = function (pwd) {
  return this.password === pwd
}

const User = mongoose.model("User", userSchema)

const findUserByName = async (name) => {
  let result = await User.findOne({ username: name })
  return result
}

const findUserById = async (id) => {
  let result = await User.findOne({ _id: id })
  return result
}

const addUser = async (newUser) => {
  let result = await newUser.save()
  return result.username + " succesfully added to database!"
}


// General db functions

const closeDb = async () => await db.close({ force: true })

const searchByFragment = async (model, attribute, fragment) => await model.find({ [attribute]: new RegExp(`.*${fragment}.*`, "i") })

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
  findUserById,
  addUser
}
