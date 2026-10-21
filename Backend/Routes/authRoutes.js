const express = require('express');
const registerUser = require('../Controller/RegisterController');
const loginUser = require('../Controller/LoginController');

const router = express.Router();

router.post('/register',registerUser);
router.post('/login',loginUser);

module.exports = router;