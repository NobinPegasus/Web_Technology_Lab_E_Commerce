const mongoose = require("mongoose");

const BankSchema = new mongoose.Schema(
  {
    userId: { type: String, required: true },
    products: [String],
    amount: { type: Number, required: true },
    status: { type: String, default: "pending" },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Order", BankSchema);
