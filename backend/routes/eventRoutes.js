const express = require("express");
const router = express.Router();
const {
    // getEvents,
    createEvent,
    // updateEvent,
    // deleteEvent,
} = require("../controllers/eventController");

// router.get("/:userId", getEvents);
router.post("/create-event", createEvent);
// router.put("/:id", updateEvent);
// router.delete("/:id", deleteEvent);

module.exports = router;
