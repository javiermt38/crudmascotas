const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const servicioSchema = new Schema({
    servicio: String,
    descripcion: String
});

/* creacion del modelo */
const Servicio = mongoose.model('Servicio', servicioSchema);
module.exports = Servicio;

