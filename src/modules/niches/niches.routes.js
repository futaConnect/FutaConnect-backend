const express = require('express');
const { listNiches, addMyNiche, removeMyNiche } = require('./niches.controller');
const verifyToken = require('../../middleware/verifyToken')

const router = express.Router();

router.get('/', listNiches);
router.post('/me', verifyToken, addMyNiche);
router.delete('/me/:id', verifyToken, removeMyNiche);

module.exports = router;