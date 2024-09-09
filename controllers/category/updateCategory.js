import slugify from "slugify";
import { Category } from "../../models/category.model.js";
import { uploadOnCloudinary } from "../../util/cloudinary.js";

// update existing category
export const updateCategory = async function (req, res) {
  try {
    let { name, url, desc, parentCategory, status } = req.body;

    let categoryImageLocalPath = req.files?.categoryPic[0]?.path;
    const categoryPic = await uploadOnCloudinary(categoryImageLocalPath);
    const categoryObj = {
      name,
      url: slugify(url),
      desc,
      parentCategory: parentCategory == "" ? [] : parentCategory,
      status,
      categoryPic: categoryPic?.url || "",
    };

    const updateCat = await Category.findByIdAndUpdate(
      req.params.id,
      categoryObj,
      { new: true }
    );

    if (!updateCat) {
      return res
        .status(400)
        .json({ message: "Category Not Found", success: false });
    }

    return res
      .status(200)
      .json({ message: "Category Updated!", data: updateCat, success: true });
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
