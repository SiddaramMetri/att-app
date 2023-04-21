import React, { useState } from "react";
import { Calendar, momentLocalizer } from "react-big-calendar";
import moment from "moment";
import "react-big-calendar/lib/css/react-big-calendar.css";

moment.locale("en-GB");
const localizer = momentLocalizer(moment);

export default function ReactCalendar(props) {
  const { attendanceTab } = props;
  const events = attendanceTab.map((ele) => {
    return {
      id: ele._id,
      date: new Date(ele.attdate.slice(0, 10)),
      title: `Live Session - ${ele.attdate.slice(0, 10)}`,
      start: new Date(ele.attdate.slice(0, 10)),
      end: new Date(ele.attdate.slice(0, 10)),
    };
  });
  console.log(events);
  const [eventsData, setEventsData] = useState([]);

  const handleSelect = ({ start, end }) => {
    console.log(start);
    console.log(end);
    const title = window.prompt("New Event name");
    if (title)
      setEventsData([
        ...eventsData,
        {
          start,
          end,
          title,
        },
      ]);
  };
  return (
    <div className="App">
      <Calendar
        views={["day", "agenda", "work_week", "month"]}
        selectable
        localizer={localizer}
        defaultDate={new Date()}
        defaultView="month"
        events={events}
        style={{ height: "100vh" }}
        onSelectEvent={(event) => alert(event.title)}
        onSelectSlot={handleSelect}
      />
    </div>
  );
}
