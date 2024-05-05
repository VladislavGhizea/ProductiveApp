import { Router } from "express";
import {
  hashPassword,
  comparePasswords,
  generateTokens,
} from "../services/auth.service";
import { Request, Response } from "express";
import sequelize from "../config/db";
import { UUID } from "crypto";
import User from "../models/user.model";
import RefreshToken from "../models/refreshToken.model";
const router = Router();
//todo utilizzare HTTPS per la trasmissione dei dati
// validazione dati frontend
router.post("/register", async (req: Request, res: Response) => {
  try {
    const { username, password } = req.body;
    if (await User.findOne({ where: { username } })) {
      return res.status(400).json({ message: "Username already exists" });
    }
    const hashedPassword = await hashPassword(password);
    const id: UUID = await User.create({
      username,
      password: hashedPassword,
    }).then((user) => {
      return user.getDataValue("id");
    });
    const tokens = await generateTokens(id);
    return res.status(201).json({ message: "User created", ...tokens });
  } catch (error: unknown) {
    console.log(error);
    return res.status(500).json({ message: "Internal server error" });
  }
});

router.post("/login", async (req: Request, res: Response) => {
  try {
    const { username, password } = req.body;
    const user = await User.findOne({ where: { username } });
    if (!user || !(await comparePasswords(password, user.password))) {
      return res.status(400).json({ message: "Invalid username or password" });
    } else {
      const tokens = await generateTokens(user.id);
      return res.status(200).json({ message: "Login successful", ...tokens });
    }
  } catch (error: unknown) {
    console.log(error);
    return res.status(500).json({ message: "Internal server error" });
  }
});

export default router;
