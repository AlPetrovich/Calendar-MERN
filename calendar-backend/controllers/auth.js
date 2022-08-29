const { response } = require('express');
const { validationResult } = require('express-validator');

//* create user
const createUser = (req, res = response) =>{
    const { name, email, password } = req.body;
    
    //manejo de errores
    const errors = validationResult(req);
    if( !errors.isEmpty() ){
        return res.status(400).json({
            ok: false,
            errors: errors.mapped()
        })
    }

    res.status(201).json({
        ok: true,
        msg: 'registro',
        name,
        email,
        password
    })
}


//* login user
const loginUser =(req, res = response) =>{
    
    const { email, password } = req.body;

    const errors = validationResult(req);
    if( !errors.isEmpty()){
        return res.status(400).json({
            ok: false,
            errors: errors.mapped()
        })
    }

    res.json({
        ok: true,
        msg: 'login',
        email,
        password
    })
}


const renewToken = (req, res = response) =>{
    console.log('se requiere /');
    res.json({
        ok: true,
        msg: 'renew'
    })
}

module.exports = {
    createUser,
    loginUser,
    renewToken
}