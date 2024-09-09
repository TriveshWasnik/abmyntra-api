//logout user
export const logoutUser = async function (req, res) {
  try {
    return res
      .status(200)
      .clearCookie("token", {
        httpOnly: true,
        secure: true,
        sameSite: "strict",
      })
      .json({ message: "User logged out successfully", success: true });
  } catch (error) {
    console.log(error);
  }
};
