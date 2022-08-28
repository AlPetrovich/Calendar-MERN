import { Calendar } from 'react-big-calendar';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import { addHours } from 'date-fns';
import { NavBar } from '../components/NavBar';
import { localizer, getMessagesEs } from '../../helpers';
import { CalendarEvent } from '../components/CalendarEvent';
import { useState } from 'react';
import { CalendarModal } from '../components/CalendarModal';
import { useCalendarStore, useUiStore } from '../../hooks';


export const CalendarPage = () => {

  const { openDateModal } = useUiStore();
  const { events } = useCalendarStore();
  const [lastView, setLastView] = useState(localStorage.getItem('lastView') || 'week');

  const eventStyleGetter = ( event, start, end, isSelected ) => {

      const style = {
        backgroundColor: '#347Cf7',
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
    console.log({ click : e});
  }

  const onViewChanged = (e) =>{
    //almacenar en localStorage para restablecer a la hora de la carga del navegador
    localStorage.setItem('lastView', e);
    setLastView(e); 
  }

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

    </div>
  )
}
