import { createRolService } from "../services/rol.service.js";

export const registerRol = async (req, res) => {
  try {
    const rolName = req.body;

    if(!rolName) {
      res.status(400).json({succsess: false, error: 'Ups..El rol no existe' });
    }

    // if(!rolName.length) {
    //   res.status(400).json({succsess: false, error: 'Ups.. El rol no debe estar vacio ni tener espacios en blanco'});
    // }
    
    const rolCreated = await createRolService(rolName)

    res.status(200).json({succsess: true, response: rolCreated, message: 'Rol creado con éxito'} )
  } catch (error) {
    res.status(400).json({succsess: false, error: error.message})
  }
}