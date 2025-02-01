const express = require('express');
const router = express.Router();
const Models = require("../../models/Consumer");
const CollectionModel = require("../../models/Collection");
const moment = require("moment")

// Get all consumers
router.get('/', async (req, res) => {
  try {
    const result = await Models.find().sort({ _id: -1 });
    res.json(result);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Get consumer by ID
router.get('/:id', async (req, res) => {
  try {
    const result = await Models.findById(req.params.id);
    if (!result) {
      return res.status(404).json({ message: 'Consumer not found' });
    }
    res.json(result);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Add new consumer
router.post('/', async (req, res) => {
  try {
    const { consumer, payment, isNew } = req.body;

    if (!isNew) {
      consumerData = new Models(req.body);
    } else {
      consumerData = new Models(consumer);
      console.log('else')
      if (!consumer.isMember) {
        const paymentData = new CollectionModel({
          ...payment,
          consumerId: consumerData._id,
          paymentDate: moment().format("YYYY-MM-DD")
        });
        await paymentData.save();
        consumerData.isMember = true;
        consumerData.paymentDescription = "Membership Fee";
      }
    }
    
    const result = await consumerData.save();
    res.status(201).json(result);
  } catch (error) {
    console.log(error)
    res.status(400).json({ message: error.message });
  }
});

// Update consumer
router.put('/:id', async (req, res) => {

  console.log(req.body)
  try {
    const result = await Models.findByIdAndUpdate(
      req.params.id, 
      req.body, 
      { new: true }
    );
    if (!result) {
      return res.status(404).json({ message: 'Consumer not found' });
    }
    res.json(result);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Delete consumer
router.delete('/:id', async (req, res) => {
  try {
    const result = await Models.findByIdAndDelete(req.params.id);
    if (!result) {
      return res.status(404).json({ message: 'Consumer not found' });
    }
    res.json({ message: 'Consumer deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;