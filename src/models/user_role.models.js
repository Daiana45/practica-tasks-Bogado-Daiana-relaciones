import { sequelize } from "../config/database.js";
import { DataTypes } from "sequelize";
import { UserModel } from "./user.models.js";
import { RoleModel } from "./role.models.js";

export const UserRoleModel = sequelize.define(
    "User_Role", {
    
},
    
);

//relaciones
//muchos a muchos
//troungh se relacionan a traves de
UserModel.belongsToMany(RoleModel,{
    through: UserRoleModel,
    foreignKey: "user_id",
    as:"roles"
} );

RoleModel.belongsToMany(UserModel,{
    through: UserRoleModel,
    foreignKey: "role_id",
    as: "users",
})