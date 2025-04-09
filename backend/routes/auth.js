const express = require('express');
const { register, login, getMe } = require('../controllers/authController');
const { protect } = require('../middleware/auth');
const { uploadOfferLetter } = require('../controllers/fileController');

const router = express.Router();
router.post('/upload/offerLetter', protect, uploadOfferLetter);


// Public routes
router.post('/register', register);
router.post('/login', login);

// Protected routes
router.get('/me', protect, getMe);

module.exports = router;