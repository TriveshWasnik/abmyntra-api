//logout user
export const logoutUser = async function (req, res) {
  try {
    return res
      .status(200)
      .cookie("token", "", { maxAge: new Date(0) })
      .json({ message: "User logged out successfully", success: true });
  } catch (error) {
    console.log(error);
  }
};
