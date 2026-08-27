const express = require('express');
const { createMyConsumerProfile } = require('./users.controller');
const verifyToken = require('../../middleware/verifyToken');

const router = express.Router();

router.post('/me/consumer-profile', verifyToken, createMyConsumerProfile);

module.exports = router;