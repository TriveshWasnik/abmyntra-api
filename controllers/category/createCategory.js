import slugify from "slugify";
import { Category } from "../../models/category.model.js";
import { uploadOnCloudinary } from "../../util/cloudinary.js";

// create a new category
export const createCategory = async function (req, res) {
  try {
    const { name, url, desc, parentCategory, status } = req.body;

    // check if Product already exists
    const existCategory = await Category.findOne({ name });
    if (existCategory) {
      return res.status(400).json({
        message: "Category already exists ",
        success: "false",
      });
    }

    let categoryImageLocalPath = req.files?.categoryPic[0]?.path;
    console.log(categoryImageLocalPath);

    /* if (!categoryImageLocalPath) {
      return res
        .status(400)
        .json({ message: "Category image is required", success: false });
    } */

    const categoryPic = await uploadOnCloudinary(categoryImageLocalPath);

    const createCat = await Category.create({
      name,
      url: slugify(url),
      desc,
      parentCategory: parentCategory == "" ? [] : parentCategory,
      status,
      categoryPic: categoryPic?.url || "",
    });
    return res.status(201).json({
      data: createCat,
      message: `${name} category created successfully`,
      success: true,
    });
  } catch (error) {
    console.log(error);
    res
      .status(500)
      .json({ message: "Error in create Category API", success: false });
  }
};
