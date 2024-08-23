const express = require('express')
const router = express.Router();

const Servicio = require('../models/servicio');


router.get("/", async(req, res)=>{
    try {
        const arrayServicios = await Servicio.find();
        // console.log(arrayServicios)
        res.render("servicios", {arrayServicios})
    } catch (error) {
        console.log(error)
    }
});

router.get("/crearservicio", (req, res)=>{
    res.render('crear_servicio');
});

module.exports = router;
