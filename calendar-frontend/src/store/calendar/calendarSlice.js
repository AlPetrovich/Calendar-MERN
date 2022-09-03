import { createSlice } from '@reduxjs/toolkit';

/* cod temporal */
// import { addHours } from 'date-fns';
// const tempEvent = {
//     id: new Date().getTime(),
//     tile: 'Cumpleaños del jefe',
//     notes: 'Comprar pastel',
//     start: new Date(),
//     end: addHours( new Date(), 2),
//     bgColor: '#fafafa',
//     user:{
//       id: '123',
//       name: 'Alexis',
//     }
// }

export const calendarSlice = createSlice({
   name: 'calendar',
   initialState: { 
      isLoadingEvents: true,
      events: [
        //tempEvent
      ],
      activeEvent: null
   },
   reducers: {
       onSetActiveEvent: (state, { payload }) =>{
          state.activeEvent = payload;
       },
       onAddNewEvent: (state, { payload }) =>{
            state.events.push( payload );
            state.activeEvent = null;
       },
       onUpdateEvent: (state, { payload }) =>{
            //si actualizo ya tengo el id
            state.events = state.events.map( event => {
               if( event.id === payload.id ){
                  return payload; // nuevo evento
               }

               return event;
            });
       },
      onDeleteEvent: (state) =>{
         if( state.activeEvent ){
            state.events = state.events.filter( event => event.id !== state.activeEvent.id );
            state.activeEvent = null; // desactivo el evento
         }
      },
      onLoadEvents: ( state, { payload = [] } ) =>{
         //llamo cuando ya tengo los eventos
         state.isLoadingEvents = false;
         //state.events = payload; funciona pero doy una vuelta mas de rosca
         //barrer payload y confirmar que el evento no este duplicado por id
         payload.forEach( event =>{
            const eventExists = state.events.some( dbEvent => dbEvent.id === event.id ); //apenas encuentra devuelve true
            if( !eventExists ){
               state.events.push( event ); //si no existe agrego el evento
            }
         })
      }
    }
});


export const { onSetActiveEvent, onAddNewEvent, onUpdateEvent, onDeleteEvent, onLoadEvents } = calendarSlice.actions;