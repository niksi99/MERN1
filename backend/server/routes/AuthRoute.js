const express = require('express');
const router = express.Router();

const AuthController = require('../controllers/AuthController');
const Auth = require('../middleware/Auth');

router.post('/signup', AuthController.signup);
router.post('/login', AuthController.login);
router.get('/logout', AuthController.logout);

router.get('/getMe', Auth.isAuthenticated, AuthController.getUserProfile)
router.get('/user/:id', AuthController.getAUser);

module.exports = router;