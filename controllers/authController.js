const User = require("../models/user");
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { generateToken, getIdFromToken } = require('../utils/jwt')
const ResponseHandler = require('../utils/responseHandler');

/// registration api

exports.register = async (req, res) => {
    const { username, email, password } = req.body;
    try {
        let user = await User.findOne({ email });
        if (user) return ResponseHandler.badRequest(res, "User already exists")

        user = new User({ username, email, password: await bcrypt.hash(password, 10) });
        await user.save();

        const token = generateToken(user._id);
        return ResponseHandler.created(res, { token }, "User created successfully");

    }
    catch (e) {
        if (e.name === 'ValidationError') return ResponseHandler.badRequest(res,'${e.message');
        console.error(`register error ${e}`)
        return ResponseHandler.serverError(res, e);
    }
};

exports.login = async (req, res) => {
    const { email, password } = req.body;
    console.log(email,password);
    try {
        let user = await User.findOne({ email });
        if (!user) return ResponseHandler.badRequest(res, "Invalid credentials");
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) return ResponseHandler.badRequest(res, "Invalid credentials");
        const token = generateToken(user._id);
        return ResponseHandler.success(res, { token }, "Login successful");
    }
    catch (e) {
        if (e.name === 'ValidationError') return ResponseHandler.badRequest(res,'${e.message');
        return ResponseHandler.serverError(res, e);
    }
}

exports.getProfile = async (req, res) => {
    try {
        const userId = getIdFromToken(req);
        console.log(userId);
        let user = await User.findById(userId).select('-password');
        if (!user) return ResponseHandler.notFound(res, "User not found");
        return ResponseHandler.success(res, user, "User fetched successfully");
    }
    catch (e) {
        if (e.name === 'ValidationError') return ResponseHandler.badRequest(res,'${e.message');
        return ResponseHandler.serverError(res, e);
    }
}

exports.updateProfile = async (req, res) => {
    try {
        const { username, email, avatar, status } = req.body;
        const userId = getIdFromToken(req);
        console.log("body",req.body);
        const updateUser = await User.findByIdAndUpdate(userId, { username, email, avatar, status }, { new: true,runValidators:true }).select('-password');
        console.log("updated user",updateUser);
        if (!updateUser) return ResponseHandler.notFound(res, "User not found");
        return ResponseHandler.success(res, updateUser, "User updated successully");
    }
    catch (e) {
        if (e.name === 'ValidationError') return ResponseHandler.badRequest(res,'${e.message');
        return ResponseHandler.serverError(res, e);
    }
}