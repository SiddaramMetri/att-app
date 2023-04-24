import React from "react";
import { Calendar, momentLocalizer } from "react-big-calendar";
import moment from "moment";
import "react-big-calendar/lib/css/react-big-calendar.css";

moment.locale("en-GB");
const localizer = momentLocalizer(moment);

export default function CalenderContainer(props) {
  const { attendanceTab, handleCalendarDateClick } = props;
  const events = attendanceTab.map((ele) => {
    return {
      id: ele._id,
      date: new Date(ele.attdate),
      title: `${ele.sessionTitle || "live Session"}  - ${ele.attdate}`,
      start: new Date(ele.attdate),
      end: new Date(ele.attdate),
    };
  });

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
        onSelectEvent={(event) => handleCalendarDateClick(event.id)}
      />
    </div>
  );
}
