//db setup

const mongoose = require("mongoose");
const dotenv = require("dotenv").config();
const dbServer = "mongodb://localhost:27017";
const databaseName = "project-2-C6-local";
const dbUrl = dbServer + "/" + databaseName;
const mongoAtlasUrl = process.env.MONGODB_URL

// mongoose.connect(dbUrl, { useNewUrlParser: true, useUnifiedTopology: true });
mongoose
  .connect(mongoAtlasUrl, {
    useUnifiedTopology: true,
    useNewUrlParser: true,
  })
  .then(function () {
    console.log("Connected to DB...");
  })
  .catch(function (err) {
    console.log(err);
  });

const db = mongoose.connection;
db.on("error", (err) => console.error("MongoDB connection error!", err));
db.once("open", () => console.log("MongoDB is now connected! @ ", mongoAtlasUrl));

// Garden model and functions

const gardenSchema = new mongoose.Schema({
  name: String,
  address: String,
  coordinates: Object,
  quadrant: String,
  coverPhoto: {},
  surfaceArea: String,
  vacancy: Boolean,
});

// NOTE syntax to add methods: gardenSchema.methods.methodX = function () {}

const Garden = mongoose.model("Garden", gardenSchema);

const addGarden = async (newGarden) => {
  let result = await newGarden.save();
  return result.name + " succesfully added to database!";
};

const deleteGardenByName = async (name) => {
  let result = await Garden.deleteOne({ name: name });
  return result.name + " successfully deleted from database!";
};

const findGardenByName = async (name) => {
  let result = await Garden.findOne({ name: name });
  return result;
};

const findGardenByAddress = async (address) => {
  let result = await Garden.findOne({ address: address });
  return result;
};

const listGardens = async () => {
  let result = await Garden.find({});
  return result; //returns an array
};

// Account model and functions
const accountSchema = new mongoose.Schema({
  name: String,
  password: String,
  howLongGardening: String,
  currentPlants: Array,
  postalCode: String,
  memberOfGarden: Boolean,
  dateSignedUp: Date,
});

const Account = mongoose.model("Account", accountSchema);

const findAccountByName = async (name) => {
  let result = await Account.findOne({ name: name });
  return result;
};

const addAccount = async (newAccount) => {
  let result = await newAccount.save();
  return result.name + " succesfully added to database!";
};

// General db functions

const closeDb = async () => {
  let result = await db.close({ force: true });
  return result;
};

const searchByNameFragment = async (model, nameFragment) => {
  let matchNameFragment = new RegExp(`.*${nameFragment}.*`, "i");
  let list = await model.find({ name: matchNameFragment });
  return list;
};

module.exports = {
  closeDb,
  searchByNameFragment,
  Garden,
  Account,
  addGarden,
  listGardens,
  deleteGardenByName,
  findGardenByAddress,
  findGardenByName,
  findAccountByName,
  addAccount,
};
