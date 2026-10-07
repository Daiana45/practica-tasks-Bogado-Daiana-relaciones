import { sequelize } from "../config/database.js";
import { DataTypes } from "sequelize";
import { UserModel } from "./user.models.js";

export const PersonModel = sequelize.define(
    "Person", {
    id:{
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement:true, //crea un modelo de sequelize
},
    Lastname:{
        type: DataTypes.STRING(100),
        allowNull:false, //no debe tener un valor nulo.
        unique: true, //debe ser unico.
    },
});
