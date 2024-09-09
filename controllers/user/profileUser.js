import { User } from "../../models/user.model.js";

// get User Profile
export const profileUser = async function (req, res) {
  try {
    const userId = req.id;
    const user = await User.findById(userId).select(
      "-password -status -isAdmin"
    );
    if (!user) {
      return res
        .status(400)
        .json({ message: "User not Found", success: false });
    }
    return res
      .status(200)
      .json({ data: user, message: "User Found", success: true });
  } catch (error) {
    console.log(error);
  }
};
