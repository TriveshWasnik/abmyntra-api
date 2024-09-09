import { Router } from "express";
import { addProductWishlist } from "../controllers/wishlist/addProduct.js";
import { verifyJWT } from "../middlewares/auth.middleware.js";
import { deleteProductFromWishlist } from "../controllers/wishlist/deleteProduct.js";
import { listWishProduct } from "../controllers/wishlist/listWishlist.js";
const router = Router();

router.route("/addProduct/:id").put(verifyJWT, addProductWishlist);
router.route("/deleteProduct/:id").put(verifyJWT, deleteProductFromWishlist);
router.route("/list").get(verifyJWT, listWishProduct);
export default router;
