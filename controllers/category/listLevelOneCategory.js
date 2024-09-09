import { Category } from "../../models/category.model.js";

// get all categories
export const listLevelOneCategory = async function (req, res) {
  try {
    const categories = await Category.find({}).sort({ parentCategory: [] });
    return res.status(200).json({
      data: categories,
      total: categories.length,
      success: true,
    });
  } catch (error) {
    console.log(error);
    res
      .status(500)
      .json({ message: "Error in get categories API", success: false });
  }
};
