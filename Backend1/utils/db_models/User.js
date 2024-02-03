const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    require: true,
  },
  email: {
    type: String,
    require: true,
  },
  password: {
    type: String,
    require: true,
  },
  phone: {
    type: String,
    require: true,
  },
  kalakaari: {
    type: String,
    require: true,
  },
  isAdmin: {
    type: Boolean,
    require: false,
  },
});

userSchema.pre("save", async function () {
  const user = this;
  console.log("pre", this);
  try {
    const saltRound = await bcrypt.genSalt(10);
    const hashedPass = await bcrypt.hash(user.password, saltRound);
    user.password = hashedPass;
  } catch (error) {
    console.log(error);
  }
});

userSchema.methods.generateToken = async function () {
  console.log("Ab Token batane wale h");
  try {
    return jwt.sign(
      {
        userId: this._id.toString(),
        email: this.email,
        isAdmin: this.isAdmin,
      },
      "Dhruvekgamduaadmih",
      {
        expiresIn: "1d",
      }
    );
  } catch (error) {
    console.log(error);
  }
};

userSchema.methods.comparePassword = async function (password) {
  return bcrypt.compare(password, this.password);
};
const User = new mongoose.model("trying", userSchema);
module.exports = User;