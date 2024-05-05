"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.comparePasswords = exports.hashPassword = exports.refreshAccessToken = exports.generateTokens = void 0;
const bcrypt_1 = __importDefault(require("bcrypt"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const refreshToken_model_1 = __importDefault(require("../models/refreshToken.model"));
require("@dotenvx/dotenvx").config();
const { JWT_SECRET, REFRESH_TOKEN_SECRET } = process.env;
const generateTokens = (payload) => __awaiter(void 0, void 0, void 0, function* () {
    const accessToken = jsonwebtoken_1.default.sign({ data: payload }, JWT_SECRET, {
        expiresIn: "1h",
    });
    const refreshToken = jsonwebtoken_1.default.sign({ data: payload }, REFRESH_TOKEN_SECRET, {
        expiresIn: "7d",
    });
    // Memorizza il token di aggiornamento nel database
    yield new refreshToken_model_1.default({
        token: refreshToken,
        accessToken,
        userId: payload,
    }).save();
    return { accessToken, refreshToken };
});
exports.generateTokens = generateTokens;
const refreshAccessToken = (refreshToken) => __awaiter(void 0, void 0, void 0, function* () {
    const storedToken = yield refreshToken_model_1.default.findOne({
        where: { token: refreshToken },
    });
    if (!storedToken) {
        return null;
    }
    const payload = jsonwebtoken_1.default.verify(refreshToken, REFRESH_TOKEN_SECRET);
    const newAccessToken = jsonwebtoken_1.default.sign(payload, JWT_SECRET, { expiresIn: "1h" });
    // Aggiorna il token di accesso memorizzato nel database
    storedToken.accessToken = newAccessToken;
    yield storedToken.save();
    return newAccessToken;
});
exports.refreshAccessToken = refreshAccessToken;
const hashPassword = (password) => __awaiter(void 0, void 0, void 0, function* () {
    return bcrypt_1.default.hash(password, 10);
});
exports.hashPassword = hashPassword;
const comparePasswords = (password, hash) => __awaiter(void 0, void 0, void 0, function* () {
    return bcrypt_1.default.compare(password, hash);
});
exports.comparePasswords = comparePasswords;
