import jwt from "jsonwebtoken";
import { User } from "../models/user.model.js";
export const verifyJWT = async function (req, res, next) {
  try {
    // get the token from browser cookie
    const token = req?.cookies?.token;

    // check the token
    if (!token) {
      return res.status(401).json({
        message: "Unauthorized User",
        success: false,
      });
    }

    // decode the  token
    const decodedToken = jwt.verify(token, process.env.TOKEN_SECRET);

    const user = await User.findById(decodedToken?._id).select("-password");

    if (!user) {
      return res.status(401).json({ message: "Invalid Token", success: false });
    }
    // token userId copied in request
    req.id = user._id;
    req.user = user;

    next();
  } catch (error) {
    console.log(error);
  }
};

export const isAdmin = async function (req, res, next) {
  try {
    if (req.user && req.user.isAdmin === true) {
      next();
    } else {
      res
        .status(401)
        .json({ message: "Not authorized as an admin", success: false });
    }
  } catch (error) {
    console.log(error);
  }
};
