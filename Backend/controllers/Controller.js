const User = require("../utils/db_models/User");

const home = async (req, res) => {
  try {
    res.status(200).json({ msg: "Welcome to our home page" });
  } catch (error) {
    console.log(error);
  }
};

const { body, validationResult } = require('express-validator');

const register = [
  body('username').notEmpty().withMessage('Username is required'),
  body('email').isEmail().withMessage('Must be a valid email address'),
  body('phone').notEmpty().withMessage('Phone number is required'),
  body('password').isLength({ min: 5 }).withMessage('Password must be at least 5 characters long'),
  async (req, res) => {
     const errors = validationResult(req);

     if (!errors.isEmpty()) {
      console.log(req);

       return res.status(400).json({ errors: errors.array() });
     }
 
     try {
      console.log("oyyyyyy");

       const { username, email, phone, password } = req.body;
       const userExist = await User.findOne({ email: email });
       if (userExist) {
         return res.status(400).json({ msg: "this user already exist" });
       }
       const createduser = await User.create({ username, email, phone, password });
       console.log(createduser);
 
       res.status(201).json({
         msg: "Ja Ho gya tu register lomde",
         token: await createduser.generateToken(),
         userId: createduser._id.toString(),
       });
     } catch (error) {
       console.error(error);
       res.status(500).json({ msg: "Internal server error." });
     }
  }
 ];

 const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Check if the user exists and verify password
    const userExist = await User.findOne({ email: email });

    if (!userExist) {
      return res.status(401).json({ msg: "Invalid credentials" });
    }

    const isPassValid = await userExist.comparePassword(password);

    if (!isPassValid) {
      return res.status(401).json({ msg: "Invalid login password" });
    }

    // Generate token
    const token = await userExist.generateToken();

    // Send token and user information in response
    res.status(200).json({
      token: token,
      user: {
        username: userExist.username,
        email: userExist.email,
        phone: userExist.phone,
      },
    });
    console.log(userExist)
  } catch (error) {
    console.error("Login Error:", error);
    res.status(500).json({ msg: "Internal Server Error" });
  }
};


module.exports = { home, register, login };