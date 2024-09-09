// update User Profile

import { User } from "../../models/user.model.js";

export const updateUser = async function (req, res) {
  try {
    let { name, email, phoneNumber } = req.body;
    const userId = req.id;
    // check user exist or not
    let user = await User.findById(userId);
    if (!user) {
      res.status(400).json({ message: "User not found", success: false });
    }

    // updating the data
    if (name) user.name = name;
    if (email) user.email = email;
    if (phoneNumber) user.phoneNumber = phoneNumber;

    const updataUserData = await user.save();

    return res.status(200).json({
      data: updataUserData,
      message: "User Profile Updated",
      success: true,
    });
  } catch (error) {
    console.log(error);
  }
};
