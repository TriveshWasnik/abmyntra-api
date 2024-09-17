import mongoose from "mongoose";
import { Product } from "../../models/product.model.js";

// get category by Id
export const singleProduct = async function (req, res) {
  try {
    const productId = req.params.id;
    const product = await Product.findById(productId);
    if (!product) {
      return res
        .status(400)
        .json({ message: "Product Not Found", success: false });
    }

    const parentCategory = await fetchChildCategory(product.parentCategory);
    const childCategory = await fetchChildCategory(product.childCategory);

    return res.status(200).json({
      message: "Category Found",
      success: true,
      data: product,
      Category: { parent: parentCategory, child: childCategory },
      slug: product.url.replace(/-/g, " "),
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
