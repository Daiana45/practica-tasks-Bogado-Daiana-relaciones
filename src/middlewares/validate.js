import { validationResult } from "express-validator" 

//son las mismas lineas que las del controlador.
export const validate = (req, res, next) => { //recoge todos los errores que quedaron guardados en req por express-validator
    const errors = validationResult(req);
    if(!errors.isEmpty()) { //si hay errores
        //errors es el resultado completo que maneja express-validator, array() lo convierte en un array de errores
        return res.status(400).json(errors.array()); //para que no nos envie el de errors ponemos .array(), o mapped o tambien
        //abajo del if
        //const custom = errors.formatWith((err) => {
            // return `${err.msg}`};);
           // return res.status(400).json(custom.array());
    }
    next(); //no encontro errores, continua con el siguiente middleware/controlador
};