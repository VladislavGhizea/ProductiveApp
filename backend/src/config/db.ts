import { Sequelize } from "sequelize";
require("@dotenvx/dotenvx").config();
const { PGDB } = process.env;
const sequelize = new Sequelize(PGDB!, {
  dialect: "postgres",
  logging: (msg) => console.log(msg),
});
export default sequelize;
