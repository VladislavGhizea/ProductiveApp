import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import RefreshToken from "../models/refreshToken.model";
require("@dotenvx/dotenvx").config();

const { JWT_SECRET, REFRESH_TOKEN_SECRET } = process.env;

/**
 * Generates access and refresh tokens for the given payload.
 * @param payload - The payload to be included in the tokens.
 * @returns An object containing the access and refresh tokens.
 */
export const generateTokens = async (
  payload: any
): Promise<{ accessToken: string; refreshToken: string }> => {
  const now = new Date();
  const accessTokenExpiry = new Date(now.getTime() + 60 * 60 * 1000); // 1 ora in futuro
  const refreshTokenExpiry = new Date(now.getTime() + 7 * 24 * 60 * 60 * 1000); // 7 giorni in futuro
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
    expiry: refreshTokenExpiry,
    expiryAccess: accessTokenExpiry,
  }).save();

  return { accessToken, refreshToken };
};

/**
 * Refreshes the access token using the provided refresh token.
 * @param refreshToken - The refresh token to be used for generating a new access token.
 * @returns The new access token or null if the refresh token is invalid.
 */
export const refreshAccessToken = async (
  refreshToken: string
): Promise<string | null> => {
  const storedToken = await RefreshToken.findOne({
    where: { token: refreshToken },
  });

  if (!storedToken) {
    return null;
  }
  const now = new Date();
  const accessTokenExpiry = new Date(now.getTime() + 60 * 60 * 1000); // 1 ora in futuro
  const payload = jwt.verify(refreshToken, REFRESH_TOKEN_SECRET!);
  const newAccessToken = jwt.sign(payload, JWT_SECRET!, { expiresIn: "1h" });

  // Aggiorna il token di accesso memorizzato nel database
  storedToken.accessToken = newAccessToken;
  storedToken.expiryAccess = accessTokenExpiry;
  await storedToken.save();

  return newAccessToken;
};

/**
 * Hashes the provided password using bcrypt.
 * @param password - The password to be hashed.
 * @returns The hashed password.
 */
export const hashPassword = async (password: string): Promise<string> => {
  return bcrypt.hash(password, 10);
};

/**
 * Compares the provided password with the provided hash using bcrypt.
 * @param password - The password to be compared.
 * @param hash - The hash to be compared against.
 * @returns True if the password matches the hash, false otherwise.
 */
export const comparePasswords = async (
  password: string,
  hash: string
): Promise<boolean> => {
  return bcrypt.compare(password, hash);
};
