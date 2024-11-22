const mongoose = require('mongoose');

// Define the schema for the test model
const testSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true, // Make name a required field
    trim: true,     // Remove leading and trailing whitespaces
  },
  gender: {
    type: String,
    enum: ['Male', 'Female', 'Other'], // Restrict gender to specific values
    required: true, // Make gender a required field
  },
}, {
  timestamps: true, // Automatically add createdAt and updatedAt fields
});

// Create the model from the schema
const Test = mongoose.model('Test', testSchema);

module.exports = Test;
