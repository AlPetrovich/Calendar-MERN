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
        //retornar ultima version del evento, new = true
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

    const eventId = req.params.id;
    const uid = req.uid;

    try {
        //verificar que el evento existe
        const event = await Event.findById(eventId); 
        if(!event){
            return res.status(404).json({
                ok: false,
                msg: 'El evento no existe.',
            });
        }
        //persona que creo el evento puede eliminarlo 
        if(event.user.toString() !== uid ){
            return res.status(401).json({
                ok: false,
                msg: 'No tienes permisos para eliminar este evento.',
            });
        }

        //Eliminar eventos
        await Event.findByIdAndDelete(eventId);
        res.json({
            ok: true,
            msg: 'Evento eliminado.'
        });
        
    } catch (error) {
        console.log(error);
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