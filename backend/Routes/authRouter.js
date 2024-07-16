const express = require('express');
const router = express.Router();
const { signup, login } = require('../Controllers/authController');
const { signupValidation, loginValidation } = require('../Middlewares/authValidation');

router.post('/login', loginValidation, login);
router.post('/signup', signupValidation, signup);

module.exports = router;
