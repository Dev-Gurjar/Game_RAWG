const mongoose = require("mongoose");

const URI = process.env.MONGO_URI

const ConnectDB = async () => {
  try {
    await mongoose.connect(URI);
    console.log("connection to db is success");
  } catch (error) {
    console.log("Connection to db is Unsuccessful");
    console.log(URI);

    process.exit(0);
  }
};

module.exports = ConnectDB;
