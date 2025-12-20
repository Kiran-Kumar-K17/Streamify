import { User } from "../models/user.model.js";

const signupUser = async (req, res) => {
  try {
    const { name, email, password } = req.body;
    if (!name || !email || !password) {
      return res.status(200).json({
        message: "Provide All The Information",
      });
    }
    await User.create({
      name,
      email,
      password,
    });
    res.redirect("/");
  } catch (error) {
    res.status(500).json({
      message: "Internal Server Error",
    });
  }
};

const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({
      email,
      password,
    });

    if (!user)
      return res.render("login", {
        error: "Invalid Username or Password",
      });
    return res.redirect("/");
  } catch (error) {
    res.status(500).json({
      message: "Internal Server Error",
    });
  }
};

export { signupUser, loginUser };
