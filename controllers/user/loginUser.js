/* Login User Controller function */

import { User } from "../../models/user.model.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

export const loginUser = async function (req, res) {
  // get user details from frontend
  const { name, email, password } = req.body;
  // check username or email
  if (!(name || email)) {
    return res
      .status(400)
      .json({ message: "username or email is required", success: false });
  }
  // find the user
  const user = await User.findOne({ $or: [{ name }, { email }] });
  if (!user) {
    return res
      .status(400)
      .json({ message: "User does not exist ", success: false });
  }

  // password check
  const isPasswordValid = await bcrypt.compare(password, user.password);
  if (!isPasswordValid) {
    return res
      .status(400)
      .json({ message: "Invalid Credentials", success: false });
  }

  // generate token
  const token = jwt.sign({ _id: user._id }, process.env.TOKEN_SECRET, {
    expiresIn: "15d",
  });

  return res
    .status(200)
    .cookie("token", token, {
      maxAge: new Date(Date.now() + 1 * 24 * 60 * 60 * 1000),
      httpOnly: true,
      secure: true,
      sameSite: "strict",
    })
    .json({
      data: user,
      message: "User Logged in successfully",
      success: true,
      token: token,
    });
};
