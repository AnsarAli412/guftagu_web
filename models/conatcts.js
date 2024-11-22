// models/Contact.js
const mongoose = require('mongoose');

const ContactSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    contact: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    status: {
        type: String,
        enum: ['online', 'offline'],
        default: 'offline'
    },
}, { timestamps: true });

module.exports = mongoose.model('Contact', ContactSchema);
