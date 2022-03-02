// const asyncHandler = require('express-async-handler');
const User = require('../models/userModel');
const { asyncHandler } = require('../middleware/asyncHandlerMiddleware')
const bcrypt = require('bcryptjs');
const { generateToken } = require('../helpers/generateWebToken');

exports.registerUser = asyncHandler(async (req, res) => {
  const { name, email, password } = req.body
  if (!name || !email || !password) {
    res.status(400)
    throw new Error('Please add all fields')
  }

  const userExist = await User.findOne({ email })

  if (userExist) {
    res.status(400)
    throw new Error('email is already exist')
  }

  // Hash password
  const salt = await bcrypt.genSalt(10)
  const hashedpassword = await bcrypt.hash(password, salt)

  // Create user
  const user = await User.create({ name, email, password: hashedpassword })

  if (user) {
    res.status(201).json({
      _id: user.id,
      name: user.name,
      email: user.email,
      token: generateToken(user._id)
    })
  } else {
    res.status(400)
    throw new Error('Invalid user')
  }
})

exports.loginUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body

  if (!email || !password) {
    res.status(400)
    throw new Error('Please add all fields')
  }

  const user = await User.findOne({ email })

  if (!user) {
    res.status(400)
    throw new Error('Invalid Credentials')
  }

  const comparePassword = await bcrypt.compare(password, user.password)

  // check for user email
  if (user && comparePassword) {
    res.json({
      _id: user.id,
      name: user.name,
      email: user.email,
      token: generateToken(user._id)
    })
  } else {
    res.status(400)
    throw new Error('Invalid Credentials')
  }
})

exports.getUser = asyncHandler(async (req, res) => {
  // const userExist = await User.findOne({ email })

  // if (!userExist) {
  //   res.status(400)
  //   throw new Error('email is not exist')
  // }
  res.json({ user: req.user })
})

