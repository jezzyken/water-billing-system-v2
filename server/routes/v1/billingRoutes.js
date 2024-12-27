const express = require('express');
const router = express.Router();
const Models = require("../../models/Billing");
const ObjectId = require("mongoose").Types.ObjectId;
const path = require('path');

// Get all billings
router.get('/', async (req, res) => {
 try {
   const result = await Models.find();
   res.json(result);
 } catch (error) {
   res.status(500).json({ message: error.message });
 }
});

// Get billing by ID 
router.get('/:id', async (req, res) => {
 try {
   const result = await Models.findById(req.params.id);
   if (!result) {
     return res.status(404).json({ message: 'Billing not found' });
   }
   res.json(result);
 } catch (error) {
   res.status(500).json({ message: error.message });
 }
});

// Get latest billing for consumer
router.get('/consumer/latest/:id', async (req, res) => {
 try {
   const result = await Models.findOne({ 
     consumerId: new ObjectId(req.params.id) 
   })
   .populate("consumerId")
   .sort({ billingDate: -1 });

   if (!result) {
     return res.status(404).json({ message: 'No billing found for this consumer' });
   }
   res.json(result);
 } catch (error) {
   res.status(500).json({ message: error.message });
 }
});

// Get all billings for consumer
router.get('/consumer/all/:id', async (req, res) => {
 try {
   const result = await Models.find({ 
     consumerId: new ObjectId(req.params.id) 
   })
   .populate("consumerId")
   .sort({ billingDate: -1 });
   res.json(result);
 } catch (error) {
   res.status(500).json({ message: error.message });
 }
});

// Add new billing
router.post('/', async (req, res) => {
 try {
   const previousBill = await Models.findOne({
     consumerId: req.body.consumerId,
   }).sort({ billingDate: -1 });

   let previousBalance = 0;
   if (previousBill && previousBill.status === "Unpaid") {
     previousBalance = previousBill.totalBill;
   }

   const billing = new Models({ ...req.body, previousBalance });
   billing.calculateBills(15);
   const result = await billing.save();
   res.status(201).json(result);
 } catch (error) {
   res.status(400).json({ message: error.message });
 }
});

// Update billing
router.put('/:id', async (req, res) => {
 try {
   const result = await Models.findByIdAndUpdate(
     req.params.id,
     req.body,
     { new: true }
   );
   if (!result) {
     return res.status(404).json({ message: 'Billing not found' });
   }
   res.json(result);
 } catch (error) {
   res.status(400).json({ message: error.message });
 }
});

// Delete billing
router.delete('/:id', async (req, res) => {
 try {
   const result = await Models.findByIdAndDelete(req.params.id);
   if (!result) {
     return res.status(404).json({ message: 'Billing not found' });
   }
   res.json({ message: 'Billing deleted successfully' });
 } catch (error) {
   res.status(500).json({ message: error.message });
 }
});

// Get billing statement template
router.get('/template/html', (req, res) => {
 try {
   const templatePath = path.join(process.cwd(), "templates/billing-statement-template.html");
   res.sendFile(templatePath);
 } catch (error) {
   res.status(500).json({ message: error.message });
 }
});

module.exports = router;