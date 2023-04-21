import React from "react";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import interactionPlugin from "@fullcalendar/interaction";
const CalenderContainer = (props) => {
  const { events, handleCalendarDateClick } = props;
  return (
    <div>
      <FullCalendar
        plugins={[dayGridPlugin, interactionPlugin]}
        initialView="dayGridMonth"
        weekends={true}
        events={events}
        eventClick={(e) => {
          console.log(e);
          handleCalendarDateClick(
            e.event._def.extendedProps.ids,
            e.event._def.extendedProps.dates
          );
        }}
        contentHeight={550}
      />
    </div>
  );
};

export default CalenderContainer;
