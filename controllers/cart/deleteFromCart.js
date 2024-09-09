import { Cart } from "../../models/cart.model.js";

// delete product From Cart
export const deleteFromCart = async function (req, res) {
  try {
    const cartItem = await Cart.findByIdAndDelete(req.params.id);

    if (!cartItem) {
      return res
        .status(400)
        .json({ message: "Cart Item not found", success: false });
    }

    return res.status(200).json({
      message: `Cart items deleted successfully `,
      success: true,
    });
  } catch (error) {
    console.log(error.message);
    res
      .status(400)
      .json({ message: "Error in Cart Item Delete API", success: false });
  }
};
