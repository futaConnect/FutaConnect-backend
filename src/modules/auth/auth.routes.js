// src/modules/auth/auth.routes.js
const express = require('express');
const { register, login } = require('./auth.controller');
const verifyToken = require('../../middleware/verifyToken');

const router = express.Router();

router.post('/register', register);
router.post('/login', login);

// protected — proves verifyToken actually works
router.get('/me', verifyToken, (req, res) => {
  res.json({ user: req.user });
});

module.exports = router;