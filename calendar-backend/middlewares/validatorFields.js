const { response } = require('express');
const { validationResult } = require('express-validator');

const validatorFields = (req, res = response, next) =>{

    //manejo de errores
    const errors = validationResult(req);
    if( !errors.isEmpty() ){
        return res.status(400).json({
            ok: false,
            errors: errors.mapped()
        })
    }

    //si no hay error se llama el next
    next();
}

module.exports = {
    validatorFields
}