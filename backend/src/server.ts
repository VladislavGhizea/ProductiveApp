import express from "express";
import indexRouter from "./routes/index.router";
import sequelize from "./config/db";
import User from "./models/user.model";
import RefreshToken from "./models/refreshToken.model";
const app = express();
const { PORT } = process.env;

app.use(express.json());
app.use("/", indexRouter);

app.listen(PORT, async () => {
  console.log(`Server running on port ${PORT}`);
  User.hasMany(RefreshToken, { foreignKey: "userId" });
  RefreshToken.belongsTo(User, { foreignKey: "userId" });
  await User.sync({ force: true });
  await RefreshToken.sync({ force: true });
});
