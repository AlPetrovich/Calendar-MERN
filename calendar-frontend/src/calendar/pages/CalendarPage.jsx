import { useEffect } from 'react';
import { useState } from 'react';
import { Calendar } from 'react-big-calendar';
import 'react-big-calendar/lib/css/react-big-calendar.css';

import { NavBar, CalendarEvent, CalendarModal, FabAddNew, FabDelete } from '../';

import { localizer, getMessagesEs } from '../../helpers';
import { useAuthStore, useCalendarStore, useUiStore } from '../../hooks';


export const CalendarPage = () => {

  const { user } = useAuthStore();
  const { openDateModal } = useUiStore();
  const { events, setActiveEvent, startLoadingEvents } = useCalendarStore();

  const [lastView, setLastView] = useState(localStorage.getItem('lastView') || 'week');

  const eventStyleGetter = ( event, start, end, isSelected ) => {

      const isMyEvent = ( user.uid === event.user._id ) || ( user.uid === event.user.uid );

      const style = {
        backgroundColor: isMyEvent? '#347Cf7' : '#465660',
        borderRadius: '0px',
        opacity: 0.8,
        color: 'white',
      }

      return {
        style
      }
  }

  const onDoubleClick = (e) => {
    //console.log({ doubleClick : e});
    openDateModal();
  }

  const onSelect = (e) => {
    //evento que envio a mi func
    setActiveEvent(e);
  }

  const onViewChanged = (e) =>{
    //almacenar en localStorage para restablecer a la hora de la carga del navegador
    localStorage.setItem('lastView', e);
    setLastView(e); 
  }

  // cargo componentes y debo cargar evento
  useEffect(() => {
    startLoadingEvents()
  }, [])
  

  return (
    <div>
      <NavBar />

      <Calendar
        culture='es'
        localizer={ localizer }
        events={ events }
        defaultView={ lastView }
        startAccessor="start"
        endAccessor="end"
        style={{ height: 'calc( 100vh - 80px)' }}
        messages={ getMessagesEs() }
        eventPropGetter={ eventStyleGetter }
        components={{
          event: CalendarEvent,
        }}
        onDoubleClickEvent={ onDoubleClick }
        onSelectEvent={ onSelect }
        onView={ onViewChanged }
      />

        <CalendarModal />
        <FabAddNew />
        <FabDelete />
    </div>
  )
}
