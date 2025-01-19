const express = require('express');
const { authenticate } = require('../middlewares/authMiddleware.js');
const userController = require('../controller/userController.js');
const userRoutes = express.Router();

// User registration
userRoutes.post('/register', userController.register);

// User login
userRoutes.post('/login', userController.login);

// Get user profile (requires authentication)

userRoutes.get('/profile', authenticate, userController.me);

// Update user profile (requires authentication)

// Delete user account (requires authentication)
// userRoutes.delete('/profile', authenticate, deleteUser);

module.exports = userRoutes;
