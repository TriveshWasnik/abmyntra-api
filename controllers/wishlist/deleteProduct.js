import { User } from "../../models/user.model.js";


// delete a product in wishlist
export const deleteProductFromWishlist = async function (req, res) {
  try {
     const { productId } = req.body;
    const userJWT = req.user;
    const user = await User.findById(userJWT.id);

    user.favourites = user.favourites.filter((fav) => !fav.equals(productId));
    await user.save();

    return res.status(201).json({
      message: "Product Deleted from Wishlist",
      data: user.favourites,
      success: true,
    });
  } catch (error) {
    console.log(error.message);
    res.status(400).json({
      message: "Error in Add Product in a Wishlist API",
      success: false,
    });
  }
};
