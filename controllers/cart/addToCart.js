import { Cart } from "../../models/cart.model.js";

// add to cart product
export const addToCart = async function (req, res) {
  try {
    const { productName, productId, productQuantity, orderStatus, orderId } =
      req.body;

    const userId = req.id;

    const existingCartItem = await Cart.findOne({
      productId,
      userId,
      orderStatus: "add to cart",
    });

    if (existingCartItem) {
      existingCartItem.productQuantity += productQuantity;
      await existingCartItem.save();
      return res.status(200).json({
        message: "Product Added to Cart Successfully",
        data: existingCartItem,
        success: true,
      });
    } else {
      const addProduct = await Cart.create({
        productName,
        productId,
        productQuantity,
        userId,
      });
      return res.status(200).json({
        message: "Product Added to Cart Successfully",
        data: addProduct,
        success: true,
      });
    }
  } catch (error) {
    console.log(error.message);
    res
      .status(400)
      .json({ message: "Error in Create a Add to Cart API", success: false });
  }
};
