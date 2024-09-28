
import { Order } from "../../models/order.model.js";

// Order list user
export const orderListUser = async function (req, res) {
  try {
   
   const user = req.user;
    const orders = await Orders.find({ user: user.id });
    return res.status(200).json(orders);
   
  } catch (error) {
    console.log(error.message);
    res
      .status(400)
      .json({ message: "Error in Create a Add to Cart API", success: false });
  }
};
