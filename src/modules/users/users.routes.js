const express = require('express');
const { createMyConsumerProfile, createMyProviderProfile } = require('./users.controller');
const verifyToken = require('../../middleware/verifyToken');

const router = express.Router();

router.post('/me/consumer-profile', verifyToken, createMyConsumerProfile);
router.post('/me/provider-profile', verifyToken, createMyProviderProfile);

module.exports = router;