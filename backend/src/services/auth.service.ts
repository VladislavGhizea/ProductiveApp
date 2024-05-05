import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import RefreshToken from "../models/refreshToken.model";
require("@dotenvx/dotenvx").config();

const { JWT_SECRET, REFRESH_TOKEN_SECRET } = process.env;

export const generateTokens = async (
  payload: any
): Promise<{ accessToken: string; refreshToken: string }> => {
  const accessToken = jwt.sign({ data: payload }, JWT_SECRET!, {
    expiresIn: "1h",
  });
  const refreshToken = jwt.sign({ data: payload }, REFRESH_TOKEN_SECRET!, {
    expiresIn: "7d",
  });

  // Memorizza il token di aggiornamento nel database
  await new RefreshToken({
    token: refreshToken,
    accessToken,
    userId: payload,
  }).save();

  return { accessToken, refreshToken };
};

export const refreshAccessToken = async (
  refreshToken: string
): Promise<string | null> => {
  const storedToken = await RefreshToken.findOne({
    where: { token: refreshToken },
  });

  if (!storedToken) {
    return null;
  }

  const payload = jwt.verify(refreshToken, REFRESH_TOKEN_SECRET!);
  const newAccessToken = jwt.sign(payload, JWT_SECRET!, { expiresIn: "1h" });

  // Aggiorna il token di accesso memorizzato nel database
  storedToken.accessToken = newAccessToken;
  await storedToken.save();

  return newAccessToken;
};

export const hashPassword = async (password: string): Promise<string> => {
  return bcrypt.hash(password, 10);
};

export const comparePasswords = async (
  password: string,
  hash: string
): Promise<boolean> => {
  return bcrypt.compare(password, hash);
};
