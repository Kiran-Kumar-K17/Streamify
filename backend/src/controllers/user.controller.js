import { User } from "../models/user.model.js";
import { v4 as uuidv4 } from "uuid";
import { setUser, getUser } from "../utils/auth.js";

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

    const sessionID = uuidv4();
    setUser(sessionID, user);
    res.cookie("uid", sessionID);
    return res.redirect("/dashboard");
  } catch (error) {
    res.status(500).json({
      message: "Internal Server Error",
    });
  }
};

export { signupUser, loginUser };
