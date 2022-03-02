const { asyncHandler } = require('../middleware/asyncHandlerMiddleware')
const Goal = require('../models/goalModel')
const User = require('../models/userModel')

exports.getGoals = asyncHandler(async (req, res) => {
  const goals = await Goal.find({ user: req.user.id })
  res.json({ goals: goals })
})

exports.getGoal = asyncHandler(async (req, res) => {
  const goal = await Goal.findById(req.params.id)
  if (!goal) {
    res.status(400)
    throw new Error(`Cannot find ID: ${req.params.id}`)
  }
  res.json({ goal: goal })
})

exports.createGoal = asyncHandler(async (req, res) => {
  if (!req.body.text) {
    res.status(400)
    throw new Error('Please add a test field')
  }

  const goal = await Goal.create({
    text: req.body.text,
    user: req.user.id,
  })
  res.json({ message: 'post request', goal })
})

exports.updateGoal = asyncHandler(async (req, res) => {
  const goal = await Goal.findById(req.params.id)
  if (!goal) {
    res.status(400)
    throw new Error(`Cannot find ID: ${req.params.id}`)
  }

  // Check for user

  if (!goal.user) {
    res.status(401)
    throw new Error('No user found in this goal')
  }

  if (!req.user) {
    res.status(401)
    throw new Error('User not found')
  }

  // Make sure the logged in user matches the goal user
  if (goal.user.toString() !== req.user.id) {
    res.status(401)
    throw new Error('User not Authorized')
  }

  const updatedGoal = await Goal.findOneAndUpdate(req.params.id, req.body, {
    new: true
  })
  res.json(updatedGoal)
})

exports.deleteGoal = asyncHandler(async (req, res) => {
  const goal = await Goal.findById(req.params.id)
  console.log(goal)
  if (!goal) {
    res.status(400)
    throw new Error(`Cannot find ID: ${req.params.id}`)
  }


  // Check for user
  if (!req.user) {
    res.status(401)
    throw new Error('User not found')
  }

  // Make sure the logged in user matches the goal user

  // if (!goal.user) {
  //   res.status(401)
  //   throw new Error('No user found in this goal')
  // }

  if (goal.user.toString() !== req.user.id) {
    res.status(401)
    throw new Error('User not Authorized')
  }


  await goal.remove()

  res.json({ id: req.params.id })
})
