const express = require('express');
const router = express.Router();
const Models = require("../../models/Collection");
const BillingModels = require("../../models/Billing");
const ObjectId = require("mongoose").Types.ObjectId;

// Get all collections with populated consumer data
router.get('/', async (req, res) => {
  try {
    const result = await Models.find().populate("consumerId").sort({ _id: -1 });
    res.json(result);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Get collection by ID
router.get('/:id', async (req, res) => {
  try {
    const result = await Models.findById(req.params.id);
    if (!result) {
      return res.status(404).json({ message: 'Collection not found' });
    }
    res.json(result);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Get collections by consumer ID
router.get('/consumer/:id', async (req, res) => {
  try {
    const result = await Models.find({ 
      consumerId: new ObjectId(req.params.id) 
    }).sort({ _id: -1 });
    res.json(result);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Add new collection
router.post('/', async (req, res) => {
  try {
    const { billId, collectionType } = req.body;
    
    if (collectionType === "Water Bill") {
      await BillingModels.updateMany(
        { _id: { $in: billId }, status: { $ne: "Paid" } },
        { $set: { status: "Paid" } }
      );
      
      const newCollection = new Models(req.body);
      const result = await newCollection.save();
      res.status(201).json(result);
    } else {
      res.status(400).json({ message: 'Invalid collection type' });
    }
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Update collection
router.put('/:id', async (req, res) => {
  try {
    const result = await Models.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    if (!result) {
      return res.status(404).json({ message: 'Collection not found' });
    }
    res.json(result);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Delete collection
router.delete('/:id', async (req, res) => {
  try {
    const result = await Models.findByIdAndDelete(req.params.id);
    if (!result) {
      return res.status(404).json({ message: 'Collection not found' });
    }
    res.json({ message: 'Collection deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;