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
const express_1 = __importDefault(require("express"));
const index_router_1 = __importDefault(require("./routes/index.router"));
const user_model_1 = __importDefault(require("./models/user.model"));
const refreshToken_model_1 = __importDefault(require("./models/refreshToken.model"));
const app = (0, express_1.default)();
const { PORT } = process.env;
app.use(express_1.default.json());
app.use("/", index_router_1.default);
app.listen(PORT, () => __awaiter(void 0, void 0, void 0, function* () {
    console.log(`Server running on port ${PORT}`);
    user_model_1.default.hasMany(refreshToken_model_1.default, { foreignKey: "userId" });
    refreshToken_model_1.default.belongsTo(user_model_1.default, { foreignKey: "userId" });
    yield user_model_1.default.sync({ force: true });
    yield refreshToken_model_1.default.sync({ force: true });
}));
