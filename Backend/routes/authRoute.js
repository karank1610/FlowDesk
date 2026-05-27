const express = require('express');
const { register, login, getMe, logout } = require('../controllers/authController');
const { protectRoute } = require('../middleware/authMiddleware');

const router = express.Router();

router.post('/register', register);
router.post('/login', login);
router.get('/me', protectRoute, getMe);
router.post('/logout', protectRoute, logout);

module.exports = router;