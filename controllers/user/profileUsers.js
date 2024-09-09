import { User } from "../../models/user.model.js";

// get all Users Profile
export const profileUsers = async function (req, res) {
  try {
    const users = await User.find({})
      .select("-password")
      .sort({ createdAt: -1 });

    return res.status(200).json({
      users,
      message: `Numbers of Users Found:${users.length}`,
      success: true,
    });
  } catch (error) {
    console.log(error);
  }
};
