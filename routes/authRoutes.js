const express = require("express");
const {register, login, getProfile, updateProfile} = require('../controllers/authController');
const router = express.Router();
const {verifyToken} = require('../utils/jwt');


router.post("/register",register);
router.post("/login", login);
router.get("/profile", verifyToken,getProfile);
router.put("/profile", verifyToken,updateProfile);

module.exports = router;