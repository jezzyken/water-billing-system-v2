const mongoose = require("mongoose");

const collectionSchema = new mongoose.Schema(
  {
    consumerId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Consumer",
    },
    billId: [
      {

        type: mongoose.Schema.Types.ObjectId,
        ref: "Billing",
        default: null,
      },
    ],
    paymentDate: {
      type: String,
    },
    totalBill: {
      type: Number,
    },
    amountPaid: {
      type: Number,
    },
    change: {
      type: Number,
    },
    paymentMethod: {
      type: String,
      default: "Cash",
    },
    // paymentDescription: {
    //   type: String,
    // },
    collectionType: {
      type: String,
      enum: ["Membership Fee", "Water Bill"],
      default: null,
    },
  },
  {
    timestamps: true,
  }
);

collectionSchema.pre("save", function (next) {
  if (this.isModified("totalBill") || this.isModified("amountPaid")) {
    this.change = this.amountPaid - this.totalBill;
  }
  next();
});

module.exports = mongoose.model("Collection", collectionSchema);
