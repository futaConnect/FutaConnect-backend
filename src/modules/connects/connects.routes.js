const express = require('express');
const { createRequest, listIncoming ,respond,markDone } = require('./connects.controller');
const verifyToken = require('../../middleware/verifyToken');

const router = express.Router();

router.post('/', verifyToken, createRequest);
router.get('/incoming', verifyToken, listIncoming);
router.patch('/:id/respond', verifyToken, respond);
router.patch('/:id/mark-done', verifyToken, markDone);

module.exports = router;