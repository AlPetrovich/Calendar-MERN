const { response } = require('express');
const jwt = require('jsonwebtoken');

const validatorJWT = ( req, res = response, next ) => {

    // x-token header
    const token = req.header('x-token');

    if( !token ){
        return res.status(401).json({
            ok: false,
            msg: 'No hay token en la peticion.'
        });
    }

    try {
        // uid para saber usuario
        const { uid, name } = jwt.verify(token, process.env.SECRET_JWT_SEED);

        req.uid = uid;
        req.name = name;
    
        console.log(uid, name);
        
    } catch (error) {
        return res.status(401).json({
            ok: false,
            msg: 'Token no valido.'
        })
    }
 
    next();
}


module.exports = {
    validatorJWT
}