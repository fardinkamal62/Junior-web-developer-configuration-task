const User = require('../models/user')
const jwt = require('jsonwebtoken')

const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET)
}

const registerUser = async (req, res, next) => {
  try {
    const { name, email, password } = req.body;

    const userExists = await User.findOne({ email })

    if (userExists) {
      res.status(409)
      throw new Error('Email already taken')
    }

    const user = await new User({ name, email, password })

    try {
      await user.save();
      res.status(201).json({
        message: "Account created successfully"
      })
    } catch(e) {
      console.error(e);
      res.status(500);
      throw new Error("Cannot register user");
    }
  } catch (error) {
    console.error(error);
    next(error)
  }
}

const loginUser = async (req, res, next) => {
  try {
    const { email, password } = req.body

    const user = await User.findOne({ email })
    
    if (user && (await user.matchPassword(password))) {
      res.status(200).json({
        token: generateToken(user._id),
      })
    } else {
      res.status(403)
      throw new Error('Wrong email or password')
    }
  } catch (error) {
    console.error(error);
    next(error)
  }
}

module.exports = { registerUser, loginUser }