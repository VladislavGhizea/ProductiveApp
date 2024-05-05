"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const db_1 = __importDefault(require("../config/db"));
class RefreshToken extends sequelize_1.Model {
}
RefreshToken.init({
    token: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false,
        unique: true,
    },
    accessToken: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false,
    },
    userId: {
        type: sequelize_1.DataTypes.UUID,
        primaryKey: true,
        references: {
            model: "users",
            key: "id",
        },
    },
}, {
    sequelize: db_1.default,
    modelName: "refreshToken",
    timestamps: true,
    schema: "auth",
});
exports.default = RefreshToken;
