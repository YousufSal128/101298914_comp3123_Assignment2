const mongoose = require('mongoose');

// Define the employee schema
const employeeSchema = new mongoose.Schema(
  {
    first_name: {
      type: String,
      required: true
    },
    last_name: {
      type: String,
      required: true
    },
    email: {
      type: String,
      required: true,
      unique: true
    },
    position: {
      type: String,
      required: true
    },
    salary: {
      type: Number,
      required: true
    },
    department: {
      type: String,
      required: true
    },
    date_of_joining: {
      type: Date,
      default: Date.now
    }
  },
  { timestamps: true }
);

// Explicitly set the collection name to 'users' to store employee data in the 'users' collection
module.exports = mongoose.model('Employee', employeeSchema, 'users');
