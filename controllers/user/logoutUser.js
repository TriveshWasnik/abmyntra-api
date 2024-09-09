//logout user
export const logoutUser = async function (req, res) {
  try {
    return res
      .status(200)
      .cookie("token", "", { maxAge: 0, httpOnly: true, secure: true })
      .json({ message: "User logged out successfully", success: true });
  } catch (error) {
    console.log(error);
  }
};
