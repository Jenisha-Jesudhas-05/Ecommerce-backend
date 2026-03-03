import mongoose from "mongoose";

const addressSchema = new mongoose.Schema({
  street: String,
  city: String,
  state: String,
  country: String,
  pincode: String
});

const userSchema = new mongoose.Schema(
  {
    name: String,
    email: { type: String, unique: true, index: true },
    password: String,
    role: { type: String, enum: ["buyer", "seller","admin"], default: "buyer" },
    addresses: [addressSchema]
  },

  { timestamps: true }
);

export default mongoose.model("User", userSchema);