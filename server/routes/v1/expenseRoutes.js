const express = require('express');
const router = express.Router();
const Models = require("../../models/Expense");

// Get all expenses
router.get('/', async (req, res) => {
 try {
   const result = await Models.find();
   res.json(result);
 } catch (error) {
   res.status(500).json({ message: error.message });
 }
});

// Get expense by ID
router.get('/:id', async (req, res) => {
 try {
   const result = await Models.findById(req.params.id);
   if (!result) {
     return res.status(404).json({ message: 'Expense not found' });
   }
   res.json(result);
 } catch (error) {
   res.status(500).json({ message: error.message });
 }
});

// Add new expense
router.post('/', async (req, res) => {
 try {
   const newItems = new Models(req.body);
   const result = await newItems.save();
   res.status(201).json(result);
 } catch (error) {
   res.status(400).json({ message: error.message });
 }
});

// Update expense
router.put('/:id', async (req, res) => {
 try {
   const result = await Models.findByIdAndUpdate(
     req.params.id,
     req.body,
     { new: true }
   );
   if (!result) {
     return res.status(404).json({ message: 'Expense not found' });
   }
   res.json(result);
 } catch (error) {
   res.status(400).json({ message: error.message });
 }
});

// Delete expense
router.delete('/:id', async (req, res) => {
 try {
   const result = await Models.findByIdAndDelete(req.params.id);
   if (!result) {
     return res.status(404).json({ message: 'Expense not found' });
   }
   res.json({ message: 'Expense deleted successfully' });
 } catch (error) {
   res.status(500).json({ message: error.message });
 }
});

module.exports = router;