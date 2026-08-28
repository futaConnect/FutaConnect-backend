const express = require('express');
const { createMyConsumerProfile, createMyProviderProfile,getMe } = require('./users.controller');
const verifyToken = require('../../middleware/verifyToken');

const router = express.Router();

router.post('/me/consumer-profile', verifyToken, createMyConsumerProfile);
router.post('/me/provider-profile', verifyToken, createMyProviderProfile);
router.get('/me', verifyToken, getMe);

module.exports = router;