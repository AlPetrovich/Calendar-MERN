/*
    Rutas de eventos
    host + /api/events
*/

const { Router } = require('express');
const { getEvents, createEvent, updateEvent, deleteEvent } = require('../controllers/events');
const { validatorJWT } = require('../middlewares/validator-jwt');
const { check } = require('express-validator');
const { validatorFields } = require('../middlewares/validatorFields');
const { isDate } = require('../helpers/isDate');
const router = Router();

// Todas tienen que pasar por la validacion del JWT
router.use( validatorJWT );

// Obtener eventos
router.get('/', getEvents);

// Crear un nuevo evento
router.post(
    '/',
    [
        check('title', 'El título es obligatorio').not().isEmpty(),
        check('start','Fecha de inicio es obligatoria').custom( isDate ),
        check('end','Fecha de finalización es obligatoria').custom( isDate ),
        validatorFields
    ],
    createEvent);


// Actualizar evento
router.put('/:id', updateEvent);

// Eliminar evento
router.delete('/:id', deleteEvent);


module.exports = router;

