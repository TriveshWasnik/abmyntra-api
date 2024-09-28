import { User } from "../../models/user.model.js";

// get all Wishlist Products
export const listWishProduct = async function (req, res) {
  try {
    const userId = req.user.id;
    const user = await User.findById(userId).populate("favourites").exec();
    
    return res.status(200).json({
     data: user.favourites,
      success: true,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: "Error in get Wishlist List API",
      success: false,
      error,
    });
  }
};
