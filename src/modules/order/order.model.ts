import mongoose from "mongoose";

const itemSchema = new mongoose.Schema({
  product_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Product"
  },
  quantity: Number,
  total_price: Number
});

const orderSchema = new mongoose.Schema(
  {
    user_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User"
    },
    payment_method: String,
    expected_delivery: Date,
    shipping_address: {
      street: String,
      city: String,
      state: String,
      country: String,
      pincode: String
    },
    items: [itemSchema]
  },
  { timestamps: true }
);

export default mongoose.model("Order", orderSchema);