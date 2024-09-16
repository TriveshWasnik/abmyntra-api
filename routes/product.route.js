import { Router } from "express";
import { isAdmin, verifyJWT } from "../middlewares/auth.middleware.js";
import { upload } from "../middlewares/multer.middleware.js";
import { createProduct } from "../controllers/product/createProduct.js";
import { listProduct } from "../controllers/product/listProduct.js";
import { singleProduct } from "../controllers/product/singleProduct.js";
import { deleteProduct } from "../controllers/product/deleteProduct.js";
import { updateProduct } from "../controllers/product/updateProduct.js";
import { listProductByCategory } from "../controllers/product/listProductByCategory.js";

const router = Router();

router.route("/create").post(
  verifyJWT,
  isAdmin,
  upload.fields([
    { name: "productImage1", maxCount: 1 },
    { name: "productImage2", maxCount: 1 },
    { name: "productImage3", maxCount: 1 },
    { name: "productImage4", maxCount: 1 },
  ]),
  createProduct
);

router.route("/all").get(listProduct);
router.route("/:id").get(singleProduct);
router.route("/:id").delete(verifyJWT, isAdmin, deleteProduct);

router.route("/:id").put(
  verifyJWT,
  isAdmin,
  upload.fields([
    { name: "productImage1", maxCount: 1 },
    { name: "productImage2", maxCount: 1 },
    { name: "productImage3", maxCount: 1 },
    { name: "productImage4", maxCount: 1 },
  ]),
  updateProduct
);

router.route("/:id/wishlist").put(verifyJWT, updateWishlistStatus);

router.route("/products-category/:id").get(listProductByCategory);

export default router;
