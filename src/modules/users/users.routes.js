const express = require('express');
const { createMyConsumerProfile, createMyProviderProfile,getMe ,updateMyConsumerProfile, updateMyProviderProfile} = require('./users.controller');
const verifyToken = require('../../middleware/verifyToken');

const router = express.Router();

router.post('/me/consumer-profile', verifyToken, createMyConsumerProfile);
router.post('/me/provider-profile', verifyToken, createMyProviderProfile);
router.get('/me', verifyToken, getMe);
router.patch('/me/consumer-profile', verifyToken, updateMyConsumerProfile);
router.patch('/me/provider-profile', verifyToken, updateMyProviderProfile);

module.exports = router;