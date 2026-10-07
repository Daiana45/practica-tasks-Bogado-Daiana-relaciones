import { sequelize } from "../config/database.js";
import { DataTypes } from "sequelize";
import { UserModel } from "./user.models.js";

export const RoleModel = sequelize.define(
    "Role", {
    RoleName:{
    type: DataTypes.INTEGER(100),
    allowNull: false,
},
    }
);