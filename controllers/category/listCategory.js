import { Category } from "../../models/category.model.js";

// get all categories
export const listCategory = async function (req, res) {
  try {
    const categories = await Category.find({}).sort({ createdAt: -1 });
    return res.status(200).json({
      data: categories,
      totel: categories.length,
      success: true,
    });
  } catch (error) {
    console.log(error);
    res
      .status(500)
      .json({ message: "Error in get categories APi", success: false });
  }
};
