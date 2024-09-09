import { Cart } from "../../models/cart.model.js";

// Count cart product
export const cartCount = async function (req, res) {
  try {
    const userId = req.id;
    const userCart = await Cart.find({ userId, orderStatus: "add to cart" });

    if (!userCart) {
      return res
        .status(400)
        .json({ message: "User cart is empty", success: false });
    }

    let totalItems = 0;

    userCart.forEach((cartItem) => {
      totalItems += cartItem.productQuantity;
    });

    return res.status(200).json({
      message: `Total Cart Count is ${totalItems} `,
      count: totalItems,
      success: true,
    });
  } catch (error) {
    console.log(error.message);
    res
      .status(400)
      .json({ message: "Error in Cart Count API", success: false });
  }
};
