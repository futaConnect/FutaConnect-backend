const express = require('express');
const { listNiches, addMyNiche } = require('./niches.controller');
const verifyToken = require('../../middleware/verifyToken')

const router = express.Router();

router.get('/', listNiches);
router.post('/me', verifyToken, addMyNiche);

module.exports = router;