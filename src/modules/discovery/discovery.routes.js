const express = require('express');
const { listProviders } = require('./discovery.controller');

const router = express.Router();

router.get('/', listProviders);

module.exports = router;