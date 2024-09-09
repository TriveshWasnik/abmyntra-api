import mongoose from "mongoose";
import { Category } from "../../models/category.model.js";

// get category by Id
export const singleCategory = async function (req, res) {
  try {
    const categoryId = req.params.id;
    const categories = await Category.findById(categoryId);
    if (!categories) {
      return res
        .status(400)
        .json({ message: "Category Not Found", success: false });
    }
    const childCategory = await fetchChildCategory(categories.parentCategory);
    return res.status(200).json({
      message: "Product Found",
      success: true,
      data: categories,
      parent: childCategory,
      slug: categories.url.replace(/-/g, " "),
    });
  } catch (error) {
    console.log(error);
    if (error.name == "CastError") {
      return res.status(400).json({
        message: "Invalid Id",
        success: false,
      });
    }
  }
};

async function fetchChildCategory(categoryArray) {
  if (categoryArray[0]) {
    try {
      const categoryIds = categoryArray[0].split(",");
      const objectIdArray = categoryIds.map(
        (id) => new mongoose.Types.ObjectId(id)
      );
      const categories = await Category.find({ _id: { $in: objectIdArray } });
      return categories;
    } catch (error) {}
  } else {
    return [];
  }
}
