import { Category } from "../../models/category.model.js";
import { User } from "../../models/user.model.js";

// delete category
export const deleteCategory = async function (req, res) {
  try {
    // Find the category

    const category = await Category.findById(req.params.id);
    if (!category) {
      return res
        .status(400)
        .json({ message: "Category not deleted", success: false });
    }

    await category.deleteOne();
    return res
      .status(200)
      .json({ message: "Category Deleted!", success: true });
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
