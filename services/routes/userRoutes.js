const express = require('express');
const { registerUser, loginUser, getUser } = require('../controllers/userController');
const router = express.Router();
const { protect } = require('../middleware/authMiddleware')

router.post('/users', registerUser)
router.post('/users/login', loginUser)
router.get('/users', protect, getUser)

module.exports = router