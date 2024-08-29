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

/* router para recibir datos del formulario crear */
router.post("/", async (req, res)=>{
  const body = req.body;
  // console.log(body);
  try {
      await Servicio.create(body)
      res.redirect('/servicio')
  } catch (error) {
      console.log('error: ', error)
  }
});

/* router para editar un documento */
router.get("/:id", async (req, res)=>{
  const id = req.params.id;
  try {
      const servicioDB = await Servicio.findOne({_id: id })
      // console.log(mascotaDB)
      res.render('detalle_servicio',{
          servicio: servicioDB,
          error: false
      })
  } catch (error) {
      console.log('error: ', error)
      res.render('detalle_servicio',{
          error: true,
          mensaje: "No se encontró ningún registro qué coincida con el id"
      })
  }
});

/* router para borrar un documento */
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

/* router para actualizacion */
router.put('/:id', async(req, res) => {
  const id = req.params.id;
  const body = req.body;
  // console.log(body);
  try {
      const servicioDB = await Servicio.findByIdAndUpdate(
          id, body, { useFindAndModify: false }
      )
      res.json({
          estado: true,
          mensaje: 'Servicio Editado'
      })
      
  } catch (error) {
      console.log(error);
      res.json({
          estado: false,
          mensaje: 'Edicion fallida'
      })
  }

});

module.exports = router;
