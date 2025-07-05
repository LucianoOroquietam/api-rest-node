const Article = require("../models/article-model");
const { validateArticle } = require("../helpers/validate");
const fs = require("fs");
const path = require("path");

// Ruta de prueba
const test = (req, res) => {
    console.log("Se ha ejecutado el endpoint test");

    return res.status(200).json({
        nombre: "Luciano Oroquieta",
        carrera: "Tudai",
        genero: "Masculino",
        correo: "oroquietaluciano@gmail.com"
    });
};

// Obtener todos los articulos
const getArticles = async (req, res) => {
    try {
        const articles = await Article.find();
        return res.status(200).json({
            status: "success",
            articles
        });
    } catch (error) {
        return res.status(500).json({
            status: "failed",
            message: "Error al obtener los artículos"
        });
    }
};

// Obtener articulo por ID
const getArticlesById = async (req, res) => {
    try {
        const id = req.params.id;
        const article = await Article.findById(id);

        if (!article) {
            return res.status(404).json({
                status: "error",
                message: "Artículo no encontrado"
            });
        }

        return res.status(200).json({
            status: "success",
            article
        });
    } catch (error) {
        return res.status(500).json({
            status: "error",
            message: "Error al buscar el artículo",
            error: error.message
        });
    }
};

// Crear articulo
const createArticle = async (req, res) => {
    const params = req.body;

    try {
        validateArticle(params);

        const article = new Article(params);
        const savedArticle = await article.save();

        return res.status(201).json({
            status: "success",
            article: savedArticle
        });
    } catch (error) {
        return res.status(400).json({
            status: "Bad request - error 400",
            message: error.message || "No se ha guardado el artículo"
        });
    }
};

// Editar articulo
const editArticle = async (req, res) => {
    const articleId = req.params.id;
    const params = req.body;

    try {
        validateArticle(params);

        const updatedArticle = await Article.findOneAndUpdate(
            { _id: articleId },
            params,
            { new: true }
        );

        if (!updatedArticle) {
            return res.status(404).json({
                status: "Error 404",
                message: "No se encontró el artículo para actualizar"
            });
        }

        return res.status(200).json({
            status: "success",
            article: updatedArticle
        });
    } catch (error) {
        return res.status(400).json({
            status: "Bad request - Error 400",
            message: error.message || "No se ha editado el artículo"
        });
    }
};

// Eliminar articulo
const deleteArticle = async (req, res) => {
    const id = req.params.id;

    try {
        const deletedArticle = await Article.findOneAndDelete({ _id: id });

        if (!deletedArticle) {
            return res.status(404).json({
                status: "not found",
                message: `No se encontró el artículo con ID: ${id}`
            });
        }

        return res.status(200).json({
            status: "success",
            message: `El artículo con ID: ${id} ha sido eliminado con éxito`
        });
    } catch (error) {
        return res.status(400).json({
            status: "Bad request - error 400",
            message: error.message || "No se ha eliminado el artículo"
        });
    }
};

//subir archivo
const uploadFile = async (req, res) => {
    //configurar multer(middlware a una ruta en concreto)

    //recoger el fichero subido 
    if (!req.file && !req.files) {
        return res.status(404).json({
            status: "error",
            message: "Peticion invalida"
        })
    }
    console.log(req.file)

    //conseguir nombre del archivo o de la imagen
    let nameFile = req.file.originalname;

    //conseguir la extension
    let fileExtension = nameFile.split('.').pop().toLowerCase();

    const allowedExtensions = ["png", "jpg", "jpeg", "webp", "gif"];

    if (!allowedExtensions.includes(fileExtension)) {
        fs.unlink(req.file.path, (error) => {
            if (error) {
                console.error("Error al borrar archivo inválido:", error);
            }
            return res.status(400).json({
                status: "error",
                message: "Archivo inválido"
            });
        });
    } else {
        //si todo va bien , actualizamos el articulo al cual subo la img 

        const articleId = req.params.id;

        try {
            //chequear nombre en model 
            const updatedArticle = await Article.findOneAndUpdate(
                { _id: articleId },
                { imagen: req.file.filename },
                { new: true }
            );

            if (!updatedArticle) {
                return res.status(404).json({
                    status: "Error 404",
                    message: "No se encontró el artículo para actualizar"
                });
            }

            return res.status(200).json({
                status: "success",
                article: updatedArticle,
                fichero: req.file
            });
        } catch (error) {
            return res.status(400).json({
                status: "Bad request - Error 400",
                message: error.message || "No se ha editado el artículo"
            });
        }
    }
};

//obtener la imagen
const getImage = (req, res) => {
    let fichero = req.params.fichero;
    let ruta_fisica = "./images/articles/" + fichero;

    fs.stat(ruta_fisica, (err, stats) => {
        if (!err && stats.isFile()) {
            return res.sendFile(path.resolve(ruta_fisica));
        } else {
            return res.status(404).json({
                status: "404 Not Found",
                message: "La imagen no existe",
                stats,
                fichero,
                ruta_fisica
            });
        }
    });
};
module.exports = {
    test,
    createArticle,
    getArticles,
    getArticlesById,
    deleteArticle,
    editArticle,
    uploadFile,
    getImage
};
