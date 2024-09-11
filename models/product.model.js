import mongoose from "mongoose";

const productSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    url: { type: String, required: true },
    parentCategory: { type: Array },
    brand: { type: String, default: null },
    productImage1: { type: String, default: null },
    productImage2: { type: String, default: null },
    productImage3: { type: String, default: null },
    productImage4: { type: String, default: null },
    sku: { type: String, default: null },
    size: { type: String, default: null },
    color: { type: String, default: null },

    description: { type: String, required: true },
    shortDescription: { type: String, required: true },
    mrpPrice: { type: Number, required: true },
    sellingPrice: { type: Number, default: 0 },
    stock: { type: Number, default: 0 },
    weight: { type: Number, default: 0 },
    weightType: { type: String, default: "" },
    metaTitle: { type: String },
    metaDescription: { type: String },
    metaKeywords: { type: String },

    childCategory: { type: Array, default: [] },

    status: { type: String, default: "Active" },
    wishlistStatus: { type: Boolean, default: false },
    dynamicAttributes: { type: Array, default: [] },
    newArriveProduct: { type: String, default: "Inactive" },
    trendingProduct: { type: String, default: "Inactive" },
    featuredProduct: { type: String, default: "Inactive" },
  },
  { timestamps: true }
);

export const Product = mongoose.model("Product", productSchema);
