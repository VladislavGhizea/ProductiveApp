import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
require("@dotenvx/dotenvx").config();

const { JWT_SECRET } = process.env;

export const authenticateJWT = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const token = req.headers.authorization?.split(" ")[1];

  if (token) {
    jwt.verify(token, JWT_SECRET!, (err, user) => {
      if (err) {
        return res.sendStatus(403);
      }
      next();
    });
  } else {
    res.sendStatus(401);
  }
};
