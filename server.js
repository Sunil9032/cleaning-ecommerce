const mongoose = require("mongoose");
const Order = require("./models/order");
const express = require("express");
const Razorpay = require("razorpay");
const cors = require("cors");

const app = express();
app.use(cors());
app.use(express.json());
app.use(express.static("public"));

mongoose.connect(process.env.MONGODB_URI,
 
)
.then(() => console.log("MongoDB Connected"))
.catch(err => console.log(err));


const razorpay = new Razorpay({
  key_id: "rzp_test_RrCMkeS4VaZXJq",
  key_secret: "XOQBAX8hYOob8D3SRQt2NkSC"
});

app.post("/create-order", async (req, res) => {
  try {
    const amount = req.body.amount;

    const order = await razorpay.orders.create({
      amount: amount * 100,
      currency: "INR"
    });

app.post("/save-order", async (req, res) => {
  try {
    const newOrder = new Order({
      paymentId: req.body.paymentId,
      amount: req.body.amount,
      products: req.body.products
    });

    await newOrder.save();
    res.json({ message: "Order saved successfully" });

  } catch (error) {
    res.status(500).json({ error: "Failed to save order" });
  }
});


    res.json(order);
  } catch (err) {
    console.error("Order error:", err);
    res.status(500).json({ error: "Order creation failed" });
  }
});


const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log("Server running on port " + PORT);
});


