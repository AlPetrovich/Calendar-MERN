const { response } = require('express');
const Event = require('../models/Event');


//* getEvents
const getEvents = async(req, res = response) =>{
    //obtener name email del usuario
    const events = await Event.find().populate('user', 'name email');

    res.json({
        ok: true,
        events
    });
}

//* createEvent
const createEvent = async(req, res = response) =>{
    
    const event = new Event( req.body);

    try {

        event.user = req.uid;

        const eventSaved = await event.save();

        res.json({
            ok: true,
            event: eventSaved
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
   
    const eventId = req.params.id;
    const uid = req.uid;

    try {

        const event = await Event.findById(eventId); //verificar si existe
        if(!event){
            return res.status(404).json({
                ok: false,
                msg: 'El evento no existe.',
            });
        }
        //persona que creo el evento puede actualizarlo
        if(event.user.toString() !== uid ){
            return res.status(401).json({
                ok: false,
                msg: 'No tienes permisos para actualizar este evento.',
            });
        }
        //actualizar el evento
        const newEvent = {
            ...req.body,
            user: uid
        }
        const eventUpdated = await Event.findByIdAndUpdate(eventId, newEvent, {new: true});

        res.json({
            ok: true,
            event: eventUpdated
        });

        
    } catch (error) {
        console.log(error);
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