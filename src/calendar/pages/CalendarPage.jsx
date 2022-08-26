import { Calendar } from 'react-big-calendar';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import { addHours } from 'date-fns';
import { NavBar } from '../components/NavBar';
import { localizer, getMessagesEs } from '../../helpers';



const events= [{
  title: 'Cumpleaños de Alexis',
  notes: 'Comprar pastel',
  start: new Date(),
  end: addHours( new Date(), 2),
  bgColor: '#fafafa',
  user:{
    _id: '123',
    name: 'Alexis',
  }
}]

export const CalendarPage = () => {

  const eventStyleGetter = ( event, start, end, isSelected ) => {
      console.log({event, start, end, isSelected});

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


  return (
    <div>
      <NavBar />

      <Calendar
        culture='es'
        localizer={localizer}
        events={events}
        startAccessor="start"
        endAccessor="end"
        style={{ height: 'calc( 100vh - 80px)' }}
        messages={getMessagesEs()}
        eventPropGetter={ eventStyleGetter }
      />

    </div>
  )
}
