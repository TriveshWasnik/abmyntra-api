import { Router } from "express";
import { isAdmin, verifyJWT } from "../middlewares/auth.middleware.js";
import { addToCart } from "../controllers/cart/addToCart.js";
import { deleteFromCart } from "../controllers/cart/deleteFromCart.js";
import { cartListUser } from "../controllers/cart/cartListUser.js";
const router = Router();

router.route("/add").post(verifyJWT, addToCart);
router.route("/delete").delete(verifyJWT, deleteFromCart);
router.route("/cart").get(verifyJWT, cartListUser);
export default router;
