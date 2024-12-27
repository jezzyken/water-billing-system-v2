const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const billingSchema = new Schema(
  {
    consumerId: {
      type: Schema.Types.ObjectId,
      ref: "Consumer",
    },
    billingDate: {
      type: String,
    },
    dueDate: {
      type: String,
    },
    previousDate: {
      type: String,
    },
    previousRead: {
      type: Number,
      default: 0,
    },
    presentDate: {
      type: String,
    },
    presentRead: {
      type: Number,
      default: 0,
    },
    consumption: {
      type: Number,
    },
    readType: {
      type: String,
    },
    meterDescription: {
      type: String,
    },
    presentBill: {
      type: Number,
      default: 0,
    },
    previousBalance: {
      type: Number,
      default: 0,
    },
    totalBill: {
      type: Number,
      default: 0,
    },
    status: {
      type: String,
      enum: ["Unpaid", "Paid", "Overdue"],
      default: "Unpaid",
    },
    isOverdue: {
      type: Boolean,
      default: false,
    },
    lateFee: {
      type: Number,
      default: 0,
    },
    disconnectionStatus: {
      type: String,
      required: true,
      enum: ["Active", "Disconnected"],
      default: "Active",
    },
    year: {
      type: String,
    },
    notes: {
      type: String,
    },
  },
  {
    timestamps: true,
  }
);

billingSchema.pre("save", function (next) {
  if (!this.dueDate && this.billingDate) {
    const billingDateObj = new Date(this.billingDate);
    const dueDateObj = new Date(billingDateObj);
    dueDateObj.setDate(dueDateObj.getDate() + 10);
    this.dueDate = dueDateObj.toISOString().split("T")[0];
  }
  next();
});

billingSchema.methods.calculateBills = function (ratePerCubicMeter) {
  if (this.presentRead !== undefined) {
    this.previousRead = this.previousRead || 0;
    this.consumption = this.presentRead - this.previousRead;

    if (this.consumption <= 7) {
      this.presentBill = 100;
    } else {
      this.presentBill = this.consumption * ratePerCubicMeter;
    }

    this.previousBalance = this.previousBalance || 0;
    this.totalBill = this.presentBill + this.previousBalance;
  }
};

module.exports = mongoose.model("Billing", billingSchema);
