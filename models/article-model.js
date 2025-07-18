const { Schema, model } = require('mongoose');

const ArticuloSchema = Schema({
    titulo: {
        type: String,
        required: true //obligatorio
    },
    contenido: {
        type: String,
        required: true 
    },
    fecha: {
        type: Date,
        default: Date.now // opcional: pone la fecha actual por defecto
    },
    imagen: {
        type: String,
        default: "default.png"
    },
})

//con esto logramos usar este modelo haciendo Article.metodo()

module.exports = model("ArticleModel", ArticuloSchema);