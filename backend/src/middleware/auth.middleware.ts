import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import { RequestMiddleware, TokenPayload } from "../config/types";
require("@dotenvx/dotenvx").config();

const { JWT_SECRET } = process.env;
/**
 * Middleware function to authenticate JSON Web Tokens (JWT).
 * Adds the user ID to the request object if the token is valid.
 * @param req - The Express request object.
 * @param res - The Express response object.
 * @param next - The next middleware function.
 */
export const authenticateJWT = (
  req: RequestMiddleware,
  res: Response,
  next: NextFunction
) => {
  const token = req.headers.authorization?.split(" ")[1];

  if (!token) {
    return res.status(401).json({ message: "Authorization header is missing" });
  }

  jwt.verify(token, JWT_SECRET!, (err, payload) => {
    if (err) {
      return res.status(403).json({ message: "Invalid or expired token" });
    }

    // Aggiungi l'utente alla richiesta
    const payloadMiddleware = payload as TokenPayload;
    req.userId = payloadMiddleware.userId;
    next();
  });
};
