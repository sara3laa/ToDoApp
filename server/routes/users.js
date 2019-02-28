const users = require('../controllers/users')
const express = require('express')
const router = express.Router()
const authenticate = require('../middleware/auth')


router.post('/users',authenticate,users.registerUser)
router.get('/users/me',authenticate,users.loginUser)
router.delete('/users/me/logout',authenticate,users.logoutUser)

module.exports = router