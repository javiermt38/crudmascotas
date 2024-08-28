const express = require('express');
const Servicio = require('../models/servicio');

const router = express.Router();

// Obtener todos los servicios
router.get("/", async(req, res)=>{
    try {
        const arrayServicios = await Servicio.find();
        res.render("servicios", {arrayServicios})
    } catch (error) {
        console.log(error)
    }
});

router.get("/crearservicio", (req, res)=>{
    res.render('crear_servicio');
});

// Crear un nuevo servicio
router.post('/', async (req, res) => {
    const body = req.body;
    try {
        await Servicio.create(body)
        res.redirect('/servicios')
    } catch (error) {
        console.log('error: ', error)
    }
});

// Obtener un servicio por ID
router.get('/:id', async (req, res) => {
    const id = req.params.id;
    try {
        const servicioDB = await Servicio.findOne({_id: id })
        res.render('detalle_servicio', { 
            servicio: servicioDB,
            error: false
         });
    } catch (error) {
        console.log('error: ', error)
        res.render('detalle_servicio',{
            error: true,
            mensaje: "No se encontró ningún registro qué coincida con el id"
        })
    }
});

// Editar un servicio
// Servicio Router (corregido)
router.put('/:id', async (req, res) => {
    const { id } = req.params;
    const body = req.body;
  
    try {
      // Validación de datos (opcional)
      if (!body.servicio || !body.descripcion) {
        return res.status(400).json({
          estado: false,
          mensaje: 'Falta información requerida'
        });
      }
  
      const servicioDB = await Servicio.findByIdAndUpdate(
        id,
        body,
        { new: true } // Devuelve el documento actualizado
      );
  
      if (!servicioDB) {
        return res.status(404).json({
          estado: false,
          mensaje: 'Servicio no encontrado'
        });
      }
  
      res.json({
        estado: true,
        mensaje: 'Servicio actualizado',
        servicio: servicioDB
      });
    } catch (error) {
      console.error(error);
      res.status(500).json({
        estado: false,
        mensaje: 'Error al actualizar el servicio'
      });
    }
  });

// Eliminar un servicio
router.delete("/:id", async (req, res)=>{
    const id = req.params.id;
    try {
        const servicioDB = await Servicio.findByIdAndDelete({ _id: id })
        if (!servicioDB) {
            res.json({
                estado: false,
                mensaje: "No fue posible eliminar el registro"
            })
            
        } else {
            res.json({
                estado: true,
                mensaje: "Registro eliminado!!!"
            })
        }
    } catch (error) {
        console.log('error: ', error)
    }
});

module.exports = router;