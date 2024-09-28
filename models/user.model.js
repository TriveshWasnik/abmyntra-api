import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    name: { type: String, required: [true, "Name is required"], trim: true },
    email: {
      type: String,
      required: [true, "Email is required"],
      unique: true,
      lowercase: true,
      trim: true,
    },
    phoneNumber: {
      type: String,
      required: [true, "Phone no. is required"],
      unique: true,
    },
    password: {
      type: String,
      required: [true, "Password is required"],
      minLength: [6, "Password length should be greater than 6 character"],
    },
    cart: {
      type: [
        {
          product: { type: mongoose.Schema.Types.ObjectId, ref: "Product" },
          quantity: { type: Number, default: 1 },
        },
      ],
      default: [],
    },
    favourites: {
      type: [mongoose.Schema.Types.ObjectId],
      ref: "Product",
      default: [],
    },
    orders: {
      type: [mongoose.Schema.Types.ObjectId],
      ref: "Order",
      default: [],
    },
    status: { type: String, default: "Active" },
    isAdmin: { type: Boolean, default: false },
  },
  { timestamps: true }
);

export const User = mongoose.model("User", userSchema);
