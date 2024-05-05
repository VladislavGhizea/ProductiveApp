import cron from "node-cron";
import { Op } from "sequelize";
import RefreshToken from "../models/refreshToken.model";
import { Sequelize } from "sequelize";
require("@dotenvx/dotenvx").config();
const { PGDB } = process.env;
const sequelize = new Sequelize(PGDB!, {
  dialect: "postgres",
});

// Esegui il lavoro ogni giorno a mezzanotte
cron.schedule("0 0 * * *", async () => {
  const now = new Date();
  await RefreshToken.destroy({
    where: {
      [Op.or]: [
        {
          expiry: {
            [Op.lt]: now, // lt sta per "less than"
          },
        },
        {
          expiryAccess: {
            [Op.lt]: now, // lt sta per "less than"
          },
        },
      ],
    },
  });
  console.log("Expired refresh and access tokens removed");
});
export default sequelize;
