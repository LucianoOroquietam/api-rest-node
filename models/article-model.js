const { Schema, model } = require('mongoose');

const ArticuloSchema = Schema({
    titulo: {
        type: String,
        require: true //obligatorio
    },
    contenido: {
        type: String,
        require: true 
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