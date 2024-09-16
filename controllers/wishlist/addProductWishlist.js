import { Product } from "../../models/product.model.js";
import { Wishlist } from "../../models/wishlist.model.js";

// add a product in wishlist
export const addProductWishlist = async function (req, res) {
  try {
    const userId = req.id;
    console.log(userId);

    if (userId) {
      const prod = await Product.findByIdAndUpdate(
        req.params.id,
        { wishlistStatus: true },
        { new: true }
      );
      await Wishlist.create({
        productName: prod.name,
        productId: req.params.id,
        userId: req.id,
      });
    }

    return res.status(201).json({
      message: "Product Added in Wishlist",
      // data: wishlistStatus,
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
