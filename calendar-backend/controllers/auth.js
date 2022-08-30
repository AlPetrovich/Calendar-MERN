const { response } = require('express');
const bcrypt = require('bcryptjs');
const User = require('../models/User');
const { createJWT } = require('../helpers/jwt');


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
        //Generar JWT
        const token = await createJWT( user._id, user.name );

        res.status(201).json({
            ok: true,
            uid: user._id,
            name: user.name,
            token
        })
        
    } catch (error) {
        res.status(500).json({
            ok: false,
            msg: 'Por favor hable con el administrador.',
        })
    }
}


//* login user
const loginUser = async(req, res = response) =>{
    
    const { email, password } = req.body;

    try {
        //verificar que el usuario exista
        const user = await User.findOne( { email } );
        // null === true
        if( !user ){
            return res.status(400).json({
                ok: false,
                msg: 'User or password incorrect.'
            });
        }

        // Confirmar que la contraseña sea correcta
        const validPassword = bcrypt.compareSync( password, user.password );
        if ( !validPassword ){
            return res.status(400).json({
                ok: false,
                msg: 'Password incorrect.'
            });
        }

        // Generar el token JWT
        const token = await createJWT( user._id, user.name );

        res.json({
            ok: true,
            uid: user._id,
            name: user.name,
            token
        })
        
    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Por favor hable con el administrador.',
        })
    }
}


const renewToken = async(req, res = response) =>{
    
    const { uid, name } = req;

    // Generar el token JWT y retornarlo 
    const token = await createJWT( uid, name );

    res.json({
        ok: true,
        token
    })
}

module.exports = {
    createUser,
    loginUser,
    renewToken
}