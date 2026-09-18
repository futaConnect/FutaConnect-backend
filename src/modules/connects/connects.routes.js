const express = require('express');
const { createRequest } = require('./connects.controller');
const verifyToken = require('../../middleware/verifyToken');

const router = express.Router();

router.post('/', verifyToken, createRequest);

module.exports = router;