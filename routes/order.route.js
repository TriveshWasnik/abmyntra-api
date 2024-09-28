import { Router } from "express";
import { createOrder } from "../controllers/order/createOrder.js";
import {  verifyJWT } from "../middlewares/auth.middleware.js";

import { orderListUser } from "../controllers/order/orderListUser.js";

const router = Router();

router.route("/create").post(verifyJWT, createOrder);
router.route("/orderlistuser").get(verifyJWT, orderListUser);
export default router;
