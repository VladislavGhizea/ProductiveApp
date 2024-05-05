import { Router } from "express";
import authRouter from "./auth.router";
import { authenticateJWT } from "../middleware/auth.middleware";
import sequelize from "../config/db";
const router = Router();
router.use("/auth", authRouter);
router.get("/profile", authenticateJWT, (req, res) => {});
export default router;
