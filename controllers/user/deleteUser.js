// update User Profile

import { User } from "../../models/user.model.js";

export const deleteUser = async function (req, res) {
  try {
    const userId = req.id;
    // check user exist or not
    let user = await User.findByIdAndDelete(userId);
    if (!user) {
      res.status(400).json({ message: "User not found", success: false });
    }

    return res.status(200).json({
      message: "User Deleted Successfully",
      success: true,
    });
  } catch (error) {
    console.log(error);
  }
};
