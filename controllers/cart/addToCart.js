import { User } from "../../models/user.model.js";

// add to cart product
export const addToCart = async function (req, res) {
  
  try {
     const { productId, quantity } = req.body;
    const userJWT = req.user;
    const user = await User.findById(userJWT.id);
    const existingCartItemIndex = user.cart.findIndex((item) =>
      item?.product?.equals(productId)
    );
    if (existingCartItemIndex !== -1) {
      // Product is already in the cart, update the quantity
      user.cart[existingCartItemIndex].quantity += quantity;
    } else {
      // Product is not in the cart, add it
      user.cart.push({ product: productId, quantity });
    }
    await user.save();

      return res.status(200).json({
        message: "Product Added to Cart Successfully",
        data: user.cart,
        success: true,
      });
    }
  

  catch (error) {
    console.log(error);
    res
      .status(400)
      .json({ message: "Error in Create a Add to Cart API", success: false, error });
  }

};
