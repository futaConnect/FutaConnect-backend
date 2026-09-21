const express = require('express');
const { createRequest, listIncoming ,respond } = require('./connects.controller');
const verifyToken = require('../../middleware/verifyToken');

const router = express.Router();

router.post('/', verifyToken, createRequest);
router.get('/incoming', verifyToken, listIncoming);
router.patch('/:id/respond', verifyToken, respond);

module.exports = router;