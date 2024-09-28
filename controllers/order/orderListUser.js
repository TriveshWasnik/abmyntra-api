
import { Order } from "../../models/order.model.js";

// Order list user
export const orderListUser = async function (req, res) {
  try {
   
   const user = req.user;
    const orders = await Order.find({ user: user.id });
    return res.status(200).json(orders);
   
  } catch (error) {
    console.log(error.message);
    res
      .status(400)
      .json({ message: "Error in Order list API", success: false });
  }
};
