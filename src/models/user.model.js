import { DataTypes } from "sequelize"; //
import { sequelize } from "../config/database.js";
import { PersonModel } from "./person.model.js";

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
        person_id:{
            type: DataTypes.INTEGER,
            allowNull:false,
            unique: true,
            references:{ //person_id referencia al id de la tabla person
                model: "Person",
                key: "id",
            },
        },
    }
);

//relaciones
//uno a uno
//belongsTo un usuario pertenece a una persona
UserModel.belongsTo(PersonModel, {foreignKey: "person_id", as:
    "owner"
});

//foreignkey: person_id es la columna que conecta ambos modelos
//una persona puedde tener un usuario.
//hasone una persona tiene un usuario
PersonModel.hasOne(UserModel, {foreignKey:"person_id", as:
    "user"
});