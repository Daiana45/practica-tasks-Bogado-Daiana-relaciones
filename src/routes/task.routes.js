import { Router } from "express";
import {createTask, getTask, getTasksById, deleteTask, updateTask } from "../controllers/task.controller.js"

export const taskRoutes = Router();
taskRoutes.post("/", createTask); //router.post responde al metodo http post(crear).
taskRoutes.get("/", getTask);
taskRoutes.get("/:id",getTasksById); //el id termina disponible el req.params.id
taskRoutes.delete("/:id", deleteTask); //introduce al metodo delete, id el numero de la tarea viene en la URL y deleteuser es la funcion que se ejecuta.
taskRoutes.put("/:id", updateTask);