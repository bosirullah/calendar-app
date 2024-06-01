const Event = require("../models/Event");

// Get all events for a user
exports.getEvents = async (req, res) => {
    try {
        const events = await Event.find({ userId: req.params.userId });
        res.status(200).json(events);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Create a new event
exports.createEvent = async (req, res) => {
    const {
        title,
        description,
        participants,
        date,
        time,
        duration,
        sessionNotes,
        userId,
    } = req.body;
    try {
        const newEvent = new Event({
            title,
            description,
            participants,
            date,
            time,
            duration,
            sessionNotes,
            userId,
        });

        await newEvent.save();
        res.status(201).json(newEvent);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Update an existing event
exports.updateEvent = async (req, res) => {
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
exports.deleteEvent = async (req, res) => {
    const { id } = req.params;
    try {
        await Event.findByIdAndDelete(id);
        res.status(204).json({ message: "Event deleted" });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
