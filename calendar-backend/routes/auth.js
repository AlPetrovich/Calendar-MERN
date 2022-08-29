/*
    Rutas de Usuarios /Auth
    host + /api/auth
*/
const { Router } = require('express');
const router = Router();

const { createUser } = require('../controllers/auth');

router.post('/new', createUser);

router.post('/', (req, res) =>{

    console.log('se requiere /');
    res.json({
        ok: true,
        msg: 'login'
    })

});

router.get('/renew', (req, res) =>{

    console.log('se requiere /');
    res.json({
        ok: true,
        msg: 'renew'
    })

});

module.exports = router;