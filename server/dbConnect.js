const mongoose = require("mongoose");
require('dotenv').config("./.env");

module.exports = async () => {
  try {
    await mongoose.connect("mongodb+srv://NeerDB:L78UlXlTFLutVPHf@neercluster.fyi9egt.mongodb.net/practice",{
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log("Connected to DB!");
  } catch (error) {
    console.log(error);
    process.exit(1);
  }
};