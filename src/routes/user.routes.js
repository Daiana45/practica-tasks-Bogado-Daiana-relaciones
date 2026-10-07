import { Router } from "express";
import { createUser, deleteUsers, getAllUsers, getUserById, updateUsers } from "../controllers/user.controllers.js";


export const userRouter = Router(); //crea un router nuevo y lo exporta. Es el mismo userRouter que el archivo app.js monta con app.use("/api", userRouter)

userRouter.post("/users", createUser); //metodo post, recibe dos parametros; uno es la ruta a la que debe apuntar y el segundo es una funcion que tiene el res y req. la ruta completa es /api/users.
userRouter.get("/users", getAllUsers); //metodo post, recibe dos parametros; uno es la ruta a la que debe apuntar y el segundo es una funcion que tiene el res y req.
userRouter.get("/users/:id", getUserById); //metodo post, recibe dos parametros; uno es la ruta a la que debe apuntar y el segundo es una funcion que tiene el res y req.
userRouter.put("/users/:id", updateUsers); //metodo post, recibe dos parametros; uno es la ruta a la que debe apuntar y el segundo es una funcion que tiene el res y req.
userRouter.delete("/users/:id", deleteUsers); //metodo post, recibe dos parametros; uno es la ruta a la que debe apuntar y el segundo es una funcion que tiene el res y req.