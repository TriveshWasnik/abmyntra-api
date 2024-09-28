import { Order } from "../../models/order.model.js";
import { User } from "../../models/user.model.js";
import { sendMail } from "../../util/nodemailer.js";

// create a new category
export const createOrder = async function (req, res) {
  try {
   const { products, address, totalAmount } = req.body;
    const userJWT = req.user;
    const user = await User.findById(userJWT.id);
    const order = new Orders({
      products,
      user: user._id,
      total_amount: totalAmount,
      address,
    });
    await order.save();
    user.cart.save();
    user.cart = [];
    await user.save();


    return res.status(200).json({
     message: "Order placed successfully", order, 
      success: true,
    });
  } catch (error) {
    console.log(error);
    res
      .status(500)
      .json({ message: "Error in create Order API", success: false, error });
  }
};

