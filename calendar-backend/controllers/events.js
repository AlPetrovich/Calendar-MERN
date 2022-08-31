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
const createEvent = (req, res = response) =>{
    
    console.log(req.body);

    res.json({
        ok: true,
        msg: 'crear evento'
    });
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