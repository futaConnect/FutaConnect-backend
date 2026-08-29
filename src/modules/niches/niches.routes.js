const express = require('express');
const { listNiches } = require('./niches.controller');

const router = express.Router();

router.get('/', listNiches);

module.exports = router;