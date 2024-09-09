import { Product } from "../../models/product.model.js";

// delete category
export const deleteProduct = async function (req, res) {
  try {
    const product = await Product.findById(req.params.id);
    if (!product) {
      return res
        .status(400)
        .json({ message: "Product not found", success: false });
    }
    await product.deleteOne();
    return res.status(200).json({ message: "Product Deleted!", success: true });
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
