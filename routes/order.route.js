import { Router } from "express";
import { createOrder } from "../controllers/order/createOrder.js";
import { isAdmin, verifyJWT } from "../middlewares/auth.middleware.js";
import { orderListAdmin } from "../controllers/order/orderListAdmin..js";
import { orderListUser } from "../controllers/order/orderListUser.js";
import { singleOrder } from "../controllers/order/singleOrder.js";
const router = Router();

router.route("/create").post(verifyJWT, createOrder);
router.route("/orderlistadmin").get(verifyJWT, isAdmin, orderListAdmin);
router.route("/orderlistuser").get(verifyJWT, isAdmin, orderListUser);
router.route("/:id").get(verifyJWT, singleOrder);
export default router;
