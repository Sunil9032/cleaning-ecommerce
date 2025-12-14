const mongoose = require("mongoose");

const orderSchema = new mongoose.Schema({
  paymentId: String,
  amount: Number,
  products: Array,
  createdAt: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model("Order", orderSchema);
