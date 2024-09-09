import bcrypt from "bcryptjs";
import { User } from "../../models/user.model.js";

/* Register User */
export const registerUser = async function (req, res) {
  try {
    // get user details from frontend
    const { name, email, phoneNumber, password } = req.body;

    // validation - not empty field
    if (!name || !email || !phoneNumber || !password) {
      return res
        .status(400)
        .json({ message: "All fields are required", success: "false" });
    }

    // check if user already exists
    const existUser = await User.findOne({ $or: [{ name }, { email }] });
    if (existUser) {
      return res.status(400).json({
        message: "Username or email already exists ",
        success: "false",
      });
    }

    // convert the password into hash code
    const hashPassword = await bcrypt.hash(password, 10);

    // create user
    const user = await User.create({
      name,
      email,
      phoneNumber,
      password: hashPassword,
    });

    // check for user creation
    if (!user) {
      return res.status(500).json({
        message: "something wemt wrong while registering the user",
        success: "false",
      });
    }

    return res.status(201).json({
      data: user,
      message: "User registered successfully",
      success: true,
    });
  } catch (error) {
    console.log(error);
    return res
      .status(500)
      .json({ message: "Error in Registering User", success: false, error });
  }
};
