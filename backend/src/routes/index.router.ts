import { Router } from "express";
import authRouter from "./auth.router";
import { authenticateJWT } from "../middleware/auth.middleware";
import sequelize from "../config/db";
import { RequestMiddleware } from "../config/types";
import User from "../models/user.model";
const router = Router();
router.use("/auth", authRouter);
router.get("/profile", authenticateJWT, async (req, res) => {
  const reqMiddleware = req as RequestMiddleware;
  try {
    const user = await User.findOne({ where: { id: reqMiddleware.userId } });
    if (user) {
      return res.json({ username: user.username });
    } else {
      return res.status(404).json({ message: "User not found" });
    }
  } catch (error) {
    console.error(error);
    return res
      .status(500)
      .json({ message: "An error occurred while retrieving the user" });
  }
});
export default router;
