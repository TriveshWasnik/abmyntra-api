import { Router } from "express";
import { isAdmin, verifyJWT } from "../middlewares/auth.middleware.js";
import { addToCart } from "../controllers/cart/addToCart.js";
import { cartCount } from "../controllers/cart/cartCount.js";
import { deleteFromCart } from "../controllers/cart/deleteFromCart.js";
import { updateCartQuantity } from "../controllers/cart/updateCartQuantity.js";
import { cartListUser } from "../controllers/cart/cartListUser.js";
import { cartListAdmin } from "../controllers/cart/cartListAdmin.js";
const router = Router();

router.route("/addToCart").post(verifyJWT, addToCart);
router.route("/count").get(verifyJWT, cartCount);
router.route("/:id").delete(verifyJWT, deleteFromCart);
router.route("/update-quantity").put(verifyJWT, updateCartQuantity);
router.route("/cartlistuser").get(verifyJWT, cartListUser);
router.route("/cartlistadmin").get(verifyJWT, isAdmin, cartListAdmin);
export default router;
