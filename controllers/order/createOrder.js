import { Order } from "../../models/order.model.js";
import { Cart } from "../../models/cart.model.js";
import { sendMail } from "../../util/nodemailer.js";

// create a new category
export const createOrder = async function (req, res) {
  try {
    const {
      shippingName,
      shippingAddress1,
      shippingAddress2,
      shippingCountry,
      shippingState,
      shippingCity,
      shippingPincode,
      shippingPhone,
      shippingEmail,
      totalAmount,
      paymentMethod,
      paymentStatus,
      paymentKey,
      shippingCharges,
    } = req.body;

    const userId = req.id;
    const countOrder = await Order.countDocuments();
    const countCart = await Cart.countDocuments({
      userId,
      orderStatus: "add to cart",
    });

    // saved order
    const orderId = `ORDXXXX00${countOrder}`;
    let savedOrder = null;
    if (countCart > 0) {
      savedOrder = await Order.create({
        orderId: orderId,
        shippingName: shippingName,
        shippingAddress1: shippingAddress1,
        shippingAddress2: shippingAddress2,
        shippingCountry: shippingCountry,
        shippingState: shippingState,
        shippingCity: shippingCity,
        shippingPincode: shippingPincode,
        shippingEmail: shippingEmail,
        shippingPhone: shippingPhone,
        paymentKey: paymentKey,
        paymentStatus: paymentStatus,
        paymentMethod: paymentMethod,
        shippingCharges: shippingCharges,
        subTotalAmount: totalAmount,
        grandTotalAmount: totalAmount,
        userId: userId,
      });
    }

    // update the cart items
    const updatedCart = await Cart.updateMany(
      { userId, orderStatus: "add to cart" },
      { $set: { orderStatus: "confirm", orderId } }
    );

    const existingCartItem = await Cart.find({
      orderId: savedOrder.orderId,
    }).populate(
      "productId",
      "name productImage1 description weight weightType mrpPrice sellingPrice"
    );

    const emailHTML = emailHTML(
      savedOrder.orderId,
      savedOrder.shippingName,
      savedOrder.shippingAddress1,
      savedOrder.shippingAddress2,
      savedOrder.shippingCity,
      savedOrder.shippingState,
      savedOrder.shippingCountry,
      savedOrder.shippingPincode,
      savedOrder.shippingPhone,
      savedOrder.shippingEmail,
      savedOrder.orderDate,
      existingCartItem,
      savedOrder.subTotalAmount,
      savedOrder.shippingCharges
    );

    await sendMail(
      shippingEmail,
      "Order Confirmation",
      "Order Details With Invoice",
      emailHTML
    );

    return res.status(200).json({
      order: savedOrder,
      cart: updatedCart,
      success: true,
    });
  } catch (error) {
    console.log(error);
    res
      .status(500)
      .json({ message: "Error in create Category API", success: false });
  }
};

function emailHTML(
  orderId,
  shippingName,
  shippingAddress1,
  shippingAddress2,
  shippingCity,
  shippingState,
  shippingCountry,
  shippingPincode,
  shippingPhone,
  shippingEmail,
  orderDate,
  existingCartItem,
  subTotalAmount,
  shippingCharges
) {
  return `<div class="row">
<div class="col-xs-12">
    <div class="container-fluid">
        <table width="99%" border="0" align="center" cellpadding="0" cellspacing="0" style="font-size: 12px; border: 1px solid #eee;">
            <tbody>
                <tr>
                    <td style="border-bottom: 1px solid #eee; height: 24px; font-size: 14px;" align="center"><strong>TAX INVOICE</strong></td>
                </tr>
                <tr>
                    <td width="50%" valign="top" style="border-bottom: 1px solid #eee; padding: 8px; line-height: 20px;">
                        <table width="100%" border="0" cellspacing="0" cellpadding="0">
                            <tbody>
                                <tr>
                                    <td width="49%"><strong>Company Name :</strong> ABMyntra<br>
                                        <strong>Address:</strong> Rz-453T-block Mankapur Nagpur - 440001<br>
                                        <strong>Phone no.: </strong>+917972353612<br>
                                        <strong>Email: </strong>customercare@abmyntra.com<br>
                                        <strong>GSTIN:</strong>  123idkei39ei0712f
                                    </td>
                                    <td width="51%" align="right"><h1>ABMyntra</h1></td>
                                </tr>
                            </tbody>
                        </table>
                    </td>
                </tr>
                <tr>
                    <td>
                        <table width="100%" border="0" cellspacing="0" cellpadding="0">
                            <tbody>
                                <tr>
                                    <th width="50%" height="24" style="border-bottom: 1px solid #eee; border-right: 1px solid #eee; padding: 8px; font-size: 12px;">SHIPPING ADDRESS</th>
                                    <th width="50%" align="right" style="border-bottom: 1px solid #eee; padding: 8px;  font-size: 12px;">Invoice No.: ${orderId}</th>
                                </tr>
                                <tr>
                                    <td width="50%" valign="top" style="border-bottom: 1px solid #eee; border-right: 1px solid #eee; padding: 8px; line-height: 20px;  font-size: 12px;">
                                        <p>
                                            <strong>Name:</strong> ${shippingName}<br>
                                            <strong>Address:</strong> ${shippingAddress1},${shippingAddress2},${shippingCity},${shippingState},${shippingCountry}-${shippingPincode}<br>
                                            <strong>Phone no.: </strong>${shippingPhone}<br>
                                            <strong>Email: </strong>${shippingEmail}
                                        </p>
                                    </td>
                                    <td width="50%" align="right" valign="top" style="border-bottom: 1px solid #eee; padding: 8px; line-height: 20px;  font-size: 12px;">
                                        <p><strong>Date: ${orderDate}</strong></p>
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                    </td>
                </tr>
                <tr style="border-bottom: 1px solid #eee; border-right: 1px solid #eee;">
                    <td>
                        <table width="100%" border="0" cellspacing="0" cellpadding="0">
                            <tbody>
                                <tr>
                                    <td width="5%" height="24" align="center" style="border-bottom: 1px solid #eee; border-right: 1px solid #eee; background: #CCC;  font-size: 12px;"><strong>S.NO.</strong></td>
                                    <td style="border-bottom: 1px solid #eee; border-right: 1px solid #eee; background: #CCC;  font-size: 12px;" width="29%" align="center"><strong>PRODUCT DESCRIPTION</strong></td>
                                    <td width="12%" align="center" style="border-bottom: 1px solid #eee; border-right: 1px solid #eee;  font-size: 12px; background: #CCC;"><strong>HSN/ SAC</strong></td>
                                    <td style="border-bottom: 1px solid #eee; border-right: 1px solid #eee;  font-size: 12px; background: #CCC;" width="15%" align="center"><strong>Qty</strong></td>
                                    <td style="border-bottom: 1px solid #eee; border-right: 1px solid #eee;  font-size: 12px; background: #CCC;" width="15%" align="center"><strong>Price Per Product</strong></td>
                                    <td style="border-bottom: 1px solid #eee;  font-size: 12px; background: #CCC;" width="12%" align="center"><strong>Total Price</strong></td>
                                </tr>
                                ${existingCartItem.map(
                                  (rescart, index) =>
                                    `<tr>
                                  <td width="5%" height="24" align="center" style={{ borderBottom: '1px solid black', borderRight: '1px solid black', fontFamily: 'Arial, Helvetica, sans-serif', fontSize: '12px' }}>&nbsp;${
                                    index + 1
                                  }</td>
                                  <td style={{ borderBottom: '1px solid black', borderRight: '1px solid black', fontFamily: 'Arial, Helvetica, sans-serif', fontSize: '12px' }} width="29%" align="center">&nbsp;${
                                    rescart.productName
                                  }</td>
                                  <td style={{ borderBottom: '1px solid black', borderRight: '1px solid black', fontFamily: 'Arial, Helvetica, sans-serif', fontSize: '12px' }} width="15%" align="center">&nbsp;HSN</td>
                                  <td style={{ borderBottom: '1px solid black', borderRight: '1px solid black', fontFamily: 'Arial, Helvetica, sans-serif', fontSize: '12px' }} width="15%" align="center">&nbsp;${
                                    rescart.productQuantity
                                  }</td>
                                  <td style={{ borderBottom: '1px solid black', borderRight: '1px solid black', fontFamily: 'Arial, Helvetica, sans-serif', fontSize: '12px' }} width="12%" align="center">&nbsp;${
                                    rescart.productId.sellingPrice
                                  }</td>
                                  <td style={{ borderBottom: '1px solid black', fontFamily: 'Arial, Helvetica, sans-serif', fontSize: '12px' }} width="12%" align="center">&nbsp;${
                                    rescart.productId.sellingPrice *
                                    rescart.productQuantity
                                  }</td>
                                </tr>`
                                )}
                                <tr>
                                    <td colspan="3" align="center" style="border-bottom: 1px solid #eee; border-right: 1px solid #eee; background: #CCC; font-family: sans-serif; font-size: 14px; font-weight: bold;">Total</td>
                                    <td colspan="3" style="border-bottom: 1px solid #eee;  background: #CCC; font-size: 14px; font-weight: bold;" width="15%" align="center">${subTotalAmount}</td>
                                </tr>
                            </tbody>
                        </table>
                    </td>
                </tr>
                <tr>
                    <td>
                        <table width="100%" border="0" cellspacing="0" cellpadding="0">
                            <tbody>
                                <tr>
                                    <td width="20%" valign="top" style="padding: 8px 6px; font-family: sans-serif; font-size: 12px; display: flex; justify-content: space-between;">
                                        <strong>Sub Total :</strong> ${subTotalAmount} INR
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                    </td>
                </tr>
                <tr>
                    <td>
                        <table width="100%" border="0" cellspacing="0" cellpadding="0">
                            <tbody>
                                <tr style="border-top: 1px solid #eee;">
                                    <td width="20%" valign="top" style="padding: 8px 6px; font-family: sans-serif; font-size: 12px; display: flex; justify-content: space-between;">
                                        <strong>Shipping Charges :</strong>  ${shippingCharges} INR
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                    </td>
                </tr>
                <tr>
                    <td>
                        <table width="100%" border="0" cellspacing="0" cellpadding="0">
                            <tbody>
                                <tr style="border-top: 1px solid #eee;">
                                    <td width="20%" valign="top" style="padding: 8px 6px; font-family: sans-serif; font-size: 12px; display: flex; justify-content: space-between;">
                                        <strong>Grand Total :</strong> ${subTotalAmount} INR
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                    </td>
                </tr>
            </tbody>
        </table>
    </div>
</div>
</div>`;
}
