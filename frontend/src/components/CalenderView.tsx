"use client";
import { useEffect, useState } from "react";
import FullCalendar from "@fullcalendar/react";
import daygridPlugin from "@fullcalendar/daygrid";
import interactionPlugin from "@fullcalendar/interaction";
import { Box } from "@mui/material";
import { v4 as uuid } from "uuid";
import axios from "axios";
import { useAuth } from "@/context/AuthContext";
import { useRouter } from "next/navigation";

// const CLIENT_ID = process.env.CLIENT_ID;
// const SCOPES = process.env.SCOPES;
// const REDIRECT_URI = process.env.BASE_URL;

const CalenderView = () => {
    const [events, setEvents] = useState<any>([]);
    const { isAuthenticated, setIsAuthenticated } = useAuth();
    const router = useRouter();

    useEffect(() => {
        const fetchEvents = async () => {
            try {
                const refreshToken = localStorage.getItem("refresh_token");
                if (refreshToken) {
                    const tokenRes = await axios.get(
                        "http://localhost:5000/events/getEvents"
                    );

                    const { access_token } = tokenRes.data;

                    const response = await axios.get(
                        "http://localhost:5000/events/getEvents",
                        {
                            headers: {
                                Authorization: `Bearer ${access_token}`,
                            },
                        }
                    );
                    setEvents(response.data);
                    // console.log("event = ", events);
                }
            } catch (error) {
                console.error("Error fetching events:", error);
            }
        };

        // Redirect the user to Google's OAuth 2.0 server
        // const authUrl = `https://accounts.google.com/o/oauth2/v2/auth?client_id=${CLIENT_ID}&redirect_uri=${REDIRECT_URI}&response_type=code&scope=${SCOPES}&access_type=offline`;
        // window.location.href = authUrl;

        // Fetch events after authentication
        if (isAuthenticated) {
            fetchEvents();
        } else {
            router.push("/");
        }
    }, [isAuthenticated]);

    // const handleSelect = (info: any) => {
    //     const { start, end } = info;
    //     const eventNamePrompt = prompt("Enter, event name");
    //     if (eventNamePrompt) {
    //         setEvents([
    //             ...events,
    //             {
    //                 start,
    //                 end,
    //                 title: eventNamePrompt,
    //                 id: uuid(),
    //             },
    //         ]);
    //     }
    // };

    const handleSelect = (info: any) => {
        const { start, end } = info;
        const eventNamePrompt = prompt("Enter event name");
        if (eventNamePrompt) {
            const newEvent = {
                start,
                end,
                title: eventNamePrompt,
                id: uuid(),
            };
            setEvents([...events, newEvent]);

            // Optionally, send the new event to your backend API
            // axios.post("/api/events", newEvent).catch((error) => {
            //     console.error("Error saving event:", error);
            // });
        }
    };

    return (
        <>
            <Box>
                {isAuthenticated && (
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
                        // views={["dayGridMonth", "dayGridWeek", "dayGridDay"]}
                    />
                )}
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
