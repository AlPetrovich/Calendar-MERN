import { useDispatch, useSelector } from "react-redux";
import { onAddNewEvent, onDeleteEvent, onSetActiveEvent, onUpdateEvent } from "../store";


export const useCalendarStore = () => {

    const { events, activeEvent } = useSelector( state => state.calendar );
    const dispatch = useDispatch();

    const setActiveEvent = ( calendarEvent ) =>{
        dispatch( onSetActiveEvent( calendarEvent ) );
    }

    const startSavingEvent = async( calendarEvent ) =>{
        // TODO: llegar al backend

        // Todo bien
        if( calendarEvent._id ){
            // Actualizar evento
           dispatch( onUpdateEvent( {...calendarEvent} ) ); //rompo referencia con operador- aseguro nuevo objeto
        }else{
            // Crear evento
           dispatch( onAddNewEvent( {...calendarEvent, _id: new Date().getTime() } ) );
        }
    }

    const startDeletingEvent = () =>{
        // Todo: Llegar al backend
        dispatch( onDeleteEvent() );
    }

    return{
        //* Propiedades
        activeEvent,
        events,
        hasEventSelected: !!activeEvent,

        //* Metodos
        setActiveEvent,
        startSavingEvent,
        startDeletingEvent,
    }

}
