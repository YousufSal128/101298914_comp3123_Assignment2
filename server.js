const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');

// Models (Replace with actual models if needed)
const User = require('./models/User'); // Assuming you have a User model
const Employee = require('./models/Employee'); // Assuming you have an Employee model

// Initialize Express app
const app = express();
const PORT = 5000;

// Middleware
app.use(cors());
app.use(bodyParser.json());

// MongoDB Connection
mongoose
  .connect(
    'mongodb+srv://101298914:WXNtv0EhYLSI9CIs@mycluster.8eile.mongodb.net/?retryWrites=true&w=majority&appName=MyCluster',
    {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    }
  )
  .then(() => console.log('MongoDB connected'))
  .catch((err) => console.error('Error connecting to MongoDB:', err));

// Basic Test Route
app.get('/', (req, res) => {
  res.send('API is working');
});

// Routes

// User Signup
app.post('/signup', async (req, res) => {
  try {
    const user = new User(req.body); // Replace with validation if needed
    const savedUser = await user.save();
    res.status(201).json(savedUser);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// User Login
app.post('/login', (req, res) => {
  res.send('You have Successfully logged in');
});

// Create Employee
app.post('/employees', async (req, res) => {
  try {
    const employee = new Employee(req.body);
    const savedEmployee = await employee.save();
    res.status(201).json(savedEmployee);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// Get All Employees
app.get('/employees', async (req, res) => {
  try {
    const employees = await Employee.find();
    res.json(employees);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Get Employee by ID
app.get('/employees/:id', async (req, res) => {
  try {
    const employee = await Employee.findById(req.params.id);
    if (!employee) return res.status(404).json({ error: 'Employee not found' });
    res.json(employee);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// Update Employee
app.put('/employees/:id', async (req, res) => {
  try {
    const updatedEmployee = await Employee.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!updatedEmployee) return res.status(404).json({ error: 'Employee not found' });
    res.json(updatedEmployee);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// Delete Employee by ID
app.delete('/employees/:id', async (req, res) => {
  try {
    const deletedEmployee = await Employee.findByIdAndDelete(req.params.id);

    // If employee is not found, return a 404 error with a message
    if (!deletedEmployee) {
      return res.status(404).json({ error: 'Employee not found' });
    }

    // Return a success message indicating the deletion was successful
    res.status(200).json({
      message: 'Employee deleted successfully',
      // Optionally include the ID in the response for confirmation
      deletedEmployeeId: deletedEmployee._id,
    });
  } catch (err) {
    // If there's an error, send a 500 response
    res.status(500).json({ error: err.message });
  }
});

// Default Route for Unhandled Endpoints
app.use((req, res) => {
  res.status(404).send('Endpoint not found');
});

// Start Server
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
