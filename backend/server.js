const express = require("express");
const dotenv = require("dotenv");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const cors = require("cors");
const eventRoutes = require("./routes/eventRoutes");
// const userRoutes = require("./routes/userRoutes");
const connectDB = require("./config/db");

dotenv.config();

connectDB();

const app = express();
app.use(cors());
app.use(bodyParser.json());

// mongoose.connect(process.env.MONGO_URI, {
//     useNewUrlParser: true,
//     useUnifiedTopology: true,
// });

app.use("/events", eventRoutes);
// app.use("/users", userRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
