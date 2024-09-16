import { Product } from "../../models/product.model.js";

// update existing category
export const updateWishlistStatus = async function (req, res) {
  try {
    const updateProduct = await Product.findByIdAndUpdate(
      req.params.id,
      { $set: { wishlistStatus: true } },
      { new: true }
    );

    if (!updateProduct) {
      return res
        .status(400)
        .json({ message: "Product Not Found", success: false });
    }

    return res.status(200).json({
      message: "Wishlist Status Updated!",
      data: updateProduct,
      success: true,
    });
  } catch (error) {
    console.log(error);
  }
};
