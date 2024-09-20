import { Wishlist } from "../../models/wishlist.model.js";

// get all Wishlist Products
export const listWishProduct = async function (req, res) {
  try {
    const products = await Wishlist.find({})
      .populate("userId", "name email phoneNumber")
      .populate(
        "productId",
        "name productImage1 description weight weightType mrpPrice"
      );
    return res.status(200).json({
      data: products,
      total: products.length,
      success: true,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: "Error in get Wishlist List APi",
      success: false,
      error,
    });
  }
};
