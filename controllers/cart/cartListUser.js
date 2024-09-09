import { Cart } from "../../models/cart.model.js";

// cart list user
export const cartListUser = async function (req, res) {
  try {
    const userId = req.id;

    const userCart = await Cart.find({
      userId,
      orderStatus: "add to cart",
    })
      .populate(
        "productId",
        "name productImage1 weight weightType mrpPrice sellingPrice"
      )
      .populate("userId", "name email phoneNumber");

    if (!userCart) {
      return res
        .status(400)
        .json({ message: "User Cart is Empty", success: false });
    }

    // calculate total amount and total item number
    let totalAmountWithDiscount = 0;
    let totalAmountWithoutDiscount = 0;
    let totalItems = 0;
    let totalDiscount = 0;

    userCart.forEach((item) => {
      totalAmountWithDiscount +=
        item.productQuantity * item.productId.sellingPrice;
      totalAmountWithoutDiscount +=
        item.productQuantity * item.productId.mrpPrice;
      totalItems = item.productQuantity;
      const discount = item.productId.mrpPrice - item.productId.sellingPrice;
      totalDiscount = discount * item.productQuantity;
    });

    const shippingCharges = calculate15Percent(totalAmountWithDiscount);

    return res.status(200).json({
      data: userCart,
      totalAmountWithDiscountSubtotal: totalAmountWithDiscount,
      totalAmountWithDiscount: totalAmountWithDiscount * shippingCharges,
      totalAmountWithoutDiscount,
      totalItems,
      totalDiscount,
      shippingCharges,
      success: true,
    });
  } catch (error) {
    console.log(error.message);
    res
      .status(400)
      .json({ message: "Error in Create a Add to Cart API", success: false });
  }
};

function calculate15Percent(totalAmount) {
  return totalAmount * 0.15;
}
