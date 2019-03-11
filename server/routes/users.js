const users = require('../controllers/users')
const express = require('express')
const asyncRouter = require('macropress-router')
const router = new asyncRouter()
const authenticate = require('../middleware/auth')


router.post('/',users.registerUser)
router.get('/me',authenticate,users.loginUser)
router.delete('/me/logout',authenticate,users.logoutUser)

module.exports = router