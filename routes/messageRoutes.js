const express = require('express');
const router = express.Router();
const {sendMessage, getMessage} = require('../controllers/messageController');
const {verifyToken} = require('../utils/jwt')

router.post('/send',verifyToken,sendMessage);
router.get('/:id',verifyToken,getMessage);

module.exports = router;