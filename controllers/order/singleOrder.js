import { Cart } from "../../models/cart.model.js";
import { Order } from "../../models/order.model.js";

export const singleOrder = async function (req, res) {
  try {
    const orderId = req.params.id;
    const order = await Order.findById(orderId);
    if (!order) {
      return res
        .status(400)
        .json({ message: "Order not found", success: false });
    }

    const existingCart = await Cart.find({ orderId: order.orderId }).populate(
      "productId",
      "name productImage1 description weight weightType mrpPrice sellingPrice"
    );

    return res
      .status(200)
      .json({ data: { order, existingCart }, success: true });
  } catch (error) {
    console.log(error.message);
    res
      .status(400)
      .json({ message: "Error in Single Order API", success: false });
  }
};
