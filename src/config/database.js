import { Sequelize } from "sequelize";

export const sequelize = new Sequelize("tasks_users_db", "root", "",{
    host: "localhost",
    dialect: "mysql"
});

//testeamos la conexion.
export const startDB = async() => { //creamos una funcion que cumple la responsabilidad de preparar la conexion con la base de datos antes de que la aplicacion empiece a trabar con ella.
    try{
    await sequelize.authenticate();
    await sequelize.sync({force:false});//force:false significa no le estamos pidiendo que elimine y vuelva a crear las tablas//force: true puede eliminar las tablas existentes y volverlas a crear.
    console.log("conexion a la base de datos");
} catch(error) {
    console.log("error al conectarse al servidor:", error);
}
}
