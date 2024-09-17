import { Product } from "../../models/product.model.js";

// get all Products
export const listProduct = async function (req, res) {
  try {
    const products = await Product.find({}).sort({ createdAt: -1 });
    return res.status(200).json({
      data: products,
      total: products.length,
      success: true,
    });
  } catch (error) {
    console.log(error);
    res
      .status(500)
      .json({ message: "Error in get Products APi", success: false });
  }
};
