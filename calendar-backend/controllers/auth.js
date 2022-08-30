const { response } = require('express');
const User = require('../models/User');

//* create user
const createUser = async(req, res = response) =>{

    // const { name, email, password } = req.body;
    try {
        const user = new User(req.body);
    
        await user.save();
    
        res.status(201).json({
            ok: true,
            msg: 'registro',
        })
        
    } catch (error) {
        res.status(500).json({
            ok: false,
            msg: 'Por favor hable con el administrador.',
        })
    }
}


//* login user
const loginUser =(req, res = response) =>{
    
    const { email, password } = req.body;

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