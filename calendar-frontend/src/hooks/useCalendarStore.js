import { useDispatch, useSelector } from "react-redux";
import calendarApi from "../api/calendarApi";
import { convertEventsToDateEvents } from "../helpers";
import { onAddNewEvent, onDeleteEvent, onSetActiveEvent, onUpdateEvent } from "../store";


export const useCalendarStore = () => {

    const { events, activeEvent } = useSelector( state => state.calendar );
    //tomar usuario autenticado
    const { user } = useSelector( state => state.auth );

    const dispatch = useDispatch();

    const setActiveEvent = ( calendarEvent ) =>{
        dispatch( onSetActiveEvent( calendarEvent ) );
    }

    //* crear evento
    const startSavingEvent = async( calendarEvent ) =>{
        if( calendarEvent._id ){
            // Actualizar evento
           dispatch( onUpdateEvent( {...calendarEvent} ) ); //rompo referencia con operador- aseguro nuevo objeto
        }else{
            // Crear evento
            const { data } = await calendarApi.post( '/events', calendarEvent );
            //preparo evento a alamacenar, id del backend, adicional el usuario conectado del momento
           dispatch( onAddNewEvent( {...calendarEvent, id: data.event.id, user } ) );
        }
    }

    //* eliminar evento
    const startDeletingEvent = () =>{
        dispatch( onDeleteEvent() );
    }

    //* cargar eventos
    const startLoadingEvents = async() =>{
        try {

            const { data } = await calendarApi.get( '/events' );
            //muto fecha de eventos a tipo date
            const eventos = convertEventsToDateEvents( data.events );
            console.log( eventos );
            
        } catch (error) {
            console.log('Error cargando eventos');
            console.log(error);
        }
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
        startLoadingEvents
    }

}
