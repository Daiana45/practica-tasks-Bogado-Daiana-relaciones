import { startDB } from "./src/config/database.js";
import express from "express";
import { userRouter } from "./src/routes/user.routes.js";
import { taskRoutes } from "./src/routes/task.routes.js";

const app = express(); //guarda en app la funcion que se ejecuta de expressç
const PUERTO = 3000;

//para que entienda el formato json
app.use(express.json());

//configuracion de las rutas, cuando ya tenemos las rutas definidas.
app.use("/api",userRouter); //si recibe dos parametros primero recibe el de la ruta
app.use("/api", taskRoutes);

app.listen (PUERTO, async() => {
    await startDB()
    console.log(`servidor corriendo en el ${PUERTO}`)
});