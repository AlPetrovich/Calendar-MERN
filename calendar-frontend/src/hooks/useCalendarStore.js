import { useDispatch, useSelector } from "react-redux";
import Swal from "sweetalert2";
import calendarApi from "../api/calendarApi";
import { convertEventsToDateEvents } from "../helpers";
import { onAddNewEvent, onDeleteEvent, onLoadEvents, onSetActiveEvent, onUpdateEvent } from "../store";


export const useCalendarStore = () => {

    const { events, activeEvent } = useSelector( state => state.calendar );
    //tomar usuario autenticado
    const { user } = useSelector( state => state.auth );

    const dispatch = useDispatch();

    const setActiveEvent = ( calendarEvent ) =>{
        dispatch( onSetActiveEvent( calendarEvent ) );
    }

    //* crear/actualizar evento
    const startSavingEvent = async( calendarEvent ) =>{
        try {
            //* existe id actualizo
            if( calendarEvent.id ){
                //endpoint + data
                await calendarApi.put(`/events/${ calendarEvent.id }`, calendarEvent);
                // Actualizar evento, agrego usuario activo
                dispatch( onUpdateEvent( {...calendarEvent, user} ) ); //rompo referencia con operador- aseguro nuevo objeto
                return;
            }
            //* no existe id - crear evento
            // Crear evento
            const { data } = await calendarApi.post( '/events', calendarEvent );
            //preparo evento a alamacenar, id del backend, adicional el usuario conectado del momento
            dispatch( onAddNewEvent( {...calendarEvent, id: data.event.id, user } ) );
                
        } catch (error) {
            console.log(error);
            Swal.fire('Error al guardar', error.response.data.msg , 'error');
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
            dispatch( onLoadEvents( eventos ) );
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
