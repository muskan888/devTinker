const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// Create Schema
const RoomSchema = new Schema({
  user: {
    type: Schema.Types.ObjectId,
    ref: "users"
  },
  no_of_rooms: {
    type: String,
    required: true
  },
  no_of_guest: {
    type: String,
    required: true
  },
  check_in_date: {
    type: String
  },
  check_out_date: {
    type: String
  },
  date: {
    type: Date,
    default: Date.now
  }
});

module.exports = Room = mongoose.model("room", RoomSchema);
