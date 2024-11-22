const express = require("express");
const router = express.Router();
const {verifyToken} = require('../utils/jwt');
const {getContacts, addContact, removeContact} = require('../controllers/contactController')

router.get('/',verifyToken,getContacts);
router.post('/add',verifyToken,addContact);
router.delete('/remove',verifyToken,removeContact);

module.exports = router;