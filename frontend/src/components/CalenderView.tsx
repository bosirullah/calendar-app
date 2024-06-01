"use client";
import { useState } from "react";
import FullCalendar from "@fullcalendar/react";
import daygridPlugin from "@fullcalendar/daygrid";
import interactionPlugin from "@fullcalendar/interaction";
import { Box } from "@mui/material";
import { v4 as uuid } from "uuid";

const CalenderView = () => {
  const [events, setEvents] = useState<any>([]);

  const handleSelect = (info: any) => {
    const { start, end } = info;
    const eventNamePrompt = prompt("Enter, event name");
    if (eventNamePrompt) {
      setEvents([
        ...events,
        {
          start,
          end,
          title: eventNamePrompt,
          id: uuid(),
        },
      ]);
    }
  };

  return (
    <>
      <Box>
        <FullCalendar
          editable
          selectable
          events={events}
          select={handleSelect}
          headerToolbar={{
            start: "today prev next",
            end: "dayGridMonth dayGridWeek dayGridDay",
          }}
          eventContent={(info) => <EventItem info={info} />}
          plugins={[daygridPlugin, interactionPlugin]}
          views={["dayGridMonth", "dayGridWeek", "dayGridDay"]}
        />
      </Box>
    </>
  );
};

export default CalenderView;

const EventItem = ({ info }: any) => {
  const { event } = info;
  return (
    <Box sx={{ background: "red" }} px={2}>
      <p>{event.title}</p>
    </Box>
  );
};
