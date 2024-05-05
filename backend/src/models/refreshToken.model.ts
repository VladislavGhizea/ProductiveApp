import { DataTypes, Model } from "sequelize";
import sequelize from "../config/db";

class RefreshToken extends Model {
  declare token: string;
  declare accessToken: string;
  declare userId: number;
  declare expiry: Date;
  declare expiryAccess: Date;
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
      references: {
        model: "users",
        key: "id",
      },
    },
    expiry: {
      type: DataTypes.DATE,
      allowNull: false,
    },
    expiryAccess: {
      type: DataTypes.DATE,
      allowNull: false,
    },
  },
  {
    sequelize,
    modelName: "refreshToken",
    timestamps: false,
    schema: "auth",
  }
);

export default RefreshToken;
