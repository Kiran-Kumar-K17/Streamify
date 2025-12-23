import { User } from "../models/user.model.js";
import { setUser, getUser } from "../utils/auth.js";

const signupUser = async (req, res) => {
  try {
    const { name, email, password, role } = req.body;
    if (!name || !email || !password || !role) {
      return res.status(200).json({
        message: "Provide All The Information",
      });
    }
    await User.create({
      name,
      email,
      password,
      role,
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

    const token = setUser(user);
    res.cookie("uid", token, {
      httpOnly: true,
      sameSite: "strict",
    });
    return res.redirect(user.role === "admin" ? "/admin" : "/dashboard");
  } catch (error) {
    console.error("Login error:", error);
    res.status(500).json({
      message: "Internal Server Error",
      error: error.message,
    });
  }
};

export { signupUser, loginUser };
