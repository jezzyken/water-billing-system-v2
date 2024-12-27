const express = require('express');
const router = express.Router();
const Billing = require('../../models/Billing');
const Collection = require('../../models/Collection');
const Consumer = require('../../models/Consumer');
const Expense = require('../../models/Expense');

// Get dashboard summary
router.get('/summary', async (req, res) => {
  try {
    const currentDate = new Date();
    const currentYear = currentDate.getFullYear().toString();
    const currentMonth = currentDate.getMonth() + 1;

    // Get total consumers
    const totalConsumers = await Consumer.countDocuments();
    const activeConsumers = await Consumer.countDocuments({ isActive: true });

    // Get billing statistics
    const monthlyBillings = await Billing.find({
      billingDate: {
        $regex: `${currentYear}-${currentMonth.toString().padStart(2, '0')}`
      }
    });

    const totalBilledAmount = monthlyBillings.reduce((sum, bill) => sum + bill.totalBill, 0);
    const unpaidBills = await Billing.countDocuments({ status: 'Unpaid' });
    const overdueBills = await Billing.countDocuments({ isOverdue: true });

    // Get collection statistics
    const monthlyCollections = await Collection.find({
      paymentDate: {
        $regex: `${currentYear}-${currentMonth.toString().padStart(2, '0')}`
      }
    });

    const totalCollected = monthlyCollections.reduce((sum, collection) => sum + collection.amountPaid, 0);

    // Get expense statistics
    const monthlyExpenses = await Expense.find({
      date: {
        $gte: new Date(currentYear, currentMonth - 1, 1),
        $lt: new Date(currentYear, currentMonth, 1)
      }
    });

    const totalExpenses = monthlyExpenses.reduce((sum, expense) => sum + expense.amount, 0);

    res.json({
      consumers: {
        total: totalConsumers,
        active: activeConsumers,
        inactive: totalConsumers - activeConsumers
      },
      billing: {
        monthlyBilled: totalBilledAmount,
        unpaidCount: unpaidBills,
        overdueCount: overdueBills
      },
      collections: {
        monthlyCollected: totalCollected
      },
      expenses: {
        monthlyExpenses: totalExpenses
      },
      cashflow: {
        monthlyNet: totalCollected - totalExpenses
      }
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.get('/collections/trends', async (req, res) => {
  try {
    const collections = await Collection.aggregate([
      {
        $group: {
          _id: { $substr: ['$paymentDate', 0, 7] },
          total: { $sum: '$amountPaid' },
          count: { $sum: 1 }
        }
      },
      { $sort: { '_id': -1 } },
      { $limit: 12 }
    ]);

    res.json(collections);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.get('/consumers/stats', async (req, res) => {
  try {
    const membershipStats = await Consumer.aggregate([
      {
        $group: {
          _id: '$isMember',
          count: { $sum: 1 }
        }
      }
    ]);

    const activeStats = await Consumer.aggregate([
      {
        $group: {
          _id: '$isActive',
          count: { $sum: 1 }
        }
      }
    ]);

    res.json({
      membership: membershipStats,
      activity: activeStats
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.get('/billing/stats', async (req, res) => {
  try {
    const billingStats = await Billing.aggregate([
      {
        $group: {
          _id: '$status',
          count: { $sum: 1 },
          totalAmount: { $sum: '$totalBill' }
        }
      }
    ]);

    res.json(billingStats);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.get('/expenses/summary', async (req, res) => {
  try {
    const expenseStats = await Expense.aggregate([
      {
        $group: {
          _id: '$expenseType',
          totalAmount: { $sum: '$amount' },
          count: { $sum: 1 }
        }
      }
    ]);

    res.json(expenseStats);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;