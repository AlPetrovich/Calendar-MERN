/*
    Rutas de eventos
    host + /api/events
*/

const { Router } = require('express');
const { getEvents, createEvent, updateEvent, deleteEvent } = require('../controllers/events');
const { validatorJWT } = require('../middlewares/validator-jwt');

const router = Router();
// Todas tienen que pasar por la validacion del JWT

// Obtener eventos
router.get('/', validatorJWT, getEvents);

// Crear un nuevo evento
router.post('/', validatorJWT, createEvent);


// Actualizar evento
router.put('/:id', validatorJWT, updateEvent);

// Eliminar evento
router.delete('/:id', validatorJWT, deleteEvent);


module.exports = router;

