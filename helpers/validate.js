const validator = require("validator");

const validateArticle = (params) => {
    if (!params) throw new Error("No se enviaron datos");

    const { titulo, contenido } = params;

    if (
        validator.isEmpty(titulo || "") ||
        !validator.isLength(titulo, { min: 2, max: 100 })
    ) {
        throw new Error("El título no es válido");
    }

    if (validator.isEmpty(contenido || "")) {
        throw new Error("El contenido no puede estar vacío");
    }

    return true;
};

module.exports = {
    validateArticle,
};
