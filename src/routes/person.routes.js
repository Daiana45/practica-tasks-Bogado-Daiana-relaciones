import { Router } from "express";
import {
    createPerson,
    getPersons
} from "../controllers/person.controller.js";

export const personRouter = Router();

personRouter.post("/persons", createPerson); //Eso significa que el router ya contiene /persons en cada ruta.

personRouter.get("/persons", getPersons);