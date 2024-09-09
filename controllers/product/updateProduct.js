import slugify from "slugify";
import { uploadOnCloudinary } from "../../util/cloudinary.js";
import { Product } from "../../models/product.model.js";

// update existing category
export const updateProduct = async function (req, res) {
  try {
    let productImage1LocalPath = req.files?.productImage1[0]?.path;
    let productImage2LocalPath = req.files?.productImage2[0]?.path;
    let productImage3LocalPath = req.files?.productImage3[0]?.path;
    let productImage4LocalPath = req.files?.productImage4[0]?.path;
    const productPic1 = await uploadOnCloudinary(productImage1LocalPath);
    const productPic2 = await uploadOnCloudinary(productImage2LocalPath);
    const productPic3 = await uploadOnCloudinary(productImage3LocalPath);
    const productPic4 = await uploadOnCloudinary(productImage4LocalPath);

    const productObj = {
      name: req.body.name,
      url: req.body.url,
      productImage1: productPic1?.url,
      productImage2: productPic2?.url,
      productImage3: productPic3?.url,
      productImage4: productPic4?.url,
      brand: req.body.brand,
      size: req.body.size,
      color: req.body.color,
      parentCategory:
        req.body.parentCategory == "" ? [] : req.body.parentCategory,
      childCategory: req.body.childCategory == "" ? [] : req.body.childCategory,
      description: req.body.description,
      shortDescription: req.body.shortDescription,
      metaTitle: req.body.metaTitle,
      metaDescription: req.body.metaDescription,
      metaKeywords: req.body.metaKeywords,
      sku: req.body.sku,
      weight: req.body.weight,
      weightType: req.body.weightType,
      mrpPrice: req.body.mrpPrice,
      sellingPrice: req.body.sellingPrice,
      stock: req.body.stock,
      status: req.body.status,
      // dynamicAttributes: { type: Array, default: [] },
      newArriveProduct: req.body.newArriveProduct,
      trendingProduct: req.body.trendingProduct,
      featuredProduct: req.body.featuredProduct,
    };

    const updateProduct = await Product.findByIdAndUpdate(
      req.params.id,
      productObj,
      { new: true }
    );

    if (!updateProduct) {
      return res
        .status(400)
        .json({ message: "Product Not Found", success: false });
    }

    return res.status(200).json({
      message: "Product Updated!",
      data: updateProduct,
      success: true,
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
