const express = require('express')
const router = express.Router()

const { registerUser, loginUser } = require('../controllers/userController')
const middlewares = require('../middleware/index');
const validators = require('../validators/index');

router.post('/register', middlewares.validateRequest(validators.registerUser), registerUser)
router.post('/login', middlewares.validateRequest(validators.loginSchema), loginUser)

module.exports = router
