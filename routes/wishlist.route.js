import { Router } from "express";

import { verifyJWT } from "../middlewares/auth.middleware.js";
import { deleteProductFromWishlist } from "../controllers/wishlist/deleteProduct.js";
import { listWishProduct } from "../controllers/wishlist/listWishlist.js";
import { addProductWishlist } from "../controllers/wishlist/addProductWishlist.js";
const router = Router();

router.route("/addwishlist").post(verifyJWT, addProductWishlist);
router.route("/deleteProduct").put(verifyJWT, deleteProductFromWishlist);
router.route("/list").get(verifyJWT, listWishProduct);
export default router;
