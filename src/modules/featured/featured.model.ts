import mongoose from "mongoose";

const featuredSchema = new mongoose.Schema(
  {
    product_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Product"
    }
  },
  { timestamps: true }
);

export default mongoose.model("Featured", featuredSchema);