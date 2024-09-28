import { User } from "../../models/user.model.js";

// cart list user
export const cartListUser = async function (req, res) {
  try {
   const userJWT = req.user;
    const user = await User.findById(userJWT.id).populate({
      path: "cart.product",
      model: "Product",
    });
    const cartItems = user.cart;
    return res.status(200).json(cartItems);
  } catch (error) {
    console.log(error.message);
    res
      .status(400)
      .json({ message: "Error in Create a Add to Cart API", success: false });
  }
};

