/*
    Rutas de Usuarios /Auth
    host + /api/auth
*/
const { Router } = require('express');
const { check } = require('express-validator');
const router = Router();
const { validatorFields } = require('../middlewares/validatorFields');
const { createUser, loginUser, renewToken } = require('../controllers/auth');


//* create user
router.post(
    '/new'
    , 
    [//middlewares
        check('name', 'El nombre es obligatorio').not().isEmpty(),
        check('email', 'El email es obligatorio').isEmail(),
        check('password', 'El password debe ser minimo de 6 caracteres').isLength({ min: 6 }),
        validatorFields
    ] 
    ,createUser );


//* logear user
router.post(
    '/'
    ,
    [
        check('email', 'El email es obligatorio').isEmail(),
        check('password', 'El password debe ser minimo de 6 caracteres').isLength({ min: 6 }),
        validatorFields
    ]
    ,loginUser );

router.get('/renew', renewToken );

module.exports = router;