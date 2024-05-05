"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
require("@dotenvx/dotenvx").config();
const { PGDB } = process.env;
const sequelize = new sequelize_1.Sequelize(PGDB, {
    dialect: "postgres",
    logging: (msg) => console.log(msg),
});
exports.default = sequelize;
