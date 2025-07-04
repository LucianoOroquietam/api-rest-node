const { connection, saludos } = require("./database/connection");
// const db = require("./database/connection");
const express = require("express");
const cors = require("cors");

console.log("App iniciada");

//conectarse a la db
connection();
saludos();


//crear servidor node
const app = express();
const puerto = 3900;

//configuramos cors
app.use(cors());

//convertir body a objeto js
app.use(express.json()); //recibir datos con content-type app/json

//si quiero recibir datos por un form
app.use(express.urlencoded(
  {extended:true} // recibo datos por form-urlencoded
));

//RUTAS
//crear rutas (req = peticion que yo hago y res = respuesta)
const rutas_articulos = require("./routes/articles");
app.use("/api", rutas_articulos);




//Crear servidor y escuchar peticiones http
app.listen(puerto, () => {
  console.log("servidor corriendo en el puerto " + puerto);
});
