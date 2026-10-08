import { sequelize } from "../config/database.js";
import { DataTypes } from "sequelize";

export const PersonModel = sequelize.define( //nombre en js PersonModel
    "Person", { //Person es el nombre del modelo de Sequelize 
    id:{
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement:true, //crea un modelo de sequelize
},
name:{
type:DataTypes.STRING(100),
allowNull: false,
},
    Lastname:{
        type: DataTypes.STRING(100),
        allowNull:false, //no debe tener un valor nulo.
        //unique: true, 
    },
});
