import { Router } from "express";
import { createCategory } from "../controllers/category/createCategory.js";
import { upload } from "../middlewares/multer.middleware.js";
import { isAdmin, verifyJWT } from "../middlewares/auth.middleware.js";
import { listCategory } from "../controllers/category/listCategory.js";
import { listLevelOneCategory } from "../controllers/category/listLevelOneCategory.js";
import { singleCategory } from "../controllers/category/singleCategory.js";
import { deleteCategory } from "../controllers/category/deleteCategory.js";
import { updateCategory } from "../controllers/category/updateCategory.js";

const router = Router();

router
  .route("/create")
  .post(
    verifyJWT,
    isAdmin,
    upload.fields([{ name: "categoryPic", maxCount: 1 }]),
    createCategory
  );

router.route("/list").get(listCategory);

router.route("/levelone").get(listLevelOneCategory);
router.route("/:id").get(singleCategory);
router.route("/:id").delete(verifyJWT, isAdmin, deleteCategory);
router
  .route("/:id")
  .put(
    verifyJWT,
    isAdmin,
    upload.fields([{ name: "categoryPic", maxCount: 1 }]),
    updateCategory
  );

export default router;
