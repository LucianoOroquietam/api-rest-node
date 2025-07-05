const express = require("express");
const multer = require ("multer");
const router = express.Router();
const controllerArticle = require("../controllers/article-controllers")


const storageImg = multer.diskStorage({
    destination: (req,file,cb) => {
        //Destino de subida del archivo
        cb(null,'./images/articles/');
    },

    filename: (req,file,cb) => {
        cb(null,'articulo' + Date.now() + file.originalname);
    }
})


const upload = multer({storage: storageImg})

//testeo
router.get("/test",controllerArticle.test);


// rutas originales
router.get("/", controllerArticle.getArticles);
router.get("/articles", controllerArticle.getArticles);

// Rutas para busqueda con query params o por parametro 
router.get("/articles/search", controllerArticle.searchWithQuery);  // con query params
router.get("/search/:search", controllerArticle.search); 

router.get("/articles/:id", controllerArticle.getArticlesById);

router.delete("/articles/:id", controllerArticle.deleteArticle);
router.put("/articles/:id", controllerArticle.editArticle);
router.post("/create", controllerArticle.createArticle);

// Subida de archivos
router.post("/upload-file/:id", [upload.single("file")], controllerArticle.uploadFile);

// Obtener imágenes
router.get("/image/:fichero", controllerArticle.getImage);



module.exports = router;