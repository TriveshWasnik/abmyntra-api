import { Router } from "express";
import { profileUsers } from "../controllers/user/profileUsers.js";
import { registerUser } from "../controllers/user/registerUser.js";
import { loginUser } from "../controllers/user/loginUser.js";
import { profileUser } from "../controllers/user/profileUser.js";
import { verifyJWT } from "../middlewares/auth.middleware.js";
import { updateUser } from "../controllers/user/updateUser.js";
import { deleteUser } from "../controllers/user/deleteUser.js";
import { logoutUser } from "../controllers/user/logoutUser.js";

const router = Router();
router.route("/register").post(registerUser);
router.route("/login").post(loginUser);
router.route("/logout").get(verifyJWT, logoutUser);
router.route("/delete").delete(verifyJWT, deleteUser);
router.route("/profile").get(verifyJWT, profileUser);
router.route("/update").put(verifyJWT, updateUser);

router.route("/profiles").get(profileUsers);

export default router;
