const express = require('express');
const router = express.Router();
// const userauthentication = require('../middleware/auth');
const jwt = require('jsonwebtoken');

const User = require('../models/users');
const userController = require('../controllers/user');

router.post('/signup', userController.signup);
router.post('/login',userController.login);


module.exports = router;
