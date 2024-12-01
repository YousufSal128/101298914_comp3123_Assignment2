const express = require('express');
const Employee = require('../models/Employee');

const router = express.Router();

// Create Employee
router.post('/', async (req, res) => {
  try {
    const employee = new Employee(req.body);
    await employee.save();
    res.status(201).send(employee);
  } catch (error) {
    res.status(400).send(error.message);
  }
});

// Get All Employees
router.get('/', async (req, res) => {
  try {
    const employees = await Employee.find();
    res.status(200).send(employees);
  } catch (error) {
    res.status(400).send(error.message);
  }
});

// Get Employee by ID
router.get('/:id', async (req, res) => {
  try {
    const employee = await Employee.findById(req.params.id);
    if (!employee) return res.status(404).send('Employee not found');
    res.status(200).send(employee);
  } catch (error) {
    res.status(400).send(error.message);
  }
});

// Update Employee by ID
router.put('/:id', async (req, res) => {
  try {
    const employee = await Employee.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!employee) return res.status(404).send('Employee not found');
    res.status(200).send(employee);
  } catch (error) {
    res.status(400).send(error.message);
  }
});

// Delete Employee by ID
router.delete('/:id', async (req, res) => {
  try {
    const deletedEmployee = await Employee.findByIdAndDelete(req.params.id);

    // If employee is not found, return a 404 error with a message
    if (!deletedEmployee) {
      return res.status(404).json({ error: 'Employee not found' });
    }

    // Return a success message indicating the deletion was successful
    res.status(200).json({
      message: 'Employee deleted successfully',
      deletedEmployeeId: deletedEmployee._id,
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});
  
module.exports = router;
