import mongoose from "mongoose";

const orderSchema = new mongoose.Schema(
  {
    orderId: { type: String, required: true },
    shippingName: { type: String, required: true },
    shippingAddress1: { type: String, required: true },
    shippingAddress2: { type: String, required: true },
    shippingCountry: { type: String, required: true },
    shippingState: { type: String, required: true },
    shippingCity: { type: String, required: true },
    shippingPincode: { type: String, required: true },
    shippingEmail: { type: String, required: [true, "Email is required"] },
    shippingPhone: { type: String, required: [true, "Mobile is required"] },
    couponName: { type: String, default: null },
    couponAmount: { type: Number, default: 0 },
    paymentKey: { type: String, default: null },
    orderDate: { type: Date, default: Date.now },
    orderStatus: {
      type: String,
      enum: ["pending", "processing", "shipped", "delivered"],
      default: "pending",
    },
    paymentStatus: {
      type: String,
      enum: ["pending", "received"],
      default: "pending",
    },
    paymentMethod: {
      type: String,
      enum: ["COD", "Online"],
      default: "COD",
    },
    shippingCharges: { type: Number, default: 0 },
    taxAmount: { type: Number, default: 0 },
    subTotalAmount: { type: Number },
    grandTotalAmount: { type: Number },
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
  },
  { timestamps: true }
);

export const Order = mongoose.model("Order", orderSchema);
