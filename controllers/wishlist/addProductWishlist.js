import { Product } from "../../models/product.model.js";
import { Wishlist } from "../../models/wishlist.model.js";

// add a product in wishlist
export const addProductWishlist = async function (req, res) {
  try {
    const userId = req.id;
    let wishData = null;
    if (userId) {
      const prod = await Product.findByIdAndUpdate(
        req.params.id,
        { wishlistStatus: true },
        { new: true }
      );

      wishData = await Wishlist.create({
        productName: prod.name,
        product: req.params.id,
        userId: userId,
      });
    }

    return res.status(201).json({
      message: "Product Added in Wishlist",
      data: wishData,
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
