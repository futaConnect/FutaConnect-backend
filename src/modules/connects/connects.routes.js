const express = require('express');
const { createRequest, listIncoming  } = require('./connects.controller');
const verifyToken = require('../../middleware/verifyToken');

const router = express.Router();

router.post('/', verifyToken, createRequest);
router.get('/incoming', verifyToken, listIncoming);

module.exports = router;