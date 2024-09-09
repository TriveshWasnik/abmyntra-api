import mongoose from "mongoose";

const categorySchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "name is required"],
      trim: true,
      unique: true,
    },
    url: {
      type: String,
      required: [true, "url is required"],
      unique: true,
    },
    desc: {
      type: String,
      required: [true, "sescription is required"],
    },

    parentCategory: { type: Array, default: [] },
    attributes: { type: Array, default: [] },
    status: { type: String, default: "Active" },
    categoryPic: { type: String, default: null },
  },
  { timestamps: true }
);

export const Category = mongoose.model("Category", categorySchema);
