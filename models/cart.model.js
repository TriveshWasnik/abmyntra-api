import mongoose from "mongoose";

const cartSchema = new mongoose.Schema(
  {
    productName: { type: String },
    productId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Product",
      default: null,
    },
    productQuantity: { type: Number, default: 1 },
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
    orderStatus: { type: String, default: "add to cart" },
    orderId: { type: String, default: null },
  },
  { timestamps: true }
);

export const Cart = mongoose.model("Cart", cartSchema);
