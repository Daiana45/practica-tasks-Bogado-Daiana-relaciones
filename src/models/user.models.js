import { DataTypes } from "sequelize"; //
import { sequelize, startDB } from "../config/database.js";

export const UserModel = sequelize.define(
    "User", //si el de arriba esta en mayuscula.
    {
        name:{
            type:DataTypes.STRING(100),
            allowNull: false,
        },
        email:{
            type: DataTypes.STRING(100),
            unique:true,
            allowNull: false,
        },
        password:{
            type:DataTypes.STRING(100),
            allowNull:false,
        },
    },
)