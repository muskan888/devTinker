const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const passport = require("passport");

const users = require("./routes/users");
const profile = require("./routes/profile");
const posts = require("./routes/posts");
const tourguide = require("./routes/tourguide");
const hotel = require("./routes/hotel");
const room = require("./routes/room");

const app = express();

// Body parser middleware
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// DB Config
const db = require("./config/keys").mongoURI;

// Connect to MongoDB
mongoose
  .connect(
    db,
    { useNewUrlParser: true }
  )
  .then(() => console.log("MongoDB Connected"))
  .catch(err => console.warn(err));


app.use(cors ({
    credentials: true,
    origin: 'http://localhost:3000'
}));

// Passport middleware
app.use(passport.initialize());

// Passport Config
require("./config/passport")(passport);

// Use routes
app.use("/users", users);
app.use("/posts", posts);
app.use("/profile", profile);
app.use("/tourguide", tourguide);
app.use("/hotel", hotel);
app.use("/room", room);

const port = process.env.PORT || 5000;

app.listen(port, () => console.log(`Server running on port ${port}`));
