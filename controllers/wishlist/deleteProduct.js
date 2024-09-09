import { Product } from "../../models/product.model.js";
import { Wishlist } from "../../models/wishlist.model.js";

// delete a product in wishlist
export const deleteProductFromWishlist = async function (req, res) {
  try {
    const userId = req.id;

    if (userId) {
      const prod = await Product.findByIdAndUpdate(
        req.params.id,
        { wishlistStatus: false },
        { new: true }
      );

      const wishProduct = await Wishlist.findOne({ productName: prod.name });
      await wishProduct.deleteOne();
    }

    return res.status(201).json({
      message: "Product Deleted from Wishlist",
      // data: wishlistStatus,
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
