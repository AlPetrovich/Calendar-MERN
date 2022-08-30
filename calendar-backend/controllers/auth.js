const { response } = require('express');
const bcrypt = require('bcryptjs');
const User = require('../models/User');

//* create user
const createUser = async(req, res = response) =>{

     const { email, password } = req.body;

    try {
        let user = await User.findOne( { email } );
        if(user){
            return res.status(400).json({
                ok: false,
                msg: 'User already exists'
            });
        }
        //si el usuario no existe se graba en base de datos
        user = new User(req.body);
        //encriptar contraseña
        const salt = bcrypt.genSaltSync();
        user.password = bcrypt.hashSync( password, salt );
        
        await user.save();
    
        res.status(201).json({
            ok: true,
            uid: user._id,
            name: user.name,
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