const Article = require("../models/article-model");
const { validateArticle } = require("../helpers/validate");

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

module.exports = {
    test,
    createArticle,
    getArticles,
    getArticlesById,
    deleteArticle,
    editArticle
};
