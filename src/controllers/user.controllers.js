import { where } from "sequelize";
import { UserModel } from "../models/user.models.js"; //importa el modelo de usuatio, que es lo que nos permite hacer operaciones sobre la tabla.

export const createUser = async (req, res) => { //es una funcion flecha que recibe por parametro req y res. Maneja la creacion de un usuario, Desestructura del objeto lo que mando el cliente.
   //export nombrado. Nos permite exportar varias funciones del mismo archivo y se importa con llaves. crea un usuario, async la funcion es asincrona porque habla con la base de datos y eso tarda.
    try{
    const {name, email, password} = req.body; //desestructuramos el objeto para validar. 
if(typeof name !== "string" || name.trim() === "" || name.lenght>100) {
          //typeof name !== "string" no es texto. name.trim() === "" esta vacio o solo tiene espacios, trim() quita los espacios y name.length > 100 supera los 100 caracteres permitidos.
return res.status (400).json({message:"el nombre debe ser texto no vacio hasta los 100 caracteres"}); //si los datos no son validos, el codigo HTTP 400 Bad Request(el cliente mando algo incorrecto) y .json({message:...}) cuerpo de la respuesta en JSON con un mensaje claro.
}
 if (
      typeof email !== "string" ||
      email.trim() === "" ||
      email.length > 100
    ) {
      return res.status(400).json({
        message: "el email debe ser texto no vacio de hasta 100 caracteres",
      });
    }
    if (
      typeof password !== "string" ||
      password.trim() === "" ||
      password.length > 100
    ) {
      return res.status(400).json({
        message:
          "la contraseña debe ser texto no vacio de hasta 100 caracteres",
      });
    }
    const existingUser = await User.findOne({ where: { email } }); //findOne busca un registro, where:{email} es la condicion y await espera el resultado de la base.
    if (existingUser) {
      return res.status(400).json({ message: "el email ya esta registrado" });
    }
    const newUser = await User.create({ name, email, password }); //user.create({..}) hace el INSERT y devueñve el registro creado, con su id.
    return res.status(201).json({
      //201 created: el codigo correcto cuando se crea un recurso.
      message: "Usuario creado correctamente", //mensaje exitoso.
      user: newUser,
    });
} catch(error) {
    console.log(error); //le muestra al programador el error.
    return res.status(500).json({message:"error interno del servidor"}); //todo se termina aqui con el return.
 }
}

export const getAllUsers = async (req, res) => { //es una funcion flecha que recibe por parametro req y res.
 try{
    const user = await User.findAll();
    return res.status (200).json(users);
} catch(error) {
    console.log(error); //le muestra al programador el error.
    return res.status(500).json({message:"error interno del servidor"}); //todo se termina aqui con el return.
 }
}

export const getUserById  = async (req, res) => { //es una funcion flecha que recibe por parametro req y res.
 try{
    const {id} = req.params;
    const user = await User.findByPk(id); 
    if(!user) {
        return res.status(404).json({message:"usuario no encontrado"});
    }
    return res.status(200).json(user);

} catch(error) {
    console.log(error); //le muestra al programador el error.
    return res.status(500).json({message:"error interno del servidor"}); //todo se termina aqui con el return.
 }
}

export const updateUsers = async (req, res) => { //es una funcion flecha que recibe por parametro req y res.
 try{
    const {id} = req.params;
    const {name, email, password} = req.body; //saca del json los tres datos que manda el usuario.
    const user = await User.findByPk(id); //busca en la base el usuario con ese numero,si no existe queda null.
    if(!user) {
        return res.status(404).json({message:"usuario no encontrado"});
    }
    if (typeof name !== "string" || name.trim() === "" || name.lenght > 100) {
        return res.status(400).json({message:"el nombre no debe ser texto no vacio de hasta 100 caracteres"});
    }
    if (typeof email !== "string" || email.trim() === "" || email.length > 100) {
        return res.status(400).json({message:"el email debe ser texto no vacio hasta 100 caracteres"});
    }
    if (typeof password !== "string" || password.trim() === "" || password.length >100) {
        return res.status(400).json({message:"la contraseña debe ser texto no vacio hasta 100 caracteres"});
    }
    const emailInUse = await User.findOne({where:{email}});
    if (emailInUse && emailInUse.id !== user.id) {
        return res.status(400).json({message:"el email ya esta registrado"});
    }
    await user.update({name, email,password});
    return res.status(200).json({message:"Usuario actualizado correctamente", user});
} catch(error) {
    console.log(error); //le muestra al programador el error.
      //500 significa que el servidor encontro una condicion inesperada que le impidio procesar la solicitud, pero no especifica la solicitud.
    return res.status(500).json({message:"error interno del servidor"}); //todo se termina aqui con el return.
 }
}

export const deleteUsers = async (req, res) => { //es una funcion flecha que recibe por parametro req y res.
 try{
const {id} = req.params; //saca el numero de la URL.
    const user = await UserModel.findByPk(id); //busca en la base de datos el usuario con ese nombre.

    if(!user) {
        return res.status(404).json({message:"usuario no eliminado"});
    }
    await user.destroy(); //borra ese usuario de la base.Solo se llega aca si el usuario existe.
    return res.status(200).json({message:"usuario eliminado con exito"});

} catch(error) {
    console.log(error); //le muestra al programador el error.
    return res.status(500).json({message:"error interno del servidor", error}); //todo se termina aqui con el return.
 }
};