const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const expenseSchema = new Schema({
  expenseId: {
    type: String,
  },
  date: {
    type: Date,
  },
  amount: {
    type: Number,
  },
  expenseType: {
    type: String,
  },
  description: {
    type: String,
  },
});

module.exports = mongoose.model("Expense", expenseSchema);