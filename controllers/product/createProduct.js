import slugify from "slugify";
import { Product } from "../../models/product.model.js";
import { uploadOnCloudinary } from "../../util/cloudinary.js";

// create a product
export const createProduct = async function (req, res) {
  try {
    const {
      name,
      url,
      parentCategory,
      brand,
      sku,
      size,
      color,
      description,
      shortDescription,
      mrpPrice,
      sellingPrice,
      stock,
      weight,
      weightType,
      metaTitle,
      metaDescription,
      metaKeywords,
    } = req.body;

    // validation - not empty field
    if (!name || !url || !description || !shortDescription || !mrpPrice) {
      return res
        .status(400)
        .json({ message: "All fields are required", success: "false" });
    }

    // check if Product already exists
    const existProduct = await Product.findOne({ name });
    if (existProduct) {
      return res.status(400).json({
        message: "Product already exists ",
        success: "false",
      });
    }

    let productImage1LocalPath = req.files?.productImage1[0]?.path;
    let productImage2LocalPath = req.files?.productImage2[0]?.path;
    let productImage3LocalPath = req.files?.productImage3[0]?.path;
    let productImage4LocalPath = req.files?.productImage4[0]?.path;

    if (
      !productImage1LocalPath ||
      !productImage2LocalPath ||
      !productImage3LocalPath ||
      !productImage4LocalPath
    ) {
      return res
        .status(400)
        .json({ message: "Product image is required", success: false });
    }

    const productPic1 = await uploadOnCloudinary(productImage1LocalPath);
    const productPic2 = await uploadOnCloudinary(productImage2LocalPath);
    const productPic3 = await uploadOnCloudinary(productImage3LocalPath);
    const productPic4 = await uploadOnCloudinary(productImage4LocalPath);

    const product = await Product.create({
      name,
      url: slugify(url.toLowerCase()),
      parentCategory,
      brand,
      productImage1: productPic1?.url || "",
      productImage2: productPic2?.url || "",
      productImage3: productPic3?.url || "",
      productImage4: productPic4?.url || "",
      sku,
      size,
      color,
      description,
      shortDescription,
      mrpPrice,
      sellingPrice,
      stock,
      weight,
      weightType,
      metaTitle,
      metaDescription,
      metaKeywords,
    });

    return res.status(201).json({
      message: "Product created successfully",
      product,
      success: true,
    });
  } catch (error) {
    console.log(error.message);
    res
      .status(400)
      .json({ message: "Error in Create a Product API", success: false });
  }
};
