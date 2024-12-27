// const express = require('express');
// const router = express.Router();
// const Billing = require('../../models/Billing');
// const Consumer = require('../../models/Consumer');
// const Collection = require('../../models/Collection');
// const Expense = require('../../models/Expense');

// // Monthly Collection Report
// router.get('/monthly-collection', async (req, res) => {
//   try {
//     const { month, year } = req.query;
//     const startDate = new Date(year, month - 1, 1);
//     const endDate = new Date(year, month, 0);

//     const collections = await Collection.find({
//       paymentDate: { $gte: startDate, $lte: endDate }
//     })
//     .populate('consumerId')
//     .populate('billId');

//     const totalCollection = collections.reduce((sum, col) => sum + col.amountPaid, 0);

//     res.json({
//       collections,
//       totalCollection,
//       month,
//       year
//     });
//   } catch (error) {
//     console.log(error)
//     res.status(500).json({ error: error.message });
//   }
// });

// // Consumption Report
// router.get('/consumption', async (req, res) => {
//   try {
//     const { startDate, endDate } = req.query;

//     const billings = await Billing.find({
//       billingDate: { $gte: startDate, $lte: endDate }
//     })
//     .populate('consumerId');

//     const totalConsumption = billings.reduce((sum, bill) => sum + bill.consumption, 0);
//     const averageConsumption = totalConsumption / billings.length;

//     res.json({
//       billings,
//       totalConsumption,
//       averageConsumption
//     });
//   } catch (error) {
//     res.status(500).json({ error: error.message });
//   }
// });

// // Overdue Accounts Report
// router.get('/overdue-accounts', async (req, res) => {
//   try {
//     const overdueBills = await Billing.find({
//       status: 'Overdue',
//       isOverdue: true
//     })
//     .populate('consumerId');

//     const totalOverdueAmount = overdueBills.reduce((sum, bill) => sum + bill.totalBill, 0);

//     res.json({
//       overdueBills,
//       totalOverdueAmount,
//       count: overdueBills.length
//     });
//   } catch (error) {
//     res.status(500).json({ error: error.message });
//   }
// });

// // Revenue vs Expense Report
// router.get('/revenue-expense', async (req, res) => {
//   try {
//     const { month, year } = req.query;
//     const startDate = new Date(year, month - 1, 1);
//     const endDate = new Date(year, month, 0);

//     const collections = await Collection.find({
//       paymentDate: { $gte: startDate, $lte: endDate }
//     });

//     const expenses = await Expense.find({
//       date: { $gte: startDate, $lte: endDate }
//     });

//     const totalRevenue = collections.reduce((sum, col) => sum + col.amountPaid, 0);
//     const totalExpenses = expenses.reduce((sum, exp) => sum + exp.amount, 0);
//     const netIncome = totalRevenue - totalExpenses;

//     res.json({
//       totalRevenue,
//       totalExpenses,
//       netIncome,
//       collections,
//       expenses
//     });
//   } catch (error) {
//     res.status(500).json({ error: error.message });
//   }
// });

// // Consumer Status Report
// router.get('/consumer-status', async (req, res) => {
//   try {
//     const consumers = await Consumer.find();

//     const activeConsumers = consumers.filter(c => c.isActive).length;
//     const inactiveConsumers = consumers.filter(c => !c.isActive).length;
//     const members = consumers.filter(c => c.isMember).length;

//     res.json({
//       totalConsumers: consumers.length,
//       activeConsumers,
//       inactiveConsumers,
//       members,
//       consumersList: consumers
//     });
//   } catch (error) {
//     res.status(500).json({ error: error.message });
//   }
// });

// // Disconnection Report
// router.get('/disconnection', async (req, res) => {
//   try {
//     const disconnectedAccounts = await Billing.find({
//       disconnectionStatus: 'Disconnected'
//     })
//     .populate('consumerId');

//     res.json({
//       disconnectedAccounts,
//       count: disconnectedAccounts.length
//     });
//   } catch (error) {
//     res.status(500).json({ error: error.message });
//   }
// });

// module.exports = router;

const express = require("express");
const router = express.Router();
// const PDFDocument = require("pdfkit");
const { startOfDay, endOfDay } = require("date-fns");
const Billing = require("../../models/Billing");
const Consumer = require("../../models/Consumer");
const Collection = require("../../models/Collection");
const Expense = require("../../models/Expense");

router.get("/", async (req, res) => {
  try {
    const { startDate, endDate, reportType } = req.query;

    console.log(reportType, startDate, endDate);

    if (!startDate || !endDate || !reportType) {
      return res.status(400).json({
        error: "Missing required parameters",
      });
    }

    const dateRange = {
      $gte: startOfDay(new Date(startDate)),
      $lte: endOfDay(new Date(endDate)),
    };

    let reportData = {};

    switch (reportType) {
      case "collections": {
        const formatDateStr = (date) => {
          return new Date(date).toISOString().split("T")[0];
        };

        const startDateStr = formatDateStr(dateRange.$gte);
        const endDateStr = formatDateStr(dateRange.$lte);

        console.log("Query Date Range:", {
          startDate: startDateStr,
          endDate: endDateStr,
        });

        const collections = await Collection.find({
          paymentDate: {
            $gte: startDateStr,
            $lte: endDateStr,
          },
        })
          .populate({
            path: "consumerId",
            select: "accountNo firstName lastName",
          })
          .populate("billId")
          .lean();

        console.log("Collections found:", collections);

        const formattedCollections = collections.map((collection) => ({
          ...collection,
          consumerName: collection.consumerId
            ? `${collection.consumerId.firstName} ${collection.consumerId.lastName}`
            : "N/A",
        }));

        reportData = {
          items: formattedCollections,
          summary: {
            totalAmount: collections.reduce(
              (sum, col) => sum + col.amountPaid,
              0
            ),
            totalTransactions: collections.length,
            averageTransaction: collections.length
              ? collections.reduce((sum, col) => sum + col.amountPaid, 0) /
                collections.length
              : 0,
          },
        };
        break;
      }

      case "consumption": {
        const formatDateStr = (date) => {
          return new Date(date).toISOString().split("T")[0];
        };
      
        const startDateStr = formatDateStr(dateRange.$gte);
        const endDateStr = formatDateStr(dateRange.$lte);
      
        console.log("Consumption Query Date Range:", {
          startDate: startDateStr,
          endDate: endDateStr,
        });
      
        const billings = await Billing.find({
          billingDate: {
            $gte: startDateStr,
            $lte: endDateStr,
          }
        })
        .populate("consumerId")
        .lean();
      
        console.log("Billings found:", billings.length);
      
        const formattedBillings = billings.map((billing) => ({
          accountNo: billing.consumerId.accountNo,
          consumerName: `${billing.consumerId.firstName} ${billing.consumerId.lastName}`,
          previousRead: billing.previousRead,
          presentRead: billing.presentRead,
          consumption: billing.presentRead - billing.previousRead,
          billingDate: billing.billingDate,
          status: billing.status,
        }));
      
        const totalConsumption = formattedBillings.reduce(
          (sum, bill) => sum + bill.consumption,
          0
        );
      
        reportData = {
          items: formattedBillings,
          summary: {
            totalConsumption,
            averageConsumption: formattedBillings.length
              ? totalConsumption / formattedBillings.length
              : 0,
            totalBillings: formattedBillings.length,
          },
        };
      
        console.log("Consumption Report Data:", {
          totalBillings: formattedBillings.length,
          totalConsumption
        });
      
        break;
      }

      case "revenue": {
        const [collections, expenses] = await Promise.all([
          Collection.find({ paymentDate: dateRange }).lean(),
          Expense.find({ date: dateRange }).lean(),
        ]);

        const revenue = collections.reduce(
          (sum, col) => sum + col.amountPaid,
          0
        );
        const totalExpenses = expenses.reduce(
          (sum, exp) => sum + exp.amount,
          0
        );

        const formattedTransactions = [
          ...collections.map((col) => ({
            date: col.paymentDate,
            type: "Revenue",
            description: "Water Bill Collection",
            amount: col.amountPaid,
          })),
          ...expenses.map((exp) => ({
            date: exp.date,
            type: "Expense",
            description: exp.description,
            amount: -exp.amount,
          })),
        ].sort((a, b) => new Date(b.date) - new Date(a.date));

        reportData = {
          items: formattedTransactions,
          summary: {
            totalRevenue: revenue,
            totalExpenses,
            netIncome: revenue - totalExpenses,
            revenueCount: collections.length,
            expenseCount: expenses.length,
          },
        };
        break;
      }

      case "overdue": {
        const overdueBills = await Billing.find({
          dueDate: { $lt: new Date() },
          status: "Unpaid",
        })
          .populate("consumerId")
          .lean();

        const formattedOverdue = overdueBills.map((bill) => ({
          accountNo: bill.consumerId.accountNo,
          consumerName: `${bill.consumerId.firstName} ${bill.consumerId.lastName}`,
          dueDate: bill.dueDate,
          amount: bill.totalBill,
          daysPastDue: Math.floor(
            (new Date() - new Date(bill.dueDate)) / (1000 * 60 * 60 * 24)
          ),
          status: "Overdue",
        }));

        const totalOverdue = formattedOverdue.reduce(
          (sum, bill) => sum + bill.amount,
          0
        );

        reportData = {
          items: formattedOverdue,
          summary: {
            totalOverdueAmount: totalOverdue,
            overdueCount: formattedOverdue.length,
            averageOverdueAmount: formattedOverdue.length
              ? totalOverdue / formattedOverdue.length
              : 0,
          },
        };
        break;
      }

      default:
        return res.status(400).json({ error: "Invalid report type" });
    }

    res.json({
      success: true,
      dateRange: {
        start: startDate,
        end: endDate,
      },
      reportType,
      data: reportData,
    });
  } catch (error) {
    console.error("Report generation error:", error);
    res.status(500).json({
      success: false,
      error: "Failed to generate report",
      details: error.message,
    });
  }
});

// PDF Generation Endpoint
// router.post("/report/generate-pdf", async (req, res) => {
//   try {
//     const { reportType, dateRange, data, summary } = req.body;
//     const doc = new PDFDocument();

//     // Set response headers
//     res.setHeader("Content-Type", "application/pdf");
//     res.setHeader(
//       "Content-Disposition",
//       `attachment; filename=${reportType}-report.pdf`
//     );

//     // Pipe the PDF to the response
//     doc.pipe(res);

//     // Add report header
//     doc
//       .fontSize(20)
//       .text(`${reportType.toUpperCase()} REPORT`, { align: "center" });
//     doc.moveDown();
//     doc
//       .fontSize(12)
//       .text(`Date Range: ${dateRange[0]} to ${dateRange[1]}`, {
//         align: "center",
//       });
//     doc.moveDown();

//     // Add summary section
//     doc.fontSize(14).text("Summary", { underline: true });
//     doc.moveDown();
//     Object.entries(summary).forEach(([key, value]) => {
//       doc.fontSize(12).text(`${key}: ${value}`);
//     });
//     doc.moveDown();

//     // Add data table
//     doc.fontSize(14).text("Details", { underline: true });
//     doc.moveDown();

//     // Format and add table data based on report type
//     // ... Add table formatting logic here ...

//     doc.end();
//   } catch (error) {
//     console.error("PDF generation error:", error);
//     res.status(500).json({
//       success: false,
//       error: "Failed to generate PDF",
//       details: error.message,
//     });
//   }
// });

module.exports = router;
