const express = require('express')
const router = express.Router();

/* enrutamiento */
router.get('/', (req, res) => {
    res.render('index', {titulo: "Bienvenido a Node.js con Express y con EJS"});
})

// router.get("/servicios", async(req, res)=>{
//     try {
//         const arrayServicios = await Servicio.find();
//         // console.log(arrayServicios)
//         res.render("servicios", {arrayServicios})
//     } catch (error) {
//         console.log(error)
//     }
// });

module.exports = router;


    