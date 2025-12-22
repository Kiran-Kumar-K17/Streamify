import { getUser } from "../utils/auth.js";

async function restrictToLoggedinUserOnly(req, res, next) {
  const userId = req.cookies?.uid;

  if (!userId) return res.redirect("/login");
  const user = await getUser(userId);

  if (!user) return res.redirect("/login");

  req.user = user;
  next();
}

function restrictToAdminOnly(req, res, next) {
  if (req.user.role !== "admin") {
    return res.status(403).send("Admins only");
  }
  next();
}

export { restrictToLoggedinUserOnly, restrictToAdminOnly };
