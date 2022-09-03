import { parseISO } from "date-fns";

//* mutar propiedad fecha string a tipo date
export const convertEventsToDateEvents = ( events = [] ) => {

    return events.map(event =>{

        event.start = parseISO( event.start );
        event.end = parseISO( event.end );

        return event;
    });
  
}
