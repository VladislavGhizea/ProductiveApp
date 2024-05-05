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
const express_1 = require("express");
const auth_service_1 = require("../services/auth.service");
const user_model_1 = __importDefault(require("../models/user.model"));
const router = (0, express_1.Router)();
//todo utilizzare HTTPS per la trasmissione dei dati
// validazione dati frontend
router.post("/register", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { username, password } = req.body;
        if (yield user_model_1.default.findOne({ where: { username } })) {
            return res.status(400).json({ message: "Username already exists" });
        }
        const hashedPassword = yield (0, auth_service_1.hashPassword)(password);
        const id = yield user_model_1.default.create({
            username,
            password: hashedPassword,
        }).then((user) => {
            return user.getDataValue("id");
        });
        const tokens = yield (0, auth_service_1.generateTokens)(id);
        return res.status(201).json(Object.assign({ message: "User created" }, tokens));
    }
    catch (error) {
        console.log(error);
        return res.status(500).json({ message: "Internal server error" });
    }
}));
router.post("/login", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    // Gestione del login
}));
exports.default = router;
