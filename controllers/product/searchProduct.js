import { Product } from "../../models/product.model.js";

export const searchProduct = async function (req, res) {
  try {
    const searchTerm = req.params.name;

    // search in product collection
    const productResults = await Product.find({
      $or: [{ name: { $regex: searchTerm, $options: "i" } }],
    });

    return res.status(200).json({
      data: productResults,
      success: true,
    });
  } catch (error) {
    console.log(error);
    res
      .status(500)
      .json({ message: "Error in get Products APi", success: false });
  }
};
