const express = require("express");
const router = express.Router();
const controllerArticle = require("../controllers/article-controllers")


//testeo
router.get("/test",controllerArticle.test);


//rutas originales
router.get("/",controllerArticle.getArticles);
router.get("/articles",controllerArticle.getArticles);
router.get("/articles/:id",controllerArticle.getArticlesById);
router.delete("/articles/:id", controllerArticle.deleteArticle);
router.put("/articles/:id", controllerArticle.editArticle);


router.post("/create",controllerArticle.createArticle);





module.exports = router;