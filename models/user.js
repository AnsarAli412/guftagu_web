// // models/User.js
// const mongoose = require('mongoose');

// const UserSchema = new mongoose.Schema({
//   username: {
//     type: String,
//     required: true
//   },
//   email: {
//     type: String,
//     required: true,
//     unique: true,
//   },
//   password: {
//     type: String,
//     required: true,
//   },
//   avatar: {
//     type: String,
//     default:""
//   },
//   status: {
//     type: String,
//     default: "Hey there! I'm using ChatApp!",
//   },
// }, { timestamps: true });

// module.exports = mongoose.model('User', UserSchema);


// models/User.js
const mongoose = require('mongoose');

// User Schema Definition
const UserSchema = new mongoose.Schema({
    username: {
        type: String,
        required: [true, 'Username is required'],
        trim: true, // Remove whitespace from both ends
        minlength: [3, 'Username must be at least 3 characters long'],
        maxlength: [30, 'Username must not exceed 30 characters']
    },
    email: {
        type: String,
        required: [true, 'Email is required'],
        unique: true,
        lowercase: true, // Convert email to lowercase
        validate: {
            validator: function(value) {
                // Simple regex for validating email format
                return /^\S+@\S+\.\S+$/.test(value);
            },
            message: 'Email is not valid!'
        }
    },
    password: {
        type: String,
        required: [true, 'Password is required'],
        minlength: [6, 'Password must be at least 6 characters long'],
    },
    avatar: {
        type: String,
        default: ""
    },
    status: {
        type: String,
        default: "Hey there! I'm using ChatApp!",
        maxlength: [100, 'Status must not exceed 100 characters']
    },
}, { timestamps: true });

// Export the User model
module.exports = mongoose.model('User', UserSchema);
