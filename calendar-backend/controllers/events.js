const { response } = require('express');

//* getEvents
const getEvents = async(req, res = response) =>{
    try {
        res.json({
            ok: true,
            msg: 'obtener eventos'
        });
    } catch (error) {
        res.status(500).json({
            ok: false,
            msg: 'Por favor hable con el administrador.',
        });
    }
}

//* createEvent
const createEvent = async(req, res = response) =>{
    try {
        res.status(201).json({
            ok: true,
            msg: 'crear eventos'
        });
    
    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Por favor hable con el administrador.',
        });
    }
}


//* updateEvent
const updateEvent = async(req, res = response) =>{
    try {
        //obtener id del evento
        const id = req.params.id;

        res.json({
            id,
            ok: true,
            msg: 'actualizar eventos'
        });
    } catch (error) {
        res.status(500).json({
            ok: false,
            msg: 'Por favor hable con el administrador.',
        });
    }
}

//* deleteEvent
const deleteEvent = async(req, res = response) =>{
    try {
        //obtener id del evento
        const id = req.params.id;
        res.json({
            id,
            ok: true,
            msg: 'eliminar eventos'
        });
    } catch (error) {
        res.status(500).json({
            ok: false,
            msg: 'Por favor hable con el administrador.',
        });
    }
}

module.exports = {
    getEvents,
    createEvent,
    updateEvent,
    deleteEvent
}