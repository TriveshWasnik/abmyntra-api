import { Order } from "../../models/order.model.js";

// order list admin
export const orderListAdmin = async function (req, res) {
  try {
    const orderListing = await Order.find({})
      .populate("userId", "name email phoneNumber")
      .sort({ createdAt: -1 });

    return res.status(200).json({
      data: orderListing,
      success: true,
    });
  } catch (error) {
    console.log(error.message);
    res.status(400).json({
      message: "Error in Order Listing Admin API",
      success: false,
    });
  }
};
