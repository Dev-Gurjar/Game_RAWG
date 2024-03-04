const mongoose = require("mongoose");

const URI = "mongodb+srv://crazy:crazy@cluster0.en91e2y.mongodb.net/Trying?retryWrites=true&w=majority"

const ConnectDB = async () => {
  try {
    await mongoose.connect("mongodb+srv://crazy:crazy@cluster0.en91e2y.mongodb.net/Trying?retryWrites=true&w=majority");
    console.log("connection to db is success");
  } catch (error) {
    console.log("Connection to db is Unsuccessful");
    console.log(URI);

    process.exit(0);
  }
};

module.exports = ConnectDB;
