const mongoose = require("mongoose");
const url = "mongodb://localhost:27017/blog";

const connection = async () => {
    try {
        await mongoose.connect(url);
        console.log("Conexión establecida a la DB");
    } catch (error) {
        console.log(error);
        throw new Error("No se ha podido establecer la conexión a la DB");
    }
}

module.exports = {
    connection
}
