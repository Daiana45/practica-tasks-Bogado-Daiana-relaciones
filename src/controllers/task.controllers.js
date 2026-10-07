import { PersonModel } from "../models/person.models.js";
import {Task} from "../models/task.models.js"
import { UserModel } from "../models/user.models.js";

export const createTask = async(req, res) => {
    try{
        const {title, description, isComplete} = req.body;
       
    const newTask = await Task.create({title, description, isComplete});
    return res.status(201).json({message:"la tarea se creo correctamente", Task: newTask,});
    } catch(error) {
        return res.status(500).json({message:"hubo un problema en el servido", error: error.message,});
    }
};

export const getTask = async(req, res) => {
    try{
        const task = await Task.findAll({
            include:[
                {
                    model: UserModel, //tiene que ser el modelo
                    as: "author", //debe ser el id,
                    attributes: {
                        exclude: ["password", "person_id"], //para excluir
                    },
                    include:[ //otro include para traer otras relaciones
                        {
                            model:PersonModel,
                            as:"owner",
                        },
                    ]
                },
            ]
           //attributes:["title", "description"] 
          // exclude: ["description"] o de esta manera
        }); //al findall hay que decirle que tambien traiga las relaciones.
        return res.status(201).json(task);
    } catch(error){
        return res.status(500).json({message:"error del servidor", error: error.message});
    }
};

export const getTasksById = async(req, res) => {
    try{
        const {id} = req.params;
        const task = await Task.findByPk(id);
        if (!task) {
            return res.status(404).json({message:"tarea no encontrada"});
        } 
        return res.status(200).json(task);
    } catch(error){
        return res.status(500).json({message:"error al obtener la tarea", error: error.message});
    }
};

export const deleteTask = async (req, res) => {
    try{
        const {id} = req.params;
        const task = await Task.findByPk(id);
        if(!task) {
            return res.status(404).json({message:"tarea no encontrada"});
        }
        await task.destroy();
        return res.status(200).json({message: "tarea eliminado con exito"});
    } catch (error) {
        return res.status(500).json({
            message: "Error al eliminar la tarea",
            error: error.message,
        });
    }
};

export const updateTask = async (req, res) => {
    try{
        const {id} = req.params;
        const {title, description, isComplete} = req.body;
        const task = await Task.findByPk(id);
        if(!task) {
            return res.status(404).json({message: "tarea no encontrada"});
        }
        if (typeof title !== "string" || title.trim() === "" || title.length > 100) {
      return res.status(400).json({
        message: "el titulo no debe ser texto no vacio de hasta 100 caracteres",
      });
    }
    if (
      typeof description !== "string" ||
      description.trim() === "" ||
      description.length > 100
    ) {
      return res.status(400).json({
        message: "la descripcion debe ser texto no vacio hasta 100 caracteres",
      });
    }
    if (
      typeof isComplete !== "boolean"
    ) {
      return res.status(400).json({
        message:
          "el estado de la tarea debe ser completo o incompleto",
      });
    }
    await task.update({title, description, isComplete });
        return res.status(200).json({
            message:"tarea actualizada",
            task,
        })
    } catch (error) {
        return res.status(500).json({
            message: "error al actualizar la tarea",
            error: error.message,
        });
    }
};