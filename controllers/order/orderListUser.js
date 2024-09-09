import { Cart } from "../../models/cart.model.js";
import { Order } from "../../models/order.model.js";

// Order list user
export const orderListUser = async function (req, res) {
  try {
    const userId = req.id;

    const orderList = await Order.find({ userId });

    if (!orderList || orderList.length === 0) {
      return res
        .status(400)
        .json({ message: "No Order Found", success: false });
    }

    const orderWithTotalItems = await Promise.all(
      orderList.map(async (order) => {
        // Fetch cart items for each order
        const cartInfo = await Cart.find({ orderId: order.orderId });
        // calculate total items
        let totalItems = 0;
        cartInfo.forEach((item) => {
          totalItems = item.productQuantity;
        });
        return {
          orderId: order.orderId,
          userName: order.shippingName,
          orderDate: order.orderDate,
          orderStatus: order.orderStatus,
          grandTotalAmount: order.grandTotalAmount,
          totalItems: totalItems,
        };
      })
    );

    return res.status(200).json({
      data: orderWithTotalItems,
      success: true,
    });
  } catch (error) {
    console.log(error.message);
    res
      .status(400)
      .json({ message: "Error in Create a Add to Cart API", success: false });
  }
};
