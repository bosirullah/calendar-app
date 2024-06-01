const Event = require("../models/Event");
const { google } = require("googleapis");
const { oauth2Client } = require("./authController");

// Get all events for a user
const getEvents = async (req, res) => {
    try {
        const events = await Event.find({ userId: req.params.userId });
        res.status(200).json(events);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Create a new event
const createEvent = async (req, res, next) => {
    const {
        title,
        description,
        date,
        time,
        duration,
        sessionNotes,
        userId,
        refreshToken,
    } = req.body;

    const event = {
        summary: title,
        // location: "123 Main St, Anytown, USA",
        description: description,
        // sessionNotes: sessionNotes,
        extendedProperties: {
            private: {
                sessionNotes: sessionNotes,
            },
        },
        start: {
            dateTime: "2024-09-05T09:00:00-09:00",
            timeZone: "America/Los_Angeles",
        },
        end: {
            dateTime: "2024-09-05T12:00:00-10:00",
            timeZone: "America/Los_Angeles",
        },
    };

    try {
        oauth2Client.credentials = {
            refresh_token: refreshToken,
        };

        const calendar = google.calendar("v3");
        const response = await calendar.events.insert({
            auth: oauth2Client,
            calendarId: "primary",
            resource: event,
        });

        res.status(201).json({
            message: "Event created successfully",
            link: response.data.htmlLink,
        });
    } catch (error) {
        console.log("Error creating event:", error);
        res.status(500).json({ message: error.message });
    }
};

// Update an existing event
const updateEvent = async (req, res) => {
    const { id } = req.params;
    const {
        title,
        description,
        participants,
        date,
        time,
        duration,
        sessionNotes,
    } = req.body;
    try {
        const updatedEvent = await Event.findByIdAndUpdate(
            id,
            {
                title,
                description,
                participants,
                date,
                time,
                duration,
                sessionNotes,
            },
            { new: true }
        );
        res.status(200).json(updatedEvent);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Delete an event
const deleteEvent = async (req, res) => {
    const { id } = req.params;
    try {
        await Event.findByIdAndDelete(id);
        res.status(204).json({ message: "Event deleted" });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

module.exports = { getEvents, createEvent, updateEvent, deleteEvent };
