import { Cart } from "../../models/cart.model.js";

// update Cart Quantity
export const updateCartQuantity = async function (req, res) {
  try {
    const { cartItemId, newQuantity } = req.body;
    const userId = req.id;

    const existingCartItem = await Cart.findOne({ _id: cartItemId, userId });

    if (!existingCartItem) {
      return res
        .status(400)
        .json({ message: "Cart Item not found", success: false });
    }

    existingCartItem.productQuantity = newQuantity;
    await existingCartItem.save();

    return res.status(200).json({
      message: "Cart items Product Quantity Updated successfully ",
      success: true,
    });
  } catch (error) {
    console.log(error.message);
    res
      .status(400)
      .json({ message: "Error in Update Cart Quantity API", success: false });
  }
};
