import { User } from "../../models/user.model.js";

// add a product in wishlist
export const addProductWishlist = async function (req, res) {
  try {
   const { productId } = req.body;
    const userJWT = req.user;
    const user = await User.findById(userJWT.id);

    if (!user.favourites.includes(productId)) {
      user.favourites.push(productId);
      await user.save();
    }
    return res.status(201).json({
      message: "Product Added in Wishlist",
      data: user.favourites,
      success: true,
    });
  } catch (error) {
    console.log(error.message);
    res.status(400).json({
      message: "Error in Add Product in a Wishlist API",
      success: false,
      error,
    });
  }
};
