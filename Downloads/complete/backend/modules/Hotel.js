const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// Create Schema
const HotelSchema = new Schema({
  no_of_rooms: {
    type: String,
    required: true
  },
  name: {
    type: String,
    required: true
  },
  type: {
    type: String
  },
  location: {
    type: String
  },
  price: {
    type: String
  },
  no_of_hotel: {
    type: String,
  },
  available_of_rooms: {
    type: String,
  },
  date: {
    type: Date,
    default: Date.now
  }
});

module.exports = Hotel = mongoose.model("hotel", HotelSchema);
