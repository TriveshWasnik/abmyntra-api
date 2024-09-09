import { Cart } from "../../models/cart.model.js";

// cart list admin
export const cartListAdmin = async function (req, res) {
  try {
    const cartListing = await Cart.find({})
      .populate(
        "productId",
        "name productImage1 description weight weightType mrpPrice sellingPrice"
      )
      .populate("userId", "name email phoneNumber")
      .sort({ createdAt: -1 });

    if (!cartListing) {
      return res.status(400).json({ message: "Cart is Empty", success: false });
    }

    return res.status(200).json({
      data: cartListing,
      success: true,
    });
  } catch (error) {
    console.log(error.message);
    res.status(400).json({
      message: "Error in Create Cart Listing Admin API",
      success: false,
    });
  }
};
