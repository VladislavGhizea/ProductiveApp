import { DataTypes, Model } from "sequelize";
import sequelize from "../config/db";

class RefreshToken extends Model {
  declare token: string;
  declare accessToken: string;
  declare userId: number;
}

RefreshToken.init(
  {
    token: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    accessToken: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    userId: {
      type: DataTypes.UUID,
      primaryKey: true,
      references: {
        model: "users",
        key: "id",
      },
    },
  },
  {
    sequelize,
    modelName: "refreshToken",
    timestamps: true,
    schema: "auth",
  }
);

export default RefreshToken;
