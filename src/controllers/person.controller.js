import { PersonModel } from "../models/person.model.js";

export const createPerson = async (req, res) => {
    try {
        const { name, Lastname } = req.body;

        if (
            typeof name !== "string" ||
            name.trim() === "" ||
            name.length > 100
        ) {
            return res.status(400).json({
                message: "el nombre debe ser texto no vacio de hasta 100 caracteres",
            });
        }

        if (
            typeof Lastname !== "string" ||
            Lastname.trim() === "" ||
            Lastname.length > 100
        ) {
            return res.status(400).json({
                message: "el apellido debe ser texto no vacio de hasta 100 caracteres",
            });
        }

        const existingPerson = await PersonModel.findOne({ //busca el registro que cumpla con la condicion
            where: {name, Lastname },
        });

        if (existingPerson) {
            return res.status(400).json({
                message: "la persona ya esta registrado",
            });
        }

        const newPerson = await PersonModel.create({ //crea la persona
            name,
            Lastname,
        });

        return res.status(201).json({
            message: "persona creada correctamente",
            person: newPerson,
        });

    } catch (error) {
        return res.status(500).json({
            message: "error interno del servidor",
            error: error.message,
        });
    }
};

export const getPersons = async (req, res) => { 
    try { //aca no necesitamos ni req.params ni req.body porque pide todas
        const persons = await PersonModel.findAll(); //findall devuelve todos

        return res.status(200).json(persons); //los envia como respuesta

    } catch (error) {
        return res.status(500).json({
            message: "error interno del servidor",
            error: error.message,
        });
    }
};


//findOne → buscá un registro que cumpla una condición.findByPk → buscá un registro por su clave primaria.