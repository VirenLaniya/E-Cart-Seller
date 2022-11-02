const express = require('express');
const router = express.Router();

// Importing controllers
const authControllers = require('../controllers/authentication.js');

router.get('/signup', authControllers.getSignup);

router.post('/signup', authControllers.postSignup);

router.get('/login', authControllers.getLogin);

router.post('/login', authControllers.postLogin);


module.exports = router;