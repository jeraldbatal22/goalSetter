const express = require('express');
const { getGoals, createGoal, updateGoal, deleteGoal, getGoal } = require('../controllers/goalController');
const router = express.Router();

router.get('/goals', getGoals)
router.get('/goals/:id', getGoal)
router.post('/goals', createGoal)
router.put('/goals/:id', updateGoal)
router.delete('/goals/:id', deleteGoal)

module.exports = router